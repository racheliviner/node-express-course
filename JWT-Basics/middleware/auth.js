const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).send('No Token provide')
    }

    const token = authHeader.split(' ')[1]
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decodedToken
        req.user = {id, username}
        next()
    } catch (error) {
        return res.status(401).send('Not authorize to access this route')
    }
}

module.exports = authenticationMiddleware