describe('searchCards', () => {
    let username, password, locale, hearthstone, token, queryList, query


    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
        hearthstone = 'hearthstone'
        locale = "en_US"
        queryList = {
            attack: [1, 2, 3, 4, 5],
            textFilter: ['fire', 'murloc', 'lightning'],
            rarity: ['common', 'uncommon', 'rare', 'epic', 'legendary']
        }

        query = `textFilter=${queryList.textFilter[Math.floor(Math.random() * queryList.textFilter.length)]}&`
    })

    describe('when the search has results', () => {
        beforeEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password, hearthstone })
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

        it('should succeed on a successful search', done => {
            searchCards(query, token, locale, (error, cards) => {
                expect(error).toBeUndefined()
                expect(cards).toBeDefined()
                expect(cards.length > 0).toBe(true)
                expect(typeof cards[0].name === 'string').toBe(true)

                done()
            })
        })

        it('should succeed on a search even with a different locale', done => {
            locale = 'es_ES'
            searchCards(query, token, locale, (error, cards) => {
                expect(error).toBeUndefined()
                expect(cards).toBeDefined()
                expect(cards.length > 0).toBe(true)
                expect(typeof cards[0].name === 'string').toBe(true)

                done()
            })
        })

        it('should succeed on a multiple filter search', done => {
            query += `attack=${queryList.attack[Math.floor(Math.random() * queryList.attack.length)]}`

            searchCards(query, token, locale, (error, cards) => {
                if (cards.length) {
                    expect(error).toBeUndefined()
                    expect(cards).toBeDefined()
                    expect(typeof cards[0].name === 'string').toBe(true)
                }

                done()
            })
        })

        it('should have cards with all additional properties for favorites and ratings', done => {
            query += `attack=${queryList.attack[Math.floor(Math.random() * queryList.attack.length)]}`

            searchCards(query, token, locale, (error, cards) => {
                if (cards.length) {
                    expect(error).toBeUndefined()
                    expect(cards).toBeDefined()
                    expect(typeof cards[0].name === 'string').toBe(true)
                    expect(cards[0].isFav).toBeDefined()
                    expect(cards[0].totalValue).toBeDefined()
                    expect(cards[0].rating).toBeDefined()
                    expect(cards[0].rateCount).toBeDefined()
                    expect(cards[0].rateAvg).toBeDefined()
                }

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

    describe('when the search has no results', () => {
        beforeEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password, hearthstone })
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

        it('should show an error message if no results were found', done => {
            searchCards('textFilter=aaaaaaaaaa', token, locale, (error) => {
                expect(error).toBeDefined()
                expect(error instanceof Error).toBe(true)
                expect(error.message).toBe('No results')
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

    let callback

    it('should fail on non-string token', () => {
        token = 1
        expect(() =>
            searchCards(query, token, locale, error => { })
        ).toThrowError(TypeError, `${token} is not a string`)

        token = true
        expect(() =>
            searchCards(query, token, locale, error => { })
        ).toThrowError(TypeError, `${token} is not a string`)

        token = undefined
        expect(() =>
            searchCards(query, token, locale, error => { })
        ).toThrowError(TypeError, `${token} is not a string`)
    })

    it('should fail on non-function callback', () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTQ1MTBlZWJiMGVlNTAwMTU5M2NhNTEiLCJpYXQiOjE1ODE1OTQxODEsImV4cCI6MTU4MTU5Nzc4MX0.sSXLXpEYsDKe68eJCkOj5o1OA26GJ1KpUFzsf3xOSgo'

        callback = 1

        expect(() =>
            searchCards(query, token, locale, callback
            )).toThrowError(TypeError, `${callback} is not a function`)

        callback = true
        expect(() =>
            searchCards(query, token, locale, callback
            )).toThrowError(TypeError, `${callback} is not a function`)

        callback = undefined
        expect(() =>
            searchCards(query, token, locale, callback
            )).toThrowError(TypeError, `${callback} is not a function`)

    })
})