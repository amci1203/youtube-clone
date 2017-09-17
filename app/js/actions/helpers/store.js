export default (function () {
    const
        store = window.localStorage,
        
        noExistErrMsg = 'provided key does not exist',
        noOverwriteErrMsg = 'provided key already exists; set third arg to true if you wish to overwrite this value',
    
        del = key => new Promise((resolve, reject) => {
            if (store.get(key) == null) reject(noExistErrMsg)
            store.removeItem(key)
            resolve(1)
        }),

        get = key => new Promise((resolve, reject) => {
            if (store.get(key) === null) reject(noExistErrMsg)
            resolve(JSON.parse(store.getItem(key)))
        }),

        set = (key, val, overwrite = false) => new Promise((resolve, reject) => {
            if (!overwrite && store.getItem(key) !== null) reject(noOverwriteErrMsg)
            store.setItem(key, JSON.stringify(val))
            resolve(1)
        })

    return { del, get, set }
})()