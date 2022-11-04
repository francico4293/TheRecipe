import { 
    USER_REQUEST_ATTEMPT,
    USER_REQUEST_SUCCESS,
    USER_REQUEST_FAILURE,
    SHOW_INGREDIENT_TOOL,
    HIDE_INGREDIENT_TOOL
} from '../constants/userConstants';

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
