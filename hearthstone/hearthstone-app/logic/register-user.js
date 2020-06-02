 /**
 * logic - registerUser
 * @param {string} name -one of the credentials that used for to register an user
 * @param {string} surname - one of the credentials that used for to register an user
 * @param {string} username - one of the credentials that used for to register an user
 * @param {string} password - one of the credentials that used for to register an user
 * @param {string} age - one of the credentials that used for to register an user
 * @param {string} gender - one of the credentials that used for to register an user
 * @param {function} callback - function
 * @returns {function} callback - function return if there is an error
 */

function registerUser(name, surname, username, password, age, gender, callback ){
    if (typeof name !== 'string') { throw new TypeError(`The username ${name} is not a string`) }
    if (!name.trim().length) {throw new SyntaxError ('The name is blank or empty')}
    if (typeof surname !== 'string') { throw new TypeError(`The surname ${surname} is not a string`) }
    if (!surname.trim().length) {throw new SyntaxError ('The surname is blank or empty')}
    if (typeof username !== 'string') { throw new TypeError(`The username ${username} is not a string`) }
    if (!username.trim().length) {throw new SyntaxError ('The username is blank or empty')}
    if (typeof password !== 'string') { throw new TypeError(`The password ${password} is not a string`) }
    if (!password.trim().length) {throw new SyntaxError ('The password is blank or empty')}
    if (typeof parseInt(age) !== 'number') { throw new TypeError(`The age ${age} is not a number`) }
    if (typeof gender !== 'string') { throw new TypeError(`The gender ${gender} is not a string`) }
    if (gender === '') gender = 'non-binary'
    if (typeof callback !== 'function') { throw new TypeError(`The callback ${callback} is not a function`) }

    call('https://skylabcoders.herokuapp.com/api/v2/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, surname, username, password, age, gender, hearthstone: 'hearthstone'})
        },(error, response) => {
            if(error) callback(error)

            if(response.status === 201) callback()

            else if(response.status === 409){
                const{error: _error} = JSON.parse (response.content)
                if(_error) callback(new Error (_error))
            }else{
                callback(new Error('Unknown Error'))
            }
        }
    )


}

