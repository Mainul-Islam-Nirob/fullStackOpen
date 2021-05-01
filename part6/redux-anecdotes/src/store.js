import { createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import anecdoteReducer from './reducers/anecdoteReducer'
import notificatinReducer from './reducers/notificatinReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificatinReducer,
    filter: filterReducer
})

export const store = createStore(reducer, composeWithDevTools())