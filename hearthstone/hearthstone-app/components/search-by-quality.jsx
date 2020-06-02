function SearchByQuality({onSubmit, onToBack}) {
    return <form className="container-filters" onSubmit={event => {
        event.preventDefault()
        
        let query = querySet('qualities', event.target.quality.value, {cost: event.target.manacost.value, attack: event.target.attack.value, durability: event.target.durability.value, health: event.target.health.value})

        onSubmit(query)
    }}>

        <h2>SEARCH CARDS BY QUALITY</h2>

        <a href="" onClick={event => {
            event.preventDefault()
            onToBack()
        }}>GO BACK</a>
            

            <input type="radio"  name="basic" value="Basic" />Basic 
            <input type="radio"  name="common" value="Common" />Common 
            <input type="radio"  name="rare" value="Rare" />Rare 
            <input type="radio"  name="epic" value="Epic"/>Epic 
            <input type="radio"  name="legendary" value="Legendary"/>Legendary 


        Mana Cost: <input className="mana-cost" type="number" name="manacost" min="-1" max="10" />
        Attack: <input className="mana-cost" type="number" name="attack" min="-1" max="100" />
        Durability: <input className="mana-cost" type="number" name="durability" min="-1" max="100" />
        Health: <input className="mana-cost" type="number" name="health" min="-1" max="100" />

        <button>SEARCH</button>
    </form>
}