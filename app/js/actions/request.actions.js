import types from '../types'

export default (str, ...args) => {
    let type = str.toUpperCase()
    try {
        if (typeof types[type] != 'string') {
            type += '_REQUESTED'
            if (typeof types[type] != 'string') {
                throw Error('the action type passed does not exist in your type definitions')
            }
        }
        return { type, args: args.length ? args : null }
    } catch (e) {
        console.error(e)
    }
}