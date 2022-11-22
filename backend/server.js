'use strict';

// imports
const express = require('express');
const usersRouter = require('./routers/usersRouter');
require('./database/dbcon');

// initialize new express application
const app = express();

// middleware
app.use(express.json());

// routers
app.use('/api/users', usersRouter);

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'An internal server error has occurred' });
});

// set server to listen on PORT
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
