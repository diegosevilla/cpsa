import React from 'react';
import PropTypes from 'prop-types';
import {Input, Col} from 'react-materialize';

class TextField extends React.Component {
    render() {
        const input = this.props.input;
        return (
          <Col style={{'textAlign': 'center'}}>
            <h5 style={{'margin': '0%', 'marginTop': '1%', 'textAlign': 'center'}}> {input.label} </h5>
            <Input style={{'marginBottom': '5%', 'marginTop': '2%'}} id={input.id+''} required={input.required}/>
          </Col>
        );
    }
}

TextField.propTypes = {
    input: PropTypes.object.isRequired
};

export default TextField;
