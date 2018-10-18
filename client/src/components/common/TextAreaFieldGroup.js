import React from 'react';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  onChange,
  error,
  info
}) => {
  return (
    <div className="form-group">
      <textarea
        className={`form-control form-control-lg${error ? ' is-invalid' : ''}`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  palceholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
