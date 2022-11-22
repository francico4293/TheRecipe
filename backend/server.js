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

// set server to listen on PORT
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
