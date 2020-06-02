const address = {
    set search(query) {
        const { protocol, host, pathname } = location

        let url = `${protocol}//${host}${pathname}`, keys

        if (query && (keys = Object.keys(query)).length) {
            let queryString = '?'

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]

                queryString += `${key}=${query[key]}`

                if (i < keys.length - 1) queryString += '&'
            }

            url += queryString
        }

        history.pushState(undefined, undefined, url)
    },

    get search() {
        const query = {}

        const { search } = location

        if (search.startsWith('?')) {
            const keyValues = search.substring(1).split('&')

            keyValues.forEach(keyValue => {
                const [key, value] = keyValue.split('=')

                query[key] = decodeURI(value)
            })
        }

        return query
    },

    set hash(hash = '') {
        const { protocol, host, pathname } = location

        let url = `${protocol}//${host}${pathname}${hash ? `#${hash}` : ''}`

        history.pushState(undefined, undefined, url)
    },

    get hash() {
        const { hash } = location

        return hash.startsWith('#') ? hash.substring(1) : ''
    },

    clear() {
        const { protocol, host, pathname } = location

        let url = `${protocol}//${host}${pathname}`

        history.pushState(undefined, undefined, url)
    }
}