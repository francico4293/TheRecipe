import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { WELCOME } from '../constants/commonConstants';
import { showIngredientToolAction } from '../actions/userActions';

const Header = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const dispatchShowIngredientToolAction = () => {
        dispatch(showIngredientToolAction());
    }

    const logout = () => {
        sessionStorage.clear();
        sessionStorage.setItem(WELCOME, true);
        window.location.href = '/';
    }

    const getNavLinks = () => {
        if (user.userLoggedIn) {
            return (
                <>
                    <Nav.Link className='nav-link' href={'/users/' + user.data.id}>
                        <i className='fa-solid fa-user'></i>
                        Cookbook
                    </Nav.Link>
                    <Nav.Link className='nav-link' onClick={() => logout()}>
                        <i className='fa-solid fa-right-from-bracket'></i>
                        Logout
                    </Nav.Link>
                </>
            );
        } else {
            return (
                <>
                    <Nav.Link className='nav-link' href='/login'>
                        <i className="fa-solid fa-right-to-bracket"></i>
                        Login
                    </Nav.Link>
                    <Nav.Link className='nav-link' href='/signup'>
                        <i className='fa-solid fa-user-plus'></i>
                        Signup
                    </Nav.Link>
                </>
            );
        }
    }

    return (
        <Navbar id='navbar' expand='lg' sticky='top'>
            <Container>
                <Navbar.Brand className='nav-link' href='/'>
                    <i className='fa-solid fa-spoon'></i>
                    TheRecipe
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link className='nav-link' onClick={() => dispatchShowIngredientToolAction()}>
                        <i className='fa-solid fa-lines-leaning'></i>
                        Ingredient Defintion Tool
                    </Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    <Nav.Link className='nav-link' href='/'>
                        <i className='fa-sharp fa-solid fa-house'></i>
                        Home
                    </Nav.Link>
                    <Nav.Link className='nav-link' href='/faq'>
                        <i className='fa-solid fa-question'></i>
                        FAQ
                    </Nav.Link>
                    {getNavLinks()}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
