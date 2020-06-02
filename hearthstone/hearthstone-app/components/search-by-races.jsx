function SearchByRaces({onSubmit, onToBack}){
    return <form className = "container-filters" onSubmit = {event => {
        event.preventDefault()
        let query = querySet('races', event.target.quality.value, {cost: event.target.manacost.value, attack: event.target.attack.value, durability: event.target.durability.value, health: event.target.health.value})

        onSubmit(query)
    }}>

        <h2>SEARCH CARDS BY RACE</h2>

        <a href="" onClick={event => {
            event.preventDefault()
            onToBack()
        }}>GO BACK</a>

        <input type="radio" name = "Demon" value ="Demon" />Demon
        <input type="radio" name = "Dragon" value ="Dragon"/>Dragon
        <input type="radio" name = "Mech" value ="Mech"/>Mech
        <input type="radio" name = "Murloc" value ="Murloc"/>Murloc
        <input type="radio" name = "Beast" value ="Beast"/>Beast
        <input type="radio" name = "Pirate" value ="Pirate"/>Pirate
        <input type="radio" name = "Totem" value ="Totem"/>Totem

    Mana Cost: <input className="mana-cost" type="number" name="manacost" min="-1" max="10" />
    Attack: <input className="mana-cost" type="number" name="attack" min="-1" max="100" />
    Durability: <input className="mana-cost" type="number" name="durability" min="-1" max="100" />
    Health: <input className="mana-cost" type="number" name="health" min="-1" max="100" />

        <button>SEARCH</button>

    </form>
}








