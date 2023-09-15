import { upImage, delImage } from '../../api/controllers/image.controller';

import * as cloudinary from 'cloudinary';
import httpMocks from 'node-mocks-http';
import { Request } from 'express';

interface multerUpload extends Request {
    file: Express.Multer.File;
}

jest.mock('cloudinary');

describe('Image', () => {
    describe('Upload', () => {
        const outCloudinary = {
            asset_id: '43b178725570635355e189b0869721aa',
            public_id: 'ujj1eua7rdsactxvgkrw',
            version: 1694657260,
            version_id: '4850102f26c3c937ba90a2188d8795be',
            signature: '98fae9409c466f382438fe940fc85fb682da74f5',
            width: 1900,
            height: 1080,
            format: 'png',
            resource_type: 'image',
            created_at: '2023-09-14T02:07:40Z',
            tags: [],
            bytes: 685785,
            type: 'upload',
            etag: '6e6ad45aa3605bcab2330e932f69b918',
            placeholder: false,
            url: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1694657260/ujj1eua7rdsactxvgkrw.png',
            secure_url: 'https://res.cloudinary.com/dcllp2b8r/image/upload/v1694657260/ujj1eua7rdsactxvgkrw.png',
            folder: '',
            original_filename: 'Screenshot 2023-07-19 133545',
            api_key: '786475196392548',
        };
        const inUpImage = '/Screenshot 2023-07-19 133545.png';

        beforeEach(() => {
            jest.clearAllMocks();
            cloudinary.v2.uploader.upload = jest.fn().mockReturnValue(
                Promise.resolve({
                    ...outCloudinary,
                }),
            );
        });
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return upload success', async () => {
            const req: multerUpload = httpMocks.createRequest({
                file: {
                    path: inUpImage,
                },
            });
            const res = httpMocks.createResponse();

            await upImage(req, res);
            expect(res.statusCode).toBe(201);
            expect(res._getData()).toEqual({
                photoLink: 'http://res.cloudinary.com/dcllp2b8r/image/upload/v1694657260/ujj1eua7rdsactxvgkrw.png',
            });
        });
        it('should return upload fail because cant connect to cloudinary', async () => {
            jest.clearAllMocks();
            cloudinary.v2.uploader.upload = jest.fn().mockReturnValue(Promise.resolve(null));
            const req: multerUpload = httpMocks.createRequest({
                file: {
                    path: inUpImage,
                },
            });
            const res = httpMocks.createResponse();

            await upImage(req, res);
            expect(res.statusCode).toBe(500);
            expect(res._getData()).toEqual({
                error: "Cannot read properties of null (reading 'url')",
            });
        });
        // it('should return upload fail because wrong file type', async () => {
        //     jest.clearAllMocks();
        //     cloudinary.v2.uploader.upload = jest.fn().mockReturnValue(Promise.resolve(null));
        //     const req: multerUpload = httpMocks.createRequest({
        //         file: {
        //             path: '\\New Text Document.png',
        //         },
        //     });
        //     const res = httpMocks.createResponse();
        //     const errorMessage = {
        //         error: 'Empty file',
        //     };
        //     await upImage(req, res);
        //     expect(res.statusCode).toBe(500);
        //     expect(res._getData()).toEqual({
        //         error: "Cannot read properties of null (reading 'url')",
        //     });
        // });
    });
    describe('Delete', () => {
        const inDelImage = {
            oldLink: ['https://res.cloudinary.com/dcllp2b8r/image/upload/v1694657260/ujj1eua7rdsactxvgkrw.png'],
        };

        const outCloudinaryFail = { result: 'not found' };
        const outCloudinarySuccess = { result: 'ok' };
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return delete success', async () => {
            jest.clearAllMocks();
            cloudinary.v2.uploader.destroy = jest.fn().mockReturnValue(
                Promise.resolve({
                    ...outCloudinarySuccess,
                }),
            );
            const req = httpMocks.createRequest({
                body: inDelImage,
            });
            const res = httpMocks.createResponse();

            await delImage(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toEqual({});
        });
        it('should return delete fail because cant find out image', async () => {
            jest.clearAllMocks();
            cloudinary.v2.uploader.destroy = jest.fn().mockReturnValue(Promise.resolve(outCloudinaryFail));
            const req = httpMocks.createRequest({
                body: inDelImage,
            });
            const res = httpMocks.createResponse();

            await delImage(req, res);
            expect(res.statusCode).toBe(500);
            expect(res._getData()).toEqual({
                error: 'not found',
            });
        });
    });
});
