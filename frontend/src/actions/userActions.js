import {
    DATA,
    LOGGED_IN,
    USER_REQUEST_ATTEMPT,
    USER_REQUEST_SUCCESS,
    USER_REQUEST_FAILURE
} from '../constants/userConstants';

export const userSignupActions = (firstName, lastName, email, password, navigate) => {
    return async function(dispatch) {
        dispatch({ type: USER_REQUEST_ATTEMPT });

        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            if (response.status === 201) {
                const result = await response.json();
                dispatch({ type: USER_REQUEST_SUCCESS, payload: result });
                sessionStorage.setItem(DATA, JSON.stringify(result));
                sessionStorage.setItem(LOGGED_IN, true);
                navigate('/');
            } else {
                dispatch({ type: USER_REQUEST_FAILURE });
            }
        } catch (err) {
            console.error(err);
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
            }
        } catch (err) {
            console.error(err);
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
            }
        } catch (err) {
            console.error(err);
        }
    }
}
