import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>TODO: Profile</h1>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  profile: state.profile;
};

export default connect(mapStateToProps)(Profile);
