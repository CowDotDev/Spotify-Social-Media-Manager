import React from 'react';

class Header extends React.Component {
  determineHeader = () => {
    // TODO: Hook up to Router to determine the header
    return "Dashboard";
  }

  render() {
    return (
      <header className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl leading-9 font-bold text-white">
            { this.determineHeader() }
          </h1>
        </div>
      </header>
    );
  };
};
  


export default Header;
