import React from 'react';
import PropTypes from 'prop-types';

import UserType from '../../types/UserType';

import Login from './Login';

class Dashboard extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    user: UserType
  };

  render() {
    if (!this.props.isAuthed) {
      return <Login />
    }
    return (
      <h1>Hello</h1>
    );
  }
};

export default Dashboard;
