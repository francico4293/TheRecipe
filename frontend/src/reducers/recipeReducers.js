import { 
    RECIPE_RESULTS_REQUEST,
    RECIPE_RESULTS_SUCCESS,
    RECIPE_RESULTS_FAILURE,
    RECIPE_PAGE_CHANGE_REQUEST,
    RECIPE_PAGE_CHANGE_SUCCESS,
    RECIPE_CARD_REQUEST,
    RECIPE_CARD_SUCCESS,
    RECIPE_CARD_FAILURE,
    RECIPE_NUTRITION_REQUEST,
    RECIPE_NUTRITION_SUCCESS,
    RECIPE_NUTRITION_FAILURE,
    RECIPE_TASTE_REQUEST,
    RECIPE_TASTE_SUCCESS,
    RECIPE_TASTE_FAILURE,
    SIMILAR_RECIPE_REQUEST,
    SIMILAR_RECIPE_SUCCESS,
    SIMILAR_RECIPE_FAILURE,
    SET_NUTRITION_FILTERS
} from '../constants/recipeConstants';

export const recipeResultsReducer = (state = { resultsLoading: false, results: [] }, action) => {
    switch (action.type) {
        case RECIPE_RESULTS_REQUEST:
            return { resultsLoading: true, results: state.results };
        case RECIPE_RESULTS_SUCCESS:
            return { resultsLoading: false, results: action.payload };
        case RECIPE_RESULTS_FAILURE:
            return { resultsLoading: false, results: state.results };
        default:
            return state;
    }
}

export const recipeResultsPageReducer = (state = { pageLoading: false, page: 0 }, action) => {
    switch (action.type) {
        case RECIPE_PAGE_CHANGE_REQUEST:
            return { pageLoading: true, page: state.page };
        case RECIPE_PAGE_CHANGE_SUCCESS:
            return { pageLoading: false, page: action.payload };
        default:
            return state;
    }
}

export const recipeCardReducer = (state = { recipeCardLoading: false, card: '' }, action) => {
    switch (action.type) {
        case RECIPE_CARD_REQUEST:
            return { recipeCardLoading: true, card: '' };
        case RECIPE_CARD_SUCCESS:
            return { recipeCardLoading: false, card: action.payload };
        case RECIPE_CARD_FAILURE:
            return { recipeCardLoading: false, card: '' };
        default:
            return state;
    }
}

export const recipeNutritionReducer = (state = { recipeNutritionLoading: false, nutrition: '' }, action) => {
    switch (action.type) {
        case RECIPE_NUTRITION_REQUEST:
            return { recipeNutritionLoading: true, nutrition: '' };
        case RECIPE_NUTRITION_SUCCESS:
            return { recipeNutritionLoading: false, nutrition: action.payload };
        case RECIPE_NUTRITION_FAILURE:
            return { recipeNutritionLoading: false, nutrition: '' };
        default:
            return state;
    }
}

export const recipeTasteReducer = (state = { recipeTasteLoading: false, taste: '' }, action) => {
    switch (action.type) {
        case RECIPE_TASTE_REQUEST:
            return { recipeTasteLoading: true, taste: '' };
        case RECIPE_TASTE_SUCCESS:
            return { recipeTasteLoading: false, taste: action.payload };
        case RECIPE_TASTE_FAILURE:
            return { recipeTasteLoading: false, taste: '' };
        default:
            return state;
    }
}

export const similarRecipesReducer = (state = { similarRecipesLoading: false, recipes: [] }, action) => {
    switch (action.type) {
        case SIMILAR_RECIPE_REQUEST:
            return { similarRecipesLoading: true, recipes: [] };
        case SIMILAR_RECIPE_SUCCESS:
            return { similarRecipesLoading: false, recipes: action.payload };
        case SIMILAR_RECIPE_FAILURE:
            return { similarRecipesLoading: false, recipes: [] };
        default:
            return state;
    }
}

export const recipeNutritionFiltersReducer = (state = { calories: '', protein: '', carbs: '', fats: '' }, action) => {
    switch (action.type) {
        case SET_NUTRITION_FILTERS:
            return { 
                calories: action.payload.calories, 
                protein: action.payload.protein, 
                carbs: action.payload.carbs, 
                fats: action.payload.fats 
            };
        default:
            return state;
    }
}
