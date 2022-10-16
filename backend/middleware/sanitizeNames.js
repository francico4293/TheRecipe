'use strict';

const sanitizeNames = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    req.body.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    req.body.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

    next();
}

module.exports = sanitizeNames;
