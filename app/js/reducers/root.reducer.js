import { createStore, combineReducers, applyMiddleware } from 'redux'
import sagaMiddleware from 'redux-saga'

import search from './search.reducer'
import saves  from './saves.reducer'
import rootSaga from '../sagas'

const sagas = sagaMiddleware()

const store = createStore(
    combineReducers({ search, saves }),
    applyMiddleware( sagas )
)

sagas.run(rootSaga)

export default store