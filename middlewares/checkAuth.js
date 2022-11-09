const jwt = require('jsonwebtoken');

const accessTokenKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace(/Bearer\s?/, '');

        const decoded = jwt.verify(token, accessTokenKey);

        req.userId = decoded.id;

        next();
    } catch (err) {
        return res.status(401);
    }
}

module.exports = checkAuth;