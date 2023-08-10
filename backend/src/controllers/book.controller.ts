import db from '../models';
import { Op } from 'sequelize';

const Book = db.book;
const User = db.user;
const Review = db.review;
const HideReview = db.hidereview;
const LikeReview = db.likereview;
const LikeBook = db.likebook;

export const subBook = (req, res) => {
    try {
        Book.create({
            userId: req.id, //fomart code
            ISBN_10: req.body.ISBN_10,
            ISBN_13: req.body.ISBN_13,
            title: req.body.title,
            subtitle: req.body.subtitle,
            author: req.body.author,
            publisher: req.body.publisher,
            publishedDate: req.body.publishedDate,
            description: req.body.description,
            smallThumbnail: req.body.smallThumbnail,
            thumbnail: req.body.thumbnail,
            small: req.body.small,
            medium: req.body.medium,
            large: req.body.large,
        })
            .then((book) => {
                res.status(201).send({
                    ISBN_10: book.ISBN_10,
                    ISBN_13: book.ISBN_13,
                    title: book.title,
                    subtitle: book.subtitle,
                    author: book.author,
                    publisher: book.publisher,
                    publishedDate: book.publishedDate,
                    description: book.description,
                    smallThumbnail: book.smallThumbnail,
                    thumbnail: book.thumbnail,
                    small: book.small,
                    medium: book.medium,
                    large: book.large,
                });
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
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

export const getAllBook = (req, res) => {
    try {
        const limit = 10;
        const page = req.query.page ? req.query.page - 1 : 0;
        const offset = page * limit;
        Book.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        })
            .then(async (book) => {
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
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
            });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

export const searchBook = (req, res) => {
    try {
        const limit = 10;
        const page = req.query.page ? req.query.page - 1 : 0;
        const offset = page * limit;
        Book.findAndCountAll({
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
        })
            .then(async (book) => {
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
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
            });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

export const getBookById = (req, res) => {
    try {
        Book.findOne({
            where: {
                id: req.params.id,
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
                {
                    model: LikeBook,
                    as: 'likedListUser',
                    attributes: ['id', 'bookId', 'userId'],
                    where: {
                        '$likedListUser.userId$': req.id,
                        //'$likedReviewListUser.reviewId$': 4,
                    },
                    required: false,
                    duplicating: false,
                },
            ],
        })
            .then(async (book) => {
                if (!book) {
                    return res.status(404).send({ error: 'Can Not Find Your Book' });
                }

                return res.status(200).send(book);
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
                id: req.id,
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
                bookId: req.params.bookId,
                deleted: false,
            },
            attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId', 'updatedAt'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'email', 'userName', 'avatar'],
                },
                {
                    model: LikeReview,
                    as: 'likedReviewListUser',
                    attributes: ['id', 'userId', 'reviewId'],
                    where: {
                        '$likedReviewListUser.userId$': req.id,
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
