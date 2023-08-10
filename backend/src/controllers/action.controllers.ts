import db from '../models';
import { Op } from 'sequelize';

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
export const addReview = (req, res) => {
    try {
        Review.create({
            bookId: req.body.bookId,
            userId: req.id,
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
export const updateReview = (req, res) => {
    try {
        req.review
            .update({
                rate: req.body.rate,
                content: req.body.content,
                photoReview: req.body.photoReview,
            })
            .then((review) => {
                return res.status(201).send(review);
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// export const getAllReviewOld = (req, res) => {
//     try {
//         const limit = 10;
//         const page = req.query.page ? req.query.page - 1 : 0;
//         const offset = page * limit;
//         Review.findAndCountAll({
//             attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId', 'updatedAt'],
//             include: [
//                 {
//                     model: Book,
//                     as: 'book',
//                     attributes: ['id', 'title', 'subtitle', 'author', 'smallThumbnail', 'thumbnail', 'updatedAt'],
//                 },
//                 {
//                     model: User,
//                     as: 'user',
//                     attributes: ['id', 'userName', 'avatar'],
//                 },
//             ],
//             order: [['updatedAt', 'DESC']],
//             limit,
//             offset,
//         })
//             .then(async (review) => {
//                 const response = await getPagingData(review, page + 1, limit);
//                 res.status(201).send({
//                     totalBooks: response.totalDatas,
//                     totalPages: response.totalPages,
//                     currentPage: response.currentPage,
//                     reviews: response.datas,
//                 });
//             })
//             .catch((err) => {
//                 res.status(500).send({ error: err.message });
//             });
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// };

// export const getAllReview2 = (req, res) => {
//     try {
//         const limit = 10;
//         const page = req.query.page ? req.query.page - 1 : 0;
//         const offset = page * limit;
//         Review.findAndCountAll({
//             attributes: ['id', 'userId', 'bookId'],
//             include: [
//                 {
//                     model: Book,
//                     as: 'book',
//                     attributes: ['id'],
//                 },
//                 {
//                     model: User,
//                     as: 'user',
//                     attributes: ['id'],
//                 },
//                 {
//                     model: HideReview,
//                     as: 'hidedReviewListUser',
//                     attributes: ['id', 'userId', 'reviewId'],
//                     where: {
//                         [Op.or]: [
//                             {
//                                 $hidedReviewListUser$: {
//                                     [Op.eq]: null,
//                                 },
//                             },
//                             {
//                                 '$hidedReviewListUser.userId$': {
//                                     [Op.ne]: req.id,
//                                 },
//                             },
//                         ],
//                     },
//                     required: false,
//                     duplicating: false,
//                 },
//             ],
//             order: [['updatedAt', 'DESC']],
//             limit,
//             offset,
//         })
//             .then(async (review) => {
//                 const response = await getPagingData(review, page + 1, limit);
//                 res.status(201).send({
//                     totalReviews: response.totalDatas,
//                     totalPages: response.totalPages,
//                     currentPage: response.currentPage,
//                     reviews: response.datas,
//                 });
//             })
//             .catch((err) => {
//                 res.status(500).send({ error: err.message });
//             });
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// };

export const getAllReview = async (req, res) => {
    try {
        const limit = 10;
        const page = req.query.page ? req.query.page - 1 : 0;
        const offset = page * limit;

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
        const arrayReview = await listHide.hidedReviewListReview.map((object) => object.reviewId);

        Review.findAndCountAll({
            as: 'review',
            where: {
                id: {
                    [Op.notIn]: arrayReview,
                },
                deleted: false,
            },
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
                {
                    model: LikeReview,
                    as: 'likedReviewListUser',
                    attributes: ['id', 'userId', 'reviewId'],
                    where: {
                        '$likedReviewListUser.userId$': req.id,
                        //'$likedReviewListUser.reviewId$': 4,
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
                    totalReviews: response.totalDatas,
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
export const getReviewById = (req, res) => {
    try {
        Review.findOne({
            where: {
                id: req.query.id,
                deleted: false,
            },
            attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId'],
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
                {
                    model: LikeReview,
                    as: 'likedReviewListUser',
                    attributes: ['id', 'userId', 'reviewId'],
                    where: {
                        '$likedReviewListUser.userId$': req.id,
                        //'$likedReviewListUser.reviewId$': 4,
                    },
                    required: false,
                    duplicating: false,
                },
            ],
        })
            .then(async (review) => {
                if (!review) {
                    return res.status(404).send({ error: 'Can Not Find Your Review' });
                }

                return res.status(200).send(review);
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
            });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};
export const likeBook = (req, res) => {
    try {
        LikeBook.create({
            bookId: req.params.bookId,
            userId: req.id,
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

export const likeReview = (req, res) => {
    try {
        LikeReview.create({
            reviewId: req.params.reviewId,
            userId: req.id,
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

export const hideReview = (req, res) => {
    try {
        HideReview.create({
            reviewId: req.params.reviewId,
            userId: req.id,
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

export const deleteReview = (req, res) => {
    console.log(req.params);
    try {
        req.review
            .update({
                deleted: true,
            })
            .then(() => {
                return res.status(201).send({});
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
