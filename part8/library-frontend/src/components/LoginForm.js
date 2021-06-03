import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ setPage, setToken, show }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem("user-token", token)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })

        setPage("authors")

        setUsername("")
        setPassword("")
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input
                        id="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        type="password"
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm