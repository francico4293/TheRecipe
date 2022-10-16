import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const NutritionFilter = ({ showNutritionFilter, setShowNutritionFilter }) => {
    return (
        <Offcanvas show={showNutritionFilter} placement='end' onHide={() => setShowNutritionFilter(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Nutrition Filter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Use the filters below to help customize your recipe results.
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default NutritionFilter;
