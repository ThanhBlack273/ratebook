import db from '../models';
import express, { Express, NextFunction, Request, Response } from 'express';
//import { Op } from 'sequelize';

const Book = db.book;
const User = db.user;
const Like = db.likebook;
const Review = db.review;

const getPagingData = (data, page, limit) => {
    const { count: totalDatas, rows: datas } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalDatas / limit);
    return { totalDatas, datas, totalPages, currentPage };
};

export const getUserById = (req: Request, res: Response) => {
    try {
        User.findOne({
            where: {
                id: req.query.id,
            },
            attributes: ['id', 'email', 'userName', 'dateOfBirth', 'phoneNumber', 'avatar'],
        })
            .then(async (user) => {
                if (!user) {
                    return res.status(404).send({ error: 'Can Not Find User Data' });
                }

                return res.status(200).send(user);
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
            });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};
export const getReviewList = (req: Request, res: Response) => {
    try {
        const limit = 10;
        const page = req.query.page ? req.query.page - 1 : 0;
        const offset = page * limit;
        Review.findAndCountAll({
            where: {
                userId: req.query.id,
            },
            attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId'],
            include: {
                model: Book,
                as: 'book',
                attributes: ['id', 'title', 'subtitle', 'author', 'smallThumbnail', 'thumbnail'],
                //required: false,
            },
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        })
            .then(async (review) => {
                const response = await getPagingData(review, page + 1, limit);
                res.status(201).send({
                    totalBooks: response.totalDatas,
                    totalPages: response.totalPages,
                    currentPage: response.currentPage,
                    reviews: response.datas,
                });
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getBookSub = (req: Request, res: Response) => {
    try {
        const limit = 10;
        const page = req.query.page ? req.query.page - 1 : 0;
        const offset = page * limit;
        Book.findAndCountAll({
            where: {
                userId: req.query.id,
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
        })
            .then(async (book) => {
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
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
            });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// export const getLikedList = (req: Request, res: Response) => {
//     try {
//         User.findAll({
//             include: ['reviewedListBook'],
//         })
//             .then((user) => {
//                 res.status(201).send({
//                     reviewedListBook: user[0].reviewedListBook,
//                 });
//             })
//             .catch((err) => {
//                 res.status(500).send({ error: err.message });
//             });
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// };
