import React, {Component} from 'react'
import {PropTypes}  from 'prop-types';
import Header from './../components/Header';
import {Button} from 'react-materialize';
import { connect } from 'react-redux';
import { createSurvey } from './../actions/index';
import styles from './../stylesheets/Home.css';
const Materialize = window.Materialize;

class Home extends Component{
    createSurveyEvent (e){
        e.preventDefault();
        this.props.createSurvey().then((res) => {
          window.location = '/create-survey/' + this.props.survey.id;
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
          <div className="bg">
            <div className="overlay">
              <div className="empty"></div>
              <div className="section1 no-pad-bot" id="index-banner">
                <div className="container">
                  <h1 className="headerTitle center orange-text">Cross Platform Survey Application</h1>
                  <div className="row center">
                    <h5 className="headerCreate col s12 light">Web Application for Creating and Designing Surveys</h5>
                  </div>
                  <div className="row center">
                    <Button onClick={(e) => this.createSurveyEvent(e)} className="createSurvey btn-large waves-effect waves-light blue-grey darken-1">Create Survey</Button>
                    <a href="/view-result" className="viewResults btn-large waves-effect waves-light blue-grey darken-1">View Results</a>
                  </div>
                </div>
                <div className="empty"></div>
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
