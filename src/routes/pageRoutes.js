const express = require('express');
const path = require('path');
const router = express.Router();

// Routes to serve HTML files
router.get('/home', (req, res) => {
    res.sendFile(path.resolve('home/home.html'));
});

router.get('/teacher', (req, res) => {
    res.sendFile(path.resolve('teacher/teacher.html'));
});

router.get('/student', (req, res) => {
    res.sendFile(path.resolve('student/index.html'));
});

router.get('/ministry', (req, res) => {
    res.sendFile(path.resolve('ministry/ministry.html'));
});

router.get('/main-admin', (req, res) => {
    res.sendFile(path.resolve('main-admin/main-admin.html'));
});

router.get('/local', (req, res) => {
    res.sendFile(path.resolve('local/local.html'));
});

module.exports = router;
