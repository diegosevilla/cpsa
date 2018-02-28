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
          <Row key={input.id} style={{'backgroundColor': 'pink', 'marginLeft': '27%', 'width':'50%'}}>
            <Col style={{'backgroundColor': 'blue', 'marginTop': '0%', 'width':'75%'}}>
              {newQuestion}
            </Col>
            <Col style={{'backgroundColor': 'red', 'marginTop': '2%', 'width':'25%'}}>
              <EditModal key={input.id+'-edit'} input={input}/>
              <Button key={input.id+'remove'} s={12} floating small='true' onClick={(e) => this.remove(e, input)} className='red' waves='light' tooltip='Delete'> <Icon> delete </Icon> </Button>
            </Col>
          </Row>
        );
      });

      return(
        <div>
          <Header/>
          <div className='center'>
            <h5> Create Survey </h5>
            <Row>
              <h4>  {survey.surveyName} </h4>
              <Modal id='editTitle' header='Edit Survey Title' trigger={<Button> <Icon> edit </Icon> Edit Survey Title </Button>}>
                <form onSubmit={(e) => this.editTitle(e) }>
                  <Input id='surveyName' required='true' label='Survey Title' defaultValue={survey.surveyName}/>
                  <Input className='btn' type='submit'/>
                </form>
              </Modal>
            </Row>
            <Row>
              <h4> surveyId: {survey.surveyId} </h4>
            </Row>
            <Row>
              <AddModal surveyId={survey.id+''}/>
              <Button onClick={(e) => this.submit(e)}> <Icon> file_upload </Icon> Submit </Button>
            </Row>
            <Row>
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
