 /**
 * logic - retrieveCard
 * @param {string} token - credentials access
 * @param {string} locale - this string is using for get the languages of the API Blizzard
 * @param {string} id - identity of the card
 * @param {function} callback - function
 * @returns {function} callback - function return detail of card
 */

function retrieveCard(token, locale, id, callback) {

    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)
    if (typeof id !== 'number') throw new TypeError(`${id} is not a number`)

    const _token = token.split('.')
    const payload = JSON.parse(atob(_token[1])).sub

    if (locale === '' || typeof locale === 'undefined') locale = 'en_US'

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
            // const {error: _error} = user
            const user = JSON.parse(response.content)
            // if (_error) return callback(new Error(_error)) 

            call('https://skylabcoders.herokuapp.com/api/v2/users/all', {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            },
                (error, response) => {
                    if (error) return callback(error)


                    const users = JSON.parse(response.content)

                    let usersRating = []
                    users.map(user => {
                        (typeof user['hearthstone'] !== 'undefined') ? usersRating.push(user) : false
                    })



                    call(`https://eu.api.blizzard.com/hearthstone/cards?locale=${locale}&access_token=EUqObteRiAeUkQ8x1nY6G8FDFjKlXlMfZh&pageSize=9999&id=${id}`, {
                        method: 'GET'
                    }, (error, response) => {
                        if (error) return callback(error)

                        if (response.status === 200) {
                            let detailInfo = JSON.parse(response.content)
                            detailInfo = detailInfo.cards[0]
                            detailInfo.isFav = false
                            detailInfo.totalValue = 0
                            detailInfo.rating = 0
                            detailInfo.rateCount = 0
                            detailInfo.rateAvg = 0

                            for (let i = 0; i < usersRating.length; i++) {
                                let userRating = usersRating[i]

                                if (typeof userRating.rating !== 'undefined') {

                                    for (let j = 0; j < userRating.rating.length; j++) {
                                        if (userRating.rating[j][0] === detailInfo.id) {
                                            detailInfo.rateCount++
                                            detailInfo.rateAvg = mean(userRating.rating[j][1], detailInfo.totalValue, detailInfo.rateCount)
                                            detailInfo.totalValue += userRating.rating[j][1]
                                        }

                                    }
                                }

                                if (typeof user.favs !== 'undefined') {
                                    user.favs.includes(id) ? detailInfo.isFav = true : detailInfo.isFav = false
                                }

                            }


                            if (typeof user.rating !== 'undefined') {

                                for (let j = 0; j < user.rating.length; j++) {

                                    if (user.rating[j][0] === detailInfo.id) {
                                        detailInfo.rating = user.rating[j][1]
                                    }
                                }

                            }


                            callback(undefined, detailInfo)
                        }
                    })
                })
        }
    })
}
