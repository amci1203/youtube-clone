import axios from 'axios'
import { call, put } from 'redux-saga/effects'

import types from '../types'
import store from './helpers/store'

const LIST_KEY = 'last_search_results'


/*
    I know yielding and using the call effect is unneccessary for localStorage,
    but as this is being done for practicing with sagas, I'll pretend like 'store'
    is a connected database that functions asynchronously
*/

export function* searchYouTube (term) {
    try {
        const
            response = yield call(axios.post, '/search', { term }),
            results = response.data

        yield call(store.set, LIST_KEY, results, true)
        yield put({ type: types.SEARCH_SUCCEEDED, results }) 

    } catch (e) {
        yield put({ type: types.SEARCH_FAILED, error: e.toString() })
    }
}

export function* fetchLastSearchResults () {
    try {
        const
            idList = yield call(store.get, LIST_KEY),
            results = idList.map(function* (id) {
                const v = yield call(store.get, id)
                return v
            })

        yield put({ type: types.FETCH_LAST_SEARCH_RESULTS_SUCCEEDED, results }) 

    } catch (e) {
        yield put({ type: types.FETCH_LAST_SEARCH_RESULTS_FAILED, error: e.toString() })
    }
}