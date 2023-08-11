import Validator from '../../helpers/validate';
import db from '../../models';
const User = db.user;

import { NextFunction, Request, Response } from 'express';

const checkSignup = (req: Request, res: Response, next: NextFunction) => {
    try {
        const rules = {
            email: 'required|string|email|exist:user,email',
            password: 'required|string|min:8|strictPassword',
            passwordConfirm: 'required|string|min:8|strictPassword',
            userName: 'required|string',
            dateOfBirth: 'required|string',
            phoneNumber: 'required|string|min:10|max:10|exist:user,phoneNumber',
            secretAsk: 'required|string',
            secretAns: 'required|string',
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

const checkChangeInfo = (req: Request, res: Response, next: NextFunction) => {
    try {
        const rules = {
            userName: 'required|string',
            dateOfBirth: 'required|string',
            phoneNumber: 'required|string|min:10|max:10|exist:user,phoneNumber',
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

const checkExistEmail = (req: Request, res: Response, next: NextFunction) => {
    try {
        User.findOne({
            where: {
                email: req.body.email,
            },
        }).then((user) => {
            if (!user) {
                res.status(422).send({
                    error: { email: "Can't find your email" },
                });
                return;
            }
            next();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const validateUser = {
    checkSignup: checkSignup,
    checkChangeInfo: checkChangeInfo,
    checkExistEmail: checkExistEmail,
};
export default validateUser;
