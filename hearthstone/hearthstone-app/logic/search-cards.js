 /**
 * logic - searchCards
 * @param {string} query - is value of the search
 * @param {string} token - credentials access
 * @param {string} locale - this string is using for get the languages of the API Blizzard
 * @param {function} callback - function
 * @returns {function} callback - function return results of search
 */

function searchCards(query, token, locale, callback) {
    
    if (typeof query !== 'undefined') {
        if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    }

    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    if (locale === '' || typeof locale === 'undefined') locale = 'en_US'

    const _token = token.split('.')
    const payload = JSON.parse(atob(_token[1])).sub

    function mean(value1, value2, div) {
        return parseFloat(((value1 + value2) / div).toFixed(2))
    }


    call(`https://skylabcoders.herokuapp.com/api/v2/users/${payload}`, {

        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: undefined
    }, (error, response) => {
        if (error) return callback(error)

        if (response.status === 200) {
            const user = JSON.parse(response.content)
            const {error: _error} = user
            if (_error) return callback(new Error(_error)) 

            call('https://skylabcoders.herokuapp.com/api/v2/users/all', {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            },
                (error, response) => {
                    if (error) return callback(error)


                    const users = JSON.parse(response.content)
                    const {error: _error} = users
                    if (_error) return callback(new Error(_error)) 

                    let usersRating = []
                    users.map(user => {
                        (typeof user['hearthstone'] !== 'undefined') ? usersRating.push(user) : false
                    })

                    call(`https://eu.api.blizzard.com/hearthstone/cards?locale=${locale}&access_token=EUqObteRiAeUkQ8x1nY6G8FDFjKlXlMfZh&pageSize=9999&${query}`, {
                        method: 'GET'
                    }, (error, response) => {
                        if (error) return callback(error)

                        if (response.status === 200) {
                            let results = JSON.parse(response.content)

                            results = results.cards
                            if (results.length) {

                                results.map(card => {
                                    card.isFav = false
                                    card.totalValue = 0
                                    card.rating = 0
                                    card.rateCount = 0
                                    card.rateAvg = 0
                                })

                                if (typeof user.favs !== 'undefined') {
                                    results.map(card => {
                                        user.favs.includes(card.id) ? card.isFav = true : card.isFav = false
                                    })
                                }

                                for (let i = 0; i < usersRating.length; i++) {
                                    let userRating = usersRating[i]

                                    if (typeof userRating.rating !== 'undefined') {
                                        results.map(card => {
                                            for (let j = 0; j < userRating.rating.length; j++) {
                                                if (userRating.rating[j][0] === card.id) {
                                                    // card.rating = userRating.rating[j][1]
                                                    card.rateCount++
                                                    card.rateAvg = mean(userRating.rating[j][1], card.totalValue, card.rateCount)
                                                    card.totalValue += userRating.rating[j][1]
                                                }

                                            }

                                        })
                                    }

                                }

                                if (typeof user.rating !== 'undefined') {
                                    for (let i = 0; i < results.length; i++) {
                                        for (let j = 0; j < user.rating.length; j++) {

                                            if (user.rating[j][0] === results[i].id) {
                                                results[i].rating = user.rating[j][1]
                                            }
                                        }
                                    }
                                }

                                return callback(undefined, results)
                            } else {
                                return callback(new Error('No results'))
                            }
                        }
                    })

                })
        }
    })
}