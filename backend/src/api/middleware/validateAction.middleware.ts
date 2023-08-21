import Validator from '../../helpers/validate';

import { Review, LikeBook, HideReview, LikeReview } from '../../models';

import { NextFunction, Request, Response } from 'express';

const checkValidReview = (req, res, next) => {
    try {
        const rules = {
            rate: 'required|integer|min:1|max:5',
            content: 'required|string',
            photoReview: 'array',
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
            return res.status(422).send({
                error: error,
            });
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const checkUpdateReview = (req, res, next) => {
    try {
        const rules = {
            rate: 'required|integer|min:1|max:5',
            content: 'required|string',
            photoReview: 'array',
        };

        const validation = new Validator(req.body, rules, {});
        validation.passes(() => next());
        validation.fails(async () => {
            const error = {};
            const errors = validation.errors.all();
            for (const err in errors) {
                error[err] = Array.prototype.join.call(errors[err], '. ');
            }
            return res.status(422).send({
                error: error,
            });
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const checkOwnerReview = async (req, res, next) => {
    try {
        const review = await Review.findOne({
            where: {
                userId: res.locals.id,
                id: req.params.reviewId,
            },
        });
        if (!review) {
            return res.status(400).send({
                error: 'Your review is not existed',
            });
        }
        res.locals.review = review; //format code
        next();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// const checkAddReview = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const rules = {
//             rate: 'required|integer|min:1|max:5',
//             content: 'required|string',
//             // photoReview: 'array',
//             userId: 'required|integer',
//             bookId: 'required|integer',
//         };

//         const validation = new Validator(req.body, rules, {});
//         validation.passes(() => next());
//         validation.fails(async () => {
//             const error = {};
//             const errors = validation.errors.all();
//             for (const err in errors) {
//                 error[err] = Array.prototype.join.call(errors[err], '. ');
//             }
//             return res.status(422).send({
//                 error: error,
//             });
//         });
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// };

const checkExistReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await Review.findOne({
            where: {
                userId: res.locals.id,
                bookId: req.body.bookId,
            },
        });
        if (review) {
            return res.status(200).send({
                error: 'You have already reviewed this book',
            });
        }
        next();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const likeBookExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const liked = await LikeBook.findOne({
            where: {
                bookId: req.params.bookId,
                userId: res.locals.id,
            },
        });
        if (liked) {
            liked.destroy({ force: true });
            return res.status(201).send({ liked: false });
        }
        next();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
export const likeReviewExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const liked = await LikeReview.findOne({
            where: {
                reviewId: req.params.reviewId,
                userId: res.locals.id,
            },
        });
        if (liked) {
            liked.destroy({ force: true });
            return res.status(201).send({ liked: false });
        }
        next();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
export const hideReviewExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hided = await HideReview.findOne({
            where: {
                reviewId: req.params.reviewId,
                userId: res.locals.id,
            },
        });
        if (hided) {
            hided.destroy({ force: true });
            return res.status(201).send({ hided: false });
        }
        next();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
export const checkDeleteOwnerReview = async (req, res, next) => {
    try {
        const review = await Review.findOne({
            where: {
                id: req.params.reviewId,
                userId: res.locals.id,
            },
        });
        if (!review) {
            return res.status(404).send({ error: 'It is not your review' });
        }
        res.locals.review = review; //fomart code
        next();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
const validate = {
    checkValidReview: checkValidReview,
    checkUpdateReview: checkUpdateReview,
    checkOwnerReview: checkOwnerReview,
    // checkAddReview: checkAddReview,
    checkExistReview: checkExistReview,
    checkLikeBookExist: likeBookExist,
    checkLikeReviewExist: likeReviewExist,
    checkHideReviewExist: hideReviewExist,
    checkDeleteOwnerReview: checkDeleteOwnerReview,
    // checkDeleteReviewExist: checkDeleteReviewExist,
};
export default validate;
