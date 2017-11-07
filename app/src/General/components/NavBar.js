import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import messages from './../../messages';
import '../css/nav.css';

class NavBar extends Component {
  render() {
    const myProfile = messages['nav.myprofile'];
    const gallery = messages['nav.gallery'];
    const { isAuthenticated } = this.props;

    let profileNav;
    let galleryNav;
    let signOut;
    if (isAuthenticated) {
      profileNav = <Link to="/myprofile">{ myProfile }</Link>;
      galleryNav = <Link to="/">{ gallery }</Link>;
      signOut = (
        <button
          onClick={this.props.handleSignOut}
          className="glyphicon glyphicon-off"
        />
      );
    } else {
      profileNav = '';
      galleryNav = '';
      signOut = (
        <span
          className="glyphicon glyphicon-off off"
        />
      );
    }

    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand">
              Hypertube
            </div>
          </div>
          <ul className="nav navbar-nav">
            <li className="nav-link">
              {profileNav}
            </li>
            <li className="nav-link">
              {galleryNav}
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-link">
              {signOut}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
