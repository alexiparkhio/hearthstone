describe('call', () => {
    it('should succeed on valid url', done => {
        const targets = [
            { url: 'https://www.lavanguardia.com/', text: 'vanguardia' },
            { url: 'https://www.eldiario.es/', text: 'eldiario' },
            { url: 'https://www.elmundo.es/', text: 'mundo' },
            { url: 'https://www.expansion.com/', text: 'expansion' },
            { url: 'https://www.abc.es/', text: 'abc' }
        ]

        const target = targets.random()

        call(`https://skylabcoders.herokuapp.com/proxy?url=${target.url}`, undefined, (error, response) => {
            expect(error).toBeUndefined()

            expect(response.status).toBe(200)
            //expect(response.content.toLowerCase().includes(target.text)).toBeTruthy()
            expect(response.content.toLowerCase()).toContain(target.text)

            done()
        })
    })

    it('should fail on invalid url', () => {
        const url = 'invalid-url'

        expect(() =>
            call(url, undefined, () => { })
        ).toThrowError(SyntaxError, url + ' is not an url')
    })

    it('should fail on valid non-existing url', done => {
        const url = 'https://non-existing.url'

        call(url, undefined, (error, response) => {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('network error')

            expect(response).toBeUndefined()

            done()
        })
    })
})