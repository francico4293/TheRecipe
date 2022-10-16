import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import { userSignupActions } from '../actions/userActions';
import Warning from '../components/Warning';

const Signup = () => {
    const passwordMismatchMessage = "The passwords you entered don't match.";

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const dispatchUserActions = () => {
        if (password === confirmPassword) {
            dispatch(userSignupActions(firstName, lastName, email, password, navigate));
        } else {
            setPasswordMismatch(true);
        }
    }

    const getSignupComponent = () => {
        if (user.userLoading) {
            return (
                <Spinner animation='border' role='status' style={{ width: '150px', height: '150px', margin: 'auto', display: 'block' }}></Spinner>
            );
        } else {
            return (
                <div id='signup-container'>
                    <img src={'/images/signup.jpg'}/>
                    <Form id='signup-form'>
                        <h2>Get Started Today.</h2>
                        <Form.Group className="mb-2" style={{ width: '20rem' }}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your first name" onChange={e => setFirstName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-2" style={{ width: '20rem' }}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your last name" onChange={e => setLastName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-2" style={{ width: '20rem' }}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='mb-2' style={{ width: '20rem' }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='mb-4' style={{ width: '20rem' }}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' onChange={e => setConfirmPassword(e.target.value)}/>
                        </Form.Group>
                        <Button className='mb-3' variant="primary" onClick={() => dispatchUserActions()}>
                            Login
                        </Button>
                    </Form>
                </div>
            );
        }
    }

    return (
        <div id='signup-page'>
            <Header/>
            {passwordMismatch && <Warning message={passwordMismatchMessage} setShow={setPasswordMismatch}/>}
            {getSignupComponent()}
            <Footer/>
        </div>
    );
}

export default Signup;
