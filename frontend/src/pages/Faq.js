import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Accordion from 'react-bootstrap/Accordion';
import FaqCard from '../components/FaqCard';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IngredientDefinitionTool from '../components/IngredientDefinitionTool';

const Faq = () => {
    const faqItems = [
        { question: 'Does it cost money to become a member?', answer: 'Nope! It is completely free to become a member. Just provide an email to use for your account.' },
        { question: 'What benefits to members get?', answer: 'Members have the ability to favorite recipes they like which will add them to a cookbook. A member can visit their cookbook at anytime to quickly find their favorite recipes.' },
        { question: 'How do I search for recipes?', answer: 'Just use the search bar! Enter food related keywords such as chicken, salad, soup, vegan and then click "Enter" to generate recipes related to your food related keyword.' },
        { question: 'Can I remove recipes that I\'ve favorited?', answer: 'Absolutely! Visit your cookbook page and click the trashcan icon to remove any recipes you no longer want in your cookbook.' },
        { question: 'What happens when I explore a recipe?', answer: 'Exploring a recipe will provide you with a recipe card, a taste profile, and nutrition facts for the recipe. You\'ll also be shown some related recipes we think you might like.' }
    ];

    return (
        <>
            <Header/>
            <IngredientDefinitionTool />
            <div id='faq-container'>
                <h1>You've Got Questions. We've Got Answers.</h1>
                <Accordion id='faq-items' style={{ width: '70vw', height: '20vh' }}>
                    {faqItems.map((faqItem, idx) => <FaqCard faqItem={faqItem} idx={idx} key={idx}/>)}
                </Accordion>
            </div>
            <h2 id='contact-us-header'>Not Finding What You Need? Contact Us!</h2>
            <div id='contact-us-container'>
                <Form id='contact-form'>
                    <Row>
                        <Col>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your first name"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your last name"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email"/>
                    </Form.Group>
                    
                    <Form.Group className='mb-2'>
                        <Form.Label>Message</Form.Label>
                        <Form.Control as='textarea' placeholder='Ask us anything!' rows={3}/>
                    </Form.Group>

                    <Button className='mb-3' variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <p>
                    City, State <br/>
                    therecipe@email.com<br/>
                    (123) 456-7890
                </p>
            </div>
            <Footer/>
        </>
    );
}

export default Faq;