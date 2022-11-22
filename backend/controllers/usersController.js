'use strict';
//imports
const User = require('../models/usersModel');
const bcryptjs = require('bcryptjs');

const createUser = async (userData) => {
    if (!await User.findOne({ email: userData.email })) {
        const user = new User(userData);
        return user.save();
    }

    return null;
}

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

const appendToUserRecipes = async (id, data) => {
    const user = await User.findById(id);

    const recipes = user.recipes.map(recipe => recipe.id);
    if (!recipes.includes(data.id)) {
        user.recipes.push({ recipeId: data.id, title: data.title, image: data.image });
    }
    
    return await user.save();
}

const removeRecipeFromUserRecipes = async (userId, recipeId) => {
    const user = await User.findById(userId);
    user.recipes = user.recipes.filter(recipe => recipe.recipeId !== parseInt(recipeId));
    return await user.save();
}

module.exports = { 
    createUser, 
    findUserByCredentials,
    appendToUserRecipes,
    removeRecipeFromUserRecipes
};
