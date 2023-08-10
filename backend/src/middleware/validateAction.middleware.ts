import Validator from '../helpers/validate';
import db from '../models';
const Review = db.review;
const LikeBook = db.likebook;
const LikeReview = db.likereview;
const HideReview = db.hidereview;

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
            res.status(422).send({
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
            res.status(422).send({
                error: error,
            });
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const checkOwnerReview = (req, res, next) => {
    try {
        Review.findOne({
            where: {
                userId: req.id,
                id: req.params.reviewId,
            },
        }).then((review) => {
            if (!review) {
                res.status(400).send({
                    error: 'Your review is not existed',
                });
                return;
            }
            req.review = review; //format code
            next();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const checkExistReview = (req, res, next) => {
    try {
        Review.findOne({
            where: {
                userId: req.id,
                bookId: req.body.bookId,
            },
        }).then((review) => {
            if (review) {
                res.status(400).send({
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

export const likeBookExist = (req, res, next) => {
    try {
        LikeBook.findOne({
            where: {
                bookId: req.params.bookId,
                userId: req.id,
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
export const likeReviewExist = (req, res, next) => {
    try {
        LikeReview.findOne({
            where: {
                reviewId: req.params.reviewId,
                userId: req.id,
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
export const hideReviewExist = (req, res, next) => {
    try {
        HideReview.findOne({
            where: {
                reviewId: req.params.reviewId,
                userId: req.id,
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
export const checkDeleteOwnerReview = (req, res, next) => {
    try {
        Review.findOne({
            where: {
                id: req.params.reviewId,
                userId: req.id,
            },
        })
            .then((review) => {
                if (!review) {
                    return res.status(404).send({ error: 'It is not your review' });
                }
                req.review = review; //fomart code
                next();
            })
            .catch((err) => {
                return res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
const validate = {
    checkValidReview: checkValidReview,
    checkUpdateReview: checkUpdateReview,
    checkOwnerReview: checkOwnerReview,
    checkExistReview: checkExistReview,
    checkLikeBookExist: likeBookExist,
    checkLikeReviewExist: likeReviewExist,
    checkHideReviewExist: hideReviewExist,
    checkDeleteOwnerReview: checkDeleteOwnerReview,
    // checkDeleteReviewExist: checkDeleteReviewExist,
};
export default validate;
