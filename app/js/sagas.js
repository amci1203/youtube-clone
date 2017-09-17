import { all, takeLatest } from 'redux-saga/effects'

import types from './types'
import { search, fetchLastSearchResults } from './actions/search.actions'
import { fetchVideos, addVideo, removeVideo } from './actions/saves.actions'

function* watchSearchRequests (term = '') {
    yield takeLatest(types.SEARCH_REQUESTED, () => searchVideos(term))
}

function* watchFetchLastSearchResults () {
    yield takeLatest(types.FETCH_LAST_SEARCH_RESULTS_REQUESTED, fetchLastSearchResults)
}

function* watchFetchVideos () {
    yield takeLatest(types.FETCH_VIDEOS_REQUESTED, fetchVideos)
}

function* watchAddVideo () {
    yield takeLatest(types.ADD_SAVE_REQUESTED, addVideo)
}

function* watchRemoveVideo () {
    yield takeLatest(types.REMOVE_SAVE_REQUESTED, removeVideo)
}

export default function* () {
    yield all([
        watchSearchRequests,
        watchFetchLastSearchResults,
        watchFetchVideos,
        watchAddVideo,
        watchRemoveVideo
    ])
}