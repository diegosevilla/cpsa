import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'react-materialize';

class TextField extends React.Component {
    render() {
        const input = this.props.input;
        return (
            <Input s={8} id={input.label} label={input.label}/>
        );
    }
}

TextField.propTypes = {
    input: PropTypes.object.isRequired
};

export default TextField;
