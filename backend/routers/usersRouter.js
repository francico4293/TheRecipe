'use strict';
// imports
const express = require('express');
const sanitizeNames = require('../middleware/sanitizeNames');
const { 
    createUser, 
    findUserByCredentials,
    appendToUserRecipes,
    removeRecipeFromUserRecipes,
    updateUserInfo
} = require('../controllers/usersController');

// instantiate new Router object
const router = express.Router();

/**
 * Handler for POST /api/users/signup endpoint. This endpoint allows users to signup and create a profile.
 */
router.post('/signup', sanitizeNames, async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        if (user === null) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        res.status(201).json(
            {
                id: user._id, 
                firstName: user.firstName, 
                lastName: user.lastName,
                email: user.email, 
                recipes: user.recipes
            }
        );
    } catch (err) {
        next(err);
    }
});

/**
 * Handler for POST /api/users/login endpoint. This endpoint allows users with a profile to login.
 */
router.post('/login', async (req, res, next) => {
    try {
        const user = await findUserByCredentials(req.body.email, req.body.password);
        if (user === null) {
            return res.status(400).json({ message: 'Login failed - email or password incorrect' });
        }

        return res.status(200).json(
            {
                id: user._id, 
                firstName: user.firstName, 
                lastName: user.lastName,
                email: user.email, 
                recipes: user.recipes
            }
        );
    } catch (err) {
        next(err);
    }
});

/**
 * Handler for POST /api/users/:userId endpoint. This endpoint allows users to add a favorited recipe to their
 * cookbook.
 */
router.post('/:userId', async (req, res, next) => {
    try {
        const user = await appendToUserRecipes(req.params.userId, req.body);
        res.status(200).json(
            {
                id: user._id, 
                firstName: user.firstName, 
                lastName: user.lastName,
                email: user.email, 
                recipes: user.recipes
            }
        );
    } catch (err) {
        next(err);
    }
});

/**
 * Handler for PATCH /api/users/:userId endpoint. This endpoint allows users to update their profile information.
 */
router.patch('/:userId', async (req, res, next) => {
    try {
        const user = await updateUserInfo(req.params.userId, req.body.firstName, req.body.lastName, req.body.email);
        res.status(200).json(
            {
                id: user._id, 
                firstName: user.firstName, 
                lastName: user.lastName,
                email: user.email, 
                recipes: user.recipes
            }
        );
    } catch (err) {
        next(err);
    }
});

/**
 * Handler for DELETE /api/users/:userId/recipes/:recipeId endpoint. This endpoint allows users to remove a favorited
 * recipe from their cookbook.
 */
router.delete('/:userId/recipes/:recipeId', async (req, res, next) => {
    try {
        const user = await removeRecipeFromUserRecipes(req.params.userId, req.params.recipeId);
        res.status(200).json(
            {
                id: user._id, 
                firstName: user.firstName, 
                lastName: user.lastName,
                email: user.email, 
                recipes: user.recipes
            }
        );
    } catch (err) {
        next(err);
    }
});

// exports
module.exports = router;
