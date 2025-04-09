import { secret } from '../database/config.js';

export const getAuth = function (req, res, next) {
    if (req.query.token) {
        if (req.query.token === secret) next();
        else res.status(403).send({ error: 'Access denied' });
    } else res.status(400).send({ error: 'Invalid token' });
};
