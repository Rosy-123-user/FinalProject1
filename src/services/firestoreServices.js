const {firestore}= require('../config/firebaseConfig');
const db = firestore;

// Users
const createUser = async (user) => {
    try {
        await db.collection('users').doc(user.uid).set(user);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};

const getUser = async (uid) => {
    try {
        const userDoc = await db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            throw new Error('User not found');
        }
        return { success: true, data: userDoc.data() };
    } catch (error) {
        return { success: false, error };
    }
};

// Courses
const createCourse = async (course) => {
    try {
        const courseRef = await db.collection('courses').add(course);
        return { success: true, id: courseRef.id };
    } catch (error) {
        return { success: false, error };
    }
};

const getAllCourses = async () => {
    try {
        const snapshot = await db.collection('courses').get();
        const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { success: true, data: courses };
    } catch (error) {
        return { success: false, error };
    }
};

// Add more functions for resources, activity logs, etc.

module.exports = {
    createUser,
    getUser,
    createCourse,
    getAllCourses,
    // Add more exports as needed
};
