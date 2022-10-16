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
import { userRecipeFavoriteActions } from '../actions/userActions';

const RecipeResult = ({ result, page }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [showPopover, setShowPopover] = useState(false);
    const [showDeleteRecipePopover, setShowDeleteRecipePopover] = useState(false);

    const dispatchRecipeFavoriteActions = () => {
        dispatch(userRecipeFavoriteActions(user.data.id, result.id, result.title, result.image));
    }

    const dispatchExploreRecipeActions = () => {
        navigate(`/recipes/${result.id}`)
        dispatch(recipeCardActions(result.id));
        dispatch(recipeNutritionActions(result.id));
        dispatch(recipeTasteActions(result.id));
        dispatch(similarRecipesActions(result.id));
    }

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

    const deleteRecipePopover = (
        <Popover>
            <Popover.Header as="h3">Warning!</Popover.Header>
            <Popover.Body>
                Deleting a recipe will remove it from your cookbook. Are you sure?
            </Popover.Body>
            <Stack direction='horizontal' gap={2}>
                <Button variant='outline-primary' className='ms-auto mb-2' onClick={() => setShowDeleteRecipePopover(false)}>Ok</Button>
                <Button variant='outline-secondary' className='mb-2 me-1' onClick={() => setShowDeleteRecipePopover(false)}>Cancel</Button>
            </Stack>
        </Popover>
    );

    const getIcon = () => {
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
        } else if (page === 'cookbook') {
            return (
                <OverlayTrigger show={showDeleteRecipePopover} trigger="click" placement="top" overlay={deleteRecipePopover}>
                    <i className="fa-regular fa-trash-can fa-2x" onClick={() => setShowDeleteRecipePopover(true)}></i> 
                </OverlayTrigger>
            );
        }
    }

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
