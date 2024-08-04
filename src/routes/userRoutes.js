// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

// Admin routes to create user accounts
// Admin routes to create user accounts
router.post('/create', authenticate, userController.createUser);
router.post('/bulk-upload', authenticate, upload.single('file'), userController.bulkUpload);
// router.post('/admin/create-teacher', authenticate, userController.createTeacher);
// router.post('/admin/create-student', authenticate, userController.createStudent);

// Routes
// router.post('/signup', userController.signup);
router.post('/login', userController.login);
// router.get('/profile', authenticate, userController.getProfile);

module.exports = router;
