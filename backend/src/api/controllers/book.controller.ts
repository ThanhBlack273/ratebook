import { User, Book, Review } from '../../models';
import { Op } from 'sequelize';
import { Request, Response } from 'express';
import { CreateBookDTO } from '../dto/book.dto';

export const subBook = async (req: Request, res: Response) => {
    try {
        const payload: CreateBookDTO = req.body;
        const book = await Book.create({
            ...payload,
        });
        if (!book) return res.status(400).send({ error: 'Adding book failed' });
        return res.status(201).send({
            ...book.dataValues,
            createdAt: undefined,
            updatedAt: undefined,
            deletedAt: undefined,
        });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

const getPagingData = (data, page, limit) => {
    const { count: totalDatas, rows: datas } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalDatas / limit);
    return { totalDatas, datas, totalPages, currentPage };
};

export const getAllBook = async (req: Request, res: Response) => {
    try {
        const limit = 10;
        const page = req.query.page ? Number(req.query.page) - 1 : 0;
        const offset = page * limit;
        const book = await Book.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        if (!book) {
            return res.status(404).send({ error: 'No books have been registered yet.' });
        }
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
        if (!book) {
            return res.status(404).send({ error: 'Can Not Find Your Book' });
        }
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
                id: Number(req.query.id),
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
                    as: 'subByUser',
                    attributes: ['id', 'userName', 'avatar'],
                },
            ],
        });
        if (!book) {
            return res.status(404).send({ error: 'Can Not Find Your Book' });
        }

        return res.status(200).send(book);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

export const getReviewList = async (req: Request, res: Response) => {
    try {
        const limit = 10;
        const page = req.query.page ? Number(req.query.page) - 1 : 0;
        const offset = page * limit;
        const review = await Review.findAndCountAll({
            where: {
                bookId: Number(req.query.id),
            },
            attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId', 'updatedAt'],
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'userName', 'avatar'],
                //required: false,
            },
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        if (!review) return res.status(404).send({ error: 'No books have been reviewed yet.' });
        const response = await getPagingData(review, page + 1, limit);
        res.status(201).send({
            totalBooks: response.totalDatas,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            reviews: response.datas,
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
