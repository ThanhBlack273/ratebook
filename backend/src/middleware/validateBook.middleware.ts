import Validator from '../helpers/validate';
import { Op } from 'sequelize';
import db from '../models';
const Book = db.book;

const checkSubBook = (req, res, next) => {
    try {
        const rules = {
            ISBN_10: 'required|string|exist:book,ISBN_10',
            ISBN_13: 'required|string|exist:book,ISBN_13',
            title: 'string',
            subtitle: 'string',
            author: 'array',
            publisher: 'string',
            publishedDate: 'string',
            description: 'string',
            smallThumbnail: 'string',
            thumbnail: 'string',
            small: 'string',
            medium: 'string',
            large: 'string',
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

const checkExistBook = (req, res, next) => {
    //fomart code kiểm tra tham số trước khi chạy code
    try {
        Book.findOne({
            where: {
                [Op.or]: [
                    {
                        ISBN_10: req.query.ISBN_10,
                    },
                    {
                        ISBN_13: req.query.ISBN_13,
                    },
                ],
            },
        }).then((book) => {
            if (book) {
                res.status(400).send({
                    error: 'Your book existed',
                });
                return;
            }
            next();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const validate = {
    checkSubBook: checkSubBook,
    checkExistBook: checkExistBook,
};
export default validate;
