import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { 
    recipeCardActions,
    recipeNutritionActions,
    recipeTasteActions,
    similarRecipesActions
} from '../actions/recipeActions';
import { 
    userRecipeFavoriteActions, 
    userRecipeDeleteActions 
} from '../actions/userActions';

const RecipeResult = ({ result, page }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [showPopover, setShowPopover] = useState(false);
    const [showDeleteRecipePopover, setShowDeleteRecipePopover] = useState(false);

    // redux actions dispatched when user favorites a recipe in recipe results page
    const dispatchRecipeFavoriteActions = () => {
        dispatch(userRecipeFavoriteActions(user.data.id, result.id, result.title, result.image));
    }

    // redux actions dispatched when used clicks "delete" on recipe card in cookbook
    const dispatchRecipeDeleteActions = () => {
        setShowDeleteRecipePopover(false);
        dispatch(userRecipeDeleteActions(user.data.id, result.recipeId));
    }

    // redux actions dispatched when used clicks "explore" on recipe card in recipe results page
    const dispatchExploreRecipeActions = () => {
        navigate(`/recipes/${result.id}`)
        dispatch(recipeCardActions(result.id));
        dispatch(recipeNutritionActions(result.id));
        dispatch(recipeTasteActions(result.id));
        dispatch(similarRecipesActions(result.id));
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
                    <Button variant='primary' onClick={() => dispatchExploreRecipeActions()}>Explore Recipe</Button>
                    {getIcon()}
                </div>
            );
        } else { 
            return (
                <Button variant='primary' onClick={() => dispatchExploreRecipeActions()}>Explore Recipe</Button>
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
