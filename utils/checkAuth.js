const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: 'Access denied',
            });
        }

        req.userId = decoded.id;

        next();
    } else {
        return res.status(401).json({
            message: 'Access denied',
        });
    }
}

module.exports = checkAuth;