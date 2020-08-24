import React from 'react';
import PropTypes from 'prop-types';

import UserType from '../../types/UserType';

const MobileProfileNav = (props) => {
  return (
    <div className="border-b border-gray-700 md:hidden">
      <div className="px-2 py-3">
        <div className="flex items-center px-5 space-x-3">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={ props.user.profileImage } alt={ props.user.displayName } />
          </div>
          <div className="space-y-1">
            <div className="text-base font-medium leading-none text-white">{ props.user.displayName }</div>
            <div className={`${props.user.email ? 'block' : 'hidden'} text-sm font-medium leading-none text-gray-400`}>{ props.user.email }</div>
          </div>
        </div>
        <div className="mt-3 px-2 space-y-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
          <button onClick={props.signOut} className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700" role="menuitem">Sign out</button>
        </div>
      </div>
    </div>
  );
};

MobileProfileNav.propTypes = {
  user: UserType,
  signOut: PropTypes.func.isRequired
}

export default MobileProfileNav;