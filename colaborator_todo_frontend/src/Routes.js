import React, { Component } from 'react';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import App from './Components/App';
import LoginPage from './Components/LoginPage';
import Signup from './Components/Signup';
import Todos from './Components/Todos';


class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/home' exact component={App} />
          <Route path='/' exact component={App} />
          <Route path='/home/:id' exact component={Todos} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/signup' exact component={Signup} />
        </Switch>
      </Router>
    )
  }
}

export default Routes
