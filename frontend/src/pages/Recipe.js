import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from 'react-bootstrap/Spinner';
import RecipeResult from '../components/RecipeResult';
import { TasteProfile } from '../components/TasteProfile';

const Recipe = () => {
    const recipeCard = useSelector(state => state.recipeCard);
    const recipeNutrition = useSelector(state => state.recipeNutrition);
    const recipeTaste = useSelector(state => state.recipeTaste);
    const similarRecipes = useSelector(state => state.similarRecipes);

    const getComponent = () => {
        if (recipeCard.recipeCardLoading && recipeNutrition.recipeNutritionLoading && recipeTaste.recipeTasteLoading && similarRecipes.similarRecipesLoading) {
            return (
                <Spinner animation='border' role='status' style={{ width: '150px', height: '150px', margin: 'auto', display: 'block' }}></Spinner>
            );
        } else {
            return (
                <div id="recipe-container">
                    <div id="inner-container">
                        <img id="recipe-card" src={recipeCard.card}></img>
                        <div>
                            <div id='recipe-taste'>
                                <TasteProfile profile={recipeTaste.taste}/>
                            </div>
                            <img id="recipe-nutrition" src={recipeNutrition.nutrition}></img>
                        </div>
                    </div>
                    <h2>Similar Recipes You Might Like</h2>
                    <div className='search-results'>
                        {similarRecipes.recipes.map((recipe, idx) => <RecipeResult result={recipe} key={idx}/>)}
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            <Header />
            {getComponent()}
            <Footer />
        </>
    );
}

export default Recipe;
