import axios from 'axios'
import { apply, put } from 'redux-saga/effects'

import types from '../types'
import store from './helpers/store'

const LIST_KEY = 'last_search_results'

export function* searchYouTube (term = 'TEST') {
    try {
        // const videos = yield apply(axios, axios.post, '/search', { term })
        // console.log(videos)
        // store.set(LIST_KEY, videos)
        // yield apply(store, store.set, LIST_KEY, videos)

        yield put({ type: types.SEARCH_SUCCEEDED, videos: term }) 

    } catch (e) {
        yield put({ type: types.SEARCH_FAILED, error: e.toString() })
    }
}

export function* fetchLastSearchResults () {
    try {
        const videos = yield apply(store, store.get, LIST_KEY)

        yield put({ type: types.FETCH_LAST_SEARCH_RESULTS_SUCCEEDED, videos }) 

    } catch (e) {
        yield put({ type: types.FETCH_LAST_SEARCH_RESULTS_FAILED, error: e.toString() })
    }
}