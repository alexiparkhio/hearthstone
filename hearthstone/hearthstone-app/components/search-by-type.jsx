function SearchByType({onSubmit, onToBack}){
    return <form className = "container-filters" onSubmit ={event => {
        event.preventDefault()
        let query = querySet('type', event.target.type.value, {cost: event.target.manacost.value, attack: event.target.attack.value, durability: event.target.durability.value, health: event.target.health.value})
        onSubmit(query)
}}>

 <h2>SEARCH CARDS BY TYPE</h2>

 <a href="" onClick={event => {
            event.preventDefault()
            onToBack()
        }}>GO BACK</a>

        <input type = "radio" name = "hero" value = "Hero"></input>Hero
        <input type = "radio" name = "minion" value = "Minion"></input>Minion
        <input type = "radio" name = "spell" value = "Spell"></input>Spell
        <input type = "radio" name = "enchantment" value = "Enchantment"></input>Enchantment
        <input type = "radio" name = "weapon" value = "Weapon"></input>Weapon
        <input type = "radio" name = "hero power" value = "Hero power"></input>Hero power

        Mana Cost: <input className="mana-cost" type="number" name="manacost" min="-1" max="10" />
        Attack: <input className="mana-cost" type="number" name="attack" min="-1" max="100" />
        Durability: <input className="mana-cost" type="number" name="durability" min="-1" max="100" />
        Health: <input className="mana-cost" type="number" name="health" min="-1" max="100" />

        <button>SEARCH</button>
    </form>
}

