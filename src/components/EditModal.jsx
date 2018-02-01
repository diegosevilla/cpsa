import React, {Component} from 'react'
import {Modal, Button, Icon, Input} from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';

import { editQuestion } from './../actions/index';

class EditModal extends Component{
    edit(e) {
      e.preventDefault();
      let editedEntry = {
        type:this.props.input.type,
        label: $('#label-'+this.props.input.label).val()
      }
      alert(JSON.stringify(editedEntry));
      let index = this.props.survey.inputs.indexOf(this.props.input);
      this.props.editQuestion(index, editedEntry);
    }

    render() {
      const { survey, editQuestion } = this.props;
      const input = this.props.input;

      let form = [];
      form.push( <Input id={"label-"+input.label} label="Label" defaultValue={input.label}/>);
      switch(input.type){
        case "Text":
          form.push(<hr/>)
          break;
        default: form.push(<p> Bobo ka </p>);

      }

      return(
        <Modal s={8} header='Edit Question' trigger={<Button floating small className='green' waves='light' tooltip='Edit'> <Icon> edit </Icon> </Button>}>
          <form onSubmit={(e) => this.edit(e)}>
            {form}
          <input type="submit" className="btn" value="Edit"/>
          </form>
        </Modal>
      )
    }
}

EditModal.propTypes = {
    survey: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    editQuestion: PropTypes.func.isRequired,
};

export default connect(
    state => ({ survey: state.survey }),
    { editQuestion }
)(EditModal);
