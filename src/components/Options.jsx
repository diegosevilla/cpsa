import React from 'react';
import PropTypes from 'prop-types';
import {Input,  Col} from 'react-materialize';

class Options extends React.Component {
    render() {
        const input = this.props.input;
        const options = [];
        input.options.forEach((o) => {
          options.push(<option value={o}> {o} </option>);
        });

        return (
          <Col>
            <h5 style={{'backgroundColor': 'green', 'margin': '0%'}}> {input.label} </h5>
            <Input style={{'backgroundColor': 'yellow', 'marginBottom': '10%'}}  type='select'>
              {options}
            </Input>
          </Col>
        );
    }
}

Options.propTypes = {
    input: PropTypes.object.isRequired
};

export default Options;
