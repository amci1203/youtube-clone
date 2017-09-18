import types from '../types'

export default (state = {}, action) => {
    const { type, videos, video, index, error } = action

    switch (type) {
        case types.FETCH_SAVES_SUCCEEDED:
            return { videos, error: null }
        case types.ADD_SAVE:
            return { videos: state.videos.concat([ video ]) }
        case types.REMOVE_SAVE:
            const removeVideo = (arr, i) => [...videos.slice(0, i), ...videos.slice(i + 1)]
            return { videos: removeVideo(state.videos, index) }
        case types.TOGGLE_SAVE_FAILED:
        case types.FETCH_SAVES_FAILED:
            return { ...state, error }
        default:
            return state
    }
}