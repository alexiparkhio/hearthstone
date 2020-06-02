 /**
 * logic - retrieveUser
 * @param {string} token - credentials access
 * @param {function} callback - function
 * @returns {function} callback - function user or error if not find an user
 */

function retrieveUser(token, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const _token = token.split('.')
    const payload = JSON.parse(atob(_token[1])).sub

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${payload}`,{

        method:'GET',
        headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
        body: undefined
    }, (error, response) => {
        if(error) return callback(error)
            
        const user  = JSON.parse(response.content), {error: _error} = user
        if (_error) return callback(new Error(_error)) 

        callback(undefined, user)
    })
}