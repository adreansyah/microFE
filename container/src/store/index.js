import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

let store = null
if (process.env.NODE_ENV === 'development') {
    store = createStore(rootReducer, applyMiddleware(thunk, createLogger()))
} else {
    store = createStore(rootReducer, applyMiddleware(thunk))
}

export default store
