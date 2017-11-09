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
import TestMBTI from './containers/TestMBTI';

const MatchaRouter = ({ isAuthenticated, locale }) => (
  <Router>
    <div>
      <Header key={locale} />
      <Switch>
        <PrivateRoute exact path="/" key={locale} isAuthenticated={isAuthenticated} component={TestMBTI} />
        <PrivateRoute exact path="/myprofile" key={locale} isAuthenticated={isAuthenticated} component={MyProfile} />
        <PrivateRoute exact path="/profile/:id" key={locale} isAuthenticated={isAuthenticated} component={OneProfile} />
        <Route path="/signin" key={locale} component={Signin} />
        <Route path="/forgot" key={locale} component={Forgot} />
        <Route path="/reset" key={locale} component={Reset} />
        <Route path="/signup" key={locale} component={Signup} />
        <Route key={locale} component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </Router>
  );

MatchaRouter.propTypes = {
  isAuthenticated: PropTypes.bool,
  locale: PropTypes.string,
};

MatchaRouter.defaultProps = {
  isAuthenticated: false,
  locale: 'en-en',
};

//= ====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = ({ auth: { isAuthenticated }, i18n: { locale } }) => ({
  isAuthenticated,
  locale,
});

export default connect(mapStateToProps)(MatchaRouter);
