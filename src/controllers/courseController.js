const firestoreService = require('../services/firestoreServices');
const { firestore } = require('../config/firebaseConfig');

exports.createCourse = async (req, res) => {
    const course = req.body;
    try {
        const result = await firestoreService.createCourse(course);
        if (!result.success) {
            throw new Error(result.error);
        }
        res.send(`Course created with ID: ${result.id}`);
    } catch (error) {
        res.status(500).send(`Error creating course: ${error.message}`);
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const result = await firestoreService.getAllCourses();
        if (!result.success) {
            throw new Error(result.error);
        }
        res.send(result.data);
    } catch (error) {
        res.status(500).send(`Error getting courses: ${error.message}`);
    }
};
exports.createCourse = (req, res) => {
    res.send('Course created');
};


exports.getCourseById = (req, res) => {
    const courseId = req.params.id;
    firestore.collection('courses').doc(courseId).get()
    .then(doc => {
        if (!doc.exists) {
            return res.status(404).send('Course not found');
        }
        res.send(doc.data());
    })
    .catch(error => {
        res.status(500).send(`Error getting course: ${error.message}`);
    });
};

exports.updateCourse = (req, res) => {
    const courseId = req.params.id;
    const courseData = req.body;
    firestore.collection('courses').doc(courseId).update(courseData)
    .then(() => {
        res.send('Course updated');
    })
    .catch(error => {
        res.status(500).send(`Error updating course: ${error.message}`);
    });
};

exports.deleteCourse = (req, res) => {
    const courseId = req.params.id;
    firestore.collection('courses').doc(courseId).delete()
    .then(() => {
        res.send('Course deleted');
    })
    .catch(error => {
        res.status(500).send(`Error deleting course: ${error.message}`);
    });
};