import { User, Book, Review, LikeBook, HideReview, LikeReview } from '../../../models';
import { Op } from 'sequelize';
import { Request, Response } from 'express';
import { CreateBookDTO } from '../../interfaces/book.dto';
import { getPagingData } from '../../../helpers/paging';
import * as mapper from './mapper';
import sequelize from 'sequelize';
import sequelizeConnection from '../../../config/db.config';

export const subBook = async (req: Request, res: Response) => {
    const t = await sequelizeConnection.transaction();
    try {
        const payload: CreateBookDTO = req.body;
        const book = await Book.create(
            {
                ...payload,
                userId: res.locals.id,
            },
            { transaction: t },
        );
        if (!book) return res.status(400).send({ error: 'Adding book failed' });
        res.status(201).send({
            ...book.dataValues,
            createdAt: undefined,
            updatedAt: undefined,
            // deletedAt: undefined,
        });
        await t.commit();
        return;
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};

export const getAllBook = async (req: Request, res: Response) => {
    try {
        const limit = 10;
        const page = req.query.page ? Number(req.query.page) - 1 : 0;
        const offset = page * limit;
        const order = [
            // ['title', 'DESC'],
            ['updatedAt', 'DESC'],
        ];
        const book = await Book.findAndCountAll({
            order: [
                ['title', 'DESC'],
                ['updatedAt', 'DESC'],
            ],
            limit,
            offset,
        });
        // if (book.rows.length == 0) {
        //     return res.status(404).send({ error: 'No books have been registered yet.' });
        // }
        if (book.rows.length == 0) return res.status(200).send({});
        const response = await getPagingData(book, page + 1, limit);
        return res.status(200).send({
            totalBooks: response.totalDatas,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            books: response.datas,
        });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

export const searchBook = async (req: Request, res: Response) => {
    try {
        const limit = 10;
        const page = req.query.page ? Number(req.query.page) - 1 : 0;
        const offset = page * limit;
        const book = await Book.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.iLike]: `${req.query.search}%`,
                        },
                    },
                    {
                        subtitle: {
                            [Op.iLike]: `${req.query.search}%`,
                        },
                    },
                    {
                        ISBN_10: {
                            [Op.like]: `${req.query.search}%`,
                        },
                    },
                    {
                        ISBN_13: {
                            [Op.like]: `${req.query.search}%`,
                        },
                    },
                ],
            },
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        // if (book.rows.length == 0) {
        //     return res.status(404).send({ error: 'Can Not Find Your Book' });
        // }
        if (book.rows.length == 0) return res.status(200).send({});
        const response = await getPagingData(book, page + 1, limit);
        return res.status(200).send({
            totalBooks: response.totalDatas,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            books: response.datas,
        });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book.findOne({
            where: {
                id: Number(req.params.id),
            },
            attributes: [
                'id',
                'ISBN_10',
                'ISBN_13',
                'title',
                'subtitle',
                'author',
                'publisher',
                'publishedDate',
                'description',
                'smallThumbnail',
                'thumbnail',
                'star',
                'countRate',
                'userId',
                'updatedAt',
            ],
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'userName', 'avatar'],
                },
                {
                    model: LikeBook,
                    as: 'likedListUser',
                    attributes: ['id', 'bookId', 'userId'],
                    where: {
                        '$likedListUser.userId$': res.locals.id,
                        //'$likedReviewListUser.reviewId$': 4,
                    },
                    required: false,
                    duplicating: false,
                },
            ],
        });
        if (!book) {
            return res.status(404).send({ error: 'Can Not Find Your Book' });
        }

        return res.status(200).send(mapper.toGetBookById(book));
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

export const getReviewList = async (req: Request, res: Response) => {
    try {
        const limit = 10;
        const page = req.query.page ? Number(req.query.page) - 1 : 0;
        const offset = page * limit;

        const listHide: any = await User.findOne({
            where: {
                id: res.locals.id,
            },
            attributes: [],
            include: [
                {
                    model: HideReview,
                    as: 'hidedReviewListReview',
                    attributes: ['reviewId'],
                    required: false,
                    duplicating: false,
                },
            ],
        });
        const arrayReviewHide = await listHide.hidedReviewListReview.map((object) => object.reviewId);
        const review = await Review.findAndCountAll({
            where: {
                id: {
                    [Op.notIn]: arrayReviewHide,
                },
                bookId: Number(req.params.id),
                deleted: false,
            },
            attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId', 'updatedAt'],
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'email', 'userName', 'avatar', 'device'],
                },
                {
                    model: LikeReview,
                    as: 'likedReviewListUser',
                    attributes: ['id', 'userId', 'reviewId'],
                    where: {
                        '$likedReviewListUser.userId$': res.locals.id,
                    },
                    required: false,
                    duplicating: false,
                },
            ],
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        // if (review.rows.length == 0) return res.status(404).send({ error: 'No books have been reviewed yet.' });
        if (review.rows.length == 0) return res.status(200).send({});
        const response = await getPagingData(review, page + 1, limit);

        res.status(201).send({
            totalBooks: response.totalDatas,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            reviews: response.datas.map(mapper.toGetReviewList),
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
