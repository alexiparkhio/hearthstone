const { Component, Fragment } = React

class Hearthstone extends Component {
    state = {view: 'login', loggedIn: false, error: undefined, token: undefined}

    handleLogin = () => {
        //
    }

    handleGoToRegister = () => {
        //
    }

    handleRegister = () => {
        //
    }

    handleGoToLogin = () => {
        //
    }

    render () {
        const { props: {title}, state: {view, error, loggedIn}, handleGoToRegister, handleLogin } = this

        {loggedIn === true && <a href="" className="wishlist">CHECK WISHLIST</a> }
        {loggedIn === true && <a href="" className="deck" >CHECK YOUR VIRTUAL DECK</a> }

        {<h1>{title}</h1>}

        {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleGoToRegister}/>}

        {view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleGoToLogin} error={error}/>}

        {view === 'search' && <Search onSubmit={handleSearch}/>}
    }
}