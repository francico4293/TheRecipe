import { 
    signupNewUser,
    loginUser,
    favoriteRecipe,
    deleteRecipe,
    updateUserInfo
} from '../utilities/userUtils';
import {
    USER_REQUEST_ATTEMPT,
    USER_REQUEST_FAILURE,
} from '../constants/userConstants';

/**
 * Creates a new user account.
 * @param {object} userInfo - An object containing the user's first name, last name, email, and password.
 * @param {function} navigate - A react-router-dom function used to navigate the user to a different page.
 */
export const userSignupActions = (userInfo, navigate) => {
    return async function(dispatch) {
        try {
            dispatch({ type: USER_REQUEST_ATTEMPT });
            await signupNewUser(userInfo, dispatch, navigate);
        } catch (err) {
            dispatch({ type: USER_REQUEST_FAILURE });
        }
    }
}

/**
 * Logins in a user who has already created an account.
 * @param {string} email - The user's email address. 
 * @param {string} password - The user's password. 
 * @param {function} navigate - A react-router-dom function used to navigate the user to a different page.
 */
export const userLoginActions = (email, password, navigate) => {
    return async function(dispatch) {
        try {
            dispatch({ type: USER_REQUEST_ATTEMPT });
            await loginUser({ email, password }, dispatch, navigate);
        } catch (err) {
            dispatch({ type: USER_REQUEST_FAILURE });
        }
    }
}

/**
 * Adds a favorited recipe to a user's cookbook page.
 * @param {string} userId - The ID of the user.
 * @param {object} recipe - An object containing recipeId, title, and image attributes for a specific recipe.
 */
export const userRecipeFavoriteActions = (userId, recipe) => {
    return async function(dispatch) {
        try {
            dispatch({ type: USER_REQUEST_ATTEMPT });
            await favoriteRecipe(userId, recipe, dispatch);
        } catch (err) {
            dispatch({ type: USER_REQUEST_FAILURE });
        }
    }
}

/**
 * Removes a favorited recipe from a user's cookbook page.
 * @param {string} userId - The ID of the user.
 * @param {string} recipeId - The ID of the recipe.
 */
export const userRecipeDeleteActions = (userId, recipeId) => {
    return async function(dispatch) {        
        try {
            dispatch({ type: USER_REQUEST_ATTEMPT });
            await deleteRecipe(userId, recipeId, dispatch);
        } catch (err) {
            dispatch({ type: USER_REQUEST_FAILURE });
        }
    }
}

/**
 * Update's the user profile information.
 * @param {string} userId - The ID of the user.
 * @param {object} updateObject - An object containing the first name, last name, and email address for the user.
 */
export const userInfoUpdateActions = (userId, updateObject) => {
    return async function(dispatch) {
        try {
            dispatch({ type: USER_REQUEST_ATTEMPT });
            await updateUserInfo(userId, updateObject, dispatch);
        } catch (err) {
            dispatch({ type: USER_REQUEST_FAILURE });
        }
    }
}
