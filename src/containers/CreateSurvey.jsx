import React, {Component} from 'react';
import {PropTypes}  from 'prop-types';
import {Button, Icon, Row, Input, Modal, Col} from 'react-materialize';
import { connect } from 'react-redux';
import _ from 'lodash';

import Header from '../components/Header';
import TextField from '../components/TextField';
import NumberField from '../components/NumberField';
import Options from '../components/Options';
import CheckBox from '../components/CheckBox';

import EditModal  from '../components/EditModal';
import AddModal from '../components/AddModal'
import { fetchSurvey, createQuestion, deleteQuestion, updateSurvey} from './../actions/index';

import styles from './../stylesheets/CreateSurvey.css';

const $ = window.$;
const Materialize = window.Materialize
class CreateSurvey extends Component{
  componentWillMount(){
    let id = window.location.pathname.replace(/\/create-survey\//, '');
    this.props.fetchSurvey(id);
  }

  ComponentDidMount(){
    $('#surveyName').val(this.props.survey.surveyName);
  }

  remove(e, input){
    if(!window.confirm('Are you sure you want to remove this question?')) return;
    this.props.deleteQuestion(input.id)
    .then(()=>{Materialize.toast('Successfully removed question', 2000, 'green lighten-1')})
    .catch(()=>{Materialize.toast('Error removing question', 2000, 'red lighten-1')});
  }

  editTitle(e){
    e.preventDefault();
    let survey = {
      id: this.props.survey.id,
      surveyName: $('#surveyName').val()
    };
    this.props.updateSurvey(survey);
    $('#editTitle').modal('close');
  }

  submit(e){
    e.preventDefault();

  }

  render() {
      const { survey } = this.props;
      let  inputs = [];

      let sortedQuestions = _.sortBy(this.props.survey.questions, (questions) => {
           return questions.id;
       });

      sortedQuestions.forEach((input) => {
        let newQuestion = null;
        switch(input.questionType){
          case 'Text': newQuestion = <TextField key={input.id} input={input}/>; break;
          case 'Number': newQuestion = <NumberField key={input.id} input={input}/>; break;
          case 'Options': newQuestion = <Options key={input.id} input={input}/>;break;
          default: newQuestion = <CheckBox key={input.id} input={input}/>;
        }
        inputs.push(
          <Row className="center" key={input.id} style={{'marginTop': '1%', 'width': '50%','float': 'center'}}>
            <Col style={{'backgroundColor': '#ededff', 'borderRadius': '5px','paddingTop': '5px', 'marginTop': '0%', 'width':'73%'}}>
              {newQuestion}
            </Col>
            <Col style={{'marginTop': '1%', 'width':'10%'}}>
              <EditModal key={input.id+'-edit'} input={input}/>
              <Button key={input.id+'remove'} s={12} floating small='true' onClick={(e) => this.remove(e, input)} className='red' waves='light' tooltip='Delete'> <Icon> delete </Icon> </Button>
            </Col>
          </Row>
        );
      });

      return(
        <div className='bgCS'>
          <Header/>
          <div>
            <div className="essentials center">
              <div className="survId center">
                <h5><b>SURVEY ID:</b> {survey.surveyId} </h5>
            </div>
            <br/><br/>
              <Row>
                <div className="survTitle center">
                  <h3> {survey.surveyName} </h3>
                </div>  
                <Modal id='editTitle' header='Edit Survey Title' trigger={<Button className="btnEditTitle blue-grey dark-1"><Icon> edit </Icon> Survey Title </Button>}>
                  <form onSubmit={(e) => this.editTitle(e) }>
                    <Input id='surveyName' required='true' label='Survey Title' defaultValue={survey.surveyName}/>
                    <Input className='btn blue-grey darken-1' type='submit'/>
                  </form>
                </Modal>
                <AddModal surveyId={survey.id+''}/>
                <Button className="btnSubmit  blue-grey dark-1" onClick={(e) => this.submit(e)}> <Icon> file_upload </Icon> Submit </Button>
              </Row>
            </div>
             <Row style={{'float': 'center'}}>
                {inputs}
            </Row>
          </div>  
        </div>
      )
    }
}

CreateSurvey.propTypes = {
    survey: PropTypes.object.isRequired,
    fetchSurvey: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    updateSurvey: PropTypes.func.isRequired
};
export default connect(
    state => ({ survey: state.survey }),
    {fetchSurvey, createQuestion, deleteQuestion, updateSurvey }
)(CreateSurvey);
