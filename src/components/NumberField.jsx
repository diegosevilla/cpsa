import React from 'react';
import PropTypes from 'prop-types';
import {Input, Col} from 'react-materialize';

class NumberField extends React.Component {
    render() {
        const input = this.props.input;
        return (
          <Col>
            <h5 style={{'backgroundColor': 'green', 'margin': '0%'}}> {input.label} </h5>
            <Input style={{'backgroundColor': 'yellow', 'marginBottom': '10%'}} type="number" min={input.minValue} max={input.maxValue} step={input.step} id={input.id} required={input.required} defaultValue={input.minValue}/>
          </Col>
        );
    }
}

NumberField.propTypes = {
    input: PropTypes.object.isRequired
};

export default NumberField;
