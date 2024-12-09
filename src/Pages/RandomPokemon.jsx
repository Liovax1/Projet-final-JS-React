import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import useFetch from "../hooks/useFetch";
import PokemonCard from "../components/PokemonCard";

const RandomPokemon = () => {
    const { data: pokemons, loading, error } = useFetch("https://pokebuildapi.fr/api/v1/random/team");

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur lors du chargement du Pokémon aléatoire.</p>;

    const pokemon = pokemons[0];

    return (
        <div>
            <Header />
            <h1>Pokémon Aléatoire</h1>
            <PokemonCard pokemon={pokemon} />
            <Footer />
        </div>
    );
}

export default RandomPokemon;