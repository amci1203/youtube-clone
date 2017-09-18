import types from '../types'

export default (state = null, action) => {
    const { type, video, error } = action

    switch (type) {
        case types.SET_CURRENT_VIDEO_SUCCEEDED:
            return video
        case types.SET_CURRENT_VIDEO_FAILED:
            return { error }
        default:
            return state
    }
}