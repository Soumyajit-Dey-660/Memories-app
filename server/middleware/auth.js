const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // Custom auth and google auth; Differentiate between those
        const isCustomAuth = token.length < 500; 
        let decodeData;
        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, 'test');
            req.userId = decodeData ? decodeData.id : null;
        } else {
            decodeData = jwt.decode(token);
            req.userId = decodeData ? decodeData.sub : null;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth