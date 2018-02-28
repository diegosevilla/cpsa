import React, {Component} from 'react'
import {Navbar} from 'react-materialize';

class Header extends Component{
    render() {
      return(
        <Navbar className="blue-grey darken-1" role="navigation">
          <div className="nav-wrapper container">
            <a id="logo-container" href="/" className="brand-logo">Logo</a>
          </div>
        </Navbar>
      )
    }
}

export default Header;
