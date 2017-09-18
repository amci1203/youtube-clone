import { all, takeLatest, takeEvery } from 'redux-saga/effects'

import types from './types'
import { searchYouTube, fetchLastSearchResults } from './actions/search.actions'
import { fetchVideos, addVideo, removeVideo } from './actions/saves.actions'

const on = (dispatch, fn) => takeLatest(dispatch, ({ args }) => (
    args > 0 ? fn(...args) : fn()
))

export default function* () {
    
    yield on(types.SEARCH_REQUESTED, searchYouTube)
    yield on(types.FETCH_LAST_SEARCH_RESULTS_REQUESTED, fetchLastSearchResults)
    yield on(types.FETCH_SAVES_REQUESTED, fetchVideos)
    yield on(types.ADD_SAVE_REQUESTED, addVideo)
    yield on(types.REMOVE_SAVE_REQUESTED, removeVideo)

}