import Validator from '../../helpers/validate';
import { NextFunction, Request, Response } from 'express';

const checkSubBook = (req: Request, res: Response, next: NextFunction) => {
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

const checkExistBook = (req: Request, res: Response) => {
    try {
        const rules = {
            ISBN_10: 'required|string|exist:book,ISBN_10',
            ISBN_13: 'required|string|exist:book,ISBN_13',
        };

        const validation = new Validator(req.query, rules, {});
        validation.passes(() => {
            res.status(404).send({ error: 'You can subcribe your book' });
        });
        validation.fails(async () => {
            // const error = {};
            // const errors = validation.errors.all();
            // for (const err in errors) {
            //     error[err] = Array.prototype.join.call(errors[err], '. ');
            // }
            res.status(200).send({});
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
