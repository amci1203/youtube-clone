import types from '../types'

export default (state = {}, action) => {
    const { type, videos, error } = action

    switch (type) {
        case types.SEARCH_SUCCESSFUL:
            return { videos }
        case types.SEARCH_FAILED:
            return { ...state, error }
        default:
            return state
    }
}