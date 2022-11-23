import { 
    RESULTS, 
    RECIPE_RESULTS_SUCCESS,
    RECIPE_CARD_SUCCESS,
    RECIPE_TASTE_SUCCESS,
    RECIPE_NUTRITION_SUCCESS,
    SIMILAR_RECIPE_SUCCESS
} from "../constants/recipeConstants";

export const requestRecipes = async (url, dispatch) => {
    const response = await fetch(url);
            
    if (response.status === 200) {
        const responseResults = await response.json();
        sessionStorage.setItem(RESULTS, JSON.stringify(responseResults.results));
        dispatch({ type: RECIPE_RESULTS_SUCCESS, payload: responseResults.results });
    } else {
        throw new Error();
    }
}

export const requestRecipeCard = async (url, dispatch) => {
    const response = await fetch(url);

    if (response.status === 200) {
        const result = await response.json();
        dispatch({ type: RECIPE_CARD_SUCCESS, payload: result.url });
    } else {
        throw new Error();
    }
}

export const requestRecipeNutrition = async (url, dispatch) => {
    const response = await fetch(url);

    if (response.status === 200) {
        const blob = await response.blob();
        dispatch({ type: RECIPE_NUTRITION_SUCCESS, payload: URL.createObjectURL(blob) });
    } else {
        throw new Error();
    }
}

export const requestRecipeTaste = async (url, dispatch) => {
    const response = await fetch(url);

    if (response.status === 200) {
        const result = await response.json();
        dispatch({ type: RECIPE_TASTE_SUCCESS, payload: result });
    } else {
        throw new Error();
    }
}

export const requestSimilarRecipes = async (url, dispatch) => {
    const response = await fetch(url);

    if (response.status === 200) {
        const result = await response.json();
        dispatch({ type: SIMILAR_RECIPE_SUCCESS, payload: result });
    } else {
        throw new Error();
    }
}
