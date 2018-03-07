import React from 'react';
import PropTypes from 'prop-types';
import {Input, Col} from 'react-materialize';

class NumberField extends React.Component {
    render() {
        const input = this.props.input;
        return (
          <Col style={{'textAlign': 'center'}}>
            <h5 style={{'margin': '0%', 'marginTop': '1%'}}> {input.label} </h5>
            <Input style={{'marginBottom': '10%'}} type="number" min={input.minVal} max={input.maxVal} step={input.step} id={input.id} required={input.required} defaultValue={input.minValue}/>
          </Col>
        );
    }
}

NumberField.propTypes = {
    input: PropTypes.object.isRequired
};

export default NumberField;
