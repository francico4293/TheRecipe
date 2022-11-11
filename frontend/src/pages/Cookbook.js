import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeResult from '../components/RecipeResult';
import IngredientDefinitionTool from '../components/IngredientDefinitionTool';

const Cookbook = () => {
    const user = useSelector(state => state.user);

    return (
        <div id='cookbook-container'>
            <Header/>
            <IngredientDefinitionTool />
            <div className='cookbook-results'>
                {user.data.recipes.map((recipe, idx) => <RecipeResult result={recipe} page={'cookbook'} key={idx}/>)}
            </div>
            <Footer/>
        </div>
    );
}

export default Cookbook;
