 /**
 * logic - displayWishlist
 * @param {string} token - credentials access
 * @param {string} locale - this string is using for get the languages of the API Blizzard
 * @param {function} callback - function
 * @returns {function} callback - function return two options: list of cards or maybe an error
 */

function displayWishlist(token, locale, callback) {

    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

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
            const { error: _error } = user
            
            if (_error) return callback(new Error(_error))

            if (typeof user.favs !== 'undefined' && user.favs.length) {

                call('https://skylabcoders.herokuapp.com/api/v2/users/all', {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
                },
                    (error, response) => {
                        if (error) return callback(error)
    
                        if (response.status === 200) {
    
                            const users = JSON.parse(response.content)
                            const { error: _error } = users
                            if (_error) return callback(new Error(_error))
    
                            let usersRating = []
                            users.map(user => {
                                (typeof user['hearthstone'] !== 'undefined') ? usersRating.push(user) : false
                            })

                            let count = 0
                            const listedCards = []
    
                            if (typeof user.favs !== 'undefined' || user.favs.length) {
                                for (let i = 0; i < user.favs.length; i++) {
    
                                    call(`https://eu.api.blizzard.com/hearthstone/cards?locale=${locale}&access_token=EUqObteRiAeUkQ8x1nY6G8FDFjKlXlMfZh&pageSize=9999&id=${user.favs[i]}`, {
                                        method: 'GET'
                                    }, (error, response) => {
                                        if (error) return callback(error)
    
                                        if (response.status === 200) {
                                            let detailInfo = JSON.parse(response.content)
                                            detailInfo = detailInfo.cards[0]
                                            detailInfo.isFav = true
                                            detailInfo.totalValue = 0
                                            detailInfo.rating = 0
                                            detailInfo.rateCount = 0
                                            detailInfo.rateAvg = 0
    
                                            
                                            for (let j = 0; j < usersRating.length; j++) {
                                                let userRating = usersRating[j]
    
                                                if (typeof userRating.rating !== 'undefined') {
    
                                                    for (let z = 0; z < userRating.rating.length; z++) {
                                                        if (userRating.rating[z][0] === detailInfo.id) {
    
                                                            detailInfo.rateCount++
                                                            detailInfo.rateAvg = mean(userRating.rating[z][1], detailInfo.totalValue, detailInfo.rateCount)
                                                            detailInfo.totalValue += userRating.rating[z][1]
                                                        }
    
                                                    }
                                                }
    
                                            }
    
                                            if (typeof user.rating !== 'undefined') {
    
                                                for (let j = 0; j < user.rating.length; j++) {
    
                                                    if (user.rating[j][0] === detailInfo.id) {
                                                        detailInfo.rating = user.rating[j][1]
                                                    }
                                                }
    
                                            }
                                            
                                            listedCards.push(detailInfo)
                                            count++
                                        }
                                        if (count === user.favs.length) {
                                            return callback(undefined, listedCards)
                                        }
                                    })
                                    
                                }
    
                            } 
    
                        }
                    })
            } else {
                return callback(undefined, [])
            }

        }
    })
}