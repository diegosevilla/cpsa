import React from 'react';
import PropTypes from 'prop-types';
import {Input, Col} from 'react-materialize';

class CheckBox extends React.Component {
    render() {
        const input = this.props.input;
        const checkBox = [];

        input.options.forEach((o) => {
          checkBox.push(<Input key={input.id+'-'+o} name={input.id+''} type='checkbox' value={o} label={o}/>);
        });

        return (
          <Col>
            <h5 style={{'backgroundColor': 'green', 'margin': '0%'}}> {input.label} </h5>
            {checkBox}
          </Col>
        );
    }
}

CheckBox.propTypes = {
    input: PropTypes.object.isRequired
};

export default CheckBox;
