import React, { Component } from 'react';

export default class ProfileProfile extends Component {

  render() {
    const { pictureURL } = this.props;
    const path = pictureURL || this.props.user.profile.pictureURL || '/static/uploads/empty_profile.png';

    return (
      <div>
        <div>
          <img className="profile-pic" src={path} alt="profile-pic" />
        </div>
      </div>
    );
  }

}
