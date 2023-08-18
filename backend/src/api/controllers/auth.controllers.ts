import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config/auth.config';
import cloudinary from '../../config/cloudinary.config';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../models';
import { UserInput, UserOutput } from '../../models/user.model';
import { CreateUserDTO, SignInUserDTO, UpdateUserDTO } from '../dto/user.dto';
// import {} from 'multer';

const refreshTokens = {};

export const signup = async (req: Request, res: Response) => {
    try {
        const payload: CreateUserDTO = req.body;
        if (payload.password !== payload.passwordConfirm) {
            return res.status(401).send({
                error: 'Wrong Confirm Password!',
            });
        }

        // const upImg = await cloudinary.uploader.upload(req.file.path);

        const user = await User.create({
            ...payload,
            password: bcrypt.hashSync(payload.password, 8),
            // avatar: upImg.url,
        });

        if (!user) res.status(500).send({ error: 'Sign up account failed' });

        return res.status(201).send({
            ...user.dataValues,
            password: undefined,
            secretAsk: undefined,
            secretAns: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            deletedAt: undefined,
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// export const checkDuplicateEmail = (req: Request, res: Response) => {
//     try {
//         User.findOne({
//             where: {
//                 email: req.body.email,
//             },
//         }).then((user) => {
//             if (user) {
//                 res.status(422).send({
//                     error: { email: 'Failed! Email is already in use!' },
//                 });
//                 return;
//             }
//             res.status(200).send({});
//         });
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// };

export const signin = async (req: Request, res: Response) => {
    try {
        const payload: SignInUserDTO = req.body;

        const user = await User.findOne({
            where: {
                email: payload.email,
            },
        });

        if (!user) {
            return res.status(404).send({ error: 'User Not found.' });
        }

        if (!bcrypt.compareSync(payload.password, user.password)) {
            return res.status(401).send({ error: 'Invalid Password!' });
        }

        const userInfo = {
            ...user.dataValues,
            password: undefined,
            secretAsk: undefined,
            secretAns: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            deletedAt: undefined,
        };
        const token = await jwt.sign({ id: userInfo.id, email: userInfo.email }, config.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: config.tokenLife, // 5 mins
        });

        const refreshToken = await jwt.sign({ id: userInfo.id, email: userInfo.email }, config.refreshTokenSecret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: config.refreshTokenLife, // 5 mins
        });

        refreshTokens[refreshToken] = userInfo;

        return res.status(200).send({
            accessToken: token,
            refreshToken: refreshToken,
            user: userInfo,
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken: string = req.body.refreshToken;
        if (refreshToken in refreshTokens) {
            const token = await jwt.sign({ id: res.locals.id }, config.secret, {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: config.tokenLife, // 5 mins
            });
            if (!token) {
                return res.status(403).json({
                    error: 'Invalid Refresh Token',
                });
            }
            return res.status(200).send({
                accessToken: token,
                refreshToken: refreshToken,
            });
        } else {
            return res.status(400).json({
                error: 'Invalid Request',
            });
        }
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

export const changePassword = async (req: Request, res: Response) => {
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

        const updatedUser = await user.update({
            password: bcrypt.hashSync(payload.newPassword, 8),
        });
        const token = jwt.sign({ id: updatedUser.id }, config.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: config.tokenLife, // 5 mins
        });

        return res.status(200).send({
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
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const changeInfoUser = async (req: Request, res: Response) => {
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

            const newUser = await user.update({
                userName: payload.userName,
                dateOfBirth: payload.dateOfBirth,
                phoneNumber: payload.phoneNumber,
                avatar: payload.avatar,
            });
            cloudinary.uploader.destroy(lastAvatar?.split('/').pop().split('.').shift());
            const token = jwt.sign({ id: newUser.id }, config.secret, {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: config.tokenLife, // 5 mins
            });

            return res.status(200).send({
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
        } else {
            const avatar = user.avatar;
            const newUser = await user.update({
                userName: payload.userName,
                dateOfBirth: payload.dateOfBirth,
                phoneNumber: payload.phoneNumber,
                avatar: avatar,
            });
            const token = jwt.sign({ id: newUser.id }, config.secret, {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: config.tokenLife, // 5 mins
            });

            return res.status(200).send({
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
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
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
        const token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: config.tokenLife, // 5 mins
        });

        return res.status(200).send({ token: token });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
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

        user.update({
            password: bcrypt.hashSync(payload.newPassword, 8),
        }).then(() => {
            res.status(200).send({});
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
