import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import dbInit from './init';
dotenv.config();

// routes
import authRoute from './api/routes/auth.routes';
import userRoute from './api/routes/user.routes';
import bookRoute from './api/routes/book.routes';
import actionRoute from './api/routes/action.routes';
import imageRoute from './api/routes/image.routes';

dbInit();

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:3001',
};

export const get = () => {
    const app: Application = express();

    app.use(cors(corsOptions));

    // parse requests of content-type - application/json
    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    app.use(
        bodyParser.urlencoded({
            extended: false,
        }),
    );

    app.use(bodyParser.json());
    app.get('/', async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: `Welcome to the RateBook API!`,
        });
    });

    app.use('/api/auth/', authRoute);
    app.use('/api/user/', userRoute);
    app.use('/api/book/', bookRoute);
    app.use('/api/action/', actionRoute);
    app.use('/api/image/', imageRoute);

    return app;
};

export const start = () => {
    const app = get();
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}.`);
        });
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`);
    }
};

start();
