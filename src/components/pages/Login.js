import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {  
  render() {
    return (
      <div className="px-5 py-6 sm:px-4">
        <h2 className="text-xl font-semibold mb-6">Please log-in using your Facebook account to start.</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-10 rounded transition-colors duration-300"
          onClick={ this.props.authenticate }
        >
          Log-in w/ Facebook
        </button>
      </div>
    );
  }
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default Login;
