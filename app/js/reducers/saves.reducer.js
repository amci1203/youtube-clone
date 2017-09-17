import types from '../types'

export default (state = {}, action) => {
    const { type, videos, video, index, error } = action

    switch (type) {
        case types.FETCH_SAVES_SUCCESSFUL:
            return { videos }
        case types.ADD_SAVE_SUCCESSFUL:
            return { videos: state.videos.concat([ video ]) }
        case types.REMOVE_SAVE_SUCCESSFUL:
            const removeVideo = (arr, i) => [...videos.slice(0, i), ...videos.slice(i + 1)]
            return { videos: removeVideo(state.videos, index) }
        case types.ADD_SAVE_FAILED:
        case types.REMOVE_SAVE_FAILED:
        case types.FETCH_SAVES_FAILED:
            return { ...state, error }
        default:
            return state
    }
}