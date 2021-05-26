import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import ButtonCom from './ButtonCom'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <ButtonCom onClick={toggleVisibility}>{props.buttonLabel}</ButtonCom>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <ButtonCom onClick={toggleVisibility}>cancel</ButtonCom>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  clildren: PropTypes.node,
}