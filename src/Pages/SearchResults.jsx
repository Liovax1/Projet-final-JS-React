import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import useFetch from "../hooks/useFetch";
import PokemonCard from "../components/PokemonCard";

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    const { data: results, loading, error } = useFetch(`https://pokebuildapi.fr/api/v1/pokemon/${query}`);

    if (loading) return <p>Chargement des résultats de recherche...</p>;
    if (error) return <p>Erreur lors du chargement des résultats de recherche.</p>;

    return (
        <div>
            <Header />
            <h1>Résultat de la recherche pour "{query}"</h1>
            <div>
                {results ? (
                    Array.isArray(results) ? (
                        results.length > 0 ? (
                            results.map(pokemon => (
                                <PokemonCard key={pokemon.id} pokemon={pokemon} />
                            ))
                        ) : (
                            <p>Aucun résultat trouvé.</p>
                        )
                    ) : (
                        <PokemonCard key={results.id} pokemon={results} />
                    )
                ) : (
                    <p>Aucun résultat trouvé.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SearchResults;