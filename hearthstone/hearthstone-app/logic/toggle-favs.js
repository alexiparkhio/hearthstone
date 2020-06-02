 /**
 * logic - toggleFavs
 * @param {string} id - identity of the card
 * @param {string} token - credentials access
 * @param {function} callback - function
 * @returns {function} callback - function error is there is
 */

function toggleFavs(id, token, callback){
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof id !== 'number') throw new TypeError(`${id} is not a number`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const _token = token.split('.')
    const payload = JSON.parse(atob(_token[1])).sub

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${payload}`,{

        method:'GET',
        headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
        body: undefined
    }, (error, response) => {
        if(error) return callback(error)
        // if (_error) return callback(new Error(_error)) 

        if (response.status === 200) {
            const user  = JSON.parse(response.content)
        
            if(typeof user.favs === 'undefined' || !user.favs.length){
                user.favs = [id]
                
                call(`https://skylabcoders.herokuapp.com/api/v2/users/`,{

                    method:'PATCH',
                    headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
                    body: JSON.stringify({favs: user.favs})
                }, (error, response) => {
                    if(error) return callback(error)
                        
                    // const {error: _error} = JSON.parse(response.content)
                    // if (_error) return callback(new Error(_error))  
                    if (response.status === 204) return callback()
                })

            }else{
                if(user.favs.includes(id)){
                    user.favs.splice(user.favs.indexOf(id), 1)
                    call(`https://skylabcoders.herokuapp.com/api/v2/users/`,{

                    method:'PATCH',
                    headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
                    body: JSON.stringify({favs: user.favs})
                }, (error, response) => {
                    if(error) return callback(error)
                        
                    // const {error: _error} = JSON.parse(response.content)
                    // if (_error) return callback(new Error(_error))  

                    if (response.status === 204) return callback()
                })

                }else{
                    user.favs.push(id)
                    call(`https://skylabcoders.herokuapp.com/api/v2/users/`,{

                    method:'PATCH',
                    headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },       
                    body: JSON.stringify({favs: user.favs})
                }, (error, response) => {
                    if(error) return callback(error)
                        
                    // const {error: _error} = JSON.parse(response.content)
                    // if (_error) return callback(new Error(_error))  

                    if (response.status === 204) return callback()
                })
                }
            }
        }
    })
}