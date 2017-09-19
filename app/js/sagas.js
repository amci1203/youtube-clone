import { all, call, takeLatest, takeEvery } from 'redux-saga/effects'

import types from './types'
import { searchYouTube, fetchLastSearchResults } from './actions/search.actions'
import { initSaveList, fetchVideos, toggleVideoSaveStatus } from './actions/saves.actions'
import { setCurrentVideo, fetchCurrentVideo } from './actions/video.actions'

const on = (dispatch, fn) => {
    try {
        const errMsg = `the supplied dispatch.type, "${dispatch}" does not exist in the types.object; must be a typo`
        if (!dispatch) throw Error(errMsg)
    } catch (e) {
        console.error(e)
    }

    return takeLatest(dispatch, ({ args }) => args ? fn(...args) : fn())
}

export default function* () {
    yield call(initSaveList)

    
    yield on(types.SEARCH_REQUESTED, searchYouTube)
    yield on(types.FETCH_LAST_SEARCH_RESULTS_REQUESTED, fetchLastSearchResults)
    yield on(types.FETCH_SAVES_REQUESTED, fetchVideos)
    yield on(types.TOGGLE_SAVE_REQUESTED, toggleVideoSaveStatus)
    yield on(types.SET_CURRENT_VIDEO_REQUESTED, fetchCurrentVideo)
    yield on(types.SET_CURRENT_VIDEO, setCurrentVideo)

}