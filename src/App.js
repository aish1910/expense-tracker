import React, { Component } from 'react';
import Category from './Category';
import Home from './Home';
import Expenses from './Expenses';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  state = {}
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/categories' element={<Category/>} />
          <Route exact path='/expenses' element={<Expenses/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;