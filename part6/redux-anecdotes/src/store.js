import { createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import anecdoteReducer from './reducers/anecdoteReducer'
import notificatinReducer from './reducers/notificatinReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificatinReducer
})

export const store = createStore(reducer, composeWithDevTools())