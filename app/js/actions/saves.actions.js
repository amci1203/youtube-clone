import { call, put } from 'redux-saga/effects'

import types from '../types'
import store from './helpers/store'

const LIST_KEY = 'saved_videos'

/*
    I know yielding and using the call effect is unneccessary for localStorage,
    but as this is being done for practicing with sagas, I'll pretend like 'store'
    is a connected database that functions asynchronously
*/

export function* fetchVideos () {
    try {
        const 
            videosIds = yield call(store.get, LIST_KEY),
            videos = videoIds.map(id => store.get(id))

        yield put({ type: types.FETCH_SAVES_SUCCEEDED, videos })

    } catch (error) {
        yield put({ type: types.FETCH_SAVES_FAILED, error })
    }
}

export function* addVideo (video) {
    try {
        const list = yield store.get(LIST_KEY)

        yield call(store.set, LIST_KEY, list.concat([ video.id ]))
        yield call(store.get, video.id, video)

        yield put({ type: types.ADD_SAVE_SUCCEEDED, video })
        
    } catch (error) {
        yield put({ type: types.ADD_SAVE_FAILED, error })
    }
}

export function* removeVideo (id) {
    try {
        const
            saves = yield call(store.get. LIST_KEY),
            index = saves.indexOf(id)

        if (index === -1) throw Error('Specified id does not refer to any saved video')

        const newList = [...saves.slice(0, index), ...saves.slice(index + 1)]

        yield call(store.set, LIST_KEY, newList)
        yield call(store.del, id)

        yield put({ type: types.REMOVE_SAVE_SUCCEEDED, index })
        
    } catch (error) {
        yield put({ type: types.REMOVE_SAVE_FAILED, error })
    }
}