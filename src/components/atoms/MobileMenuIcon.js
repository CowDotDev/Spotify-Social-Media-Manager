import React from 'react';
import PropTypes from 'prop-types';

const MobileMenuIcon = (props) => {
  if (!props.isAuthed) return null;
  return (
    <div className="-mr-2 flex md:hidden">
      <button onClick={!props.isNavOpen ? props.openNav : props.closeNav} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
        {/* <!-- Menu open --> */}
        <svg className={`${!props.isNavOpen ? 'block' : 'hidden'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        {/* <!-- Menu close --> */}
        <svg className={`${props.isNavOpen ? 'block' : 'hidden'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

MobileMenuIcon.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  openNav: PropTypes.func.isRequired,
  closeNav: PropTypes.func.isRequired
};

export default MobileMenuIcon;
