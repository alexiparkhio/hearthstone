function Feedback ({level, message}){
    return <p className ={`feedback feedback--${level}`}>
        {message}
    </p>


}