import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserType from '../../types/UserType';

import Dashboard from '../pages/Dashboard';

// Router ended up being overkill, oh well.
class Router extends React.Component {
  render() {
    const setDashboard = () => (
      <Dashboard
        authenticate={this.props.authenticate}
        isAuthed={this.props.isAuthed}
        user={this.props.user} />
    );

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={setDashboard} />
        </Switch>
      </BrowserRouter>
    );
  };
};

Router.propTypes = {
  authenticate: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  user: UserType
};

export default Router;
