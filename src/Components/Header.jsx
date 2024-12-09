import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => { // on crée une fonction handleSearch qui prend en paramètre event
        e.preventDefault(); // on empêche le rechargement de la page
        navigate(`/search?query=${search}`); // on redirige l'utilisateur vers la page de recherche avec le terme de recherche
    };

    return (
        <header>
            <nav>
                <div className="left">
                    <Link to="/">
                        <img width={50} src="https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png" alt="pokeball" />
                    </Link>
                </div>
                <div className="center">
                    <h1 className="titre">Pokédex</h1>
                </div>
                <div className="right">
                    <form onSubmit={handleSearch}> {/* on crée un formulaire pour la recherche */}
                        <input 
                            type="text" 
                            value={search} // on associe la valeur de l'input à l'état search
                            onChange={(e) => setSearch(e.target.value)} 
                            placeholder="Rechercher un Pokémon" 
                        />
                        <button type="submit">Rechercher</button>
                    </form>
                </div>
            </nav>
        </header>
    );
}

export default Header;