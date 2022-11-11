import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeResult from '../components/RecipeResult';
import IngredientDefinitionTool from '../components/IngredientDefinitionTool';

const Cookbook = () => {
    const user = useSelector(state => state.user);

    return (
        <>
            <Header/>
            <div id='cookbook-profile-container'>
                <h1>Welcome to your Cookbook, {user.data.firstName}.</h1>
            </div>
            <div id='cookbook-results-container'>
                <IngredientDefinitionTool />
                <div id='cookbook-results'>
                    {user.data.recipes.map((recipe, idx) => <RecipeResult result={recipe} page={'cookbook'} key={idx}/>)}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Cookbook;
