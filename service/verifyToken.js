const jwt = require('jsonwebtoken');
const roles = require('./roles')

module.exports = function (req, res, next) {

    //Get the token from custom header
    const token = req.get('auth_token');

    //If token not sent in header send unauthorized error.
    if (!token) {
        return res.status(401).send('Access Denied!');
    }

    try {
        //decode the token with the same secret key used for signing the token.
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        //check weather the ROLE has access to route's
        if (roles[decodedToken.role].find((url) => {
            return url == req.baseUrl + req.url
        })) {
            req.user = decodedToken;
            next();
        } else {
            return res.status(401).send('Access Denied!');
        }

    } catch (err) {
        return res.status(400).send('Invalid Token!');
    }
}