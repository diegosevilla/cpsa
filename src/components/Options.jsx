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
          <Col style={{'textAlign': 'center'}}>
            <h5 style={{'margin': '0%', 'marginTop': '2%'}}> {input.label} </h5>
            <Input style={{'marginBottom': '10%', 'marginTop': '4%', 'float': 'center'}}  type='select'>
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
