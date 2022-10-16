import { 
    legacy_createStore as createStore, 
    combineReducers, 
    applyMiddleware 
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
    recipeResultsReducer,
    recipeResultsPageReducer,
    recipeCardReducer,
    recipeNutritionReducer,
    recipeTasteReducer,
    similarRecipesReducer
} from './reducers/recipeReducers';
import { userReducer } from './reducers/userReducers';
import { RESULTS, PAGE } from './constants/recipeConstants'
import { DATA, LOGGED_IN } from './constants/userConstants';

const reducer = combineReducers({
    recipeResults: recipeResultsReducer,
    recipeResultsPage: recipeResultsPageReducer,
    user: userReducer,
    recipeCard: recipeCardReducer,
    recipeNutrition: recipeNutritionReducer,
    recipeTaste: recipeTasteReducer,
    similarRecipes: similarRecipesReducer
});

const resultsFromStorage = sessionStorage.getItem(RESULTS) 
    ? JSON.parse(sessionStorage.getItem(RESULTS)) 
    : [];

const pageFromStorage = sessionStorage.getItem(PAGE) 
    ? parseInt(sessionStorage.getItem(PAGE)) 
    : 0;

const dataFromStorage = sessionStorage.getItem(DATA) 
    ? JSON.parse(sessionStorage.getItem(DATA)) 
    : {};

const userLoggedInFromStorage = sessionStorage.getItem(LOGGED_IN) 
    ? sessionStorage.getItem(LOGGED_IN) === 'true' 
    : false;

const initialState = {
    recipeResults: { resultsLoading: false, results: resultsFromStorage },
    recipeResultsPage: { pageLoading: false, page: pageFromStorage },
    user: { userLoading: false, userLoggedIn: userLoggedInFromStorage, data: dataFromStorage }
};

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
