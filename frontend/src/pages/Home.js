import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { recipeResultsActions } from '../actions/recipeActions';
import RecipeResult from '../components/RecipeResult';
import Paginate from '../components/Paginate';
import { RESULTS, PAGE } from '../constants/recipeConstants';
import Welcome from '../components/Welcome';
import NutritionFilter from '../components/NutritionFilter';
import { WELCOME } from '../constants/commonConstants';

const Home = () => {
    const dispatch = useDispatch();

    const recipeResults = useSelector(state => state.recipeResults);
    const recipeResultsPage = useSelector(state => state.recipeResultsPage);
    const user = useSelector(state => state.user);

    const [searchQuery, setSearchQuery] = useState('');
    const [showPopover, setShowPopover] = useState(false);
    const [showNutritionFilter, setShowNutritionFilter] = useState(false);
    const [reachedPageBottom, setReachedPageBottom] = useState(false);

    const dispatchRecipeResultsActions = () => {;
        dispatch(recipeResultsActions(searchQuery));
    }

    const clearSearchResults = () => {
        setShowPopover(false);
        sessionStorage.setItem(RESULTS, []);
        sessionStorage.setItem(PAGE, 0);
        window.location.reload(false);
    }

    const renderTooltip = (props, message) => (
        <Tooltip id='button-tooltip' {...props}>
            {message}
        </Tooltip>
    );

    const popover = (
        <Popover>
            <Popover.Header as="h3">Warning!</Popover.Header>
            <Popover.Body>
                Clearing your search results will cause you to lose all of
                your recipe results. Are you sure?
            </Popover.Body>
            <Stack direction='horizontal' gap={2}>
                <Button variant='outline-primary' className='ms-auto mb-2' onClick={() => clearSearchResults()}>Ok</Button>
                <Button variant='outline-secondary' className='mb-2 me-1' onClick={() => setShowPopover(false)}>Cancel</Button>
            </Stack>
        </Popover>
    );

    const showWelcomeModal = () => {
        sessionStorage.setItem(WELCOME, true);
        return <Welcome />;
    }

    window.addEventListener('scroll', () => {
        const scrollHeight = document.scrollingElement.scrollHeight;
        const clientHeight = document.scrollingElement.clientHeight;
        const scrollTop = document.scrollingElement.scrollTop;

        if (scrollTop + clientHeight === scrollHeight) {
            setReachedPageBottom(true);
        }
    });

    const endIdx = (recipeResultsPage.page + 1) * 10;
    const startIdx = endIdx - 10;

    return (
        <>
            <Header/>
            <NutritionFilter showNutritionFilter={showNutritionFilter} setShowNutritionFilter={setShowNutritionFilter}/>
            {(reachedPageBottom && !sessionStorage.getItem(WELCOME)) && showWelcomeModal()}
            <div id='landing-page-container'>
                <div>
                    {user.userLoggedIn && <h1>Hi, {user.data.firstName}.</h1>}
                    <div id='content-container'>
                        <p id='slogan'>Fast.Fun.Delicious.</p>
                        <p id='content'>Find And Explore Recipes <br/> Perfectly Crafted For You.</p>
                    </div>
                    <div id='hint-container'>
                        <p>Get Started Below</p>
                    </div>
                </div>
            </div>
            <div id='search-results-container'>
                <h2>Find Recipes</h2>
                <div>
                    <span><i className='fa-solid fa-magnifying-glass fa-2x' onClick={() => dispatchRecipeResultsActions()}></i></span>
                    <OverlayTrigger placement='top' delay={{ show: 250, hide: 400 }} overlay={props => renderTooltip(props, 'Use me to search for recipes using food related keywords like tacos, vegan, italian, etc.')}>
                        <input id='recipe-search' type='text' placeholder='What are you hungry for?' onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && dispatchRecipeResultsActions()}></input>
                    </OverlayTrigger>
                    <OverlayTrigger placement='right' delay={{ show: 250, hide: 400 }} overlay={props => renderTooltip(props, 'Advanced nutrition filter')}>
                        <span><i className='fa-solid fa-filter fa-2x' onClick={() => setShowNutritionFilter(true)}></i></span>
                    </OverlayTrigger>
                </div>
                <OverlayTrigger show={showPopover} trigger="click" placement="top" overlay={popover}>
                    <Button variant='primary' onClick={() => setShowPopover(true)}>Clear Search Results</Button>
                </OverlayTrigger>
                <div className='search-results'>
                    {
                        recipeResults.resultsLoading || recipeResultsPage.pageLoading
                            ? <Spinner animation='border' role='status' style={{ width: '150px', height: '150px', margin: 'auto', display: 'block' }}></Spinner>
                            : recipeResults.results.slice(startIdx, endIdx).map((result, idx) => <RecipeResult result={result} page={'home'} key={idx}/>)
                    }
                </div>
                {!recipeResults.resultsLoading && !recipeResultsPage.pageLoading && <Paginate/>}
            </div>
            <Footer/>
        </>
    );
}

export default Home;
