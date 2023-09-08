import { createToken, createRefreshToken } from '../../helpers/jwt';
import bcrypt from 'bcryptjs';
import cloudinary from '../../config/cloudinary.config';
import { Request, Response } from 'express';
import { User } from '../../models';
import { CreateUserDTO, SignInUserDTO, UpdateUserDTO } from '../interfaces/user.dto';
import sequelizeConnection from '../../config/db.config';
import { Sequelize, Transaction } from 'sequelize';

// import {} from 'multer';
// import config from '../../config/auth.config';
// import { UserInput, UserOutput } from '../../models/user.model';
// const refreshTokens = {};

export const signup = async (req: Request, res: Response) => {
    const t = await sequelizeConnection.transaction({
        // isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });

    try {
        const payload: CreateUserDTO = req.body;
        if (payload.password !== payload.passwordConfirm) {
            return res.status(401).send({
                error: 'Wrong Confirm Password!',
            });
        }

        const user = await User.create(
            {
                ...payload,
                password: bcrypt.hashSync(payload.password, 8),
            },
            { transaction: t },
        );
        if (!user) {
            await t.rollback();
            return res.status(500).send({ error: 'Sign up account failed' });
        }

        res.status(201).send({
            ...user.dataValues,
            password: undefined,
            secretAsk: undefined,
            secretAns: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            // deletedAt: undefined,
        });
        await t.commit();
        return;
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};

export const checkDuplicateEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (user) {
            return res.status(422).send({
                error: { email: 'Failed! Email is already in use!' },
            });
        }
        return res.status(200).send({});
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        console.log('hello');
        const payload: SignInUserDTO = req.body;

        const user = await User.findOne({
            where: {
                email: payload.email,
            },
        });

        if (!user) {
            return res.status(404).send({ error: 'User Not found.' });
        }
        console.log(user);
        if (!bcrypt.compareSync(payload.password, user.password)) {
            return res.status(401).send({ error: 'Invalid Password!' });
        }

        const userInfo = {
            ...user.dataValues,
            device: req.body.device,
            password: undefined,
            secretAsk: undefined,
            secretAns: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            // deletedAt: undefined,
        };

        const token = await createToken(userInfo.id);
        const refreshToken = await createRefreshToken(userInfo.id);

        //refreshTokens[refreshToken] = userInfo;

        user.update({
            device: req.body.device,
        });

        return res.status(200).send({
            accessToken: token,
            refreshToken: refreshToken,
            user: userInfo,
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const logout = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: res.locals.id } });
        if (!user) {
            return res.status(404).send({ error: 'User Not found.' });
        }
        user.update({ device: '' });
        return res.status(200).send({});
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken: string = req.body.refreshToken;
        // if (refreshToken in refreshTokens) {
        //     const token = await jwt.sign({ id: res.locals.id }, config.secret, {
        //         algorithm: 'HS256',
        //         allowInsecureKeySizes: true,
        //         expiresIn: config.tokenLife, // 5 mins
        //     });
        //     if (!token) {
        //         return res.status(403).json({
        //             error: 'Invalid Refresh Token',
        //         });
        //     }
        //     return res.status(200).send({
        //         accessToken: token,
        //         refreshToken: refreshToken,
        //     });
        // } else {
        //     return res.status(400).json({
        //         error: 'Invalid Request',
        //     });
        // }

        const token = await createToken(res.locals.id);

        if (!token) {
            return res.status(403).json({
                error: 'Invalid Refresh Token',
            });
        }
        return res.status(200).send({
            accessToken: token,
            refreshToken: refreshToken,
        });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    const t = await sequelizeConnection.transaction();
    try {
        const payload: UpdateUserDTO = req.body;
        if (payload.newPassword !== payload.confirmNewPassword) {
            return res.status(401).send({
                error: 'Wrong Confirm New Password!',
            });
        }
        const user = await User.findOne({
            where: {
                id: res.locals.id,
            },
        });

        if (!user) {
            return res.status(404).send({ error: { email: 'User Not Found.' } });
        }

        if (!bcrypt.compareSync(payload.password, user.password)) {
            return res.status(401).send({
                error: 'Invalid Password!',
            });
        }

        const updatedUser = await user.update(
            {
                password: bcrypt.hashSync(payload.newPassword, 8),
            },
            { transaction: t },
        );

        const token = await createToken(updatedUser.id);

        res.status(200).send({
            accessToken: token,
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                userName: updatedUser.userName,
                dateOfBirth: updatedUser.dateOfBirth,
                phoneNumber: updatedUser.phoneNumber,
                avatar: updatedUser.avatar,
            },
        });
        await t.commit();
        return;
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};

export const changeInfoUser = async (req: Request, res: Response) => {
    const t = await sequelizeConnection.transaction();
    try {
        const payload: UpdateUserDTO = req.body;
        const user = await User.findOne({
            where: {
                id: res.locals.id,
            },
        });
        if (!user) {
            return res.status(404).send({ error: 'User Not Found.' });
        }

        if (payload.avatar !== '') {
            const lastAvatar = user.avatar.toString();

            const newUser = await user.update(
                {
                    userName: payload.userName,
                    dateOfBirth: payload.dateOfBirth,
                    phoneNumber: payload.phoneNumber,
                    avatar: payload.avatar,
                },
                { transaction: t },
            );
            cloudinary.uploader.destroy(lastAvatar?.split('/').pop().split('.').shift());

            const token = await createToken(newUser.id);

            res.status(200).send({
                accessToken: token,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    userName: newUser.userName,
                    dateOfBirth: newUser.dateOfBirth,
                    phoneNumber: newUser.phoneNumber,
                    avatar: newUser.avatar,
                    device: newUser.device,
                },
            });
            await t.commit();
            return;
        } else {
            const avatar = user.avatar;
            const newUser = await user.update(
                {
                    userName: payload.userName,
                    dateOfBirth: payload.dateOfBirth,
                    phoneNumber: payload.phoneNumber,
                    avatar: avatar,
                },
                { transaction: t },
            );

            const token = await createToken(newUser.id);

            res.status(200).send({
                accessToken: token,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    userName: newUser.userName,
                    dateOfBirth: newUser.dateOfBirth,
                    phoneNumber: newUser.phoneNumber,
                    avatar: newUser.avatar,
                },
            });
            await t.commit();
            return;
        }
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const payload: UpdateUserDTO = req.body;
        const user = await User.findOne({
            where: {
                email: payload.email,
            },
        });
        if (!user) {
            return res.status(404).send({ error: 'User Not Found.' });
        }
        if (
            payload.secretAsk.trim().toLowerCase() !== user.secretAsk.trim().toLowerCase() ||
            payload.secretAns.trim().toLowerCase() !== user.secretAns.trim().toLowerCase()
        ) {
            return res.status(401).send({
                error: 'Wrong Answer Secret!',
            });
        }

        const token = await createToken(user.id);

        return res.status(200).send({ token: token });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const t = await sequelizeConnection.transaction();
    try {
        const payload: UpdateUserDTO = req.body;
        const user = await User.findOne({
            where: {
                id: res.locals.id,
            },
        });
        if (!user) {
            return res.status(404).send({ error: { email: 'User Not Found.' } });
        }

        if (payload.newPassword !== payload.confirmNewPassword) {
            return res.status(401).send({
                error: 'Wrong Confirm New Password!',
            });
        }

        user.update(
            {
                password: bcrypt.hashSync(payload.newPassword, 8),
            },
            { transaction: t },
        ).then(async () => {
            res.status(200).send({});
            await t.commit();
            return;
        });
    } catch (err) {
        await t.rollback();
        return res.status(500).send({ error: err.message });
    }
};
