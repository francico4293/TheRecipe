import React, { useState } from 'react';
import { 
    useDispatch, 
    useSelector 
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Spinner from 'react-bootstrap/Spinner';
import IngredientDefinitionTool from '../components/IngredientDefinitionTool';
import { userLoginActions } from '../actions/userActions';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatchUserLoginActions = () => {
        dispatch(userLoginActions(email, password, navigate));
    }

    // show loading spinner while signup request completes
    const getComponent = () => {
        if (user.userLoading) {
            return (
                <Spinner animation='border' role='status' style={{ width: '150px', height: '150px', margin: 'auto', display: 'block' }}></Spinner>
            );
        } else {
            return (
                <div id='login-container'>
                    <img src={'/images/login.jpg'}/>
                    <Form id='login-form'>
                        <h2>Welcome Back.</h2>
                        <Form.Group className="mb-2" style={{ width: '20rem' }}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='mb-4' style={{ width: '20rem' }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter your password' onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button className='mb-3' variant="primary" onClick={() => dispatchUserLoginActions()}>
                            Login
                        </Button>
                    </Form>
                </div>
            );
        }
    }

    return (
        <div id='login-page'>
            <IngredientDefinitionTool />
            <Header/>
                {getComponent()}
            <Footer/>
        </div>
    );
}

export default Login;
