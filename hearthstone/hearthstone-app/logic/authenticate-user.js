 /**
 * logic - authenticateUser
 * @param {string} username - this string is using for send the first credential to the API
 * @param {string} password - this string is using for send the second credential to the API
 * @param {function} callback - function return two options: token or error
 * @returns {function} token - credentials access
 */
function authenticateUser(username, password, callback) {
    if (typeof username !== 'string') { throw new TypeError(`The username ${username} is not a string`) }
    if (typeof password !== 'string') { throw new TypeError(`The password ${password} is not a string`) }

    call("https://skylabcoders.herokuapp.com/api/v2/users/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    }, (error, response) => {
        if (error) return callback(error)

        if (response.status === 401) {
            const {error} = JSON.parse(response.content)
            return callback(new Error(error))
        }
        else if (response.status === 200) {
            
            const { error: _error, token } = JSON.parse(response.content)
    
            if (_error) return callback(new Error(_error))
    
            const _token = token.split('.')
            const payload = JSON.parse(atob(_token[1])).sub
    
            call(`https://skylabcoders.herokuapp.com/api/v2/users/${payload}`, {
    
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: undefined
            }, (error, response) => {
                if (error) return callback(error)
                
                const user = JSON.parse(response.content), { error: _error } = user
                if (_error) return callback(new Error(_error))
    
                if (typeof user.hearthstone !== 'undefined')
                    callback(undefined, token)
                else
                    return callback(new Error('Who are you?????'))
    
            })
        }
    })
}

