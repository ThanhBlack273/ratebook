import Validator from '../../helpers/validate';
import db from '../../models';
const Review = db.review;
const LikeBook = db.likebook;
const LikeReview = db.likereview;
const HideReview = db.hidereview;
import { Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';

const checkAddReview = (req: Request, res: Response, next: NextFunction) => {
    try {
        const rules = {
            rate: 'required|integer|min:1|max:5',
            content: 'required|string',
            // photoReview: 'array',
            userId: 'required|integer',
            bookId: 'required|integer',
        };

        const validation = new Validator(req.body, rules, {});
        validation.passes(() => next());
        validation.fails(async () => {
            const error = {};
            const errors = validation.errors.all();
            for (const err in errors) {
                error[err] = Array.prototype.join.call(errors[err], '. ');
            }
            res.status(422).send({
                error: error,
            });
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const checkExistReview = (req: Request, res: Response, next: NextFunction) => {
    try {
        Review.findOne({
            where: {
                [Op.and]: [
                    {
                        userId: req.body.userId,
                    },
                    {
                        bookId: req.body.bookId,
                    },
                ],
            },
        }).then((review) => {
            if (review) {
                res.status(200).send({
                    error: 'You have already reviewed this book',
                });
                return;
            }
            next();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const likeBookExist = (req: Request, res: Response, next: NextFunction) => {
    try {
        LikeBook.findOne({
            where: {
                bookId: req.body.bookId,
                userId: req.body.userId,
            },
        })
            .then((liked) => {
                if (liked) {
                    liked.destroy({ force: true });
                    return res.status(201).send({ liked: false });
                }
                next();
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
export const likeReviewExist = (req: Request, res: Response, next: NextFunction) => {
    try {
        LikeReview.findOne({
            where: {
                reviewId: req.body.reviewId,
                userId: req.body.userId,
            },
        })
            .then((liked) => {
                if (liked) {
                    liked.destroy({ force: true });
                    return res.status(201).send({ liked: false });
                }
                next();
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
export const hideReviewExist = (req: Request, res: Response, next: NextFunction) => {
    try {
        HideReview.findOne({
            where: {
                reviewId: req.body.reviewId,
                userId: req.body.userId,
            },
        })
            .then((hided) => {
                if (hided) {
                    hided.destroy({ force: true });
                    return res.status(201).send({ hided: false });
                }
                next();
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
// export const checkDeleteReviewExist = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         LikeReview.findOne({
//             where: {
//                 reviewId: req.body.reviewId,
//                 userId: req.body.userId,
//             },
//         })
//             .then((liked) => {
//                 if (liked) {
//                     liked.destroy({ force: true });
//                     return res.status(201).send({ liked: false });
//                 }
//                 next();
//             })
//             .catch((err) => {
//                 return res.status(500).send({ error: err.message });
//             });
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// };
const validate = {
    checkAddReview: checkAddReview,
    checkExistReview: checkExistReview,
    checkLikeBookExist: likeBookExist,
    checkLikeReviewExist: likeReviewExist,
    checkHideReviewExist: hideReviewExist,
    // checkDeleteReviewExist: checkDeleteReviewExist,
};
export default validate;
