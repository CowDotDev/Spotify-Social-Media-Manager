import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
  <React.Fragment>
    <h2 className="text-xl font-semibold mb-6">Please log-in using your Facebook account to start.</h2>
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-10 rounded transition-colors duration-300"
      onClick={ props.authenticate }
    >
      Log-in w/ Facebook
    </button>
  </React.Fragment>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default Login;
