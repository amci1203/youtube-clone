import types from '../types'

export default (state = { results: [] }, action) => {
    const { type, results, term, error } = action

    switch (type) {
        case types.FETCH_LAST_SEARCH_RESULTS_SUCCEEDED:
        case types.SEARCH_SUCCEEDED:
            return { results, term }
            case types.FETCH_LAST_SEARCH_RESULTS_FAILED:
        case types.SEARCH_FAILED:
            return { ...state, error }
        default:
            return state
    }
}