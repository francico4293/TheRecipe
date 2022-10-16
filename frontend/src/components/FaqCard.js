import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const FaqCard = ({ faqItem, idx }) => {
    return (
        <Accordion.Item eventKey={idx}>
            <Accordion.Header>{faqItem.question}</Accordion.Header>
            <Accordion.Body>{faqItem.answer}</Accordion.Body>
        </Accordion.Item>
    );
}

export default FaqCard;
