import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Warning = ({ message, setShow }) => {
    return (
        <Alert variant='danger' onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Whoops!</Alert.Heading>
            <hr/>
            {message}
        </Alert>
    );
}

export default Warning;
