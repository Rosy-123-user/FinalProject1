
const { admin, firestore } = require('../config/firebaseConfig');
const csv = require('csv-parser');
const fs = require('fs');


exports.createUser = (req, res) => {
    const { firstName, lastName, email, password, role, program } = req.body;

    console.log("Creating user with data:", { firstName, lastName, email, password, role, program });

    admin.auth().createUser({
        email: email,
        password: password,
        displayName: `${firstName} ${lastName}`
    })
    .then(userRecord => {
        console.log("User record created:", userRecord);
        return firestore.collection('users').doc(userRecord.uid).set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            program: program
        });
    })
    .then(() => {
        res.send({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} account created` });
    })
    .catch(error => {
        console.error('Error creating user account:', error);
        res.status(500).send({ error: `Error creating ${role} account: ${error.message}` });
    });
};

exports.bulkUpload = (req, res) => {
    const filePath = req.file.path;
    const users = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            users.push(row);
        })
        .on('end', () => {
            const promises = users.map(user => {
                return admin.auth().createUser({
                    email: user.email,
                    password: user.password,
                    displayName: `${user.firstName} ${user.lastName}`
                })
                .then(userRecord => {
                    return firestore.collection('users').doc(userRecord.uid).set({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role,
                        program: user.program
                    });
                });
            });

            Promise.all(promises)
                .then(() => {
                    res.send({ message: 'Bulk accounts created successfully' });
                })
                .catch(error => {
                    console.error('Error in bulk account creation:', error);
                    res.status(500).send({ error: `Error in bulk account creation: ${error.message}` });
                });
        });
};

exports.login = (req, res) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            const email = decodedToken.email;
            return firestore.collection('users').where('email', '==', email).get();
        })
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                throw new Error('User not found');
            }
            const user = querySnapshot.docs[0].data();
            res.send({ role: user.role });
        })
        .catch(error => {
            console.error('Error logging in:', error);
            res.status(401).send({ error: 'Unauthorized' });
        });
};