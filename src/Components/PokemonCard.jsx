import React from "react";
import { Link } from "react-router-dom"; // on importe Link pour pouvoir naviguer vers nos pages

const PokemonCard = ({ pokemon }) => { // on crée un composant PokemonCard qui prend en props un objet pokemon
    return (
        <div className="pokemon-card">
            <Link to={`/pokemon/${pokemon.id}`}> {/* on crée un lien vers la page de détails du Pokémon */}
                <img src={pokemon.image} alt={pokemon.name} /> 
                <h3>{pokemon.name}</h3>
                <div className="pokemon-stats">
                    {Object.entries(pokemon.stats).map(([stat, value]) => ( // on convertit les stats en tableau pour pouvoir les afficher
                        <p key={stat}><strong>{stat}:</strong> {value}</p>
                    ))}
                </div>
                <div className="pokemon-types">
                    <p><strong>Types:</strong> {pokemon.apiTypes.map(type => type.name).join(", ")}</p> {/* on affiche les types du Pokémon séparés par des virgules*/}
                </div>
            </Link>
        </div>
    );
};

export default PokemonCard;