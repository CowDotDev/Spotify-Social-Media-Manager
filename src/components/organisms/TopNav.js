import React from 'react';
import PropTypes from 'prop-types';

import UserType from '../../types/UserType';

import Transition from '../utils/Transitions';
import ProfileNav from '../molecules/ProfileNav';
import MobileMenuIcon from '../atoms/MobileMenuIcon';
import MobileProfileNav from '../molecules/MobileProfileNav';

class TopNav extends React.Component {
  state = {
    isNavOpen: false
  }

  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    user: UserType
  }

  openNav = () => {
    this.setState({ isNavOpen: true });
    document.addEventListener("keydown", this.handleEscKey, false);
  }
  closeNav = () => {
    this.setState({ isNavOpen: false });
    document.removeEventListener("keydown", this.handleEscKey, false);
  }
  handleEscKey = (event) => {
    if(event.keyCode === 27) {
      this.closeNav();
    }
  }

  render() {
    return (
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="border-b border-gray-700">
            <div className="flex items-center justify-between h-16 px-4 sm:px-0">
              {/* Left Nav Section */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg" alt="Workflow logo" />
                </div>
                <h1 className="text-lg md:text-2xl text-white font-bold pl-4">Spotify Social Media Manager</h1>
              </div>
              {/* Right Profile Section */}
              <div className="hidden md:block">
                <Transition
                  show={this.props.isAuthed}
                  enter="transition ease-out duration-1000"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-1000"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ProfileNav
                    isNavOpen={this.state.isNavOpen}
                    openNav={this.openNav}
                    closeNav={this.closeNav}
                    user={this.props.user}
                  />
                </Transition>
              </div>
              {/* <!-- Mobile menu button --> */}
              <MobileMenuIcon isAuthed={this.props.isAuthed} isNavOpen={this.state.isNavOpen} openNav={this.openNav} closeNav={this.closeNav} />
            </div>
          </div>
        </div>

        {/* <!-- Mobile Slide Nav--> */}
        <Transition
          show={this.props.isAuthed && this.state.isNavOpen}
          enter="transition-all ease-out duration-300"
          enterFrom="opacity-0 max-h-0"
          enterTo="opacity-100 max-h-40"
          leave="transition-all ease-in duration-200"
          leaveFrom="opacity-100 max-h-40"
          leaveTo="opacity-0 max-h-0"
        >
          <MobileProfileNav isAuthed={this.props.isAuthed} user={this.props.user} />
        </Transition>
      </nav>
    );
  };
};

export default TopNav;
