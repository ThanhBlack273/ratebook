import jwt from 'jsonwebtoken';
import config from '../config/auth.config.json';

export const createToken = (id: number): string => {
    return jwt.sign({ id: id }, config.secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: config.tokenLife, // 5 mins
    });
};

export const createRefreshToken = (id: number): string => {
    return jwt.sign({ id: id }, config.refreshTokenSecret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: config.refreshTokenLife, // 5 mins
    });
};
