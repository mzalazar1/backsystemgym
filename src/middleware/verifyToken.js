const admin = require('firebase-admin');

const serviceAccount = require('./data.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const verifyToken = (req, res, next) => {
    console.log("alguien pregunto")
    console.log("el req: ", req.headers)
    console.log(req.headers.Authorization)
    const token = req.headers.authorization || req.headers.Authorization;
    console.log(token)

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