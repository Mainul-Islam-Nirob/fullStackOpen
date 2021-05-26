import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const ButtonCom = ({ type, style, children, onClick, className }) => (
  <Button  variant="contained" className={className} style={style} type={type} onClick={onClick}>
    {children}
  </Button>
)

export default ButtonCom


Button.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}