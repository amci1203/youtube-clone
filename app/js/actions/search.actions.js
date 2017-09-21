import axios from 'axios'
import { call, put } from 'redux-saga/effects'

import types from '../types'
import store from './helpers/store'

const LIST_KEY = 'last_search_results'
const TERM_KEY = 'last_search_term'

// INIT LIST
export async function initSearchList () {
    const exists = await store.exists(LIST_KEY)
    if (!exists) {
        await store.set(LIST_KEY, [])
        console.log('search list initialized')
    } else {
        console.log('search list already initialized')
    }
}

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
        yield call(store.set, TERM_KEY, term, true)
        yield put({ type: types.SEARCH_SUCCEEDED, results, term }) 

    } catch (e) {
        yield put({ type: types.SEARCH_FAILED, error: e.toString() })
    }
}

export function* fetchLastSearchResults () {
    try {
        const
            term = yield call(store.get, TERM_KEY),
            results = yield call(store.get, LIST_KEY)

        yield put({ type: types.FETCH_LAST_SEARCH_RESULTS_SUCCEEDED, results, term }) 

    } catch (e) {
        yield put({ type: types.FETCH_LAST_SEARCH_RESULTS_FAILED, error: e.toString() })
    }
}