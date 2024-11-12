import express from 'express';
import usersRoute from './routes/user.route';
import authRoute from "./auth/auth.route";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoute);
app.use('/users', usersRoute);

export default app;

