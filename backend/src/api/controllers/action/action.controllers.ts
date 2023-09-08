import { Request, Response } from 'express';
import { User, Book, Review, LikeBook, LikeReview, HideReview, Notification } from '../../../models';
import { CreateReviewDTO, UpdateReviewDTO } from '../../interfaces/review.dto';
import { Op } from 'sequelize';
import { CreateNotificationDTO } from '../../interfaces/notification.dto';
import { getPagingData } from '../../../helpers/paging';
import * as mapper from './mapper';
import sequelizeConnection from '../../../config/db.config';

//import { Op } from 'sequelize';

export const addReview = async (req: Request, res: Response) => {
    const t = await sequelizeConnection.transaction();
    try {
        const payload: CreateReviewDTO = req.body;
        const review = await Review.create(
            {
                bookId: payload.bookId,
                userId: res.locals.id,
                rate: payload.rate,
                content: payload.content,
                photoReview: payload.photoReview,
            },
            { transaction: t },
        );
        if (!review) {
            await t.rollback();
            return res.status(400).send({ error: "can't create review" });
        }
        res.status(201).send(review);
        await t.commit();
        return;
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};

//format code
export const updateReview = async (req, res) => {
    const t = await sequelizeConnection.transaction();
    try {
        const payload: UpdateReviewDTO = req.body;
        const review = await res.locals.review.update(
            {
                rate: payload.rate,
                content: payload.content,
                photoReview: payload.photoReview,
            },
            { transaction: t },
        );
        if (review) {
            res.status(201).send(review);
            await t.commit();
            return;
        }
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};

export const getAllReview = async (req: Request, res: Response) => {
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
        const arrayReview = await listHide.hidedReviewListReview.map((object) => object.reviewId);

        const review = await Review.findAndCountAll({
            // as: 'review',
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
                    as: 'Book',
                    attributes: ['id', 'title', 'subtitle', 'author', 'smallThumbnail', 'thumbnail', 'updatedAt'],
                },
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'userName', 'avatar', 'device'],
                },
                {
                    model: LikeReview,
                    as: 'likedReviewListUser',
                    attributes: ['id', 'userId', 'reviewId'],
                    where: {
                        '$likedReviewListUser.userId$': res.locals.id,
                        //'$likedReviewListUser.reviewId$': 4,
                    },
                    required: false,
                    duplicating: false,
                },
            ],
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        // if (review.rows.length == 0) return res.status(404).send({ error: 'Do not have any review' });
        if (review.rows.length == 0) return res.status(200).send({});
        const response = await getPagingData(review, page + 1, limit);
        // const newData = await response.datas.map(mapper.toGetAllReview);
        return res.status(200).send({
            totalBooks: response.totalDatas,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            reviews: response.datas.map(mapper.toGetAllReview),
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// export const getReviewById = async (req, res) => {
//     try {
//         const review = await Review.findOne({
//             where: {
//                 id: req.query.id,
//                 deleted: false,
//             },
//             attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId'],
//             include: [
//                 {
//                     model: Book,
//                     as: 'Book',
//                     attributes: ['id', 'title', 'subtitle', 'author', 'smallThumbnail', 'thumbnail', 'updatedAt'],
//                 },
//                 {
//                     model: User,
//                     as: 'User',
//                     attributes: ['id', 'userName', 'avatar', 'device'],
//                 },
//                 {
//                     model: LikeReview,
//                     as: 'likedReviewListUser',
//                     attributes: ['id', 'userId', 'reviewId'],
//                     where: {
//                         '$likedReviewListUser.userId$': res.locals.id,
//                         //'$likedReviewListUser.reviewId$': 4,
//                     },
//                     required: false,
//                     duplicating: false,
//                 },
//             ],
//         });
//         if (review) {
//             if (!review) {
//                 return res.status(404).send({ error: 'Can Not Find Your Review' });
//             }

//             return res.status(200).send(review);
//         }
//     } catch (err) {
//         return res.status(500).send({ error: err.message });
//     }
// };

export const likeBook = async (req: Request, res: Response) => {
    const t = await sequelizeConnection.transaction();
    try {
        const liked = await LikeBook.create(
            {
                bookId: Number(req.params.bookId),
                userId: res.locals.id,
            },
            { transaction: t },
        );
        if (liked) {
            res.status(201).send({ liked: true });
            await t.commit();
            return;
        }
        return res.status(201).send({ liked: true });
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};

export const likeReview = async (req: Request, res: Response) => {
    const t = await sequelizeConnection.transaction();
    try {
        const liked = await LikeReview.create(
            {
                reviewId: Number(req.params.reviewId),
                userId: res.locals.id,
            },
            { transaction: t },
        );
        if (liked) {
            res.status(201).send({ liked: true });
            await t.commit();
            return;
        }
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};

export const hideReview = async (req: Request, res: Response) => {
    const t = await sequelizeConnection.transaction();
    try {
        const hided = await HideReview.create(
            {
                reviewId: Number(req.params.reviewId),
                userId: res.locals.id,
            },
            { transaction: t },
        );
        if (hided) {
            res.status(201).send({ hided: true });
            await t.commit();
            return;
        }
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};
/////////////

export const deleteReview = async (req, res) => {
    const t = await sequelizeConnection.transaction();
    try {
        const review = await res.locals.review.update(
            {
                deleted: true,
            },
            { transaction: t },
        );
        if (review) {
            res.status(201).send({});
            await t.commit();
            return;
        }
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};

export const addNoti = async (req, res) => {
    const t = await sequelizeConnection.transaction();
    try {
        const payload: CreateNotificationDTO = req.body;
        const listToUserId = payload.toUserId;
        const newNoti = await Promise.all(
            listToUserId.map(async (toUserId) => {
                const noti = await Notification.create(
                    {
                        isSeen: payload.isSeen,
                        type: payload.type,
                        fromUserId: res.locals.id,
                        toUserId: toUserId,
                        reviewId: payload.reviewId,
                        bookId: payload.bookId,
                    },
                    { transaction: t },
                );
                return noti.dataValues;
            }),
        );
        if (!newNoti) {
            await t.rollback();
            return res.status(500).send({ error: 'Adding noti failed' });
        }
        res.status(201).send(newNoti);
        await t.commit();
        return;
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};

export const noti = async (req, res) => {
    try {
        const limit = 10;
        const page = req.query.page ? req.query.page - 1 : 0;
        const offset = page * limit;
        const noti = await Notification.findAndCountAll({
            where: { toUserId: res.locals.id },
            attributes: ['id', 'isSeen', 'type', 'toUserId', 'fromUserId', 'reviewId', 'bookId', 'createdAt'],
            include: [
                {
                    model: User,
                    // foreignKey: 'toUserId',
                    as: 'toUser',
                    attributes: ['id', 'userName', 'avatar', 'device'],
                },
                {
                    // foreignKey: 'fromUserId',

                    model: User,
                    as: 'fromUser',
                    attributes: ['id', 'userName', 'avatar', 'device'],
                },
                {
                    model: Book,
                    as: 'Book',
                    attributes: ['id', 'title', 'subtitle', 'author', 'smallThumbnail', 'thumbnail', 'updatedAt'],
                },
                {
                    model: Review,
                    as: 'Review',
                    attributes: ['id', 'rate', 'content', 'photoReview', 'countLike', 'userId', 'bookId', 'updatedAt'],
                },
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset,
        });
        // if (noti.rows.length == 0) {
        //     res.status(404).send({ error: 'Do not have any notification' });
        // }
        if (noti.rows.length == 0) return res.status(200).send({});
        const response = await getPagingData(noti, page + 1, limit);
        return res.status(200).send({
            totalNotis: response.totalDatas,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            notis: response.datas.map(mapper.toNoti),
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const seenNoti = async (req, res) => {
    const t = await sequelizeConnection.transaction();
    try {
        const noti = await Notification.findOne({
            where: {
                id: req.params.id,
                toUserId: res.locals.id,
            },
        });
        if (!noti) return res.status(404).send({ error: 'Can not find your notification' });
        noti.update({ isSeen: true }, { transaction: t }).then(async (newNoti) => {
            await t.commit();
            return;
            return res.status(201).send(newNoti.isSeen);
        });
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};

export const findUserEmail = async (req, res) => {
    try {
        const limit = 5;
        const userList = await User.findAll({
            where: {
                [Op.or]: [
                    {
                        email: {
                            [Op.like]: `${req.query.search}%`,
                        },
                    },
                    {
                        userName: {
                            [Op.like]: `%${req.query.search}%`,
                        },
                    },
                ],
                id: { [Op.notIn]: [res.locals.id] },
            },
            attributes: ['id', 'email', 'userName', 'avatar', 'device'],
            limit,
        });
        if (!userList) return res.status(404).send({});
        return res.status(200).send(userList);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
