import { NextFunction, Request, Response } from 'express';
import db from '../../models';
//import { Op } from 'sequelize';

const Book = db.book;
const User = db.user;
const LikeBook = db.likebook;
const Review = db.review;
const LikeReview = db.likereview;
const HideReview = db.hidereview;

const getPagingData = (data, page, limit) => {
    const { count: totalDatas, rows: datas } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalDatas / limit);
    return { totalDatas, datas, totalPages, currentPage };
};
export const addReview = (req: Request, res: Response) => {
    try {
        Review.create({
            bookId: req.body.bookId,
            userId: req.body.userId,
            rate: req.body.rate,
            content: req.body.content,
            photoReview: req.body.photoReview,
        })
            .then((review) => {
                res.status(201).send(review);
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getAllReview = (req: Request, res: Response) => {
    try {
        const limit = 10;
        const page = req.query.page ? Number(req.query.page) - 1 : 0;
        const offset = page * limit;
        Review.findAndCountAll({
            attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId', 'updatedAt'],
            include: [
                {
                    model: Book,
                    as: 'book',
                    attributes: ['id', 'title', 'subtitle', 'author', 'smallThumbnail', 'thumbnail', 'updatedAt'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'userName', 'avatar'],
                },
            ],
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

// export const getReviewById = (req: Request, res: Response) => {
//     try {
//         Review.findOne({
//             where: {
//                 id: req.query.id,
//             },
//             attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId'],
//             include: [
//                 {
//                     model: User,
//                     as: 'user',
//                     attributes: ['id', 'userName', 'avatar'],
//                 },
//             ],
//         })
//             .then(async (book) => {
//                 if (!book) {
//                     return res.status(404).send({ error: 'Can Not Find Your Book' });
//                 }

//                 return res.status(200).send(book);
//             })
//             .catch((err) => {
//                 return res.status(500).send({ error: err.message });
//             });
//     } catch (err) {
//         return res.status(500).send({ error: err.message });
//     }
// };

export const likeBook = (req: Request, res: Response) => {
    try {
        LikeBook.create({
            bookId: req.body.bookId,
            userId: req.body.userId,
        })
            .then(() => {
                res.status(201).send({ liked: true });
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const likeReview = (req: Request, res: Response) => {
    try {
        LikeReview.create({
            reviewId: req.body.reviewId,
            userId: req.body.userId,
        })
            .then(() => {
                res.status(201).send({ liked: true });
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const hideReview = (req: Request, res: Response) => {
    try {
        HideReview.create({
            reviewId: req.body.reviewId,
            userId: req.body.userId,
        })
            .then(() => {
                res.status(201).send({ hided: true });
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
