import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../../General/components/Loading';
import messages from './../../messages';
import '../css/profile.css';

const DEFAULT_IMG = '/static/uploads/empty_profile.png';

class OneProfile extends Component {

  state = {
    profileLoaded: false,
    error: [{ param: '', msg: '' }],
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const url = `/api/profile/id/${id}`;
    axios({ url, method: 'GET' })
    .then(({ data: { error, user, movies, comments } }) => {
      if (error.length) {
        this.setState({ error });
      } else {
        this.user = user;
        this.movies = movies;
        this.comments = comments;
        this.setState({ profileLoaded: true });
      }
    });
  }

  render() {
    const {
      profileLoaded,
      error,
    } = this.state;

    const errorMessage = error[0].msg
      ? messages[error[0].msg]
      : '';
    if (error[0].msg) {
      return <div className="one-user-profile-error">{errorMessage}</div>;
    }

    if (!profileLoaded) { return <Loading />; }

    const { firstName, lastName, pictureURL } = this.user.profile;

    const profile = messages['profile.profile'];

    return (
      <div className="one-profile-container">
        <div>
          <div className="profile-container">
            <h1 className="profile-title">{profile}</h1>
            <div>
              <img
                className="profile-pic"
                src={pictureURL}
                alt="profile-pic"
                onError={e => (e.target.src = DEFAULT_IMG)}
              />
            </div>
            <div className="infos-container one-user-profile">
              <span className="infos-title"><b>Name</b></span>
              <span>{firstName} {lastName}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default OneProfile;
