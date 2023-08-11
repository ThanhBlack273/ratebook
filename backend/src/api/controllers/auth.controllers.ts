import db from '../../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config/auth.config';
import cloudinary from '../../config/cloudinary.config';
import { NextFunction, Request, Response } from 'express';
import {} from 'multer';

const User = db.user;
const refreshTokens = {};
interface RequestMulter extends Request {
    file: Express.Multer.File;
}
export const signup = async (req: RequestMulter, res: Response) => {
    try {
        if (req.body.password !== req.body.passwordConfirm) {
            return res.status(401).send({
                error: 'Wrong Confirm Password!',
            });
        }

        const upImg = await cloudinary.uploader.upload(req.file.path);

        User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            userName: req.body.userName,
            dateOfBirth: req.body.dateOfBirth,
            phoneNumber: req.body.phoneNumber,
            secretAsk: req.body.secretAsk,
            secretAns: req.body.secretAns,
            avatar: upImg.url,
        })
            .then((user) => {
                res.status(201).send({
                    id: user.id,
                    email: user.email,
                    userName: user.userName,
                    dateOfBirth: user.dateOfBirth,
                    phoneNumber: user.phoneNumber,
                    avatar: user.avatar,
                });
            })
            .catch((err) => {
                cloudinary.uploader.destroy(upImg.public_id);
                res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const checkDuplicateEmail = (req: Request, res: Response) => {
    try {
        User.findOne({
            where: {
                email: req.body.email,
            },
        }).then((user) => {
            if (user) {
                res.status(422).send({
                    error: { email: 'Failed! Email is already in use!' },
                });
                return;
            }
            res.status(200).send({});
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const signin = (req: Request, res: Response) => {
    try {
        User.findOne({
            where: {
                email: req.body.email,
            },
        })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ error: 'User Not found.' });
                }

                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(401).send({ error: 'Invalid Password!' });
                }

                const userInfo = {
                    id: user.id,
                    email: user.email,
                    userName: user.userName,
                    dateOfBirth: user.dateOfBirth,
                    phoneNumber: user.phoneNumber,
                    avatar: user.avatar,
                };
                const token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: config.tokenLife, // 5 mins
                });

                const refreshToken = jwt.sign({ id: user.id, email: user.email }, config.refreshTokenSecret, {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: config.refreshTokenLife, // 5 mins
                });

                refreshTokens[refreshToken] = userInfo;

                res.status(200).send({
                    accessToken: token,
                    refreshToken: refreshToken,
                    user: userInfo,
                });
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const refreshToken = (req: Request, res: Response) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (refreshToken in refreshTokens) {
            try {
                const token = jwt.sign({ id: res.locals.id }, config.secret, {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: config.tokenLife, // 5 mins
                });
                res.status(200).send({
                    accessToken: token,
                    refreshToken: refreshToken,
                });
            } catch (err) {
                console.error(err);
                res.status(403).json({
                    error: 'Invalid Refresh Token',
                });
            }
        } else {
            res.status(400).json({
                error: 'Invalid Request',
            });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const changePassword = (req: Request, res: Response) => {
    try {
        User.findOne({
            where: {
                id: res.locals.id,
            },
        })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ error: { email: 'User Not Found.' } });
                }

                if (req.body.newPassword !== req.body.confirmNewPassword) {
                    return res.status(401).send({
                        error: 'Wrong Confirm New Password!',
                    });
                }
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(401).send({
                        error: 'Invalid Password!',
                    });
                }

                user.update({
                    password: bcrypt.hashSync(req.body.password, 8),
                }).then((user) => {
                    const token = jwt.sign({ id: user.id }, config.secret, {
                        algorithm: 'HS256',
                        allowInsecureKeySizes: true,
                        expiresIn: config.tokenLife, // 5 mins
                    });

                    res.status(200).send({
                        accessToken: token,
                        user: {
                            id: user.id,
                            email: user.email,
                            userName: user.userName,
                            dateOfBirth: user.dateOfBirth,
                            phoneNumber: user.phoneNumber,
                            avatar: user.avatar,
                        },
                    });
                });
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const changeInfoUser = (req: Request, res: Response) => {
    try {
        User.findOne({
            where: {
                id: res.locals.id,
            },
        })
            .then(async (user) => {
                if (!user) {
                    return res.status(404).send({ error: 'User Not Found.' });
                }

                if (req.file !== undefined) {
                    const upImg = await cloudinary.uploader.upload(req.file.path);
                    const lastAvatar = user.avatar.toString();

                    const avatar = upImg.url;
                    user.update({
                        userName: req.body.userName,
                        dataOfBirth: req.body.dataOfBirth,
                        phoneNumber: req.body.phoneNumber,
                        avatar: avatar,
                    })
                        .then((newUser) => {
                            cloudinary.uploader.destroy(lastAvatar?.split('/').pop().split('.').shift());
                            const token = jwt.sign({ id: newUser.id }, config.secret, {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: config.tokenLife, // 5 mins
                            });

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
                        })
                        .catch((err) => {
                            cloudinary.uploader.destroy(upImg.public_id);
                            res.status(500).send({ error: err.message });
                        });
                } else {
                    const avatar = user.avatar;
                    user.update({
                        userName: req.body.userName,
                        dataOfBirth: req.body.dataOfBirth,
                        phoneNumber: req.body.phoneNumber,
                        avatar: avatar,
                    })
                        .then((newUser) => {
                            const token = jwt.sign({ id: newUser.id }, config.secret, {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: config.tokenLife, // 5 mins
                            });

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
                        })
                        .catch((err) => {
                            res.status(500).send({ error: err.message });
                        });
                }
            })

            .catch((err) => {
                res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const forgotPassword = (req: Request, res: Response) => {
    try {
        User.findOne({
            where: {
                email: req.body.email,
            },
        }).then((user) => {
            if (user) {
                if (
                    req.body.secretAsk.trim().toLowerCase() !== user.secretAsk.trim().toLowerCase() ||
                    req.body.secretAns.trim().toLowerCase() !== user.secretAns.trim().toLowerCase()
                ) {
                    res.status(401).send({
                        error: 'Wrong Answer Secret!',
                    });
                    return;
                }
                const token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: config.tokenLife, // 5 mins
                });

                res.status(200).send({ token: token });
            }
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const resetPassword = (req: Request, res: Response) => {
    try {
        User.findOne({
            where: {
                id: res.locals.id,
            },
        })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ error: { email: 'User Not Found.' } });
                }

                if (req.body.newPassword !== req.body.confirmNewPassword) {
                    return res.status(401).send({
                        error: 'Wrong Confirm New Password!',
                    });
                }

                user.update({
                    password: bcrypt.hashSync(req.body.newPassword, 8),
                }).then(() => {
                    res.status(200).send({});
                });
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
