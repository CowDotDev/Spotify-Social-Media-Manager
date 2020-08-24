import React from 'react';
import PropTypes from 'prop-types';
import Transitions from '../utils/Transitions';

import UserType from '../../types/UserType';

const ProfileNav = (props) => (
  <div className="ml-4 flex items-center md:ml-6">
    <div className="ml-3 relative">
      {/* Profile Image */}
      <div>
        <button onClick={!props.isNavOpen ? props.openNav : props.closeNav} className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
          <img className="h-8 w-8 rounded-full" src={props.user.profileImage} alt={props.user.displayName} />
        </button>
      </div>
      {/* Profile Dropdown Nav */}
      <Transitions
        show={props.isNavOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="origin-top-right absolute right-0 mt-2 max-w-5xl rounded-md shadow-lg">
          <div className="rounded-md bg-white shadow-xs overflow-hidden">
            <p className="block px-4 py-2 text-sm text-white text-right font-semibold bg-indigo-500 whitespace-no-wrap">Welcome, {props.user.displayName}!</p>
            <button onClick={props.signOut} className="block w-full px-4 py-2 text-sm text-gray-700 text-right hover:bg-gray-100">Sign out</button>
          </div>
        </div>
      </Transitions>
    </div>
  </div>
);

ProfileNav.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  openNav: PropTypes.func.isRequired,
  closeNav: PropTypes.func.isRequired,
  user: UserType,
  signOut: PropTypes.func.isRequired
};

export default ProfileNav;
