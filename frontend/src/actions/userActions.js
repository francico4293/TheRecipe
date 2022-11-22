import {
    DATA,
    LOGGED_IN,
    USER_REQUEST_ATTEMPT,
    USER_REQUEST_SUCCESS,
    USER_REQUEST_FAILURE,
    SHOW_INGREDIENT_TOOL,
    HIDE_INGREDIENT_TOOL
} from '../constants/userConstants';

export const userSignupActions = (userInfo, navigate) => {
    return async function(dispatch) {
        dispatch({ type: USER_REQUEST_ATTEMPT });

        try {
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
                const result = await response.json();
                dispatch({ type: USER_REQUEST_SUCCESS, payload: result });
                sessionStorage.setItem(DATA, JSON.stringify(result));
                sessionStorage.setItem(LOGGED_IN, true);
                navigate('/');
            } else {
                throw new Error();
            }
        } catch (err) {
            dispatch({ type: USER_REQUEST_FAILURE });
        }
    }
}

export const userLoginActions = (email, password, navigate) => {
    return async function(dispatch) {
        dispatch({ type: USER_REQUEST_ATTEMPT });

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.status === 200) {
                const result = await response.json();
                dispatch({ type: USER_REQUEST_SUCCESS, payload: result });
                sessionStorage.setItem(DATA, JSON.stringify(result));
                sessionStorage.setItem(LOGGED_IN, true);
                navigate('/');
            } else {
                throw new Error();
            }
        } catch (err) {
            dispatch({ type: USER_REQUEST_FAILURE });
        }
    }
}

export const userRecipeFavoriteActions = (id, recipeId, title, image) => {
    return async function(dispatch) {
        dispatch({ type: USER_REQUEST_ATTEMPT });

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: recipeId, title, image })
            });

            if (response.status === 200) {
                const result = await response.json();
                dispatch({ type: USER_REQUEST_SUCCESS, payload: result });
                sessionStorage.setItem(DATA, JSON.stringify(result));
            } else {
                throw new Error();
            }
        } catch (err) {
            dispatch({ type: USER_REQUEST_FAILURE });
        }
    }
}

export const userRecipeDeleteActions = (userId, recipeId) => {
    return async function(dispatch) {
        dispatch({ type: USER_REQUEST_ATTEMPT });
        
        try {
            const response = await fetch(`/api/users/${userId}/recipes/${recipeId}`, {
                method: 'DELETE'
            });

            if (response.status === 200) {
                const result = await response.json();
                dispatch({ type: USER_REQUEST_SUCCESS, payload: result });
                sessionStorage.setItem(DATA, JSON.stringify(result));
            } else {
                throw new Error();
            }
        } catch (err) {
            dispatch({ type: USER_REQUEST_FAILURE });
        }
    }
}

export const showIngredientToolAction = () => {
    return { type: SHOW_INGREDIENT_TOOL };
}

export const hideIngredientToolAction = () => {
    return { type: HIDE_INGREDIENT_TOOL };
}
