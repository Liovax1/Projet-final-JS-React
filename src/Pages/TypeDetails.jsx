import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import useFetch from "../hooks/useFetch";
import PokemonCard from "../components/PokemonCard";

const TypeDetails = () => {
    const { id } = useParams(); // récupération de l'id du type
    const { data: pokemons, loading, error } = useFetch(`https://pokebuildapi.fr/api/v1/pokemon/type/${id}`); //recupere les données

    if (loading) return <p>Chargement des pokémons...</p>;
    if (error) return <p>Erreur lors du chargement des pokémons par type.</p>;

    return (
        <div>
            <Header />
            <h1>Pokémons de type {id}</h1>
            <div>
                {pokemons.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} /> // affichage du pokémon
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default TypeDetails;