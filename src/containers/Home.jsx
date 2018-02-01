import React, {Component} from 'react'
import Header from './../components/Header';

class Home extends Component{
    render() {
      return(
        <div>
          <Header/>
          <div class="section no-pad-bot" id="index-banner">
            <div class="container">
              <br/><br/>
              <h1 class="header center orange-text">Cross Platform Survey Application</h1>
              <div class="row center">
                <h5 class="header col s12 light">Web based application for creating and designing surveys</h5>
              </div>
              <div class="row center">
                <a href="/create-survey" className="btn-large waves-effect waves-light teal">Create Survey</a>
              </div>
              <div class="row center">
                <h5 class="header col s12 light">View results of surveys </h5>
              </div>
              <div class="row center">
                <a href="/view-result" className="btn-large waves-effect waves-light teal">View Results</a>
              </div>

            </div>
          </div>
        </div>
      )
    }
}

export default Home
