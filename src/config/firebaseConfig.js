// src/config/firebaseConfig.js
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const serviceAccount = require('./ServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://e-shuri-4fa54-default-rtdb.europe-west1.firebasedatabase.app/account-database',
    storageBucket: 'e-shuri-4fa54.appspot.com' 
});

const firestore = admin.firestore();
const storage = new Storage({ keyFilename: './ServiceAccountKey.json' });
// const bucket = admin.storage().bucket();

module.exports = { admin, firestore, storage };

// gs://