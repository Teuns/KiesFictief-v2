const secret = '$2y$10$L3ns9tOr6R1kj7xDV.B8PexIQplIX8XeOOOKs3x4aw.ENIRj8nB86%';

export const getAuth = function (req, res, next) {
    if (req.query.token) {
        if (req.query.token === secret) next();
        else res.status(403).send({ error: 'Access denied' });
    } else res.status(400).send({ error: 'Invalid token' });
};
