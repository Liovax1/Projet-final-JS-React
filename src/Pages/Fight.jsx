import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PokemonCard from "../components/PokemonCard";

const Fight = () => {
    const [type, setType] = useState("");
    const [pokemons, setPokemons] = useState([]);
    const [team, setTeam] = useState([]);
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

    const handleAddToTeam = (pokemon) => {
        setTeam(prevTeam => {
            if (!prevTeam.some(p => p.id === pokemon.id)) {
                return [...prevTeam, pokemon];
            }
            return prevTeam;
        });
    };

    useEffect(() => {
        if (team.length > 0) {
            const timeout = Math.random() * (10000 - 3000) + 3000;
            const timer = setTimeout(() => {
                fetch("https://pokebuildapi.fr/api/v1/random/team")
                    .then(response => response.json())
                    .then(data => {
                        const wild = data[0];
                        setWildPokemon(wild);
                        alert(`Un ${wild.name} sauvage est apparu!`);
                        setTimeout(() => {
                            determineWinner(team[team.length - 1], wild);
                        }, 5000);
                    })
                    .catch(error => console.error("Erreur lors du chargement du Pokémon sauvage:", error));
            }, timeout);
            return () => clearTimeout(timer);
        }
    }, [team]);

    const determineWinner = (teamPokemon, wildPokemon) => {
        const teamPower = teamPokemon.stats.attack + teamPokemon.stats.defense + teamPokemon.stats.hp;
        const wildPower = wildPokemon.stats.attack + wildPokemon.stats.defense + wildPokemon.stats.hp;
        if (teamPower > wildPower) {
            setResult("Votre Pokémon a gagné le combat!");
        } else {
            setResult("Votre Pokémon a perdu le combat.");
        }
        alert(result);
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
                    <div key={pokemon.id} onClick={() => handleAddToTeam(pokemon)}>
                        <PokemonCard pokemon={pokemon} />
                    </div>
                ))}
            </div>
            <div className="team">
                <h2>Votre équipe</h2>
                {team.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
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