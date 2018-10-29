import React, { Component } from 'react';
import { connect } from 'react-redux';

class Experience extends Component {
  render() {
    const experience = this.props.experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          {exp.from} - {exp.to ? exp.to : 'present'}
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(null)(Experience);
