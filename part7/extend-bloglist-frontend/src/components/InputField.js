import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ htmlFor, label, type, value, onChange, name }) => (
  <div>
    <label htmlFor={htmlFor}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={htmlFor}
      value={value}
      onChange={onChange}
    />
  </div>
)

export default InputField

InputField.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
}