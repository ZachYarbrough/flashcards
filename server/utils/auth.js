const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.ACCESS_TOKEN_SECRET;
const expiration = '2h';


authMiddleware = (req, res, next) => {
    // allows token to be sent via body, query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
        token = token.split(' ')[1];
    }

    if (!token) {
        res.json({ message: 'Invalid token.'});
        return;
    }

    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
        console.log(req.user)
    } catch {
        res.json({ message: 'Invalid token.' });
    }

    next();
}

signToken = ({ firstName, lastName, email, _id }) => {
    const payload = { firstName, lastName, email, _id };
    console.log(payload);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = { authMiddleware, signToken }
