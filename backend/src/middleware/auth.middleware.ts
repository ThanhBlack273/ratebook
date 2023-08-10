import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/auth.config';
import { NextFunction, Request, Response } from 'express';
//import db from "../models";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerHeader = req.headers.authorization;
        if (!bearerHeader || !bearerHeader.startsWith('Bearer')) {
            return res.status(403).send({
                error: 'No token provided!',
            });
        }
        const token = bearerHeader.split(' ')[1];

        jwt.verify(token, config.secret, (err, decoded: JwtPayload) => {
            if (err) {
                return res.status(401).send({
                    error: 'Unauthorized!',
                });
            }
            res.locals.id = decoded.id;
            next();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(403).send({
                error: 'No token provided!',
            });
        }

        jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded: JwtPayload) => {
            if (err) {
                return res.status(401).send({
                    error: 'Unauthorized!',
                });
            }
            res.locals.id = decoded.id;
            next();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const authJwt = {
    verifyToken: verifyToken,
    verifyRefreshToken: verifyRefreshToken,
};
export default authJwt;
