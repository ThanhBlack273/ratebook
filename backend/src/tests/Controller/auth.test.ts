// Import Sequelize and your model
import User from '../../models/user.model';
import { checkDuplicateEmail, logout, refreshToken, signin, signup } from '../../api/controllers/auth.controllers';
import httpMocks from 'node-mocks-http';
import JWT from '../../helpers/jwt';
const outTokens = {
    accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk0NzY0MjMzLCJleHAiOjguNjRlKzMxfQ.N8V4Rl-67ErBu_QXh7ADl4QCQr43qcOvkgN3t80_qeY',
    refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk0NzY0MjMzLCJleHAiOjguNjRlKzMxfQ.T1Cqq7t_M7sSc_7D3DUsDR1xANYdZVZJDdhq3NNA2Hw',
};
const outFindOne = {
    id: 1,
    email: 'bao01@gmail.com',
    password: '$2a$08$Q6RWGmkge4n9yoo2L92aRuVZbT7frPEeJ1v6RU6yHPuWRVOKi4n7G',
    userName: 'bao',
    dateOfBirth: '2023-08-03T09:14:24.139Z',
    phoneNumber: '0355736772',
    secretAsk: 'What is your mother name',
    secretAns: 'Speed father',
    avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
    device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
    createdAt: '2023-09-11T06:44:00.031Z',
    updatedAt: '2023-09-11T06:44:03.856Z',
};
const inSignin = {
    email: 'bao01@gmail.com',
    password: 'Mn12345678',
    device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
};

const outSignin = {
    ...outTokens,
    user: {
        createdAt: undefined,
        device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
        password: undefined,
        secretAns: undefined,
        secretAsk: undefined,
        updatedAt: undefined,
    },
};

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
const outCreate = {
    id: 1,
    email: 'bao01@gmail.com',
    password: '$2a$08$pS5J0NfDTPcmlOAWAdPJsuBD0mM6oaxD.YuQnwfj7.L2UR3kJNd9a',
    userName: 'bao',
    dateOfBirth: '2023-08-03T09:14:24.139Z',
    phoneNumber: '0355736772',
    secretAsk: 'What is your mother name',
    secretAns: 'Speed father',
    avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
    updatedAt: '2023-09-13T08:55:52.753Z',
    createdAt: '2023-09-13T08:55:52.753Z',
    device: null,
};
const outSignup = {
    id: 1,
    email: 'bao01@gmail.com',
    userName: 'bao',
    dateOfBirth: '2023-08-03T09:14:24.139Z',
    phoneNumber: '0355736772',
    avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
    device: null,
    createdAt: undefined,
    password: undefined,
    secretAns: undefined,
    secretAsk: undefined,
    updatedAt: undefined,
};

// Mock the User model
jest.mock('../../models/user.model', () => ({}));

// const mockCreateToken = jest.fn();
// const mockCreateRefreshToken = jest.fn();
// jest.mock('../../helpers/jwt', () => {
//     return {
//         createToken: mockCreateToken,
//         createRefreshToken: mockCreateRefreshToken,
//     };
// });
//  jest.mock('../../helpers/jwt', () => {
//      createToken: jest.fn().mockReturnValueOnce(
//          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk0NzY0MjMzLCJleHAiOjguNjRlKzMxfQ.N8V4Rl-67ErBu_QXh7ADl4QCQr43qcOvkgN3t80_qeY',
//      );
//      createRefreshToken: jest.fn().mockReturnValueOnce(
//          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk0NzY0MjMzLCJleHAiOjguNjRlKzMxfQ.T1Cqq7t_M7sSc_7D3DUsDR1xANYdZVZJDdhq3NNA2Hw',
//      );
//  });

