import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const ListeTypesPokemons = () => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetch("https://pokebuildapi.fr/api/v1/types")
            .then(response => response.json())
            .then(data => setTypes(data))
            .catch(error => console.error("Erreur lors du chargement des types de pokémons:", error));
    }, []);

    return (
        <div>
            <Header />
            <h1>Liste des Types de Pokémons</h1>
            <div>
                {types.length > 0 ? (
                    types.map(type => (
                        <div key={type.id}>
                            <Link to={`/type/${type.name}`}>
                                <img src={type.image} alt={type.name} />
                                <p>{type.name}</p>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Chargement des types...</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ListeTypesPokemons;
