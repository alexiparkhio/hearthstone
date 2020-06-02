function Search({ query, locale, onSubmit }) {
    return <form className="search" onSubmit={event => {
        event.preventDefault()

        locale = event.target.language.value
        const {attack, manacost, health, rarity, byclass} = event.target
        
        query = querySet({
            'textFilter': event.target.query.value,
            'manaCost': manacost.value,
            'attack': attack.value,
            'health': health.value,
            'rarity': rarity.value,
            'class': byclass.value
        })

        onSubmit(query, locale)
    }}>

        <h2>SEARCH CARDS</h2>
        <div className='submit-container'>
            <input className="browser" type="text" name="query" placeholder="Type here to search of a card" />
            <button className='submit-button'>SEARCH</button>
        </div>

        <br></br>
        <div className='filter-container'>
            <div>Mana Cost: <input className="mana-cost" type="number" name="manacost" min="-1" max="10" /></div>
            <div>Attack: <input className="attack" type="number" name="attack" min="-1" max="100" /></div>
            <div>Health: <input className="health" type="number" name="health" min="-1" max="100" /></div>
        </div>

        <br></br>
        <div className='rarity-names'>
            <p>Basic</p> <p>Common</p><p>Rare</p> <p>Epic</p><p>Legendary</p><br></br>

        </div>
        <div className='rarity-container'>
            <input type="radio"  name="rarity" value="basic" />
            <input type="radio"  name="rarity" value="common" /> 
            <input type="radio"  name="rarity" value="rare" />
            <input type="radio"  name="rarity" value="epic"/> 
            <input type="radio"  name="rarity" value="legendary"/> 
        </div>

        <br></br>
        <div className='byclass-container'>

            <input type="radio" name="byclass" value="druid" />Druid
            <input type="radio" name="byclass" value="hunter" />Hunter
            <input type="radio" name="byclass" value="mage" />Mage
            <input type="radio" name="byclass" value="paladin" />Paladin
            <input type="radio" name="byclass" value="priest" />Priest
            <input type="radio" name="byclass" value="rogue" />Rogue
            <input type="radio" name="byclass" value="shaman" />Shaman
            <input type="radio" name="byclass" value="warlock" />Warlock
            <input type="radio" name="byclass" value="warrior" />Warrior
            <input type="radio" name="byclass" value="dream" />Dream
        </div>

        <br></br>

        <div className='language-container'>
            <input className='language-button' type='submit' value="Select language" />
            <div className='language-names'>
                <p>English (USA)</p>
                <p>Spanish</p>
                <p>German</p>
                <p>French</p>

            </div>
            <div className='language-filter'>
                <input type='radio' name='language' value='en_US' />
                <input type='radio' name='language' value='es_ES' /> 
                <input type='radio' name='language' value='de_DE' /> 
                <input type='radio' name='language' value='fr_FR' /> 

            </div>
        </div>

    </form>
}