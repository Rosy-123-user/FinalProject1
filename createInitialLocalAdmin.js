const admin = require('firebase-admin');
const serviceAccount = require('./src/config/ServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://e-shuri-4fa54-default-rtdb.europe-west1.firebasedatabase.app/account-database',
});

const firestore = admin.firestore();

const createInitialLocalAdmin = async () => {
    try {
        const userRecord = await admin.auth().createUser({
            email: 'javarosze@gmail.com',
            password: 'securepassword',
            displayName: 'Local Admin'
        });

        await firestore.collection('users').doc(userRecord.uid).set({
            firstName: 'Local',
            lastName: 'Admin',
            email: 'javarosze@gmail.com',
            role: 'local-admin',
            program: 'N/A'
        });

        console.log('Initial local admin account created successfully.');
    } catch (error) {
        console.error('Error creating initial local admin account:', error);
    }
};

createInitialLocalAdmin();
