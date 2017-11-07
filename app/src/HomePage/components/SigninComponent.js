import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import messages from './../../messages';

const SigninComponent = (props) => {
  const error = {};
  props.error.forEach((field) => {
    if (field.msg) {
      error[field.param] = messages[field.msg];
    }
  });

  const social = [
    { type: 'facebook', class: 'fa fa-facebook' },
    { type: 'linkedin', class: 'fa fa-linkedin' },
  ];

  const icons = social.map(icon => (
    <li key={icon.type}>
      <span
        role="button"
        tabIndex={0}
        className="social-icon"
        onClick={props.handleOAuth(icon.type)}
      >
        <i className={icon.class} />
      </span>
    </li>
  ));

  const welcome = messages['homepage.welcomeTo'];
  const yourEmail = messages['homepage.yourEmail'];
  const email = messages['homepage.email'];
  const yourPassword = messages['homepage.yourPassword'];
  const password = messages['homepage.password'];
  const forgot = messages['homepage.forgotPasswordLink'];
  const signUp = messages['homepage.signUpLink'];
  const enter = messages['general.enter'];

  return (
    <div>
      <div className="homepage-background" />
      <div className="homepage-container">
        <form
          onSubmit={props.handleSubmit}
          onChange={props.handleChange}
        >
          <h2 className="homepage-title">
            {welcome}
          </h2>
          <TextField
            hintText={yourEmail}
            name="email"
            errorText={error.email}
            floatingLabelText={email}
          />
          <br />
          <TextField
            hintText={yourPassword}
            type="password"
            name="password"
            errorText={error.password}
            floatingLabelText={password}
          />
          <br />
          <RaisedButton className="homepage-submit" type="submit" name="submit" label={enter} />
          <br />
          <ul className="social-icons">
            {icons}
          </ul>
          <Link to="/forgot" className="homepage-linkto">{forgot}</Link>
          <br />
          <Link to="/signup" className="homepage-linkto">{signUp}</Link>
        </form>
      </div>
    </div>
  );
};


SigninComponent.PropTypes = {
  error: PropTypes.array.required,
  handleSubmit: PropTypes.func.required,
  handleChange: PropTypes.func.required,
  handleOAuth: PropTypes.func.required,
};

export default SigninComponent;
