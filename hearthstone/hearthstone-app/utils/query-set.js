function querySet(obj) {
    let query = ''
    const keys = Object.keys(obj)

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]

        if (keys[key] !== '') {
            query += `${key}=${obj[key]}&`
        }
    }
    return query
}