import types from '../types'

export default (str, ...args) => {
    const type = str.toUpperCase() + '_REQUESTED'
    try {
        if (typeof types[type] != 'string')
            throw Error('that action group does not have a request type')
        return { type, args: args.length ? args : null }
    } catch (e) {
        console.error(e)
    }
}