describe('retrieveUser', () => {
    let name, surname, username, password, token

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    describe('when the user already exists', () => {
        beforeEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password })
            }, (error, response) => {
                if (error) return done(error)

                if (response.content) {
                    const { error } = JSON.parse(response.content)

                    if (error) return done(new Error(error))
                }
                
                call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                }, (error, response) => {
                    if (error) return done(error)

                    const { error: _error, token: _token } = JSON.parse(response.content)

                    if (_error) return done(new Error(_error))

                    token = _token

                    done()
                })
            })
        })

        it('should succeed on correct token retrieval', done => {
            retrieveUser(token, (error, user) => {
                expect(error).toBeUndefined()
                expect(user).toBeDefined()

                const VALID_KEYS = ['name', 'surname', 'username']
                Object.keys(user).forEach(key => VALID_KEYS.includes(key))

                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.username).toBe(username)
                expect(user.password).toBeUndefined()

                done()
            })
        })

        it('should fail on invalid token retrieval', done => {
            retrieveUser(`${token}-pepito`, (error, user) => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('invalid token')

                expect(user).toBeUndefined()

                done()
            })
        })

        afterEach(done => {
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

    it('should fail on non-string token', () => {
        token = 1
        expect(() =>
            retrieveUser(token, (error, user) => { })
        ).toThrowError(TypeError, `${token} is not a string`)

        token = true
        expect(() =>
            retrieveUser(token, (error, user) => { })
        ).toThrowError(TypeError, `${token} is not a string`)

        token = undefined
        expect(() =>
            retrieveUser(token, (error, user) => { })
        ).toThrowError(TypeError, `${token} is not a string`)
    })

    it('should fail on non-function callback', () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTQxMTkyMjFkNmVkMzAwMTU4MmYxNGUiLCJpYXQiOjE1ODEzMjQ3NTQsImV4cCI6MTU4MTMyODM1NH0.1F0PsnV5KdV-Sa6zdCzsqzPSuYfoazVoU0OLluWZIqY'

        callback = 1
        expect(() =>
            retrieveUser(token, callback)
        ).toThrowError(TypeError, `${callback} is not a function`)

        callback = true
        expect(() =>
            retrieveUser(token, callback)
        ).toThrowError(TypeError, `${callback} is not a function`)

        callback = undefined
        expect(() =>
            retrieveUser(token, callback)
        ).toThrowError(TypeError, `${callback} is not a function`)
    })
})