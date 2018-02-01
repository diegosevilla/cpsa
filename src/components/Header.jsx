import React, {Component} from 'react'
import {Navbar} from 'react-materialize';

class Header extends Component{
    render() {
      return(
        <Navbar class="blue-grey darken-1" role="navigation">
          <div class="nav-wrapper container">
            <a id="logo-container" href="/" class="brand-logo">Logo</a>
          </div>
        </Navbar>
      )
    }
}

export default Header;
