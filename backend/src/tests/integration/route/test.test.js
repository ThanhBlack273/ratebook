//   const SequelizeMock = require('sequelize-mock');
import SequelizeMock from 'sequelize-mock'
import * as authUser from '../../../api/controllers/auth.controllers';
import { describe, expect, jest, it } from '@jest/globals';

const dbMock = new SequelizeMock();
  const UserMock = dbMock.define('user',{
    id: 1,
    email: 'bao01@gmail.com',
    userName: 'bao',
    dateOfBirth: '2023-08-03T09:14:24.139Z',
    phoneNumber: '0355736772',
    avatar: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1692263000/e6edgqmqitfyzgzuhgj5.png',
  });

jest.mock('../models/users', () => {

  
  UserMock.$queryInterface((query, queryOptions) => {
    if (query === 'findOne') {
      return UserMock.build({ id: queryOptions[0].where.id });
    }
  });
  return UserMock;
});

const inSignin = {
    email: 'bao05',
    password: 'Mn12345678',
    device: 'c_0CYPeLSWeToyVUkHUphF:APA91bGmYndFYfsidjDsfEZbLkpHQ1HVflqNQTRPS8-aiFklY2UB4h4RCCCy2sxBbxynpZyNlhjaWMsMHgx7ap_-L0PBWxo-WKgoOi0w7GwSuQrP8mYAwBZc8muhLBoxT_STMfA5RIot',
};

describe('Testing use.list()', () => {
//   it('UsersController.list() should return a status code 201 and all Users data in object array', async () => {
//     const req = {};
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     await list(req, res);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toBeCalledWith(
//       expect.objectContaining({
//         data: expect.objectContaining({
//           count: 2,
//           rows: expect.arrayContaining([
//             expect.objectContaining({
//               id: expect.any(Number),
//               createdAt: expect.any(Date),
//               updatedAt: expect.any(Date),
//             }),
//           ]),
//         }),
//       }),
//     );
//   });


it('UsersController.view() should return a status code 201 and user data obj', async () => {
    const req = { body: inSignin };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await authUser.signin(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toBeCalledWith(
        expect.objectContaining({
            data: expect.objectContaining({
                id: 2,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            }),
        }),
    );
    });
});