import React, { Component } from 'react';
import messages from './../../messages';

class SubmitForm extends Component {
  render() {
    const { className, id } = this.props;
    const value = messages[id];
    return (
      <input
        type="submit"
        className={className}
        value={value}
      />
    );
  }
}

export default SubmitForm;
