import { User, Book, Review, HideReview, LikeReview, LikeBook } from '../../../models';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { getPagingData } from '../../../helpers/paging';
import * as mapper from './mapper';

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            where: {
                id: Number(req.query.id),
            },
            attributes: ['id', 'email', 'userName', 'dateOfBirth', 'phoneNumber', 'avatar', 'device'],
        });
        if (!user) {
            return res.status(404).send({ error: 'Can Not Find User Data' });
        }

        return res.status(200).send(user);
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
                id: Number(req.query.id), //fomart code
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
                userId: Number(req.query.id),
                deleted: false,
            },
            attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId', 'updatedAt'],
            include: [
                {
                    model: Book,
                    as: 'Book',
                    attributes: ['id', 'title', 'subtitle', 'author', 'smallThumbnail', 'thumbnail'],
                },
                {
                    model: LikeReview,
                    as: 'likedReviewListUser',
                    attributes: ['id', 'userId', 'reviewId'],
                    where: {
                        '$likedReviewListUser.userId$': req.query.id,
                    },
                    required: false,
                    duplicating: false,
                },
            ],
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        const response = await getPagingData(review, page + 1, limit);
        res.status(200).send({
            totalBooks: response.totalDatas,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            reviews: response.datas.map(mapper.toGetReviewList),
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getBookSub = async (req: Request, res: Response) => {
    try {
        const limit = 10;
        const page = req.query.page ? Number(req.query.page) - 1 : 0;
        const offset = page * limit;
        const book = await Book.findAndCountAll({
            where: {
                userId: Number(req.query.id),
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
            ],
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        if (!book) {
            return res.status(404).send({ error: 'Can Not Find Your Data' });
        }

        const response = await getPagingData(book, page + 1, limit);
        res.status(201).send({
            totalBooks: response.totalDatas,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            books: response.datas,
        });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

export const getLikedList = async (req, res) => {
    try {
        const limit = 10;
        const page = req.query.page ? req.query.page - 1 : 0;
        const offset = page * limit;
        const book = await LikeBook.findAndCountAll({
            where: {
                userId: req.query.id,
            },
            attributes: ['id', 'userId', 'bookId'],
            include: {
                model: Book,
                as: 'Book',
                attributes: ['id', 'title', 'subtitle', 'author', 'smallThumbnail', 'thumbnail'],
                //required: false,
            },
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        if (!book) {
            return res.status(404).send({ error: 'Can Not Find Your Data' });
        }

        const response = await getPagingData(book, page + 1, limit);
        return res.status(200).send({
            totalBooks: response.totalDatas,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            books: response.datas.map(mapper.toGetLikedList),
        });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};
