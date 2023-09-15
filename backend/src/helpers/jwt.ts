import jwt from 'jsonwebtoken';
import config from '../config/auth.config.json';

class JWT {
    static createToken = (id: number): string => {
        return jwt.sign({ id: id }, config.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: config.tokenLife, // 5 mins
        });
    };
    static createRefreshToken = (id: number) => {
        return jwt.sign({ id: id }, config.refreshTokenSecret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: config.refreshTokenLife, // 5 mins
        });
    };
}
export default JWT;

// export const createToken = (id: number) => {
//     return jwt.sign({ id: id }, config.secret, {
//         algorithm: 'HS256',
//         allowInsecureKeySizes: true,
//         expiresIn: config.tokenLife, // 5 mins
//     });
// };

// export const createRefreshToken = (id: number) => {
//     return jwt.sign({ id: id }, config.refreshTokenSecret, {
//         algorithm: 'HS256',
//         allowInsecureKeySizes: true,
//         expiresIn: config.refreshTokenLife, // 5 mins
//     });
// };
