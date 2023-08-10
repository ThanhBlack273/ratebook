import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
    destination: function (request: Request, file: Express.Multer.File, callback: DestinationCallback) {
        callback(null, '/');
    },
    filename: function (req: Request, file: Express.Multer.File, callback: FileNameCallback) {
        callback(null, file.originalname);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, callback) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === ''
    ) {
        callback(null, true);
    } else {
        callback({ error: { [file.filename]: 'Unsupported file format' } }, false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter,
});
export default upload;
