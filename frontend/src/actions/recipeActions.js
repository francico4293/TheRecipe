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
    RECIPE_NUTRITION_REQUEST,
    RECIPE_NUTRITION_SUCCESS,
    RECIPE_TASTE_REQUEST,
    RECIPE_TASTE_SUCCESS,
    SIMILAR_RECIPE_REQUEST,
    SIMILAR_RECIPE_SUCCESS
} from '../constants/recipeConstants';

export const recipeResultsActions = (searchQuery) => {
    return async function(dispatch) {
        dispatch({ type: RECIPE_RESULTS_REQUEST });

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SPOONACULAR_ROOT}/recipes/complexSearch` + 
                `?apiKey=${process.env.REACT_APP_API_KEY}&number=100&query=${searchQuery}`
            );
            
            if (response.status === 200) {
                const responseResults = await response.json();
                dispatch({ type: RECIPE_RESULTS_SUCCESS, payload: responseResults.results });
                sessionStorage.setItem(RESULTS, JSON.stringify(responseResults.results));
            }
        } catch (err) {

        }
    }
}

export const recipeResultsPageRequestAction = () => {
    return { type: RECIPE_PAGE_CHANGE_REQUEST };
}

export const recipeResultsPageSuccessAction = (page) => {
    sessionStorage.setItem(PAGE, page);
    return { type: RECIPE_PAGE_CHANGE_SUCCESS, payload: page };
}

export const recipeCardActions = (id) => {
    return async function(dispatch) {
        dispatch({ type: RECIPE_CARD_REQUEST });

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SPOONACULAR_ROOT}/recipes/${id}/card` +
                `?apiKey=${process.env.REACT_APP_API_KEY}`
            )

            console.log(response);

            if (response.status === 200) {
                const result = await response.json();
                dispatch({ type: RECIPE_CARD_SUCCESS, payload: result.url });
            }
        } catch (err) {

        }
    }
}

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
            }
        } catch (err) {

        }
    }
}

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
            }
        } catch (err) {

        }
    }
}

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
            }
        } catch (err) {

        }
    }
}
