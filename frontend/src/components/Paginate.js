import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { 
    PAGE,
    RECIPE_PAGE_CHANGE_REQUEST, 
    RECIPE_PAGE_CHANGE_SUCCESS 
} from '../constants/recipeConstants';

const Paginate = () => {
    const dispatch = useDispatch();

    const recipeResults = useSelector(state => state.recipeResults);
    const recipeResultsPage = useSelector(state => state.recipeResultsPage);

    const dispatchRecipeResultsPageActions = (page) => {
        dispatch({ type: RECIPE_PAGE_CHANGE_REQUEST });
        // simulated lag in new page request
        setTimeout(() => {
            dispatch({ type: RECIPE_PAGE_CHANGE_SUCCESS, payload: page });
            sessionStorage.setItem(PAGE, page);
            window.scrollTo(0, 1000);
        }, 500);
    }

    // number of pages based on 10 results per page
    const pages = recipeResults.results.length / 10;

    const items = [];
    for (let page = 0; page < pages; page++) {
        items.push(
            <Pagination.Item key={page} active={page === recipeResultsPage.page} onClick={() => dispatchRecipeResultsPageActions(page)}>
                {page + 1}
            </Pagination.Item>
        );
    }

    return (
        <Pagination>{items}</Pagination>
    );
}

export default Paginate;
