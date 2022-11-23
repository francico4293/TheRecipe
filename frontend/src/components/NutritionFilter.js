import React, { useState } from 'react';
import { 
    useSelector, 
    useDispatch 
} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
     NUTRITION_FILTERS, 
     SET_NUTRITION_FILTERS 
} from '../constants/recipeConstants';

const NutritionFilter = ({ showNutritionFilter, setShowNutritionFilter }) => {
    const dispatch = useDispatch();

    const recipeNutritionFilters = useSelector(state => state.recipeNutritionFilters);

    const [calories, setCalories] = useState(recipeNutritionFilters.calories);
    const [protein, setProtein] = useState(recipeNutritionFilters.protein);
    const [carbs, setCarbs] = useState(recipeNutritionFilters.carbs);
    const [fats, setFats] = useState(recipeNutritionFilters.fats);

    // set nutrition filters
    const handleSetClick = () => {
        setShowNutritionFilter(false);
        sessionStorage.setItem(
            NUTRITION_FILTERS, 
            JSON.stringify({ calories, protein, carbs, fats })
        );
        dispatch({ 
            type: SET_NUTRITION_FILTERS, 
            payload: { calories, protein, carbs, fats } 
        });
    }

    const clearNutritionFilters = () => {
        setCalories('');
        setProtein('');
        setCarbs('');
        setFats('');
    }

    // clear nutrition filter data
    const handleClearClick = () => {
        clearNutritionFilters();
        sessionStorage.setItem(
            NUTRITION_FILTERS, 
            JSON.stringify({ calories: '', protein: '', carbs: '', fats: '' })
        );
        dispatch({ 
            type: SET_NUTRITION_FILTERS, 
            payload: { calories: '', protein: '', carbs: '', fats: '' } 
        });
    }

    return (
        <Offcanvas show={showNutritionFilter} placement='end' onHide={() => setShowNutritionFilter(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Nutrition Filter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Use the filters below to help customize your recipe results.
                <Container>
                    <Row className='mt-3'>
                        <Form.Label htmlFor='calories'>Calories</Form.Label>
                        <Form.Control
                            type='text'
                            id='calories'
                            onChange={e => setCalories(e.target.value)}
                            value={calories}
                        />
                        <Form.Text></Form.Text>
                    </Row>    
                    <Row className='mt-3'>
                        <Form.Label htmlFor='protein'>Protein (g)</Form.Label>
                        <Form.Control
                            type='text'
                            id='protein'
                            onChange={e => setProtein(e.target.value)}
                            value={protein}
                        />
                        <Form.Text></Form.Text>
                    </Row>   
                    <Row className='mt-3'>
                        <Form.Label htmlFor='carbs'>Carbs (g)</Form.Label>
                        <Form.Control
                            type='text'
                            id='carbs'
                            onChange={e => setCarbs(e.target.value)}
                            value={carbs}
                        />
                        <Form.Text></Form.Text>
                    </Row>   
                    <Row className='mt-3'>
                        <Form.Label htmlFor='fats'>Fats (g)</Form.Label>
                        <Form.Control
                            type='text'
                            id='fats'
                            onChange={e => setFats(e.target.value)}
                            value={fats}
                        />
                        <Form.Text></Form.Text>
                    </Row>   
                    <Row className='mt-3 justify-content-left'>
                        <Button className='me-2' style={{ width: '25%' }} onClick={() => handleSetClick()}>Set</Button>
                        <Button style={{ width: '25%' }} onClick={() => handleClearClick()}>Clear</Button>
                    </Row>
                </Container>            
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default NutritionFilter;
