const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files
app.use('/home', express.static(path.resolve('home')));
app.use('/teacher', express.static(path.resolve('teacher')));
app.use('/student', express.static(path.resolve('student')));
app.use('/ministry', express.static(path.resolve('ministry')));
app.use('/main-admin', express.static(path.resolve('main-admin')));
app.use('/local', express.static(path.resolve('local')));

// Import routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const pageRoutes = require('./routes/pageRoutes'); // Import the new routes

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/', pageRoutes); // Use the new routes

app.get('/', (req, res) => {
    res.send('Welcome to the Edu-Tech API');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
