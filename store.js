import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import auth from "./src/reducers/auth"
import reports from "./src/reducers/reports"

const reducers = combineReducers({
    auth,
    reports
})

const enhancer = applyMiddleware(
    thunk
)

const store = createStore(
    reducers,
    {},
    enhancer
)

export default store