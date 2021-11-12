import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import "./App.css";

const App = () => (
  <Router>
    <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/home' component={HomePage}/>
    </Switch>
  </Router>
);

export default App;
