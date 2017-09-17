const formActionTypes = str => {
    const
        base = str.toUpperCase(),
        request = base + '_REQUESTED',
        succeed = base + '_SUCCEEDED',
        failure = base + '_FAILED'

    return {
           [base]: base,
        [request]: request,
        [succeed]: succeed,
        [failure]: failure
    }
}

export default {
    ...formActionTypes('FETCH_LAST_SEARCH_RESULTS'),
    ...formActionTypes('SEARCH'),
    ...formActionTypes('FETCH_SAVES'),
    ...formActionTypes('ADD_SAVE'),
    ...formActionTypes('REMOVE_SAVE')
}