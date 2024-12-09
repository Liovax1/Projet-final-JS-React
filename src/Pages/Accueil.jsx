import React, { useEffect, useState } from "react"; // On importe useState et useEffect depuis la bibliothèque react pour gérer les états et les effets
import Header from "../Components/Header"; // On importe le composant Header
import Footer from "../Components/Footer";
import { Link } from "react-router-dom"; // On importe Link depuis la bibliothèque react-router-dom pour gérer les liens

const Accueil = () => { // On crée notre composant Accueil
    const [randomPokemons, setRandomPokemons] = useState([]); // On crée un état randomPokemons avec sa fonction setRandomPokemons pour stocker les pokémons aléatoires
    const [randomTypes, setRandomTypes] = useState([]); // On crée un état randomTypes avec sa fonction setRandomTypes pour stocker les types aléatoires

    useEffect(() => { // On utilise useEffect pour charger les pokémons et les types aléatoires
        fetch("https://pokebuildapi.fr/api/v1/random/team") // On utilise fetch pour charger les pokémons aléatoires depuis l'api
            .then(response => response.json()) // On convertit la réponse en JSON
            .then(data => setRandomPokemons(data)) // On stocke les pokémons aléatoires dans l'état randomPokemons
            .catch(error => console.error("Erreur lors du chargement des pokémons aléatoires:", error)); // On affiche une erreur en cas d'échec

        fetch("https://pokebuildapi.fr/api/v1/types") // fetch pour faire un GET vers l'API
            .then(response => response.json()) // On transforme la réponse en JSON
            .then(data => { // On stocke les types aléatoires dans randomTypes
                const shuffled = data.sort(() => 0.5 - Math.random()); // On mélange les types avec .sort et Math.random pour obtenir un ordre aléatoire après rechargement d ela page
                const selectedTypes = shuffled.slice(0, 3); // on utilise .slice pour sélectionner les 3 premiers types à partir de l'index 0
                setRandomTypes(selectedTypes); // On appelle la fonction pour mettre à jour l'état randomTypes avec du coup les 3 types aleatoires
            })
            .catch(error => console.error("Erreur lors du chargement des types:", error)); // On affiche une erreur en cas d'échec
    }, []); // On passe un tableau vide pour exécuter le code qu'une seule fois et eviter les boucles infinies

    return ( // On retourne le JSX
        <div>
            <Header /> {/* On affiche le composant Header */}
            <section>
                <h2>
                    <Link className="listePokemons" to="/liste-pokemons">Voir tous les Pokémons</Link>
                    <Link className="fightPokemon" to="/fight">Fight</Link>
                    <Link className="randomPokemon" to="/random-pokemon">Pokémon aléatoire</Link>
                </h2>
                <br></br> {/* On saute une ligne */}
                <div>
                    {randomPokemons.length > 0 ? ( // On vérifie si on a des pokémons aléatoires
                        randomPokemons.map(pokemon => ( // On parcours les pokémons aléatoires
                            <div key={pokemon.id}> {/* On utilise key pour identifier chaque élément */}
                                <Link to={`/pokemon/${pokemon.id}`}> {/* On crée un lien vers la page Pokemon */}
                                    <img src={pokemon.image} alt={pokemon.name} /> {/* On affiche l'image du pokémon */}
                                    <p>{pokemon.name}</p> {/* et son nom aussi */}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>Chargement des pokémons...</p> // message de chargement si les pokemons ne sont pas encore chargés
                    )}
                </div>
            </section>
            <section>
                <h2><Link to="/liste-types">Voir tous les types</Link></h2> {/* On crée un lien vers la page ListeTypesPokemons */}
                <br></br>
                <div>
                    {randomTypes.length > 0 ? ( // On vérifie si on a des types aléatoires
                        randomTypes.map(type => ( // On parcours les types aléatoires
                            <div key={type.id}> {/* On utilise key pour identifier chaque élément */}
                                <Link to={`/type/${type.name}`}> {/* Lien vers la page TypeDetails */}
                                    <img src={type.image} alt={type.name} /> {/* On affiche l'image du type */}
                                    <p>{type.name}</p> {/* et son nom aussi */}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>Chargement des types...</p>
                    )}
                </div>
            </section>
            <Footer /> {/* On affiche le composant Footer */}
        </div>
    );
}

export default Accueil; // On exporte le composant Accueil par défaut pour pouvoir l'utiliser ailleurs