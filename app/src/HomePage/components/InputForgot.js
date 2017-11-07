import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import messages from './../../messages';

const InputForgot = (props) => {
  const error = {};
  props.error.forEach((field) => {
    if (field.msg) {
      error[field.param] = messages[field.msg];
    }
  });

  const { success } = props;
  const confirmForgotPassword = success ? messages['homepage.confirmForgotPassword'] : '';

  const forgotPassword = messages['homepage.forgotPassword'];
  const yourEmail = messages['homepage.yourEmail'];
  const email = messages['homepage.email'];
  const nevermind = messages['homepage.nevermind'];
  const send = messages['general.send'];

  return (
    <div>
      <div className="homepage-background" />
      <div className="homepage-container">
        <form
          onSubmit={props.handleSubmit}
          onChange={props.handleChange}
        >
          <h2 className="homepage-title">{forgotPassword}</h2>
          <TextField
            hintText={yourEmail}
            name="email"
            errorText={error.email}
            floatingLabelText={email}
          />
          <br />
          <RaisedButton className="homepage-submit" type="submit" name="submit" label={send} />
        </form>
        <br />
        <div style={{ color: 'green' }}>{confirmForgotPassword}</div>
        <br />
        <Link to="/signin" className="homepage-linkto">{nevermind}</Link>
      </div>
    </div>
  );
};

export default InputForgot;
