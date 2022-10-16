'use strict';
//imports
const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

// define user schema
const userSchema = mongoose.Schema({
    firstName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    lastName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(email) {
                return validator.isEmail(email);
            }
        }
     },
     password: {
        type: String,
        required: true
     },
     recipes: [{
         recipeId: {
            type: Number,
            required: true
         },
         title: {
            type: String,
            required: true
         },
         image: {
            type: String,
            required: true
         }
     }]
});

userSchema.pre('save', async function(next) {
    this.password = await bcryptjs.hash(this.password, 8);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
