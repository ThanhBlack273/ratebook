import { describe, expect } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import { Response } from 'express';
// import User from '../../../models/user.model';
import { request, mockRequest, mockResponse } from '../../helpers';
import * as authUser from '../../../api/controllers/auth.controllers';
import { sequelizeMock } from 'sequelize-mock';

// jest.mock('../../../api/controllers/auth.controllers');

// jest.mock('../../../models/user.model', () => {
//     User: jest.fn();
// });

// const mockFindUser = jest.spyOn(User, 'findOne');

// const mockUserSignin = jest.spyOn(User, 'findOne');

const outFindUser = {
    id: 1,
    email: 'bao01@gmail.com',
    userName: 'bao',
    dateOfBirth: '2023-08-03T09:14:24.139Z',
    phoneNumber: '0355736772',
    avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
};

const newOutFindUser = {
    dataValues: {
        id: 1,
        email: 'bao01@gmail.com',
        password: '$2a$08$KV6AFjAPUHsFkkaljWv4Fub8Cf8zyTx9MiqZ1lYXAqcjUPIFtm4Qu',
        userName: 'I Show Speed',
        dateOfBirth: '2023-08-17T08:56:06.722Z',
        phoneNumber: '0392747972',
        secretAsk: 'What is your mother name',
        secretAns: 'Speed father',
        avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
        device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
        createdAt: '2023-08-17T09:03:20.834Z',
        updatedAt: '2023-08-17T09:03:20.834Z',
    },
    _previousDataValues: {
        id: 1,
        email: 'bao01@gmail.com',
        password: '$2a$08$KV6AFjAPUHsFkkaljWv4Fub8Cf8zyTx9MiqZ1lYXAqcjUPIFtm4Qu',
        userName: 'I Show Speed',
        dateOfBirth: '2023-08-17T08:56:06.722Z',
        phoneNumber: '0392747972',
        secretAsk: 'What is your mother name',
        secretAns: 'Speed father',
        avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
        device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
        createdAt: '2023-08-17T09:03:20.834Z',
        updatedAt: '2023-08-17T09:03:20.834Z',
    },
    uniqno: 1,
    _options: {
        isNewRecord: false,
        _schema: null,
        _schemaDelimiter: '',
        raw: true,
        attributes: [
            'id',
            'email',
            'password',
            'userName',
            'dateOfBirth',
            'phoneNumber',
            'secretAsk',
            'secretAns',
            'avatar',
            'device',
            'createdAt',
            'updatedAt',
        ],
    },
    isNewRecord: false,
};

// const UserMock = dbMock.define('user', {
//     id: 1,
//     email: 'bao01@gmail.com',
//     userName: 'bao',
//     dateOfBirth: '2023-08-03T09:14:24.139Z',
//     phoneNumber: '0355736772',
//     avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
// });
// jest.mock('../../../models/user.model.ts', () => {
//     UserMock.$queryInterface.$useHandler((query, queryOptions) => {
//         if (query === 'findAndCountAll') {
//             return { count: 2, rows: [UserMock.build({ id: 1 }), UserMock.build({ id: 2 })] };
//         } else if (query === 'findOne') {
//             return UserMock.build({ id: queryOptions[0].where.id });
//         }
//     });
//     return UserMock;

//     // eslint-disable-next-line no-unused-labels
//     // findAll: jest.fn().mockReturnValueOnce({ outFindUser });
// });

// const dbTeardown = async () => {
//     await User.sync({ force: true });
// };
const inSignup = {
    email: 'bao01@gmail.com',
    password: 'Mn12345678',
    passwordConfirm: 'Mn12345678',
    userName: 'bao',
    dateOfBirth: '2023-08-03T09:14:24.139Z',
    phoneNumber: '0355736772',
    secretAsk: 'What is your mother name',
    secretAns: 'Speed father',
    avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
};

const inSignin = {
    email: 'bao05',
    password: 'Mn12345678',
    device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
};

const outSignup = {
    id: 1,
    email: 'bao01@gmail.com',
    userName: 'bao',
    dateOfBirth: '2023-08-03T09:14:24.139Z',
    phoneNumber: '0355736772',
    avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
    device: null,
};

const outSignin = {
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

describe('Auth routes', () => {
    // beforeEach(async () => {
    //     await dbTeardown();
    //     await request.post('/api/auth/signup').send(inSignup);
    // });

    // afterEach(async () => {
    //     await dbTeardown();
    // });

    describe('Test sever', () => {
        it('It should respond to the GET method', async () => {
            const res = await request.get('/');

            expect(res.statusCode).toBe(200);
        });
    });

    describe('Sign In', () => {
        it('should return signin user', async () => {
            // // const createSigninMock = jest
            // //     .spyOn(UserAuth, 'signin')
            // //     // @ts-ignore
            // //     .mockReturnValueOnce({ outSignin, isFetching: false });
            // // console.log(createSigninMock);
            // // const { body, statusCode } = await request.post(`/api/auth/signin`).send(inSignin);
            // // console.log(body);
            // // expect(statusCode).toBe(200);
            // // expect(createSigninMock).toHaveBeenCalledWith(inSignin);

            // // const req = mockRequest();

            // const req = httpMocks.createRequest();
            // const res = httpMocks.createResponse();

            // req.body = inSignin;

            // const mockUserSigninPayload = jest.fn(async (req, res) => {
            //     return res.status(203).send(outSignin);
            // });
            // mockUserSignin.mockImplementation(mockUserSigninPayload);

            // await authUser.signin(req, res);
            // expect(mockUserSignin).toHaveBeenCalledTimes(1);
            // expect(res.statusCode).toEqual(201);

            // // expect(res.send).toHaveBeenCalledTimes(1);
            // // expect(res.send.mock.calls.length).toBe(1);
            // // expect(res.send).toHaveBeenCalledWith(outSignin);

            // // expect(res.status).toHaveBeenCalledWith(200);
            // // expect(res.json).toHaveBeenCalledWith(outSignin);

            // // expect(res).toHaveBeenCalledWith(mockUserSigninPayload);

            // // expect(res.status).toHaveBeenCalledWith(200);

            // // expect(mockUserSignin).toHaveBeenCalledWith(outSignin);
            // // expect(res._getJSONData().email).toEqual('bao01@gmail.com');

            // // console.log(res._getJSONData().email);
            // // console.log(res.);

            // // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({}));

            // // expect(createSigninMock).toHaveBeenCalledWith(inSignin);

            const dbMock = sequelizeMock;
            dbMock.define(
                'user',
                {
                    name: 'Test User',
                    email: 'test@example.com',
                    joined: new Date(),
                },
                // {
                //     instanceMethods: {
                //         tenure: function () {
                //             return Date.now() - this.get('joined');
                //         },
                //     },
                // },
            );
            dbMock.findOne.returns(newOutFindUser);

            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();

            //  const req = { body: inSignin };
            // const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            req.body = inSignin;

            // const mockOutFindUser = jest.fn(async () => {
            //     return outFindUser;
            // });
            // mockFindUser.mockImplementation(newOutFindUser);

            await authUser.signin(req, res);
            // expect(mockUserSignin).toHaveBeenCalledTimes(1);
            expect(res.statusCode).toEqual(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(outSignin));
        });
    });
});
