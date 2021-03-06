import { createStore, combineReducers, applyMiddleware } from 'redux'
import sagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import search from './search.reducer'
import saves  from './saves.reducer'
import video  from './video.reducer'
import rootSaga from '../sagas'

const
    sagas = sagaMiddleware(),
    middlewares = [ sagas, logger ],

    store = createStore(
        combineReducers({ search, saves, video }),
        applyMiddleware(...middlewares)
    )

sagas.run(rootSaga)

export default store