'use strict';
//imports
const User = require('../models/usersModel');
const bcryptjs = require('bcryptjs');

/**
 * Creates a new user and adds them to the MongoDB database Users collection.
 * @param {object} userData - A user object containing firstName, lastName, email, and password attributes.
 * @returns - On success, an object representing the newly created user. On failure, null.
 */
const createUser = async (userData) => {
    if (!await User.findOne({ email: userData.email })) {
        const user = new User(userData);
        return user.save();
    }

    return null;
}

/**
 * Uses an email and password to find and authenticate a user.
 * @param {string} email - The user's email address. 
 * @param {string} password - The user's password.
 * @returns - On success, an object representing the user. On failure, null.
 */
const findUserByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (user === null) {
        return null;
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }

    return user;
}

/**
 * Adds a favorited recipe to the user's data in the MongoDB Users collection.
 * @param {string} userId - The unique ID of the user.
 * @param {object} data - An object representing recipe data that has id, title, and image attributes.
 * @returns - An object representing the updated user with the recipe added.
 */
const appendToUserRecipes = async (userId, recipeData) => {
    const user = await User.findById(userId);

    const recipes = user.recipes.map(recipe => recipe.id);
    // safeguard against adding duplicate recipes
    if (!recipes.includes(recipeData.id)) {
        user.recipes.push({ recipeId: recipeData.id, title: recipeData.title, image: recipeData.image });
    }
    
    return await user.save();
}

/**
 * Removes a favorited recipe from the user's data in the MongoDB Users collection.
 * @param {string} userId - The unique ID of the user. 
 * @param {string} recipeId - The unique ID of the recipe.
 * @returns - An object representing the update user with the recipe removed.
 */
const removeRecipeFromUserRecipes = async (userId, recipeId) => {
    const user = await User.findById(userId);
    user.recipes = user.recipes.filter(recipe => recipe.recipeId !== parseInt(recipeId));
    return await user.save();
}

/**
 * Updates the user's first name, last name, and email address.
 * @param {string} userId - The unique ID of the user.
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @param {string} email - The user's email address.
 * @returns - An object representing the updated user.
 */
const updateUserInfo = async (userId, firstName, lastName, email) => {
    const user = await User.findByIdAndUpdate(userId, { firstName, lastName, email }, { new: true });
    return user;
}

module.exports = { 
    createUser, 
    findUserByCredentials,
    appendToUserRecipes,
    removeRecipeFromUserRecipes,
    updateUserInfo
};
