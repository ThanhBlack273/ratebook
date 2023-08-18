import Validator from '../../helpers/validate';
import { User } from '../../models';

import { NextFunction, Request, Response } from 'express';

const checkSignup = (req: Request, res: Response, next: NextFunction) => {
    try {
        const rules = {
            email: 'required|string|email|existUsers:User',
            password: 'required|string|min:8|strictPassword',
            passwordConfirm: 'required|string|min:8|strictPassword',
            userName: 'required|string',
            dateOfBirth: 'required|string',
            phoneNumber: 'required|string|min:10|max:10|existUsers:User',
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
            return res.status(422).send({
                error: error,
            });
        });
    } catch (err) {
        return res.status(500).send({ error: err.message });
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
            return res.status(422).send({
                error: error,
            });
        });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

const checkExistEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(422).send({
                error: { email: "Can't find your email" },
            });
        }
        next();
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
