  import React, {Component} from 'react';
import {PropTypes}  from 'prop-types';
import {Button, Icon, Row, Input, Modal, Col} from 'react-materialize';
import { connect } from 'react-redux';
import _ from 'lodash';

import TextField from '../components/TextField';
import NumberField from '../components/NumberField';
import Options from '../components/Options';
import CheckBox from '../components/CheckBox';

import EditModal  from '../components/EditModal';
import AddModal from '../components/AddModal'
import { fetchSurvey, getSurvey, createQuestion, deleteQuestion, updateSurvey } from './../actions/index';

import styles from './../stylesheets/CreateSurvey.css';

const $ = window.$;
const Materialize = window.Materialize
class CreateSurvey extends Component{
  componentWillMount(){
    let id = window.location.pathname.replace(/\/create-survey\//, ''); 
    this.props.fetchSurvey(id)
    .then(()=>{
      if(this.props.survey.id === -1){
        window.location = '/';
      };
    })
  }

  componentDidUpdate(){
    $('#surveyName').val(this.props.survey.surveyName);
  }

  remove(e, input){
    if(!window.confirm('Are you sure you want to remove this question?')) return;
    this.props.deleteQuestion(input.id)
    .then(()=>{Materialize.toast('Successfully removed question', 2000, 'green lighten-1')})
    .catch(()=>{Materialize.toast('Error removing question', 2000, 'red lighten-1')});
  }

  cancel(e){
    if(!window.confirm('Cancelling would delete this survey. Are you sure you want to cancel this survey?')) return;
    let id = this.props.survey.id;
    fetch('/api/survey/cancel/'+id, {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    }).then((res) => {
      if(res.status === 200)
        window.location = '/';
      else
        Materialize.toast('Error removing question', 2000, 'red lighten-1')
    })
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
    window.location = '/';
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
        <Row className="center" key={input.id} style={{'marginTop': '1%', 'width': '50%'}}>
          <Col style={{'backgroundColor': '#ededff', 'borderRadius': '5px','paddingTop': '5px', 'marginTop': '0%', 'width':'73%'}}>
            {newQuestion}
          </Col>
          <Col style={{'marginTop': '1%', 'width':'10%'}}>
            <EditModal key={input.id+'-edit'} input={input}/>
            <Button key={input.id+'remove'} s={12} floating small='true' onClick={(e) => this.remove(e, input)} className='red delete' waves='light' tooltip='Delete'> <Icon> delete </Icon> </Button>
          </Col>
        </Row>
      );
    });

    return(
      <div className='bgCS'>
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
              <Modal header='Survey successfully created' trigger={<Button className="btnSubmit blue-grey dark-1"> <Icon> file_upload </Icon> Submit </Button>} actions={<Button onClick={(e)=> this.submit(e)}> Ok </Button>}>
                <h5> Use the survey ID: {survey.surveyId} to access the survey using the mobile app. </h5>
              </Modal>
              <Button className="btnCancel red dark-1" onClick={(e) => this.cancel(e)}> <Icon> cancel </Icon> Cancel Survey </Button>
            </Row>
          </div>
         <Row className="questionRow">
            {inputs}
         </Row>
        </div>
      </div>
    )
  }
}

CreateSurvey.propTypes = {
    survey: PropTypes.object.isRequired,
    getSurvey: PropTypes.object.isRequired,
    fetchSurvey: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    updateSurvey: PropTypes.func.isRequired
};
export default connect(
    state => ({ survey: state.survey }),
    {getSurvey, fetchSurvey, createQuestion, deleteQuestion, updateSurvey }
)(CreateSurvey);
