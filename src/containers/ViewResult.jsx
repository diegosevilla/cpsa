import React, {Component} from 'react';
import Header from './../components/Header';

class ViewResult extends Component{
    render() {
      return(
        <div>
          <Header/>
          <h1>About Page</h1>
          <p>Did you get here via Redux?</p>
        </div>
      )
    }
}

export default ViewResult
