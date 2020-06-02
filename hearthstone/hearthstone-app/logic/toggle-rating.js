 /**
 * logic - toggleRating
 * @param {string} token - credentials access
 * @param {object} rating  - is an array of two numbers : the better is the id of the card and the later is its score from 1 to 5 
 * @param {function} callback - function
 * @returns {function} callback - function error is there is
 */
function toggleRating(token, rating, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!(rating instanceof Array)) throw new TypeError(`${rating} is not an array`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const _token = token.split('.')
    const payload = JSON.parse(atob(_token[1])).sub

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${payload}`, {

        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: undefined
    }, (error, response) => {
        if (error) return callback(error)
        // if (_error) return callback(new Error(_error)) 
        
        if (response.status === 200) {
            const user = JSON.parse(response.content)

            if (typeof user.rating === 'undefined') {
                const singleRating = [rating]

                call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {

                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ rating: singleRating })
                }, (error, response) => {
                    if (error) return callback(error)

                    // const {error: _error} = JSON.parse(response.content)
                    // if (_error) return callback(new Error(_error))  

                    else return callback()
                })

            } else {
                let doesItExist = 0

                for (let i = 0; i < user.rating.length; i++) {
                    if (user.rating[i][0] === rating[0]) {
                        user.rating[i][1] = rating[1]
                    } else {
                        doesItExist++
                    }
                }

                if (doesItExist === user.rating.length) {
                    user.rating.push(rating)
                }

                call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {

                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ rating: user.rating })
                }, (error, response) => {
                    if (error) return callback(error)

                    // const {error: _error} = JSON.parse(response.content)
                    // if (_error) return callback(new Error(_error))  

                    else return callback()
                })
            }
        }   
    })
}