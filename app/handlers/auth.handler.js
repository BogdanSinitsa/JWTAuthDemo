import { User } from '../models/user.model';

import jwt from 'jsonwebtoken';

import { SECRET } from '../constants';

async function loginAction(req, res) {
    let {email, password } = req.body;

    let user = await User.findOne({email}).exec();

    if (user && user.password === password) {
        let tockenData = {
            name: user.name,
            email:  user.email
        };

        let token = jwt.sign(tockenData, SECRET);

        res.send({
            success: true,
            token
        });
        return;
    }

    res.status(401).send({
        success: false
    });
}

async function signUpAction(req, res) {
    let user = new User(req.body);
    await user.save();
    res.end();
}

export default {
    loginAction,
    signUpAction
}