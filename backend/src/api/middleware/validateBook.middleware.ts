import { Op } from 'sequelize';
import Validator from '../../helpers/validate';
import { NextFunction, Request, Response } from 'express';
import { Book } from '../../models';

const checkSubBook = (req: Request, res: Response, next: NextFunction) => {
    try {
        const rules = {
            ISBN_10: 'required|string|existBooks:Book',
            ISBN_13: 'required|string|existBooks:Book',
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

const checkExistBook = async (req: Request, res: Response) => {
    try {
        // const rules = {
        //     ISBN_10: 'required|string|existBooks:Book',
        //     ISBN_13: 'required|string|existBooks:Book',
        // };

        // const validation = new Validator(req.query, rules, {});
        // validation.passes(() => {
        //     res.status(404).send({ error: 'You can subcribe your book' });
        // });
        // validation.fails(async () => {
        //     // const error = {};
        //     // const errors = validation.errors.all();
        //     // for (const err in errors) {
        //     //     error[err] = Array.prototype.join.call(errors[err], '. ');
        //     // }
        //     res.status(200).send({});
        // });
        const book = await Book.findOne({
            where: {
                [Op.or]: [
                    {
                        ISBN_10: {
                            [Op.like]: `${req.query.ISBN_10}`,
                        },
                    },
                    {
                        ISBN_13: {
                            [Op.like]: `${req.query.ISBN_13}`,
                        },
                    },
                ],
            },
        });
        if (!book) {
            return res.status(404).send({ error: 'You can subcribe your book' });
        }
        return res.status(200).send(book);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

const validate = {
    checkSubBook: checkSubBook,
    checkExistBook: checkExistBook,
};
export default validate;
