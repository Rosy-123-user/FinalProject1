// src/middleware/authMiddleware.js
const admin = require('../config/firebaseConfig').admin;

module.exports = (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            next();
        })
        .catch(error => {
            console.error('Error verifying ID token:', error);
            res.status(401).send({ error: 'Unauthorized' });
        });
};
