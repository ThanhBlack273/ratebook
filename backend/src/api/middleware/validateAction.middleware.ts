import Validator from '../../helpers/validate';

import { Review, LikeBook, HideReview, LikeReview } from '../../models';

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
            return res.status(422).send({
                error: error,
            });
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const checkExistReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await Review.findOne({
            where: {
                userId: req.body.userId,
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
                bookId: req.body.bookId,
                userId: req.body.userId,
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
                reviewId: req.body.reviewId,
                userId: req.body.userId,
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
                reviewId: req.body.reviewId,
                userId: req.body.userId,
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
