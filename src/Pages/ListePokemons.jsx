import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import useFetch from "../hooks/useFetch"; // On importe le hook useFetch
import PokemonCard from "../components/PokemonCard";

const ListePokemons = () => { // composant ListePokemons
    const { data: pokemons, loading, error } = useFetch("https://pokebuildapi.fr/api/v1/pokemon"); // récupération des données des pokémons

    if (loading) return <p>Chargement des pokémons...</p>;
    if (error) return <p>Erreur lors du chargement des pokémons.</p>;

    const generations = pokemons.reduce((acc, pokemon) => { // réduction des données pour obtenir les générations
        const gen = pokemon.generation; // récupération de la génération du pokémon
        if (!acc[gen]) acc[gen] = []; // si la génération n'existe pas, on la crée
        acc[gen].push(pokemon); // on ajoute le pokémon à la génération
        return acc; // on retourne l'objet avec les générations
    }, {});

    return (
        <div>
            <Header />
            <h1>Liste des Pokémons</h1>
            <div>
                {Object.keys(generations).map(gen => ( // boucle sur les générations
                    <div key={gen}> {/* clé unique pour chaque génération */}
                        <h2>Génération {gen}</h2> {/* affichage de la génération */}
                        <div className="generation">
                            {generations[gen].map(pokemon => ( // boucle sur les pokémons de la génération
                                <PokemonCard key={pokemon.id} pokemon={pokemon} /> // affichage du pokémon
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default ListePokemons;