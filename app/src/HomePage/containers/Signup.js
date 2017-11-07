import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SignupComponent from '../components/SignupComponent.js';

import { loginUser } from '../../actions/authAction';
import '../css/homepage.css';

class Signup extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    login: '',
    error: [{ param: '', msg: '' }],
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, error: [{ param: '', msg: '' }] });
  }

  sendInfo = (data) => {
    const config = {
      url: '/api/signup/info',
      method: 'POST',
      data,
    };
    return axios(config);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, confirmPassword, firstName, lastName, login, file } = this.state;
    const data = {
      email: email.trim(),
      newPassword: password.trim(),
      confirmPassword: confirmPassword.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      login: login.trim(),
    };
    this.sendInfo(data)
      .then(({ data: { error } }) => {
        if (error.length) {
          this.setState({ status: 'closed', error });
        } else {
          this.props.dispatch(loginUser({
            email,
            password,
          }));
          this.props.history.push('/');
        }
      });
  }

  render() {
    return (
      <SignupComponent
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        error={this.state.error}
      />
    );
  }
}

//= ====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = ({ auth: { isAuthenticated, message } }) => ({
  isAuthenticated,
  message,
});

export default connect(mapStateToProps)(Signup);
