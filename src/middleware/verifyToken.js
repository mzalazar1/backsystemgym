const admin = require('firebase-admin');

const serviceAccount = require('./data.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization || req.headers.Authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }


    admin
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then((decodedToken) => {
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            return res.status(401).json({ error: 'Invalid token' });
        });
};

module.exports = verifyToken;