import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateLocale } from '../../reducers/i18n';
import '../css/nav.css';

class NavBar extends Component {
  render() {
    const myProfile = this.props.intl.formatMessage({ id: 'nav.myprofile' });
    const gallery = this.props.intl.formatMessage({ id: 'nav.gallery' });
    const { isAuthenticated, locale } = this.props;

    let profileNav = '';
    let galleryNav = '';
    let signOut = <span className="glyphicon glyphicon-off off" />;
    if (isAuthenticated) {
      profileNav = <Link to="/myprofile">{ myProfile }</Link>;
      galleryNav = <Link to="/">{ gallery }</Link>;
      signOut = <button onClick={this.props.handleSignOut} className="glyphicon glyphicon-off" />;
    }

    return (
      <nav className="navbar">
        <div className="container-fluid">
          {/* <div className="navbar-header">
            <div className="navbar-brand">
              Hypertube
            </div>
          </div> */}
          <ul className="nav navbar-nav">
            <li className="nav-link">
              {profileNav}
            </li>
            {/* <li className="nav-link">
              {galleryNav}
            </li> */}
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {locale === 'en-en' &&
              <li className="nav-link">
                <button className="nav-lang" onClick={() => this.props.onLocaleChange('fr-fr')}>FR / EN</button>
              </li>
            }
            {locale === 'fr-fr' &&
              <li className="nav-link">
                <button className="nav-lang" onClick={() => this.props.onLocaleChange('en-en')}>FR / EN</button>
              </li>
            }
            <li className="nav-link">
              {signOut}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => (
  { locale: state.i18n.locale }
);

const mapDispatchToProps = dispatch => (
  { onLocaleChange: updateLocale({ dispatch }) }
);

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(NavBar));
