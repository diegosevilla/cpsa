import React, {Component} from 'react'
import {PropTypes}  from 'prop-types';
import Header from './../components/Header';
import {Button} from 'react-materialize';
import { connect } from 'react-redux';
import { createSurvey } from './../actions/index';
const Materialize = window.Materialize;

class Home extends Component{
    createSurveyEvent (e){
        e.preventDefault();
        this.props.createSurvey().then((res) => {
          window.location = '/create-survey/' + this.props.survey.id;
          $('!asd').val();
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          Materialize.toast(JSON.stringify(err), 5000, 'toast-error');
        })
    }

    render() {
      return(
        <div>
          <Header/>
          <div className="section no-pad-bot" id="index-banner">
            <div className="container">
              <br/><br/>
              <h1 className="header center orange-text">Cross Platform Survey Application</h1>
              <div className="row center">
                <h5 className="header col s12 light">Web based application for creating and designing surveys</h5>
              </div>
              <div className="row center">
                <Button onClick={(e) => this.createSurveyEvent(e)} className="btn-large waves-effect waves-light teal">Create Survey</Button>
              </div>
              <div className="row center">
                <h5 className="header col s12 light">View results of surveys </h5>
              </div>
              <div className="row center">
                <a href="/view-result" className="btn-large waves-effect waves-light teal">View Results</a>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

Home.propTypes = {
    survey: PropTypes.object.isRequired,
    createSurvey: PropTypes.func.isRequired,
};

export default connect(
    state => ({ survey: state.survey }),
    { createSurvey }
)(Home)
