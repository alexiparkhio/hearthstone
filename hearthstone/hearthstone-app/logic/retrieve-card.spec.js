describe('retrieveCard', () => {
    let name, surname, username, password, locale, hearthstone, token, idList, id


    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
        hearthstone = 'hearthstone'
        locale = "en_US"
        idList = [254, 467, 60375, 56358, 50484, 57761, 49990, 55035, 1050, 481]

        id = idList[Math.floor(Math.random() * idList.length)]
    })

    describe('when we access the card details', () => {
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

        it('should show the card details', done => {
            retrieveCard(token, locale, id, (error, card) => {
                expect(error).toBeUndefined()
                expect(card).toBeDefined()
                expect(typeof card.name === 'string').toBe(true)
                expect(typeof card.text === 'string').toBe(true)
                expect(typeof card.manaCost === 'number').toBe(true)
                expect(typeof card.rarityId === 'number').toBe(true)
                expect(typeof card.classId === 'number').toBe(true)

                done()
            })
        })

        it('should acces the card details even with a different locale', done => {
            locale = 'es_ES'
            retrieveCard(token, locale, id, (error, card) => {
                expect(error).toBeUndefined()
                expect(card).toBeDefined()
                expect(typeof card.name === 'string').toBe(true)
                expect(typeof card.text === 'string').toBe(true)
                expect(typeof card.manaCost === 'number').toBe(true)
                expect(typeof card.rarityId === 'number').toBe(true)
                expect(typeof card.classId === 'number').toBe(true)

                done()
            })
        })

        it('should have card with all additional properties for favorites and ratings', done => {

            retrieveCard(token, locale, id, (error, card) => {
                expect(error).toBeUndefined()
                expect(card).toBeDefined()
                expect(typeof card.name === 'string').toBe(true)
                expect(typeof card.text === 'string').toBe(true)
                expect(typeof card.manaCost === 'number').toBe(true)
                expect(typeof card.rarityId === 'number').toBe(true)
                expect(typeof card.classId === 'number').toBe(true)
                expect(card.isFav).toBeDefined()
                expect(card.totalValue).toBeDefined()
                expect(card.rating).toBeDefined()
                expect(card.rateCount).toBeDefined()
                expect(card.rateAvg).toBeDefined()

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

    it('should fail on non-number id', () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTQ1MTBlZWJiMGVlNTAwMTU5M2NhNTEiLCJpYXQiOjE1ODE1OTQxODEsImV4cCI6MTU4MTU5Nzc4MX0.sSXLXpEYsDKe68eJCkOj5o1OA26GJ1KpUFzsf3xOSgo'

        id = 'oso'
        expect(() =>
            retrieveCard(token, locale, id, error => { })
        ).toThrowError(TypeError, `${id} is not a number`)

        id = false
        expect(() =>
            retrieveCard(token, locale, id, error => { })
        ).toThrowError(TypeError, `${id} is not a number`)

        id = undefined
        expect(() =>
            retrieveCard(token, locale, id, error => { })
        ).toThrowError(TypeError, `${id} is not a number`)
    })

    it('should fail on non-string token', () => {
        token = 1
        expect(() =>
            retrieveCard(token, locale, id, error => { })
        ).toThrowError(TypeError, `${token} is not a string`)

        token = true
        expect(() =>
            retrieveCard(token, locale, id, error => { })
        ).toThrowError(TypeError, `${token} is not a string`)

        token = undefined
        expect(() =>
            retrieveCard(token, locale, id, error => { })
        ).toThrowError(TypeError, `${token} is not a string`)
    })

    it('should fail on non-function callback', () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTQ1MTBlZWJiMGVlNTAwMTU5M2NhNTEiLCJpYXQiOjE1ODE1OTQxODEsImV4cCI6MTU4MTU5Nzc4MX0.sSXLXpEYsDKe68eJCkOj5o1OA26GJ1KpUFzsf3xOSgo'

        callback = 1

        expect(() =>
            retrieveCard(token, locale, id, callback
            )).toThrowError(TypeError, `${callback} is not a function`)

        callback = true
        expect(() =>
            retrieveCard(token, locale, id, callback
            )).toThrowError(TypeError, `${callback} is not a function`)

        callback = undefined
        expect(() =>
            retrieveCard(token, locale, id, callback
            )).toThrowError(TypeError, `${callback} is not a function`)

    })
})