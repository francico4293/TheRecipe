import { 
    RESULTS, 
    RECIPE_RESULTS_SUCCESS,
    RECIPE_CARD_SUCCESS,
    RECIPE_TASTE_SUCCESS,
    RECIPE_NUTRITION_SUCCESS,
    SIMILAR_RECIPE_SUCCESS
} from "../constants/recipeConstants";

/**
 * Makes an HTTP GET request for recipes associated with a specific food keyword. 
 * @param {string} url - The target URL to make the HTTP GET request to.
 * @param {function} dispatch - A redux function used to dispatch actions.
 */
export const requestRecipes = async (url, dispatch) => {
    const response = await fetch(url);
            
    if (response.status === 200) {
        await handleRecipeRequestSuccess(response, dispatch);
    } else {
        throw new Error();
    }
}

/**
 * Makes an HTTP GET request for a recipe card.
 * @param {string} url - The target URL to make the HTTP GET request to.
 * @param {function} dispatch - A redux function used to dispatch actions.
 */
export const requestRecipeCard = async (url, dispatch) => {
    const response = await fetch(url);

    if (response.status === 200) {
        await handleRecipeCardSuccess(response, dispatch);
    } else {
        throw new Error();
    }
}

/**
 * Makes an HTTP GET request for a recipe nutrition label.
 * @param {string} url - The target URL to make the HTTP GET request to.
 * @param {function} dispatch - A redux function used to dispatch actions.
 */
export const requestRecipeNutrition = async (url, dispatch) => {
    const response = await fetch(url);

    if (response.status === 200) {
        await handleRecipeNutritionSuccess(response, dispatch);
    } else {
        throw new Error();
    }
}

/**
 * Makes an HTTP GET request for a recipe taste profile JSON object.
 * @param {string} url - The target URL to make the HTTP GET request to.
 * @param {function} dispatch - A redux function used to dispatch actions.
 */
export const requestRecipeTaste = async (url, dispatch) => {
    const response = await fetch(url);

    if (response.status === 200) {
        await handleRecipeTasteSuccess(response, dispatch);
    } else {
        throw new Error();
    }
}

/**
 * Makes an HTTP GET request for similar recipes.
 * @param {string} url - The target URL to make the HTTP GET request to.
 * @param {function} dispatch - A redux function used to dispatch actions.
 */
export const requestSimilarRecipes = async (url, dispatch) => {
    const response = await fetch(url);

    if (response.status === 200) {
        await handleSimilarRecipeSuccess(response, dispatch);
    } else {
        throw new Error();
    }
}

const handleRecipeRequestSuccess = async (response, dispatch) => {
    const responseResults = await response.json();
    sessionStorage.setItem(RESULTS, JSON.stringify(responseResults.results));
    dispatch({ type: RECIPE_RESULTS_SUCCESS, payload: responseResults.results });
}

const handleRecipeCardSuccess = async (response, dispatch) => {
    const result = await response.json();
    dispatch({ type: RECIPE_CARD_SUCCESS, payload: result.url });
}

const handleRecipeNutritionSuccess = async (response, dispatch) => {
    const blob = await response.blob();
    dispatch({ type: RECIPE_NUTRITION_SUCCESS, payload: URL.createObjectURL(blob) });
}

const handleRecipeTasteSuccess = async (response, dispatch) => {
    const result = await response.json();
    dispatch({ type: RECIPE_TASTE_SUCCESS, payload: result });
}

const handleSimilarRecipeSuccess = async (response, dispatch) => {
    const result = await response.json();
    dispatch({ type: SIMILAR_RECIPE_SUCCESS, payload: result });
}
