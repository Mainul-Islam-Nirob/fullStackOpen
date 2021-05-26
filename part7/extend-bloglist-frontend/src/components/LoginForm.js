import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'
import ButtonCom from './ButtonCom'

const LoginForm = ({ handleLogin }) => {
  const [inputValue, setInputValue] = useState(null)

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setInputValue((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      }
    })
  }

  const login = (event) => {
    event.preventDefault()
    const username = inputValue?.username
    const password = inputValue?.password

    try {
      handleLogin(username, password)

      // reset input values
      setInputValue({ username: '', password: '' })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={login}>
      <InputField
        label="Username"
        type="text"
        name="username"
        htmlFor="username"
        value={inputValue?.username || ''}
        onChange={handleInputChange}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        htmlFor="password"
        value={inputValue?.password || ''}
        onChange={handleInputChange}
      />
      <ButtonCom type="submit">
        Login
      </ButtonCom>
    </form>
  )
}

export default LoginForm

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}