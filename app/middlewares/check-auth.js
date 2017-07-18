import jwt from 'jsonwebtoken';

import { SECRET } from '../constants';

export default function checkAuth (req, res, next) {
    let token = req.headers['x-access-token'];

    if (!token) {
        res.status(403).end();
        return;
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            res.status(403).end();
        } else {
            req.user = decoded;
            next();
        }
    });

}
