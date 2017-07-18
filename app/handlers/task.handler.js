import { Task } from '../models/task.model';

async function listAction(req, res) {
    let tasks = await Task.find({}).exec();
    res.send(tasks);
}

async function createAction(req, res) {
    let task = new Task(req.body);
    await task.save();
    res.end();
}

export default {
    listAction,
    createAction
}