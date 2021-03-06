import { call, put } from 'redux-saga/effects'

import types from '../types'
import store from './helpers/store'

const LIST_KEY = 'saved_videos'

// INIT LIST
export async function initSaveList () {
    const exists = await store.exists(LIST_KEY)
    if (!exists) {
        await store.set(LIST_KEY, [])
        console.log('saves list initialized')
    } else {
        console.log('saves list already initialized')
    }
}

const item = id => 'saves_' + id
const save = item => ['saves_' + item.id, item]

/*
    I know yielding and using the call effect is unneccessary for localStorage,
    but as this is being done for practicing with sagas, I'll pretend like 'store'
    is a connected database that functions asynchronously
*/

export function* fetchVideos () {
    try {
        const 
            videoIds = yield call(store.get, LIST_KEY),
            videos = []
            
        for (let id of videoIds) {
            const v = yield call(store.get, item(id))
            videos.push(v)
        }

        yield put({ type: types.FETCH_SAVES_SUCCEEDED, videos })

    } catch (e) {
        console.error(e)
        yield put({ type: types.FETCH_SAVES_FAILED, error: e.toString() })
    }
}

export function* toggleVideoSaveStatus (video) {
    try {
        const
            { id } = video,
            saves = yield call(store.get, LIST_KEY)

        saves.indexOf(id) === -1
        ? yield call(addVideo, saves, video)
        : yield call(removeVideo, saves, id)
    } catch (e) {
        console.error(e)
        yield put({ type: types.TOGGLE_SAVE_FAILED, error: e.toString() })
    }
}

function* addVideo (saves, video) {
    try {
        yield call(store.update, LIST_KEY, [...saves, video.id])
        yield call(store.set, ...save(video))

        yield put({ type: types.ADD_SAVE, video })
        
    } catch (e) {
        console.error(e)
        yield put({ type: types.TOGGLE_SAVE_FAILED, error: e.toString() })
    }
}

function* removeVideo (saves, id) {
    try {
        const
            saves = yield call(store.get, LIST_KEY),
            index = saves.indexOf(id)

        if (index === -1) throw Error(`Specified id "${id}" does not refer to any saved video`)

        const newList = [...saves.slice(0, index), ...saves.slice(index + 1)]

        yield call(store.update, LIST_KEY, newList)
        yield call(store.del, item(id))

        yield put({ type: types.REMOVE_SAVE, index })
        
    } catch (e) {
        console.error(e)
        yield put({ type: types.TOGGLE_SAVE_FAILED, error: e.toString() })
    }
}