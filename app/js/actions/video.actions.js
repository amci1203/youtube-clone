import { call, put } from 'redux-saga/effects'

import types from '../types'
import store from './helpers/store'

const VIDEO_KEY = 'last_search_results'

/*
    I know yielding and using the call effect is unneccessary for localStorage,
    but as this is being done for practicing with sagas, I'll pretend like 'store'
    is a connected database that functions asynchronously
*/

function* currentVideo (v) {
    try {
        let video
        if (v) {
            video = v
            yield call(store.set, video.id, video)
        } else {
            video = yield call(store.get, VIDEO_KEY)
        }
        yield put({ type: types.SET_CURRENT_VIDEO_SUCCESSFUL, video })
    } catch (e) {
        yield put({ type: types.SET_CURRENT_VIDEO_FAILED, error: e.toString() })
    }
}

// for sanity's sake; can differentiate between intentions this way
export const setCurrentVideo = video => currentVideo(video)
export const fetchCurrentVideo = () => currentVideo()