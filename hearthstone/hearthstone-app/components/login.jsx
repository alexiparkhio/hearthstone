function Login({ onSubmit, onToRegister, error}) {
    return <div className="container-login">
    <form className = 'login'
        onSubmit={event => {
            event.preventDefault()

            const username = event.target.username.value
            const password = event.target.password.value

            onSubmit(username, password)
        }}>

        <h2><img src='/logo.png' className= 'logo' /></h2>

        <input type="text" name="username" placeholder="Username" ></input>
        <input type="password" name="password" placeholder="Password" ></input>
        {error && <Feedback level='error' message={error} />}
        <button className = "login-button">Login</button>
        <a href=""
            onClick = {event =>{
                event.preventDefault()
                onToRegister()
            }}>Register</a>
    </form>
    </div>
}