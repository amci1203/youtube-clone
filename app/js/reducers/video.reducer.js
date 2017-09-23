import types from '../types'

export default (state = { open: false }, action) => {
    const { type, details, open = false, error } = action

    switch (type) {
        case types.FETCH_CURRENT_VIDEO_SUCCEEDED:
        case types.ADD_VIDEO_TO_HISTORY_SUCCEEDED:
            return { details, open }
        case types.FETCH_CURRENT_VIDEO_FAILED:
        case types.ADD_VIDEO_TO_HISTORY_FAILED:
            return { error }
        default:
            return state
    }
}