import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import config from './app/config';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: config.frontendURL,
    credentials: true,
}))

app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Welcome to Pizza Delivery API Server',
    });
});



export default app;