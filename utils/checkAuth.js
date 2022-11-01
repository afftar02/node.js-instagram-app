const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret2022');

            req.userId = decoded._id;

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