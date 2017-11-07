import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import messages from './../../messages';

const InputReset = (props) => {
  const error = {};
  props.error.forEach((field) => {
    if (field.msg) {
      error[field.param] = messages[field.msg];
    }
  });

  const { success } = props;
  const confirmResetPassword = success ? messages['homepage.confirmResetPassword'] : '';

  const changePassword = messages['homepage.changePassword'];
  const confirmPassword = messages['homepage.confirmPassword'];
  const password = messages['homepage.password'];
  const yourPassword = messages['homepage.yourPassword'];
  const logIn = messages['homepage.logIn'];
  const send = messages['general.send'];

  return (
    <div>
      <div className="homepage-background" />
      <div className="homepage-container">
        <form
          onSubmit={props.handleSubmit}
          onChange={props.handleChange}
        >
          <h2 className="homepage-title">{changePassword}</h2>
          <TextField
            hintText={yourPassword}
            type="password"
            name="password"
            errorText={error.newPassword}
            floatingLabelText={password}
          />
          <br />
          <TextField
            hintText={yourPassword}
            type="password"
            name="confirmPassword"
            errorText={error.confirmPassword}
            floatingLabelText={confirmPassword}
          />
          <br />
          <RaisedButton className="homepage-submit" type="submit" name="submit" label={send} />
        </form>
        <br />
        <div style={{ color: 'green' }}>{confirmResetPassword}</div>
        <div style={{ color: 'red' }}>{error.token}</div>
        <br />
        <Link to="/signin" className="homepage-linkto">{logIn}</Link>
      </div>
    </div>
  );
};

export default InputReset;
