import {
    DATA,
    LOGGED_IN,
    USER_REQUEST_SUCCESS,
} from '../constants/userConstants';

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

const handleSignupAndLoginSuccess = async (response, dispatch, navigate) => {
    const result = await response.json();
    dispatch({ type: USER_REQUEST_SUCCESS, payload: result });
    sessionStorage.setItem(DATA, JSON.stringify(result));
    sessionStorage.setItem(LOGGED_IN, true);
    navigate('/');
}

const handleRequestSuccess = async (response, dispatch) => {
    const result = await response.json();
    dispatch({ type: USER_REQUEST_SUCCESS, payload: result });
    sessionStorage.setItem(DATA, JSON.stringify(result));
}
