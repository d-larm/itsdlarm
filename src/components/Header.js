import React from 'react';
import logo from '../assets/logo-transparent.png';

import './Header.css';

const Header = () => {
  return (
    <div>
      <header className="App-header">
      {/* <Navbar/> */}

        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
    </div>
  );
}

export default Header;
