import { agent as _request } from 'supertest';

import app from '../app';

export const request = _request(app);

export const mockRequest = () => {
    const req: any = {};
    req.body = {};
    req.params = {};
    return req;
};

export const mockResponse = () => {
    const res: any = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
