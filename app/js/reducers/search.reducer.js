import types from '../types'

export default (state = {}, action) => {
    const { type, results, error } = action

    switch (type) {
        case types.SEARCH_SUCCEEDED:
            return { results }
        case types.SEARCH_FAILED:
            return { ...state, error }
        default:
            return state
    }
}