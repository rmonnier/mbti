import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import NotFound from './General/components/NotFound.js';
import Header from './General/components/Header';
import Footer from './General/components/Footer';
import MyProfile from './Profile/containers/MyProfile';
import OneProfile from './Profile/containers/OneProfile';
import Signin from './HomePage/containers/Signin';
import Forgot from './HomePage/containers/Forgot';
import Reset from './HomePage/containers/Reset';
import Signup from './HomePage/containers/Signup';

const MatchaRouter = ({ isAuthenticated }) => (
  <Router>
    <div>
      <Header />
      <Switch>
        <PrivateRoute exact path="/" isAuthenticated={isAuthenticated} component={MyProfile} />
        <PrivateRoute exact path="/myprofile" isAuthenticated={isAuthenticated} component={MyProfile} />
        <PrivateRoute exact path="/profile/:id" isAuthenticated={isAuthenticated} component={OneProfile} />
        <Route path="/signin" component={Signin} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/reset" component={Reset} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </Router>
  );

MatchaRouter.propTypes = {
  isAuthenticated: PropTypes.bool,
};

MatchaRouter.defaultProps = {
  isAuthenticated: false,
};

//= ====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
});

export default connect(mapStateToProps)(MatchaRouter);
