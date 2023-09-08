const body = {
    id: 1,
    email: 'bao01@gmail.com',
    userName: 'bao',
    dateOfBirth: '2023-08-03T09:14:24.139Z',
    phoneNumber: '0355736772',
    avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
    device: null,
};

const userSignInPayload = {
    accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzOTcxNDI0LCJleHAiOjE2OTM5NzIwMjR9.kTo9qzNO8BAP0BJJlzvVjquUC_kl-1pX10RyVYR28kw',
    refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzOTcxNDI0LCJleHAiOjE2OTQwNTc4MjR9.ToJwmFYFuV-vZ4hyFuweGvvVFSfWPGT_m-fSMuzs6k0',
    user: {
        id: 1,
        email: 'bao01@gmail.com',
        userName: 'bao',
        dateOfBirth: '2023-08-03T09:14:24.139Z',
        phoneNumber: '0355736772',
        avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
        device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
    },
};

const req: any = {};
const res: any = {};

req.body = body;

res.send = jest.fn().mockReturnValue(userSignInPayload);
res.status = jest.fn().mockReturnValue(200);
res.json = jest.fn().mockReturnValue(userSignInPayload);

jest.mock('../../../models/user.model', () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    const UserMock = dbMock.define('user');
    UserMock.$queryInterface.$useHandler((query, queryOptions) => {
        if (query === 'findAndCountAll') {
            return { count: 2, rows: [UserMock.build({ id: 1 }), UserMock.build({ id: 2 })] };
        } else if (query === 'findOne') {
            return UserMock.build({ id: queryOptions[0].where.id });
        }
    });
    return UserMock;
});
