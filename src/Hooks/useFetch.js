
import { useState, useEffect } from "react";

const useFetch = (url) => { // useFetch prend une URL en paramètre
    const [data, setData] = useState(null); // data pour stocker les données
    const [loading, setLoading] = useState(true); // loading pour savoir si les données sont en cours de chargement
    const [error, setError] = useState(null); // error pour afficher les erreurs

    useEffect(() => { // useEffect pour faire la requête à l'API
        let isMounted = true; // On crée une variable isMounted pour savoir si le composant est monté
        fetch(url) // On fait la requête à l'API
            .then(response => response.json()) // On récupère les données en JSON
            .then(data => { // On traite les données
                if (isMounted) { // Si le composant est monté, on met à jour les données
                    setData(data); 
                    setLoading(false); // On met loading à false pour dire que les données sont chargées
                }
            })
            .catch(error => { // On gère les erreurs
                if (isMounted) { // Si le composant est monté, on met à jour l'erreur
                    setError(error); 
                    setLoading(false); 
                }
            });
        return () => {
            isMounted = false; // On démonte le composant
        };
    }, [url]); // On recharger les données si l'URL change

    return { data, loading, error }; // On retourne les données, le chargement et les erreurs
};

export default useFetch;