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
