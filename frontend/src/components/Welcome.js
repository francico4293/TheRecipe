import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Welcome = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    const handleTutorial = () => navigate('/faq');
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Welcome to TheRecipe!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                We're excited to help support you on your culinary adventure!
                To get started, we suggest checking out the FAQ page to learn
                more about how to use our website.
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={handleTutorial}>
                    Go
                </Button>
                <Button variant='secondary' onClick={handleClose}>
                    Maybe later
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Welcome;
