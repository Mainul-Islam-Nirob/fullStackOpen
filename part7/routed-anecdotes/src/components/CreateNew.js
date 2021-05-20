import React from 'react'
import {useHistory} from 'react-router-dom'
import {useField} from '../hooks/'
const CreateNew = (props) => {
    const history = useHistory()
    // const content = useField('text')
    // const author = useField('text')
    // const info = useField('text')

    const { reset: resetContent, ...content } = useField("text")
    const { reset: resetAuthor, ...author } = useField("text")
    const { reset: resetInfo, ...info } = useField("text")



    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        history.push('/')
    }

    // const resetInputFields = () => {
    //     content.reset()
    //     author.reset()
    //     info.reset()
    // }

    const resetInputFields = () => {
        resetContent()
        resetAuthor()
        resetInfo()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={resetInputFields}>reset</button>
            </form>
        </div>
    )

}
export default CreateNew