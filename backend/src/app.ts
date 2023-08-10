import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import db from './models';
import bodyParser from 'body-parser';

dotenv.config();

// routes
import authRoute from './routes/auth.routes';
import userRoute from './routes/user.routes';
import bookRoute from './routes/book.routes';
import actionRoute from './routes/action.routes';
import imageRoute from './routes/image.routes';

// //reset database
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Database with { force: true }');
// });

//nonreset database
db.sequelize.sync();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001',
};

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

// simple route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
});
app.use('/api/auth/', authRoute);
app.use('/api/user/', userRoute);
app.use('/api/book/', bookRoute);
app.use('/api/action/', actionRoute);
app.use('/api/image/', imageRoute);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
});
