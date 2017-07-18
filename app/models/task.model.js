import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: Boolean
});

export const Task = mongoose.model('Task', userSchema);
