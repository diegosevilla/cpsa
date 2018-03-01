import React from 'react';
import PropTypes from 'prop-types';
import {Input, Col} from 'react-materialize';

class TextField extends React.Component {

    render() {
        const input = this.props.input;
        return (
          <Col>
            <h5 style={{'backgroundColor': 'green', 'margin': '0%'}}> {input.label} </h5>
            <Input value={input.defaultValue} style={{'backgroundColor': 'yellow', 'marginBottom': '10%', 'width':'100%'}} id={input.id+''} required={input.required}/>
          </Col>
        );
    }
}

TextField.propTypes = {
    input: PropTypes.object.isRequired
};

export default TextField;
