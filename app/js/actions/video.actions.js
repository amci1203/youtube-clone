import { call, put } from 'redux-saga/effects'

import types from '../types'
import store from './helpers/store'

const VIDEO_KEY = 'current_video'

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
            yield call(store.set, VIDEO_KEY, video, true)
            yield put({ type: types.SET_CURRENT_VIDEO_SUCCEEDED, video })
        } else {
            video = yield call(store.get, VIDEO_KEY)
            yield put({ type: types.FETCH_CURRENT_VIDEO_SUCCEEDED, video })
        }
    } catch (e) {
        const type = v ? types.SET_CURRENT_VIDEO_FAILED : types.FETCH_CURRENT_VIDEO_FAILED
        yield put({ type, error: e.toString() })
    }
}

// for sanity's sake; can differentiate between intentions this way
export const setCurrentVideo = video => currentVideo(video)
export const fetchCurrentVideo = () => currentVideo()