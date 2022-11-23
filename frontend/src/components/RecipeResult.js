import React, { useState } from 'react';
import { 
    useDispatch, 
    useSelector 
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { recipeActions } from '../actions/recipeActions';
import { 
    userRecipeFavoriteActions, 
    userRecipeDeleteActions 
} from '../actions/userActions';
import { 
    RECIPE_CARD_FAILURE, 
    RECIPE_CARD_REQUEST, 
    RECIPE_CARD_SUCCESS, 
    RECIPE_NUTRITION_FAILURE, 
    RECIPE_NUTRITION_REQUEST,
    RECIPE_NUTRITION_SUCCESS,
    RECIPE_TASTE_FAILURE,
    RECIPE_TASTE_REQUEST,
    RECIPE_TASTE_SUCCESS,
    SIMILAR_RECIPE_FAILURE,
    SIMILAR_RECIPE_REQUEST,
    SIMILAR_RECIPE_SUCCESS
} from '../constants/recipeConstants';
import { 
    requestRecipeCard, 
    requestRecipeNutrition, 
    requestRecipeTaste, 
    requestSimilarRecipes
} from '../utilities/recipeUtils';

const RecipeResult = ({ result, page }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [showPopover, setShowPopover] = useState(false);
    const [showDeleteRecipePopover, setShowDeleteRecipePopover] = useState(false);

    const dispatchRecipeFavoriteActions = () => {
        dispatch(userRecipeFavoriteActions(user.data.id, result));
    }

    const dispatchRecipeDeleteActions = () => {
        setShowDeleteRecipePopover(false);
        dispatch(userRecipeDeleteActions(user.data.id, result.recipeId));
    }

    const dispatchRecipeCardActions = () => {
        const url = `${process.env.REACT_APP_SPOONACULAR_ROOT}/recipes/${result.id}/card` +
            `?apiKey=${process.env.REACT_APP_API_KEY}`;

        const dispatchTypes = {
            request: RECIPE_CARD_REQUEST,
            success: RECIPE_CARD_SUCCESS,
            failure: RECIPE_CARD_FAILURE
        };

        dispatch(recipeActions(url, dispatchTypes, requestRecipeCard));
    }

    const dispatchRecipeNutritionActions = () => {
        const url = `${process.env.REACT_APP_SPOONACULAR_ROOT}/recipes/${result.id}/nutritionLabel.png` +
            `?apiKey=${process.env.REACT_APP_API_KEY}`;

        const dispatchTypes = {
            request: RECIPE_NUTRITION_REQUEST,
            success: RECIPE_NUTRITION_SUCCESS,
            failure: RECIPE_NUTRITION_FAILURE
        };

        dispatch(recipeActions(url, dispatchTypes, requestRecipeNutrition));
    }

    const dispatchRecipeTasteActions = () => {
        const url = `${process.env.REACT_APP_SPOONACULAR_ROOT}/recipes/${result.id}/tasteWidget.json` + 
            `?apiKey=${process.env.REACT_APP_API_KEY}`;
        
        const dispatchTypes = {
            request: RECIPE_TASTE_REQUEST,
            success: RECIPE_TASTE_SUCCESS,
            failure: RECIPE_TASTE_FAILURE
        };

        dispatch(recipeActions(url, dispatchTypes, requestRecipeTaste));
    }

    const dispatchSimilarRecipeActions = () => {
        const url = `${process.env.REACT_APP_SPOONACULAR_ROOT}/recipes/${result.id}/similar` +
            `?apiKey=${process.env.REACT_APP_API_KEY}&number=4`;

        const dispatchTypes = {
            request: SIMILAR_RECIPE_REQUEST,
            success: SIMILAR_RECIPE_SUCCESS,
            failure: SIMILAR_RECIPE_FAILURE
        };

        dispatch(recipeActions(url, dispatchTypes, requestSimilarRecipes));
    }

    const dispatchExploreRecipeActions = () => {
        dispatchRecipeCardActions();
        dispatchRecipeNutritionActions();
        dispatchRecipeTasteActions();
        dispatchSimilarRecipeActions();
    }

    const handleExporeRecipesClick = () => {
        navigate(`/recipes/${result.id}`);
        dispatchExploreRecipeActions();
    }

    // show warning to user when they favorite a recipe
    const favoriteRecipePopover = (
        <Popover>
            <Popover.Header as="h3">Warning!</Popover.Header>
            <Popover.Body>
                Favoriting a recipe will add it to your cookbook. Are you sure?
            </Popover.Body>
            <Stack direction='horizontal' gap={2}>
                <Button variant='outline-primary' className='ms-auto mb-2' onClick={() => dispatchRecipeFavoriteActions()}>Ok</Button>
                <Button variant='outline-secondary' className='mb-2 me-1' onClick={() => setShowPopover(false)}>Cancel</Button>
            </Stack>
        </Popover>
    );

    // show warning to user when they delete a recipe
    const deleteRecipePopover = (
        <Popover>
            <Popover.Header as="h3">Warning!</Popover.Header>
            <Popover.Body>
                Deleting a recipe will remove it from your cookbook. Are you sure?
            </Popover.Body>
            <Stack direction='horizontal' gap={2}>
                <Button variant='outline-primary' className='ms-auto mb-2' onClick={() => dispatchRecipeDeleteActions()}>Ok</Button>
                <Button variant='outline-secondary' className='mb-2 me-1' onClick={() => setShowDeleteRecipePopover(false)}>Cancel</Button>
            </Stack>
        </Popover>
    );

    const getIcon = () => {
        // on home page, show empty heart if recipe is not favorited. Otherwise, show filled heart
        if (page === 'home') {
            return (
                user.data.recipes && user.data.recipes.map(recipe => recipe.recipeId).includes(result.id) 
                            ? <i className='fa-solid fa-heart fa-2x'></i> 
                            : (
                                <OverlayTrigger show={showPopover} trigger="click" placement="top" overlay={favoriteRecipePopover}>
                                    <i className='fa-regular fa-heart fa-2x' onClick={() => setShowPopover(true)}></i>
                                </OverlayTrigger>
                            )
            );
        // recipes on cookbook page are favorited, just show empty trash to delete recipe from cookbook
        } else if (page === 'cookbook') {
            return (
                <OverlayTrigger show={showDeleteRecipePopover} trigger="click" placement="top" overlay={deleteRecipePopover}>
                    <i className="fa-regular fa-trash-can fa-2x" onClick={() => setShowDeleteRecipePopover(true)}></i> 
                </OverlayTrigger>
            );
        }
    }
    
    // only show heart icons if user is a logged in member
    const getComponent = () => {
        if (user.userLoggedIn) {
            return (
                <div id='recipe-actions-container'>
                    <Button variant='primary' onClick={() => handleExporeRecipesClick()}>Explore Recipe</Button>
                    {getIcon()}
                </div>
            );
        } else { 
            return (
                <Button variant='primary' onClick={() => handleExporeRecipesClick()}>Explore Recipe</Button>
            );
        }
    }

    return (
        <>
            <Card className='recipe-result' style={{ width: '30rem' }}>
                <Card.Img variant='top' src={result.image} />
                <Card.Body>
                    <Card.Title>{result.title}</Card.Title>
                    {getComponent()}
                </Card.Body>
            </Card>
        </>
    );
}

export default RecipeResult;
