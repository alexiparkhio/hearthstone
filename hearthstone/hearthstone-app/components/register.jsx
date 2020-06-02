function Register({ onSubmit, onToLogin, error }) {
    return<div className ='container-register'>
        <form className="register" onSubmit={event => {
        event.preventDefault()
        const name = event.target.name.value
        const surname = event.target.surname.value
        const username = event.target.username.value
        const password = event.target.password.value
        const age = event.target.age.value
        const gender = event.target.gender.value
        onSubmit(name, surname, username, password, age, gender)
    }}>
         <h2><img src='/logo.png' className= 'logo' /></h2>

       <div className = 'register__input-container'>
            <input className="register__textbox" type="text" name="name" placeholder="Name" />
            <input className="register__textbox" type="text" name="surname" placeholder="Surname" />
            <input className="register__textbox" type="text" name="username" placeholder="Username" />
            <input className="register__textbox" type="password" name="password" placeholder="Password" />
        </div>

        <div className = 'container-types'>
            <div className = 'container-age'>
                <p className='text-age'>Age:</p> <input className="age" type="number" name="age" min="1" max="130" />
            </div>
            <div className='container-gender'>
                <label>
                    <input className="gender-radio" type="radio" name="gender" value="male"/><p>Male</p>
                </label>
                <label>
                    <input className="gender-radio" type="radio" name="gender" value="female"/><p>Female</p>
                </label>
                <label>
                    <input className="gender-radio" type="radio" name="gender" value="non-binary"/><p>Non-binary</p>
                </label>
            </div>
        </div>

        {error && <Feedback level="error" message={error}/>}
        <input className="onToLogin" type="submit" placeholder="REGISTER" name="REGISTER"/>
        <a href= "" onClick={event => {
            event.preventDefault()
            onToLogin()
        }}>Go to Login</a>
    </form>
        
    </div> 
}