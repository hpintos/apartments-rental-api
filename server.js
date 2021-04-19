require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const port = process.env.port || 3000;

// Open database connection
require('./config/db-connection');

const apartmentsRouter = require('./routes/apartments.routes');
const usersRouter = require('./routes/users.routes');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/apartments', apartmentsRouter);
app.use('/users', usersRouter);

// Error handler
app.use((err, req, res, next) => {
    if (typeof err === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});
