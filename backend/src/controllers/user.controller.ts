import db from '../models';
import { Op } from 'sequelize';

const Book = db.book;
const User = db.user;
const LikeBook = db.likebook;
const Review = db.review;
const HideReview = db.hidereview;
const LikeReview = db.likereview;

const getPagingData = (data, page, limit) => {
    const { count: totalDatas, rows: datas } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalDatas / limit);
    return { totalDatas, datas, totalPages, currentPage };
};

export const getUserById = (req, res) => {
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
export const getReviewList = async (req, res) => {
    try {
        const listHide = await User.findOne({
            where: {
                id: req.query.id, //fomart code
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

        const limit = 10;
        const page = req.query.page ? req.query.page - 1 : 0;
        const offset = page * limit;
        Review.findAndCountAll({
            where: {
                id: {
                    [Op.notIn]: arrayReviewHide,
                },
                userId: req.query.id,
                deleted: false,
            },
            attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId', 'updatedAt'],
            include: [
                {
                    model: Book,
                    as: 'book',
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
        })
            .then(async (review) => {
                const response = await getPagingData(review, page + 1, limit);
                res.status(200).send({
                    totalReview: response.totalDatas,
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

export const getBookSub = (req, res) => {
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
                res.status(200).send({
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

export const getLikedList = (req, res) => {
    try {
        const limit = 10;
        const page = req.query.page ? req.query.page - 1 : 0;
        const offset = page * limit;
        LikeBook.findAndCountAll({
            where: {
                userId: req.query.id,
            },
            attributes: ['id', 'userId', 'bookId'],
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
            .then(async (book) => {
                if (!book) {
                    return res.status(404).send({ error: 'Can Not Find Your Data' });
                }

                const response = await getPagingData(book, page + 1, limit);
                res.status(200).send({
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
        res.status(500).send({ error: err.message });
    }
};
