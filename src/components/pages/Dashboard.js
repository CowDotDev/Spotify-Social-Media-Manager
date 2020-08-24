import React from 'react';
import PropTypes from 'prop-types';

import UserType from '../../types/UserType';

import Transition from '../utils/Transitions';
import Login from './Login';

class Dashboard extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    user: UserType,
    authenticate: PropTypes.func.isRequired
  };

  render() {
    if (!this.props.isAuthed) {
      return <Login authenticate={this.props.authenticate} />;
    }
    return (
      <h1>Hello!</h1>
    );
  }
};

export default Dashboard;
