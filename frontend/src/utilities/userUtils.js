import {
    DATA,
    LOGGED_IN,
    USER_REQUEST_SUCCESS,
} from '../constants/userConstants';

/**
 * Creates a new user account by posting their information to the server.
 * @param {object} userInfo - An object containing first name, last name, email, and password for the user.
 * @param {function} dispatch - A redux function used to dispatch a specific action.
 * @param {function} navigate - A react-router-dom function used to navigate the user to a specific page.
 */
export const signupNewUser = async (userInfo, dispatch, navigate) => {
    const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            firstName: userInfo.firstName, 
            lastName: userInfo.lastName, 
            email: userInfo.email, 
            password: userInfo.password
        })
    });

    if (response.status === 201) {
        await handleSignupAndLoginSuccess(response, dispatch, navigate)
    } else {
        throw new Error();
    }
}

/**
 * Logs the user into the website by validating their credentials.
 * @param {object} userCredentials - An object containing email and password for the user.
 * @param {function} dispatch - A redux function used to dispatch a specific action.
 * @param {function} navigate - A react-router-dom function used to navigate the user to a specific page.
 */
export const loginUser = async (userCredentials, dispatch, navigate) => {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { 
                email: userCredentials.email, 
                password: userCredentials.password
            }
        )
    });

    if (response.status === 200) {
        await handleSignupAndLoginSuccess(response, dispatch, navigate);
    } else {
        throw new Error();
    }
}

/**
 * Adds a favorited recipe to the user's cookbook.
 * @param {string} userId - The ID of the user.
 * @param {object} recipe - An object containing the id, title, and image of the recipe.
 * @param {function} dispatch - A redux function used to dispatch a specific action.
 */
export const favoriteRecipe = async (userId, recipe, dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { 
                id: recipe.id, 
                title: recipe.title, 
                image: recipe.image
            }
        )
    });

    if (response.status === 200) {
        await handleRequestSuccess(response, dispatch);
    } else {
        throw new Error();
    }
}

/**
 * Removes a favorited recipe from the user's cookbook.
 * @param {string} userId - The ID of the user.
 * @param {string} recipeId - The ID of the recipe.
 * @param {function} dispatch - A redux function used to dispatch a specific action.
 */
export const deleteRecipe = async (userId, recipeId, dispatch) => {
    const response = await fetch(`/api/users/${userId}/recipes/${recipeId}`, {
        method: 'DELETE'
    });

    if (response.status === 200) {
        await handleRequestSuccess(response, dispatch);
    } else {
        throw new Error();
    }
} 

/**
 * Updates the user's profile information.
 * @param {string} userId - The ID of the user.
 * @param {object} updateObject - An object containing first name, last name, and email for the user. The value of each attribute
 *      will be used to update the user.
 * @param {function} dispatch - A redux function used to dispatch a specific action. 
 */
export const updateUserInfo = async (userId, updateObject, dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateObject)
    });

    if (response.status === 200) {
        await handleRequestSuccess(response, dispatch);
    } else {
        throw new Error();
    }
}

/**
 * Handles successful responses when logging in or signing up the user.
 * @param {object} response - The response object sent back by the server.
 * @param {function} dispatch - A redux function used to dispatch a specific action.
 * @param {function} navigate - A react-router-dom function used to navigate the user to a specific page.
 */
const handleSignupAndLoginSuccess = async (response, dispatch, navigate) => {
    const result = await response.json();
    dispatch({ type: USER_REQUEST_SUCCESS, payload: result });
    sessionStorage.setItem(DATA, JSON.stringify(result));
    sessionStorage.setItem(LOGGED_IN, true);
    navigate('/');
}

/**
 * Handles successful requests other than login or signup requests.
 * @param {object} response - The response object sent back by the server.
 * @param {function} dispatch - A redux function used to dispatch a specific action.
 */
const handleRequestSuccess = async (response, dispatch) => {
    const result = await response.json();
    dispatch({ type: USER_REQUEST_SUCCESS, payload: result });
    sessionStorage.setItem(DATA, JSON.stringify(result));
}
