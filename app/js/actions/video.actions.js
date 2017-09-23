import { call, put } from 'redux-saga/effects'

import types from '../types'
import store from './helpers/store'

const LIST_KEY = 'history'
const HISTORY_LIMIT = 50

const item = id => 'history_' + id
const save = item => ['history_' + item.id, item] 

export async function initHistoryList () {
    const exists = await store.exists(LIST_KEY)
    if (!exists) {
        await store.set(LIST_KEY, [])
        console.log('history list initialized')
    } else {
        console.log('history list already initialized')
    }
}

/*
    I know yielding and using the call effect is unneccessary for localStorage,
    but as this is being done for practicing with sagas, I'll pretend like 'store'
    is a connected database that functions asynchronously
*/

export function* fetchCurrentVideo (id) {
    try {
        const
            history = yield call(store.get, LIST_KEY),
            details = yield call(store.get, item(id))
        yield put({ type: types.FETCH_CURRENT_VIDEO_SUCCEEDED, details, open: true })
    } catch (e) {
        yield put({
            type: types.FETCH_CURRENT_VIDEO_FAILED,
            error: e.toString()
        })
    }
}

export function* pushVideoToHistory (v) {
    try {
        const
            details = (({ id, description, title }) => ({ id, description, title }))(v),
            history = yield call(store.get, LIST_KEY),
            index   = history.indexOf(details.id)

        if (index === -1) {
            history.push(details.id)
            if (history.length > HISTORY_LIMIT) {
                yield call(store.del, item(history[0].id))
            }
            yield call(
                store.update,
                LIST_KEY,
                // history holds last 50 entries
                history.length > HISTORY_LIMIT ? history.slice(1) : history
            )
            yield call(store.set, ...save(details))
        }
        else {
            const newHistory = [
                ...history.slice(0, index),
                ...history.slice(index + 1),
                history[index]
            ]
            yield call(store.update, LIST_KEY, newHistory)
        }

        yield put({ type: types.ADD_VIDEO_TO_HISTORY_SUCCEEDED, details, open: true })

    } catch (e) {
        yield put({
            type: types.ADD_VIDEO_TO_HISTORY_FAILED,
            error: e.toString()
        })
    }
}