fdescribe('displayWishlist', () => {
    let name, surname, username, password, favs, locale, hearthstone, token

    beforeEach(()=> {
                name = 'name-' + Math.random()
                surname = 'surname-' + Math.random()
                username = 'username-' + Math.random()
                password = 'password-' + Math.random()
                hearthstone = 'hearthstone'
                locale = "en_US"
    })

    describe('when at least 1 card is wishlisted', () => {
        beforeEach(done => {
            
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password, hearthstone, favs: [1050] })
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

        it('should display the card that was previously wishlisted', done => {
            displayWishlist(token, locale, (error, cards) => {
                expect(error).toBeUndefined()
                expect(cards).toBeDefined()
                expect(cards[0].id).toBe(1050)
                expect(cards instanceof Array).toBe(true)
                expect(cards[0] instanceof Object).toBe(true)

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

    describe('when 2 or more cards are on wishlist', () => {
  
        beforeEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password, hearthstone, favs: [254, 467, 60375, 56358, 50484, 57761, 49990, 55035, 1050, 481] })
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

        it('should display all cards that are on wishlist, regardless of the amount', done => {
            displayWishlist(token, locale, (error, cards) => { debugger
                expect(error).toBeUndefined()
                expect(cards).toBeDefined()
                expect(cards.length).toBe(10)
                expect(cards instanceof Array).toBe(true)
                
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

    describe('when no cards are on wishlist', () => {

        beforeEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password, hearthstone, favs: [] })
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

        it('should return no results when no cards are added on wishlist', done => {
            displayWishlist(token, locale, (error, cards) => {
                expect(error).toBeUndefined()
                expect(cards).toBeDefined()
                expect(cards).toBe('No results')
                expect(cards instanceof String).toBe(true)

                done()
            })
        })
    })

    // it('should fail on non-number id', () => {
    //     token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTQ1MTBlZWJiMGVlNTAwMTU5M2NhNTEiLCJpYXQiOjE1ODE1OTQxODEsImV4cCI6MTU4MTU5Nzc4MX0.sSXLXpEYsDKe68eJCkOj5o1OA26GJ1KpUFzsf3xOSgo'

    //     id = 'oso'
    //     expect(() =>
    //         retrieveCard(token, locale, id, error => { })
    //     ).toThrowError(TypeError, `${id} is not a number`)

    //     id = false
    //     expect(() =>
    //         retrieveCard(token, locale, id, error => { })
    //     ).toThrowError(TypeError, `${id} is not a number`)

    //     id = undefined
    //     expect(() =>
    //         retrieveCard(token, locale, id, error => { })
    //     ).toThrowError(TypeError, `${id} is not a number`)
    // })

    // it('should fail on non-string token', () => {
    //     token = 1
    //     expect(() =>
    //         retrieveCard(token, locale, id, error => { })
    //     ).toThrowError(TypeError, `${token} is not a string`)

    //     token = true
    //     expect(() =>
    //         retrieveCard(token, locale, id, error => { })
    //     ).toThrowError(TypeError, `${token} is not a string`)

    //     token = undefined
    //     expect(() =>
    //         retrieveCard(token, locale, id, error => { })
    //     ).toThrowError(TypeError, `${token} is not a string`)
    // })

    // it('should fail on non-function callback', () => {
    //     token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTQ1MTBlZWJiMGVlNTAwMTU5M2NhNTEiLCJpYXQiOjE1ODE1OTQxODEsImV4cCI6MTU4MTU5Nzc4MX0.sSXLXpEYsDKe68eJCkOj5o1OA26GJ1KpUFzsf3xOSgo'

    //     callback = 1

    //     expect(() =>
    //         retrieveCard(token, locale, id, callback
    //         )).toThrowError(TypeError, `${callback} is not a function`)

    //     callback = true
    //     expect(() =>
    //         retrieveCard(token, locale, id, callback
    //         )).toThrowError(TypeError, `${callback} is not a function`)

    //     callback = undefined
    //     expect(() =>
    //         retrieveCard(token, locale, id, callback
    //         )).toThrowError(TypeError, `${callback} is not a function`)

    // })
})