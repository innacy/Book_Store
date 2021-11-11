import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import "./App.css";

const App = () => (
  <Router>
    <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/home' component={HomePage}/>
        <Route path='/add' component={CreatePage}/>
    </Switch>
  </Router>
);

export default App;
