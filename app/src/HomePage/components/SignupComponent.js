import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import messages from './../../messages';

const SignupComponent = (props) => {
  const error = {};
  props.error.forEach((field) => {
    if (field.msg) {
      error[field.param] = messages[field.msg];
    }
  });

  const signUp = messages['homepage.signUp'];
  const yourEmail = messages['homepage.yourEmail'];
  const email = messages['homepage.email'];
  const yourLogin = messages['homepage.yourLogin'];
  const login = messages['homepage.login'];
  const yourPassword = messages['homepage.yourPassword'];
  const password = messages['homepage.password'];
  const confirmPassword = messages['homepage.confirmPassword'];
  const yourFirstName = messages['homepage.yourFirstName'];
  const firstName = messages['profile.firstName'];
  const lastName = messages['profile.lastName'];
  const yourLastName = messages['homepage.yourLastName'];
  const alreadyMember = messages['homepage.alreadyMember'];
  const next = messages['general.next'];

  return (
    <div>
      <div className="homepage-background" />
      <div className="homepage-container">
        <form
          onSubmit={props.handleNextStep}
          onChange={props.handleChange}
        >
          <h2 className="homepage-title">{signUp}</h2>
          <TextField
            hintText={yourEmail}
            name="email"
            errorText={error.email}
            floatingLabelText={email}
            required
          />
          <br />
          <TextField
            hintText={yourLogin}
            name="login"
            errorText={error.login}
            floatingLabelText={login}
            required
          />
          <br />
          <TextField
            hintText={yourPassword}
            type="password"
            name="password"
            errorText={error.newPassword}
            floatingLabelText={password}
            required
          />
          <br />
          <TextField
            hintText={yourPassword}
            type="password"
            name="confirmPassword"
            errorText={error.confirmPassword}
            floatingLabelText={confirmPassword}
            required
          />
          <br />
          <TextField
            hintText={yourFirstName}
            name="firstName"
            errorText={error.firstName}
            floatingLabelText={firstName}
            required
          />
          <br />
          <TextField
            hintText={yourLastName}
            name="lastName"
            errorText={error.lastName}
            floatingLabelText={lastName}
            required
          />
          <br />
          <RaisedButton className="homepage-submit" type="submit" name="submit" label={next} />
          <br /><br />
          <Link to="/signin" className="homepage-linkto">{alreadyMember}</Link>
        </form>
      </div>
    </div>
  );
};


SignupComponent.PropTypes = {
  handleSubmit: PropTypes.func.required,
  handleChange: PropTypes.func.required,
  error: PropTypes.array.required,
};

export default SignupComponent;
