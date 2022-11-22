import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeResult from '../components/RecipeResult';
import IngredientDefinitionTool from '../components/IngredientDefinitionTool';
import Table from 'react-bootstrap/Table';
import { userInfoUpdateActions } from '../actions/userActions';

const Cookbook = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const [firstName, setFirstName] = useState(user.data.firstName);
    const [lastName, setLastName] = useState(user.data.lastName);
    const [email, setEmail] = useState(user.data.email);

    const [editFirstName, setEditFirstName] = useState(false);
    const [editLastName, setEditLastName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    const dispatchUserInfoUpdateActions = () => {
        dispatch(userInfoUpdateActions(user.data.id, { firstName, lastName, email }));
    }

    const handleUpdate = () => {
        setEditFirstName(false);
        setEditLastName(false);
        setEditEmail(false);
        dispatchUserInfoUpdateActions();
    }

    return (
        <>
            <Header/>
            <div id='cookbook-profile-container'>
                <h1>Welcome to your Cookbook, {user.data.firstName}.</h1>
                <div id='profile-container'>
                    <img src={'/images/blank-profile-picture.png'}></img>
                    <Table id='profile-table' className='table-responsive'>
                        <tbody>
                            <tr>
                                <th scope='row' className='text-center'>First Name:</th>
                                <td className='text-center'>
                                    {
                                        editFirstName 
                                            ? <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)}></input> 
                                            : user.data.firstName
                                    }
                                </td>
                                <td>
                                    {
                                        editFirstName 
                                            ? <i className="fa-solid fa-check" onClick={() => handleUpdate()}></i>
                                            : <i className="fa-solid fa-pen-to-square" onClick={() => setEditFirstName(true)}></i>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th scope='row' className='text-center'>Last Name:</th>
                                <td className='text-center'>
                                    {
                                        editLastName 
                                            ? <input type='text' value={lastName} onChange={e => setLastName(e.target.value)}></input> 
                                            : user.data.lastName
                                    }
                                </td>
                                <td>
                                    {
                                        editLastName 
                                            ? <i className="fa-solid fa-check" onClick={() => handleUpdate()}></i>
                                            : <i className="fa-solid fa-pen-to-square" onClick={() => setEditLastName(true)}></i>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th scope='row' className='text-center'>Email:</th>
                                <td className='text-center'>
                                    {
                                        editEmail 
                                            ? <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input> 
                                            : user.data.email
                                    }
                                </td>
                                <td>
                                    {
                                        editEmail 
                                            ? <i className="fa-solid fa-check" onClick={() => handleUpdate()}></i>
                                            : <i className="fa-solid fa-pen-to-square" onClick={() => setEditEmail(true)}></i>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <div id='cookbook-results-container'>
                <IngredientDefinitionTool />
                <div id='cookbook-results'>
                    {user.data.recipes.map((recipe, idx) => <RecipeResult result={recipe} page={'cookbook'} key={idx}/>)}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Cookbook;
