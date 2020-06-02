

describe('registerUser', () => {
    let name, surname, username, password, age, gender
    const genderTypes = ['Male', 'Female', 'Non-binary']

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
        age = Math.floor((Math.random() * 120) +1)
        gender = genderTypes[Math.floor(Math.random() * 3)] 
    })

    it('should succeed on new user creation', done => { //happy path :)
        registerUser(name,surname, username,password,age,gender,error =>{
            expect(error).toBeUndefined()
            done()
        })
    })

    //Code to clean the database of random users
    afterEach(done => {
        call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }, (error, response) => {
            if (error) return done(error)

            const { error: _error, token } = JSON.parse(response.content)

            if (_error) return done(new Error(_error))

            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password })
            }, (error, response) => {
                if (error) return done(error)

                if (response.content) {
                    const { error } = JSON.parse(response.content)

                    if (error) return done(new Error(error))
                }

                done()
            })
        })
    })

    describe('when the user already exists', () => { //unhappy path :(
        beforeEach(done => {
            call('https://skylabcoders.herokuapp.com/api/v2/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, surname, username, password, age, gender})
                },(error, response) => {
                    if(error) callback(error)
                    
                    done()
                })
        })

        it('should fail when the username already exists', done => {
            registerUser(name,surname,username,password,age,gender,error =>{
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with username "${username}" already exists`)
                done()
            })    
        })

        it('should fail on empty/blank name', () => {
            error = undefined
            expect(()=>
                registerUser('',surname,'pepitosososososo',password,age,gender,error)).toThrowError(SyntaxError, 'The name is blank or empty')
          
        })

        it('should fail on empty/blank surname', () => {
            error = undefined
            expect(()=>
                registerUser(name,'','pepitosososo',password,age,gender,error)).toThrowError(SyntaxError, 'The surname is blank or empty')
          
        })

        it('should fail on empty/blank username', () => {
            error = undefined
            expect(()=>
                registerUser(':^)',surname,'',password,age,gender,error)).toThrowError(SyntaxError, 'The username is blank or empty')
          
        })

        it('should fail on empty/blank password', () => {
            error = undefined
            expect(()=>
                registerUser('asd',surname,'pepitoasdososo','',age,gender,error)).toThrowError(SyntaxError, 'The password is blank or empty')
          
        })
    })


   
})