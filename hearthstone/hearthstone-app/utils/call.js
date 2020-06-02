const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

function call(url, options = {}, callback) {
    if (typeof url !== 'string') throw new TypeError(`${url} is not a string`)
    if (!URL_REGEX.test(url)) throw new SyntaxError(`${url} is not an url`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const xhr = new XMLHttpRequest

    const { method = 'GET', headers, body } = options

    xhr.open(method, url)

    for (const key in headers)
        xhr.setRequestHeader(key, headers[key])

    xhr.addEventListener('load', function () {
        return callback(undefined, {
            content: this.responseText,
            status: this.status
        })
    })

    xhr.addEventListener('error', () => {return callback(new Error('network error'))})

    xhr.send(body)
}