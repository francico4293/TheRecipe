'use strict';
// imports
const express = require('express');
const sanitizeNames = require('../middleware/sanitizeNames');
const { 
    createUser, 
    findUserByCredentials,
    appendToUserRecipes,
    removeRecipeFromUserRecipes
} = require('../controllers/usersController');

// instantiate new Router object
const router = express.Router();

router.post('/signup', sanitizeNames, async (req, res) => {
    try {
        const user = await createUser(req.body);
        if (user === null) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        res.status(201).json({
            id: user._id, 
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email, 
            recipes: user.recipes
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Request failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await findUserByCredentials(req.body.email, req.body.password);
        if (user === null) {
            return res.status(400).json({ message: 'Login failed - email or password incorrect' });
        }

        return res.status(200).json({
            id: user._id, 
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email, 
            recipes: user.recipes
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Request failed' });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const user = await appendToUserRecipes(req.params.id, req.body);
        res.status(200).json({
            id: user._id, 
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email, 
            recipes: user.recipes
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Request Failed' });
    }
});

router.delete('/:userId/recipes/:recipeId', async (req, res) => {
    try {
        const user = await removeRecipeFromUserRecipes(req.params.userId, req.params.recipeId);
        res.status(200).json({
            id: user._id, 
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email, 
            recipes: user.recipes
        });
    } catch (err) {
        console.error(err);
    }
});

// exports
module.exports = router;
