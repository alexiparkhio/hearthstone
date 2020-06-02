function BtnsLogged({ onWishlist, onLogout }) {
    return (
        <header className='header'>

            <section className='header__image-container'>
                
                    <img src='/logo.png' className='header__logo' />
                
            </section>

            <section className='header__buttons-container'>

                <div className='header__button'>
                    <button className="header__deck"><a href="" className='header__anchor' onClick={event => {
                        event.preventDefault()
                        onLogout()
                    }} >LOGOUT</a>
                    </button>
                </div>
                
                <div className='header__button'>
                    <button className="header__deck" ><a href="" className='header__anchor' onClick={event => {
                        event.preventDefault()
                        onWishlist()
                    }}>WISHLIST</a></button>
                </div>

            </section>
        </header>
    )
}