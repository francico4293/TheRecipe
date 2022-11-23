import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { HIDE_INGREDIENT_TOOL } from '../constants/userConstants';

const IngredientDefinitionTool = () => {
    const dispatch = useDispatch();

    const [item, setItem] = useState('');
    const [definition, setDefinition] = useState('');

    const ingredientDefinitionTool = useSelector(state => state.ingredientDefinitionTool);

    const ingredientDefinitionRequest = async () => {
        const response = await fetch(`/ingredientinfo?item=${item}`);

        if (response.status === 200) {
            const ingredientInfo = await response.json();
            setDefinition(ingredientInfo.definition);
        }
    }

    const fetchIngredientDefinition = async () => {
        try {
            ingredientDefinitionRequest();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Offcanvas show={ingredientDefinitionTool.showTool} backdrop={false} scroll={true} onHide={() => dispatch({ type: HIDE_INGREDIENT_TOOL })} placement='top' style={{ height: '30%' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Ingredient Definition Search Tool</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Container>
                    <Row className='d-flex justify-content-center'>
                        <input className="me-2" type='text' style={{ width: '30%' }} onChange={e => setItem(e.target.value)}></input>
                        <Button style={{ width: '10%' }} onClick={() => fetchIngredientDefinition()}>Search</Button>
                    </Row>
                    <Row className='d-flex justify-content-center mt-4'>
                        <p style={{ width: '60%' }}>
                            {definition}
                        </p>
                    </Row>
                </Container>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default IngredientDefinitionTool;
