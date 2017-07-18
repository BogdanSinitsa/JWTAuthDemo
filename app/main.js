import mongoose from 'mongoose';
import express from 'express';
import Router from 'express-promise-router';
import bodyParser from 'body-parser';

import taskHandler from './handlers/task.handler';
import authHandler from './handlers/auth.handler';

import checkAuth from './middlewares/check-auth';

export default function main(args) {
    mongoose.Promise = global.Promise;

    const app = express();
    app.use(bodyParser.json());

    const taskRouter = Router();
    taskRouter.use(checkAuth);

    taskRouter.get('/list', taskHandler.listAction);
    taskRouter.post('/', taskHandler.createAction);

    const authRouter = Router();
    authRouter.post('/sign-up', authHandler.signUpAction);
    authRouter.post('/login', authHandler.loginAction);

    app.use('/task', taskRouter);
    app.use('/auth', authRouter);

    mongoose.connect('mongodb://localhost/user_tasks_db', {useMongoClient: true});

    app.listen(3003, () => {
        console.log('Running...')
    })
}