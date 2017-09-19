export default (function () {
    const
        store = window.localStorage,
        
        noExistErrMsg = 'provided key does not exist',
        noOverwriteErrMsg = 'provided key already exists; the third argument should be truthy to allow overwrites',
        
        exists = key => !!store.getItem(key), // used by other methods
        pExists = key => Promise.resolve(exists(key)), // exported

        del = key => new Promise((resolve, reject) => {
            if (!exists(key)) reject(noExistErrMsg)
            store.removeItem(key)
            resolve(1)
        }),

        get = key => new Promise((resolve, reject) => {
            if (!exists(key)) reject(noExistErrMsg)
            resolve(JSON.parse(store.getItem(key)))
        }),

        set = (key, val, overwrite = false) => new Promise((resolve, reject) => {
            if (!overwrite && exists(key)) reject(noOverwriteErrMsg)
            store.setItem(key, JSON.stringify(val))
            resolve(1) // returns an okay like db updates would
        })

    return { del, get, set, exists: pExists }
})()