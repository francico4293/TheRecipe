import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import Home from './pages/Home';
import Faq from './pages/Faq';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recipe from './pages/Recipe';
import Cookbook from './pages/Cookbook';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/faq' element={<Faq/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/recipes/:recipeId' element={<Recipe/>}/>
        <Route path='/users/:userId' element={<Cookbook/>}/>
      </Routes>
    </Router>
  );
}

export default App;
