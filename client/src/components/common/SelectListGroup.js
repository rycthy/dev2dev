import React from 'react';
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name,
  value,
  label,
  onChange,
  options,
  error,
  info
}) => {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={`form-control form-control-lg${error ? ' is-invalid' : ''}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  palceholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