describe('Auth controller', () => {
    describe('signup', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            User.create = jest.fn().mockReturnValue(
                Promise.resolve({
                    ...outCreate,
                }),
            );
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        describe('check Duplicates Email', () => {
            beforeEach(() => {
                jest.clearAllMocks();
                User.findOne = jest.fn().mockReturnValue(
                    Promise.resolve({
                        ...outCreate,
                    }),
                );
            });
            afterEach(() => {
                jest.clearAllMocks();
            });
            it('should return fail beacause Email is already in use', async () => {
                // Arrange
                const req = httpMocks.createRequest();
                const res = httpMocks.createResponse();
                req.body = inSignup;
                // Act
                await checkDuplicateEmail(req, res);
                expect(res.statusCode).toEqual(422);
                expect(res._getData()).toEqual({
                    error: {
                        email: 'Failed! Email is already in use!',
                    },
                });
            });
            it('should return success', async () => {
                jest.clearAllMocks();
                User.findOne = jest.fn().mockReturnValue(null);
                // Arrange
                const req = httpMocks.createRequest();
                const res = httpMocks.createResponse();
                req.body = inSignup;
                // Act
                await checkDuplicateEmail(req, res);
                expect(res.statusCode).toEqual(200);
                expect(res._getData()).toEqual({});
            });
        });
        test('should return signup success', async () => {
            // Arrange
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            req.body = inSignup;
            // Act
            await signup(req, res);
            expect(res.statusCode).toEqual(201);
            // expect(res._getData()).toEqual(outSignup);
        });
        test('should return signup fail', async () => {
            jest.clearAllMocks();
            User.create = jest.fn().mockReturnValue(null);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            req.body = inSignup;
            await signup(req, res);
            expect(res.statusCode).toEqual(500);
            expect(res._getData()).toEqual({ error: 'Sign up account failed' });
        });
        test('should return signup fail becasuse wrong confirm password', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            req.body = {
                ...inSignup,
                passwordConfirm: 'wrong password',
            };
            await signup(req, res);
            expect(res.statusCode).toEqual(401);
            expect(res._getData()).toEqual({ error: 'Wrong Confirm Password!' });
        });
    });

    describe('signin', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            User.findOne = jest.fn().mockReturnValue(
                Promise.resolve({
                    ...outFindOne,
                    update: jest.fn().mockResolvedValue(outFindOne),
                }),
            );
        });
        afterEach(() => {
            jest.clearAllMocks();
        });

        test('should return signin success', async () => {
            // Arrange
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            req.body = inSignin;
            // Act
            await signin(req, res);
            expect(res.statusCode).toEqual(200);
            // expect(res._getData()).toEqual(outSignin);
        });
        test('should return signin fail becasuse user Not found', async () => {
            jest.clearAllMocks();
            User.findOne = jest.fn().mockReturnValue(null);

            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            req.body = {
                ...inSignin,
                email: 'wrong@email.com',
                // password: 'wrong password',
            };
            await signin(req, res);
            expect(res.statusCode).toEqual(404);
            expect(res._getData()).toEqual({
                error: 'User Not found.',
            });
        });
        test('should return signin fail becasuse wrong password', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            req.body = {
                ...inSignin,
                password: 'wrong password',
            };
            await signin(req, res);
            expect(res.statusCode).toEqual(401);
            expect(res._getData()).toEqual({
                error: 'Invalid Password!',
            });
        });
    });

    describe('Logout', () => {
        test('should return logout success', async () => {
            jest.clearAllMocks();
            User.findOne = jest.fn().mockReturnValue(
                Promise.resolve({
                    ...outFindOne,
                    update: jest.fn().mockResolvedValue({ ...outFindOne, device: '' }),
                }),
            );
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            res.locals = {
                id: 1,
            };
            await logout(req, res);
            expect(res.statusCode).toEqual(200);
        });
        test('should return logout fail because user not found', async () => {
            jest.clearAllMocks();
            User.findOne = jest.fn().mockReturnValue(null);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            res.locals = {
                id: 1,
            };
            await logout(req, res);
            expect(res.statusCode).toEqual(404);
        });
    });

    jest.mock('../../helpers/jwt', () => ({}));
    describe('Refresh Token', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            JWT.createToken = jest
                .fn()
                .mockReturnValue(
                    Promise.resolve(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk0NzY0MjMzLCJleHAiOjguNjRlKzMxfQ.N8V4Rl-67ErBu_QXh7ADl4QCQr43qcOvkgN3t80_qeY',
                    ),
                );
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        test('should return new token', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            res.locals = {
                id: 1,
            };
            await refreshToken(req, res);
            expect(res.statusCode).toEqual(200);
        });
        test('should return fail because invalid refresh token', async () => {
            jest.clearAllMocks();
            JWT.createToken = jest.fn().mockReturnValue(Promise.resolve(null));
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            res.locals = {
                id: 1,
            };
            await refreshToken(req, res);
            expect(res.statusCode).toEqual(403);
        });
    });
});
