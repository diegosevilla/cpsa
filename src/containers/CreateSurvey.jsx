import React, {Component} from 'react';
import {PropTypes}  from 'prop-types';
import {Modal, Button, Icon, Row, Input} from 'react-materialize';
import { connect } from 'react-redux';
import $ from 'jquery';

import Header from '../components/Header';
import TextField from '../components/TextField';
import EditModal  from '../components/EditModal';
import { addQuestion, removeQuestion, fetchInitial } from './../actions/index';

class CreateSurvey extends Component{
  componentWillMount(){
    this.props.fetchInitial()
  }

  add(e){
      e.preventDefault();
      let newQuestion = {
        type:$('#type').val(),
        label:$('#label').val()
      }
      this.props.addQuestion(newQuestion);
      $('#type').val('Text');
      $('#label').val('');
  }

  remove(e, input){
    let index = this.props.survey.inputs.indexOf(input);
    if(!window.confirm("Are you sure you want to remove this question?")) return;
    this.props.removeQuestion(index);
  }


  render() {
      const { survey, addQuestion, editQuestion, removeQuestion } = this.props;

      let  inputs = [];

      survey.inputs.forEach((input) => {
          alert(JSON.stringify(input));
          let newQuestion = null;
          if(input.type === 'Text') newQuestion = <TextField key={input.label} input={input}/>;
          inputs.push(
            <Row>
              {newQuestion}
              <EditModal input={input}/>
              <Button s={12} floating small onClick={(e) => this.remove(e, input)} className='red' waves='light' tooltip='Delete'> <Icon> delete </Icon> </Button>
            </Row>
          );

      });

      return(
        <div>
          <Header/>
          <div className='center'>
            <h2> Create Survey </h2>
            <Row>
              {inputs}
            </Row>
            <Row>
              <Modal id='addModal' s={4} header='Insert new question' trigger={<Button> Insert Question </Button>}>
                <Row>
                  <form onSubmit={(e) => this.add(e)}>
                    <Input s={12} id='label' label='Label'/>
                    <Input s={12} id='type' type='select' label='Question Type' defaultValue='Text'>
                  		<option value='Text'>Text</option>
                  		<option value='Number'>Number</option>
                  		<option value='Radio'>Radio</option>
                  		<option value='Option'>Option</option>
                  	</Input>
                    <Input type='submit'/>
                  </form>
                </Row>
              </Modal>
              <Button> <Icon> file_upload </Icon> Submit </Button>
            </Row>
          </div>
        </div>
      )
    }
}

CreateSurvey.propTypes = {
    survey: PropTypes.object.isRequired,
    addQuestion: PropTypes.func.isRequired,
    removeQuestion: PropTypes.func.isRequired,
    fetchInitial: PropTypes.func.isRequired,
};
export default connect(
    state => ({ survey: state.survey }),
    { addQuestion,  removeQuestion, fetchInitial }
)(CreateSurvey);
