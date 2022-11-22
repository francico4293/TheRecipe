import { 
    USER_REQUEST_ATTEMPT,
    USER_REQUEST_SUCCESS,
    USER_REQUEST_FAILURE,
    SHOW_INGREDIENT_TOOL,
    HIDE_INGREDIENT_TOOL
} from '../constants/userConstants';

/**
 * Updates the state of the user based on an action that was triggered from client interaction.
 * @param {object} state - The initial state of the user. 
 * @param {object} action - The user action that was triggered.
 * @returns - An object representing the new state of the user.
 */
export const userReducer = (state = { userLoading: false, userLoggedIn: false, data: {} }, action) => {
    switch (action.type) {
        case USER_REQUEST_ATTEMPT:
            return { userLoading: true, userLoggedIn: false, data: state.data };
        case USER_REQUEST_SUCCESS:
            return { userLoading: false, userLoggedIn: true, data: action.payload };
        case USER_REQUEST_FAILURE:
            return { userLoading: false, userLoggedIn: false, error: true };
        default:
            return state;
    }
}

/**
 * Updates the state of the of the ingredient definition tool based on an action that was triggered from client interaction.
 * @param {object} state - The initial state of the ingredient definition tool. 
 * @param {object} action - The ingredient definition tool action that was triggered.
 * @returns - An object representing the new state of the ingredient definition tool.
 */
export const ingredientDefinitionToolReducer = (state = { showTool: false }, action) => {
    switch (action.type) {
        case SHOW_INGREDIENT_TOOL:
            return { showTool: true };
        case HIDE_INGREDIENT_TOOL:
            return { showTool: false };
        default:
            return state;
    }
}
