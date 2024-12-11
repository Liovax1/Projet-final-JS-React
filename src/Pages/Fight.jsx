import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PokemonCard from "../components/PokemonCard";

const Fight = () => {
    const [type, setType] = useState("");
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [wildPokemon, setWildPokemon] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTypeSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        fetch(`https://pokebuildapi.fr/api/v1/pokemon/type/${type}`)
            .then(response => response.json())
            .then(data => {
                const shuffled = data.sort(() => 0.5 - Math.random());
                setPokemons(shuffled.slice(0, 10));
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors du chargement des pokémons:", error);
                setError("Erreur lors du chargement des pokémons.");
                setLoading(false);
            });
    };

    const handleSelectPokemon = (pokemon, e) => {
        e.stopPropagation(); // Empêche la propagation de l'événement de clic
        setSelectedPokemon(pokemon);
    };

    useEffect(() => {
        if (selectedPokemon) {
            const timeout = Math.random() * (10000 - 3000) + 3000;
            const timer = setTimeout(() => {
                fetch("https://pokebuildapi.fr/api/v1/random/team")
                    .then(response => response.json())
                    .then(data => {
                        const wild = data[0];
                        setWildPokemon(wild);
                        alert(`Un ${wild.name} sauvage est apparu!`);
                        setTimeout(() => {
                            determineWinner(selectedPokemon, wild);
                        }, 5000);
                    })
                    .catch(error => console.error("Erreur lors du chargement du Pokémon sauvage:", error));
            }, timeout);
            return () => clearTimeout(timer);
        }
    }, [selectedPokemon]);

   const determineWinner = (teamPokemon, wildPokemon) => {
    const teamPower = teamPokemon.stats.attack + teamPokemon.stats.defense + teamPokemon.stats.hp;
    const wildPower = wildPokemon.stats.attack + wildPokemon.stats.defense + wildPokemon.stats.hp;

    // Facteur de chance
    const teamLuck = Math.random() * 5; 
    const wildLuck = Math.random() * 5; 

    const finalTeamPower = teamPower + teamLuck;
    const finalWildPower = wildPower + wildLuck;

    let resultMessage;
    if (finalTeamPower > finalWildPower) {
        resultMessage = "Votre Pokémon a gagné le combat!";
    } else {
        resultMessage = "Votre Pokémon a perdu le combat.";
    }
    setResult(resultMessage);
    alert(resultMessage);
};

    

    return (
        <div>
            <Header />
            <h1>Combat de Pokémon</h1>
            <form onSubmit={handleTypeSubmit}>
                <input 
                    type="text" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
                    placeholder="Entrez un type de Pokémon" 
                />
                <button type="submit">Rechercher</button>
            </form>
            {loading && <p>Chargement...</p>}
            {error && <p>{error}</p>}
            <div>
                {pokemons.map(pokemon => (
                    <div key={pokemon.id} onClick={(e) => handleSelectPokemon(pokemon, e)}>
                        <PokemonCard pokemon={pokemon} disableLink={true} />
                    </div>
                ))}
            </div>
            <div className="team">
                <h2>Votre Pokémon</h2>
                {selectedPokemon && <PokemonCard pokemon={selectedPokemon} />}
            </div>
            {wildPokemon && (
                <div className="wild-pokemon">
                    <h2>Pokémon Sauvage</h2>
                    <PokemonCard pokemon={wildPokemon} />
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Fight;