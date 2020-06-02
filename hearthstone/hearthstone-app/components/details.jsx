function Details({ detailInfo: { image, name, id, cardSetId, text, flavorText, isFav, rating, rateAvg, rateCount },user, onRating, onBackClick, onItemWL, onItemDeck }) {
    return <div className='details'>

        <h2 className='details__nameuser'>{`Hi ${user.name}! Welcome back!`}</h2>

        <a href=''className='details__arrow' onClick={event => {
            event.preventDefault()
            onBackClick()
        }}><i className="fas fa-arrow-left"></i></a>

        {image && <img src={image} className="details__image"/>}
        {!image && <img className="details__image" src="https://legaldbol.com/wp-content/uploads/2019/03/48-Free-Printable-Card-Template-Hearthstone-in-Photoshop-by-Card-Template-Hearthstone.jpg" />}
       
        <div className='details__container'>
            <ul className='card-info'>
                <li><b>Name: </b>{`${name} (${id})`}</li>
                <li><b>Card Set: </b>{cardSetId}</li>
                <li><b>Description: </b>{text}</li>
                <li><b>Flavor: </b><i>{`"${flavorText}"`}</i></li>
            </ul>
        </div>
       
        <div className='details__container-rating'>
            <span onClick={event => {
                event.preventDefault()
                const rating = [id, 1]
                onRating(rating)
            }}><i className={`fas fa-star ${rating >= 1 ? 'checked' : ''}`}></i></span>

            <span  onClick={event => {
                event.preventDefault()
                const rating = [id, 2]
                onRating(rating)
            }}><i className={`fas fa-star ${rating >= 2 ? 'checked' : ''}`}></i></span>

            <span onClick={event => {
                event.preventDefault()
                const rating = [id, 3]
                onRating(rating)
            }}><i className={`fas fa-star ${rating >= 3 ? 'checked' : ''}`}></i></span>

            <span onClick={event => {
                event.preventDefault()
                const rating = [id, 4]
                onRating(rating)
            }}><i className={`fas fa-star ${rating >= 4 ? 'checked' : ''}`}></i></span>

            <span onClick={event => {
                event.preventDefault()
                const rating = [id, 5]
                onRating(rating)
            }}><i className={`fas fa-star ${rating >= 5 ? 'checked' : ''}`}></i></span>

            <p>{`${rateAvg}/5 (${rateCount})`}</p>
            
        </div>
        <div className='details__adds'>
        {!isFav && <button className='details__btn-wishlist' onClick={event => {
            event.preventDefault()
            onItemWL(id)
        }}>Add to wishlist</button>}

        {isFav && <button className='details__btn-wishlist checked-details' onClick={event => {
            event.preventDefault()
            onItemWL(id)
        }}>WISHLISTED!</button>}
        

        <button className='details__btn-deck' onClick={event => {
            event.preventDefault()
            onItemDeck(id)
        }}>Add to deck</button>
        </div>
    </div>
}


