const { storage } = require('../config/firebaseConfig');

exports.uploadResource = (req, res) => {
    const file = req.file;
    const blob = bucket.file(`your-folder/${file.originalname}`);
    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    blobStream.on('error', err => {
        res.status(500).send(`Error uploading file: ${err.message}`);
    });

    blobStream.on('finish', () => {
        res.send('Resource uploaded');
    });

    blobStream.end(file.buffer);
};

exports.getAllResources = (req, res) => {
    // Implement logic to get resources metadata from Firestore or Google Cloud Storage
    res.send('All resources');
};

exports.getResourceById = (req, res) => {
    // Implement logic to get resource metadata by ID
    res.send(`Resource with ID: ${req.params.id}`);
};

exports.updateResource = (req, res) => {
    // Implement logic to update resource metadata
    res.send(`Resource with ID: ${req.params.id} updated`);
};

exports.deleteResource = (req, res) => {
    const resourceId = req.params.id;
    bucket.file(resourceId).delete()
    .then(() => {
        res.send(`Resource with ID: ${resourceId} deleted`);
    })
    .catch(error => {
        res.status(500).send(`Error deleting resource: ${error.message}`);
    });
};
