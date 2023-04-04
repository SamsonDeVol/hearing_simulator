import { combineReducers } from 'redux'

import audioReducer from './audioReducer'

const rootReducer = combineReducers({
    audio: audioReducer
})

export default rootReducer
