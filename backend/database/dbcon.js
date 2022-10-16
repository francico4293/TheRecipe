'use strict';
//imports
const mongoose = require('mongoose');

// connect to db
mongoose.connect(
    'mongodb://127.0.0.1:27017/the-recipe',
    { useNewUrlParser: true }
);

// display message on connection
const db = mongoose.connection;
db.once('open', () => {
    console.log('[+] Successfully connected to MongoDB');
});
