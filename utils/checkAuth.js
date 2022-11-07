const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);

            req.userId = decoded.id;

            next();
        } catch (err) {
            return res.status(401).json({
                message: 'Access denied',
            });
        }
    } else {
        return res.status(401).json({
            message: 'Access denied',
        });
    }
}

module.exports = checkAuth;