// Import Sequelize and your model
import User from '../../models/user.model';
import { checkDuplicateEmail, signin, signup } from '../../api/controllers/auth.controllers';
import httpMocks from 'node-mocks-http';

// Mock the User model
jest.mock('../../models/user.model', () => ({}));

describe('Auth controller', () => {
    describe('signup', () => {
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
        beforeEach(() => {
            jest.clearAllMocks();
            User.create = jest.fn().mockReturnValue(
                Promise.resolve({
                    ...outCreate,
                    // update: jest.fn().mockResolvedValue(outFindOne),
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
        });
        test('should return signup fail', async () => {
            jest.clearAllMocks();
            User.create = jest.fn().mockReturnValue(null);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            req.body = inSignup;
            await signup(req, res);
            expect(res.statusCode).toEqual(500);
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
        });
    });

    describe('signin', () => {
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
        });
    });
});
