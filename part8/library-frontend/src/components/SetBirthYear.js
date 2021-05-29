import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import Select from "react-select"
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries"

const SetBirthYear = ({options}) => {
    const [name, setName] = useState("")
    let [setBornTo, setBorn] = useState("")

    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    const submit = async (event) => {
        event.preventDefault()

        setBornTo = Number(setBornTo)
        updateAuthor({ variables: { name, setBornTo } })

        setName("")
        setBorn("")
    }

    return (
        <div>
            <h2>Set birth year</h2>
            <form onSubmit={submit}>
                <Select
                    placeholder="Select author..."
                    options={options}
                    onChange={({ label }) => setName(label)}
                />
                <div>
                  Born
                    <input
                        type="number"
                        value={setBornTo}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">Update author</button>
            </form>
        </div>
    )
}

export default SetBirthYear