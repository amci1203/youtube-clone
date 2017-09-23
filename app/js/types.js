// creates uniform request/success/failure types for a given type
const formActionTypes = (type, keepBase = false) => {
    const
        base = type.toUpperCase(),
        request = base + '_REQUESTED',
        succeed = base + '_SUCCEEDED',
        failure = base + '_FAILED'

    const types = {
        [request]: request,
        [succeed]: succeed,
        [failure]: failure
    }

    if (!keepBase) return types

    types[base] = base
    return types
}

// creates an object of custom types to spread onto exported object
const formCustomActionTypes = (...types) => types.reduce((obj, type) => (
    Object.assign(obj, { [type]: type })
), {})
    

export default {
    ...formActionTypes('FETCH_LAST_SEARCH_RESULTS'),
    ...formActionTypes('SEARCH'),
    ...formActionTypes('FETCH_SAVES'),
    ...formActionTypes('TOGGLE_SAVE'),
    ...formActionTypes('FETCH_CURRENT_VIDEO'),
    ...formActionTypes('ADD_VIDEO_TO_HISTORY'),
    ...formCustomActionTypes('ADD_SAVE', 'REMOVE_SAVE')
    
}