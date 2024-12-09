import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // on importe BrowserRouter et Routes pour définir les routes
import './App.css'
import Accueil from './Pages/Accueil' // On importe le composant Accueil
import ListePokemons from './Pages/ListePokemons' // On importe le composant ListePokemons
import ListeTypesPokemons from './Pages/ListeTypesPokemons'
import PokemonDetails from './Pages/PokemonDetails'
import TypeDetails from './Pages/TypeDetails'
import RandomPokemon from './Pages/RandomPokemon'
import SearchResults from './Pages/SearchResults'
import Fight from './Pages/Fight';

function App() { // On crée notre composant App
  return ( // On retourne le JSX
    <>
      <BrowserRouter> {/* On utilise BrowserRouter pour définir le router */}
        <Routes> {/* On utilise Routes pour définir les routes */}
          <Route path="/" element={<Accueil />} /> {/* On définit la route pour l'accueil */}
          <Route path="/liste-pokemons" element={<ListePokemons />} />
          <Route path="/liste-types" element={<ListeTypesPokemons />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route path="/type/:id" element={<TypeDetails />} />
          <Route path="/random-pokemon" element={<RandomPokemon />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/fight" element={<Fight />} />
        </Routes> 
      </BrowserRouter> 
    </>
  )
}

export default App // On exporte le composant App
