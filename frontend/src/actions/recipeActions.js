import {
    RESULTS,
    PAGE,
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

/**
 * Creates an asynchronous function that dispatches a recipe results request action, a recipe results success action 
 * if the request is successful, and a recipe results failure action if the request fails.
 * @param {string} searchQuery - The food-related keyword to fetch recipes for.
 * @param {string} calories - The maximum number of calories in each recipe.
 * @param {string} protein - The maximum amount of protein in each recipe in grams.
 * @param {string} carbs - The maximum amount of carbohydrates in each recipe in grams.
 * @param {string} fats - The maximum amount of fat in each recipe in grams.
 * @returns - An asynchronous function that dispatches a recipe results request action, a recipe results success action
 *      if the request is successful, and a recipe results failure action is the request fails.
 */
export const recipeResultsActions = (searchQuery, calories, protein, carbs, fats) => {
    return async function(dispatch) {
        dispatch({ type: RECIPE_RESULTS_REQUEST });

        try {
            let url = `${process.env.REACT_APP_SPOONACULAR_ROOT}/recipes/complexSearch` + 
                `?apiKey=${process.env.REACT_APP_API_KEY}&number=100&query=${searchQuery}`

            if (calories.length > 0) {
                url = url + `&maxCalories=${calories}`;
            }

            if (protein.length > 0) {
                url = url + `&maxProtein=${protein}`;
            }

            if (carbs.length > 0) {
                url = url + `&maxCarbs=${carbs}`;
            }

            if (fats.length > 0) {
                url = url + `&maxFat=${fats}`;
            }

            const response = await fetch(url);
            
            if (response.status === 200) {
                const responseResults = await response.json();
                dispatch({ type: RECIPE_RESULTS_SUCCESS, payload: responseResults.results });
                sessionStorage.setItem(RESULTS, JSON.stringify(responseResults.results));
            } else {
                throw new Error;
            }
        } catch (err) {
            dispatch({ type: RECIPE_RESULTS_FAILURE });
            alert("Failed to fetch recipe results");
        }
    }
}

/**
 * Creates a recipe page change request action object.
 * @returns - A recipe page change request action object.
 */
export const recipeResultsPageRequestAction = () => {
    return { type: RECIPE_PAGE_CHANGE_REQUEST };
}

/**
 * Creates a recipe page change success action object.
 * @param {number} page - The results page that the user is navigating to. 
 * @returns - A recipe page change success action object.
 */
export const recipeResultsPageSuccessAction = (page) => {
    sessionStorage.setItem(PAGE, page);
    return { type: RECIPE_PAGE_CHANGE_SUCCESS, payload: page };
}

/**
 * Creates an asynchrounous function that dispatches a recipe card request action, a recipe card success action
 * if the request succeeds, and a recipe card failure action if the request fails.
 * @param {string} id - The ID of the recipe. 
 * @returns - An asynchronous function that dispatches a recipe card request action, a recipe card success action
 *      if the request succeeds, and a recipe card failure action if the request fails.
 */
export const recipeCardActions = (id) => {
    return async function(dispatch) {
        dispatch({ type: RECIPE_CARD_REQUEST });

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SPOONACULAR_ROOT}/recipes/${id}/card` +
                `?apiKey=${process.env.REACT_APP_API_KEY}`
            );

            if (response.status === 200) {
                const result = await response.json();
                dispatch({ type: RECIPE_CARD_SUCCESS, payload: result.url });
            } else {
                throw new Error;
            }
        } catch (err) {
            dispatch({ type: RECIPE_CARD_FAILURE });
        }
    }
}

/**
 * Creates an asynchronous function that dispatches a recipe card request action, a recipe card success action
 * if the request succeeds, and a recipe card failure action if the request fails.
 * @param {string} id - The ID of the recipe. 
 * @returns - An asynchronous function that dispatches a recipe nutrtion request action, a recipe nutrition success 
 *      action if the request succeeds, and a recipe nutrition failure action if the request fails.
 */
export const recipeNutritionActions = (id) => {
    return async function(dispatch) {
        dispatch({ type: RECIPE_NUTRITION_REQUEST });

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SPOONACULAR_ROOT}/recipes/${id}/nutritionLabel.png` +
                `?apiKey=${process.env.REACT_APP_API_KEY}`
            );

            if (response.status === 200) {
                const blob = await response.blob();
                dispatch({ type: RECIPE_NUTRITION_SUCCESS, payload: URL.createObjectURL(blob) });
            } else {
                throw new Error;
            }
        } catch (err) {
            dispatch({ type: RECIPE_NUTRITION_FAILURE });
        }
    }
}

/**
 * Creates an asynchronous function that dispatches a recipe taste request action, a recipe taste success action
 * if the request succeeds, and a recipe taste failure action if the request fails.
 * @param {string} id - The ID of the recipe.
 * @returns - An asynchronous function that dispatches a recipe taste request action, a recipe taste success action
 *      if the request succeeds, and a recipe taste failure action if the request fails.
 */
export const recipeTasteActions = (id) => {
    return async function(dispatch) {
        dispatch({ type: RECIPE_TASTE_REQUEST });

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SPOONACULAR_ROOT}/recipes/${id}/tasteWidget.json` + 
                `?apiKey=${process.env.REACT_APP_API_KEY}`
            );

            if (response.status === 200) {
                const result = await response.json();
                dispatch({ type: RECIPE_TASTE_SUCCESS, payload: result });
            } else {
                throw new Error;
            }
        } catch (err) {
            dispatch({ type: RECIPE_TASTE_FAILURE });
        }
    }
}

/**
 * Creates an asynchronous function that dispatches a similar recipe request action, a similar recipe success action
 * if the request succeeds, and a similar recipe failure action if the request fails.
 * @param {string} id - The ID of the recipe. 
 * @returns - An asynchronous function that dispatches a similar recipe request action, a similar recipe success action
 *      if the request succeeds, and a similar recipe failure action if the request fails.
 */
export const similarRecipesActions = (id) => {
    return async function(dispatch) {
        dispatch({ type: SIMILAR_RECIPE_REQUEST });

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SPOONACULAR_ROOT}/recipes/${id}/similar` +
                `?apiKey=${process.env.REACT_APP_API_KEY}&number=4`
            );

            if (response.status === 200) {
                const result = await response.json();
                dispatch({ type: SIMILAR_RECIPE_SUCCESS, payload: result });
            } else {
                throw new Error;
            }
        } catch (err) {
            dispatch({ type: SIMILAR_RECIPE_FAILURE });
        }
    }
}

/**
 * Creates a set nutrition filters action object.
 * @param {string} calories - The maximum number of calories in the recipe.
 * @param {string} protein - The maximum amount of protein in the recipe in grams.
 * @param {string} carbs - The maximum amount of carbohydrates in the recipe in grams.
 * @param {string} fats - The maximum amount of fat in the recipe in grams.
 * @returns - A set nutrition filters action object.
 */
export const recipeNutritionFiltersActions = (calories, protein, carbs, fats) => {
    return ({ 
        type: SET_NUTRITION_FILTERS, 
        payload: { calories, protein, carbs, fats } 
    });
}
