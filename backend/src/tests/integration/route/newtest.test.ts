// Import Sequelize and your model
import User from '../../../models/user.model';
import { signin } from '../../../api/controllers/auth.controllers';
import httpMocks from 'node-mocks-http';
// import { User, Book, Review, LikeBook, LikeReview, HideReview, Notification } from '../../../models';
// import { User } from '../../../models';

// Mock the User model
// jest.mock('../../../models', () => ({}));
jest.mock('../../../models/user.model', () => ({}));

const mUser = {
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

// Write your test
describe('signin controller', () => {
    beforeEach(() => {
        // User.mockClear();
        // User.hasMany = jest.fn();
        User.findOne = jest.fn().mockReturnValue(
            Promise.resolve({
                ...mUser,
                update: jest.fn().mockResolvedValue(mUser),
            }),
        );
    });

    it('should return user info if email exists', async () => {
        const inSignin = {
            email: 'bao012@gmail.com',
            password: 'Mn12345678',
            device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
        };
        // Arrange
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        req.body = inSignin;

        // Act
        await signin(req, res);

        // Assert
        // expect(res.status).toHaveBeenCalledWith(200);
        // expect(spyFindOne).toBeCalledWith({ where: { email: inSignin.email } });
        expect(res.statusCode).toEqual(200);
    });
});

// jest.mock('../../../models/user.model', () => {
//     // Get the real User model
//     const actualUser = jest.requireActual('../../../models/user.model');
//     // Create a mock user instance with some dummy data
//     const mUser = {
//         dataValues: {
//             id: 1,
//             email: 'bao01@gmail.com',
//             password: '$2a$08$Q6RWGmkge4n9yoo2L92aRuVZbT7frPEeJ1v6RU6yHPuWRVOKi4n7G',
//             userName: 'bao',
//             dateOfBirth: '2023-08-03T09:14:24.139Z',
//             phoneNumber: '0355736772',
//             secretAsk: 'What is your mother name',
//             secretAns: 'Speed father',
//             avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
//             device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
//             createdAt: '2023-09-11T06:44:00.031Z',
//             updatedAt: '2023-09-11T06:44:03.856Z',
//         },
//     };
//     // Mock the findOne method of the User model to return the mock user instance
//     actualUser.findOne = jest.fn().mockReturnValue(mUser);
//     // Return the modified User model
//     return actualUser;
// });

// jest.mock('../../../models/book.model', () => ({}));
// jest.mock('../../../models/index', () => ({}));
// jest.mock('../../../models/review.model', () => ({}));
// jest.mock('../../../models/hideReview.model', () => ({}));
// jest.mock('../../../models/likeBook.model', () => ({}));
// jest.mock('../../../models/likeReview.model', () => ({}));
// jest.mock('../../../models/notification.model', () => ({}));

// const mUser = {
//     dataValues: {
//         id: 1,
//         email: 'bao01@gmail.com',
//         password: '$2a$08$Q6RWGmkge4n9yoo2L92aRuVZbT7frPEeJ1v6RU6yHPuWRVOKi4n7G',
//         userName: 'bao',
//         dateOfBirth: '2023-08-03T09:14:24.139Z',
//         phoneNumber: '0355736772',
//         secretAsk: 'What is your mother name',
//         secretAns: 'Speed father',
//         avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
//         device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
//         createdAt: '2023-09-11T06:44:00.031Z',
//         updatedAt: '2023-09-11T06:44:03.856Z',
//     },
//     _previousDataValues: {
//         id: 1,
//         email: 'bao01@gmail.com',
//         password: '$2a$08$Q6RWGmkge4n9yoo2L92aRuVZbT7frPEeJ1v6RU6yHPuWRVOKi4n7G',
//         userName: 'bao',
//         dateOfBirth: '2023-08-03T09:14:24.139Z',
//         phoneNumber: '0355736772',
//         secretAsk: 'What is your mother name',
//         secretAns: 'Speed father',
//         avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
//         device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
//         createdAt: '2023-09-11T06:44:00.031Z',
//         updatedAt: '2023-09-11T06:44:03.856Z',
//     },
//     uniqno: 1,
//     _options: {
//         isNewRecord: false,
//         _schema: null,
//         _schemaDelimiter: '',
//         raw: true,
//         attributes: [
//             'id',
//             'email',
//             'password',
//             'userName',
//             'dateOfBirth',
//             'phoneNumber',
//             'secretAsk',
//             'secretAns',
//             'avatar',
//             'device',
//             'createdAt',
//             'updatedAt',
//         ],
//     },
//     isNewRecord: false,
// };

// expect(res.send).toHaveBeenCalledWith({
//     user: {
//         id: 1,
//         email: 'test@test.com',
//         password: undefined,
//         secretAsk: undefined,
//         secretAns: undefined,
//         createdAt: undefined,
//         updatedAt: undefined,
//     },
// });

// jest.mock('sequelize', () => {
//     // Create a mock user instance with some dummy data
//     const mUser = {
//         dataValues: {
//             id: 1,
//             email: 'bao01@gmail.com',
//             password: '$2a$08$Q6RWGmkge4n9yoo2L92aRuVZbT7frPEeJ1v6RU6yHPuWRVOKi4n7G',
//             userName: 'bao',
//             dateOfBirth: '2023-08-03T09:14:24.139Z',
//             phoneNumber: '0355736772',
//             secretAsk: 'What is your mother name',
//             secretAns: 'Speed father',
//             avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
//             device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
//             createdAt: '2023-09-11T06:44:00.031Z',
//             updatedAt: '2023-09-11T06:44:03.856Z',
//         },
//         _previousDataValues: {
//             id: 1,
//             email: 'bao01@gmail.com',
//             password: '$2a$08$Q6RWGmkge4n9yoo2L92aRuVZbT7frPEeJ1v6RU6yHPuWRVOKi4n7G',
//             userName: 'bao',
//             dateOfBirth: '2023-08-03T09:14:24.139Z',
//             phoneNumber: '0355736772',
//             secretAsk: 'What is your mother name',
//             secretAns: 'Speed father',
//             avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
//             device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
//             createdAt: '2023-09-11T06:44:00.031Z',
//             updatedAt: '2023-09-11T06:44:03.856Z',
//         },
//         uniqno: 1,
//         _options: {
//             isNewRecord: false,
//             _schema: null,
//             _schemaDelimiter: '',
//             raw: true,
//             attributes: [
//                 'id',
//                 'email',
//                 'password',
//                 'userName',
//                 'dateOfBirth',
//                 'phoneNumber',
//                 'secretAsk',
//                 'secretAns',
//                 'avatar',
//                 'device',
//                 'createdAt',
//                 'updatedAt',
//             ],
//         },
//         isNewRecord: false,
//     };
//     // Create a mock user model with a mock implementation of the findOne method
//     const mUserModel = {
//         findOne: jest.fn().mockResolvedValue(mUser),
//     };
//     // Return a mock Sequelize constructor that returns the mock user model
//     return {
//         Sequelize: jest.fn(() => mUserModel),
//     };
// });

// You need to mock the Sequelize module because you want to isolate your controller module from its dependencies and avoid making actual database calls in your unit test. Mocking the module allows you to intercept any function calls from that module and provide your own implementation or return value. For example, by mocking the `transaction` function, you can avoid creating a real transaction in your database and just return a resolved promise instead.

// Mocking the module also gives you access to the mock functions that Jest creates for each exported function from that module. You can use these mock functions to check how many times they were called, what arguments they received, what they returned, etc. For example, you can use `sequelize.transaction.mockImplementation()` to customize the behavior of the mocked `transaction` function, or use `expect(sequelize.transaction).toBeCalled()` to verify that it was called in your test.

// You can find more information about mocking modules in Jest in these links:

// - [Bypassing module mocks · Jest](https://jestjs.io/docs/bypassing-module-mocks) ¹
// - [Quickest and Simplest Way of Mocking Module Dependencies With Jest - STRV](https://www.strv.com/blog/quickest-simplest-way-mocking-module-dependencies-jest-engineering) ²
// - [ES6 Class Mocks · Jest](https://jestjs.io/docs/es6-class-mocks) ³
// - [Manual Mocks · Jest](https://jestjs.io/docs/manual-mocks) ⁴
// - [Module Mocking in Jest. Exports and module factories and mock… | by ...](https://codeburst.io/module-mocking-in-jest-ff174397e5ff) ⁵
// - [Mock Functions · Jest](https://jestjs.io/docs/mock-functions) ⁶

// Does this answer your question?

// Source: Conversation with Bing, 9/10/2023
// (1) Bypassing module mocks · Jest. https://jestjs.io/docs/bypassing-module-mocks.
// (2) Quickest and Simplest Way of Mocking Module Dependencies With Jest - STRV. https://www.strv.com/blog/quickest-simplest-way-mocking-module-dependencies-jest-engineering.
// (3) ES6 Class Mocks · Jest. https://jestjs.io/docs/es6-class-mocks.
// (4) Manual Mocks · Jest. https://jestjs.io/docs/manual-mocks.
// (5) Module Mocking in Jest. Exports and module factories and mock… | by .... https://codeburst.io/module-mocking-in-jest-ff174397e5ff.
// (6) Mock Functions · Jest. https://jestjs.io/docs/mock-functions.
