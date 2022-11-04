import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { hideIngredientToolAction } from '../actions/userActions';

const IngredientDefinitionTool = () => {
    const [item, setItem] = useState('');
    const [definition, setDefinition] = useState('');

    const dispatch = useDispatch();

    const ingredientDefinitionTool = useSelector(state => state.ingredientDefinitionTool);

    const dispatchHideIngredientToolAction = () => {
        dispatch(hideIngredientToolAction());
    }

    const fetchIngredientDefinition = async () => {
        try {
            const response = await fetch(`/ingredientinfo?item=${item}`);

            if (response.status === 200) {
                const ingredientInfo = await response.json();
                setDefinition(ingredientInfo.definition);
            }
        } catch (err) {
            console.error(err);
        }
    }

    console.log(item);

    return (
        <Offcanvas show={ingredientDefinitionTool.showTool} backdrop={false} scroll={true} onHide={() => dispatchHideIngredientToolAction()} placement='start'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Ingredient Definition Search Tool</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Container>
                    <Row className='d-flex justify-content-center'>
                        <input type='text' style={{ width: '65%' }} onChange={e => setItem(e.target.value)}></input>
                        <Button style={{ width: '25%' }} onClick={() => fetchIngredientDefinition()}>Search</Button>
                    </Row>
                    <Row className='d-flex justify-content-center mt-3'>
                        <p style={{ width: '95%' }}>
                            {definition}
                        </p>
                    </Row>
                </Container>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default IngredientDefinitionTool;