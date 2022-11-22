'use strict';

/**
 * Puts the first name and last name in the correct format, i.e., first letter is capitalized.
 * @param {object} req - The request body.
 * @param {object} res - The response object. 
 * @param {function} next - A function used to progress to the next piece of middleware. 
 */
const sanitizeNames = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    req.body.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    req.body.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

    next();
}

module.exports = sanitizeNames;
