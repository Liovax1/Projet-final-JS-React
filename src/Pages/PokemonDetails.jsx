import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import useFetch from "../hooks/useFetch";
import PokemonCard from "../components/PokemonCard";

const PokemonDetails = () => { // composant PokemonDetails
    const { id } = useParams(); // récupération de l'identifiant du Pokémon
    const { data: pokemon, loading, error } = useFetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`); // récupération des données du Pokémon

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur lors du chargement des détails du Pokémon.</p>;

    return (
        <div>
            <Header />
            <h1>Détails du Pokémon</h1>
            <PokemonCard pokemon={pokemon} />
            <Footer />
        </div>
    );
}

export default PokemonDetails;