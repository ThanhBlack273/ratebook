import cloudinary from '../../config/cloudinary.config';
import { Request, Response } from 'express';

export const upImage = async (req: Request, res: Response) => {
    try {
        if (req.file !== undefined) {
            await cloudinary.v2.uploader
                .upload(req.file.path)
                .then((img) => {
                    return res.status(201).send({ photoLink: img.url });
                })
                .catch((err) => {
                    return res.status(500).send({ error: err.message });
                });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const delImage = async (req: Request, res: Response) => {
    try {
        const listLink = req.body.oldLink;
        for (const element of listLink) {
            const result = await cloudinary.v2.uploader.destroy(element?.split('/').pop().split('.').shift());
            if (result.result === 'not found') {
                return res.status(500).send({ error: 'not found' });
            }
        }

        return res.status(200).send({});
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
