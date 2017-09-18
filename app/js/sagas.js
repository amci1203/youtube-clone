import { all, takeLatest, takeEvery } from 'redux-saga/effects'

import types from './types'
import { searchYouTube, fetchLastSearchResults } from './actions/search.actions'
import { fetchVideos, addVideo, removeVideo } from './actions/saves.actions'

export default function* () {
    
    yield takeLatest(types.SEARCH_REQUESTED, ({ args }) => searchYouTube(...args))
    yield takeLatest(types.FETCH_LAST_SEARCH_RESULTS_REQUESTED, fetchLastSearchResults)
    yield takeLatest(types.FETCH_SAVES_REQUESTED, fetchVideos)
    yield takeLatest(types.ADD_SAVE_REQUESTED, addVideo)
    yield takeLatest(types.REMOVE_SAVE_REQUESTED, removeVideo)

}