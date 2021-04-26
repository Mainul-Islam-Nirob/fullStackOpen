import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ type, style, children, onClick }) => (
    <button style={style} type={type} onClick={onClick}>
        {children}
    </button>
)

export default Button


Button.propTypes = {
    type: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
}