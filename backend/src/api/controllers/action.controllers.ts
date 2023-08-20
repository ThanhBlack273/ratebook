import { NextFunction, Request, Response } from 'express';
import { User, Book, Review, LikeBook, LikeReview, HideReview } from '../../models';
import { CreateReviewDTO } from '../dto/review.dto';

//import { Op } from 'sequelize';

const getPagingData = (data, page, limit) => {
    const { count: totalDatas, rows: datas } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalDatas / limit);
    return { totalDatas, datas, totalPages, currentPage };
};
export const addReview = async (req: Request, res: Response) => {
    try {
        const payload: CreateReviewDTO = req.body;
        const review = await Review.create({
            bookId: payload.bookId,
            userId: payload.userId,
            rate: payload.rate,
            content: payload.content,
            photoReview: payload.photoReview,
        });
        return res.status(201).send(review);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getAllReview = async (req: Request, res: Response) => {
    try {
        const limit = 10;
        const page = req.query.page ? Number(req.query.page) - 1 : 0;
        const offset = page * limit;
        const review = await Review.findAndCountAll({
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
        });
        if (!review) return res.status(404).send({ error: 'Do not have any review' });
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

// // export const getReviewById = (req: Request, res: Response) => {
// //     try {
// //         Review.findOne({
// //             where: {
// //                 id: req.query.id,
// //             },
// //             attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId'],
// //             include: [
// //                 {
// //                     model: User,
// //                     as: 'user',
// //                     attributes: ['id', 'userName', 'avatar'],
// //                 },
// //             ],
// //         })
// //             .then(async (book) => {
// //                 if (!book) {
// //                     return res.status(404).send({ error: 'Can Not Find Your Book' });
// //                 }

// //                 return res.status(200).send(book);
// //             })
// //             .catch((err) => {
// //                 return res.status(500).send({ error: err.message });
// //             });
// //     } catch (err) {
// //         return res.status(500).send({ error: err.message });
// //     }
// // };

export const likeBook = async (req: Request, res: Response) => {
    try {
        const liked = await LikeBook.create({
            bookId: req.body.bookId,
            userId: req.body.userId,
        });
        if (liked) return res.status(201).send({ liked: true });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const likeReview = async (req: Request, res: Response) => {
    try {
        const liked = await LikeReview.create({
            reviewId: req.body.reviewId,
            userId: req.body.userId,
        });
        if (liked) return res.status(201).send({ liked: true });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const hideReview = async (req: Request, res: Response) => {
    try {
        const hided = await HideReview.create({
            reviewId: req.body.reviewId,
            userId: req.body.userId,
        });
        if (hided) return res.status(201).send({ hided: true });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
