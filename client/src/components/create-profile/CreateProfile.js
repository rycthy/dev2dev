import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createProfile } from '../../actions/profileActions';

//TODO: disable user with profile to visit this page
class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onToggleSocial = () => {
    this.setState((prevState) => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.createProfile(this.state, this.props.history);
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    const statusOptions = [
      { label: '* Position', value: 0 },
      { label: 'Full Stack Developer', value: 'Full Stack Developer' },
      { label: 'Front-end Developer', value: 'Front-end Developmer' },
      { label: 'Back-end Developer', value: 'Back-end Developer' },
      { label: 'Student', value: 'Student' },
      { label: 'Other', value: 'Other' }
    ];
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-fw fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-fw fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-fw fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-fw fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-fw fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    return (
      <div className="create-profile">
        <div className="container" />
        <div className="row" />
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Create Your Profile</h1>
          <p className="lead text-center">Tell us about yourself</p>
          <small className="d-block pb-3">* = required fields</small>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="text"
              name="handle"
              placeholder="* Profile Handle"
              value={this.state.handle}
              onChange={this.onChange}
              info="Your profile's unique handle. Don't fret, this can be changed later."
              error={errors.handle}
            />
            <SelectListGroup
              name="status"
              placeholder="* Position"
              value={this.state.status}
              options={statusOptions}
              onChange={this.onChange}
              info="test"
              error={errors.status}
            />
            <TextFieldGroup
              type="text"
              name="company"
              placeholder="Company"
              value={this.state.company}
              onChange={this.onChange}
              info="Where you work, even if you work for yourself"
              error={errors.company}
            />
            <TextFieldGroup
              type="text"
              name="website"
              placeholder="Website"
              value={this.state.website}
              onChange={this.onChange}
              info="Share your personal website URL"
              error={errors.website}
            />
            <TextFieldGroup
              type="text"
              name="location"
              placeholder="Location"
              value={this.state.location}
              onChange={this.onChange}
              info="Where in the world are you? (City, State)"
              error={errors.location}
            />
            <TextFieldGroup
              type="text"
              name="skills"
              placeholder="* Skills"
              value={this.state.skills}
              onChange={this.onChange}
              info="Boast your skills, separated with a comma (e.g. JavaScript,CSS3,HTML5,Node.js)"
              error={errors.skills}
            />
            <TextFieldGroup
              type="text"
              name="githubusername"
              placeholder="GitHub username"
              value={this.state.githubusername}
              onChange={this.onChange}
              info="We'll display your latest repos and link to your account!"
              error={errors.githubusername}
            />
            <TextAreaFieldGroup
              name="bio"
              placeholder="Bio"
              value={this.state.bio}
              onChange={this.onChange}
              info="No need to tell us your life story (unless you want to). A short bio will do."
              error={errors.bio}
            />
            <div className="mb-3">
              <button
                type="button"
                onClick={this.onToggleSocial}
                className="btn btn-light"
              >
                Add a social network
              </button>
              <span className="text-muted">
                {` `}
                Optional
              </span>
            </div>
            {socialInputs}
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile }
)(CreateProfile);
