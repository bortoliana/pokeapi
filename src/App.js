import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Pokedex from './components/Pokedex';
import {getPokemonData, getPokemons, searchPokemon} from "./api"
import { favoriteProvider } from './contexts/favoritesContext';

function App() {

	const favoritesKey = "favorites"
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoding] = useState(false);
	const [pokemons, setPokemon] = useState([]);
	const [favorites, setFavorites] = useState ([]);

	const itensPerPage = 25;
	const fetchPokemon = async () => {
		try{
			setLoding(true);
			setNotFound(false);
			const data = await getPokemons(itensPerPage, itensPerPage * page);
			const promises = data.results.map(async(pokemon) => {
				return await getPokemonData(pokemon.url);
			});

			const result = await Promise.all(promises);
			setPokemon(results); 
			setLoding(false);
			setTotalPages (Math.ceil(data.count / itensPerPage));
		}	catch (error){
			console.log("fetchPokemons error: ", error);
		}
	};

	const loadFavoritePokemons = () => {
		const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey))  || []
		setFavorites(pokemons)

	}

	useEffect(() => {
		loadFavoritePokemons();
		}, []);
	
	useEffect(() => {
		fetchPokemon();
		}, [page]);

	const updateFavoritePokemons = 	(name) => {
		const updateFavorites = [...favorites]
		const favoriteIndex = favorites.indexOf(name)
		if(favoriteIndex >= 0) {
			updateFavorites.splice(favoriteIndex, 1);
		} else {
			updateFavorites.push(name);
		}
		window.localStorage.setItem(favoritesKey, JSON.stringify(updateFavorites))
		setFavorites(updateFavorites);
	}
		const onSearchHandler = async (pokemon) => {
			if(!pokemon) {
				fetchPokemon();
			}

			setLoading(true)
			setNotFound(false)
			const result = await searchPokemon(pokemon) 
			if(!result) {
				setNotFound(true)
			} else {
				setPokemon ([result])
				setPage(0)
				setTotalPages(1)
			}
			setLoding(false)
		}

		return (
			<FavoriteProvider
				value= {{
					favoritePokemons: favorites,
					updateFavoritePokemons: updateFavoritePokemons, }}
			>
		<div>
			<Navbar />
			<Searchbar onSearch={onSearchHandler}/>
			{notFound ? (
				<div class-name="not-found-text"> Meteu essa?! </div>
			) : 
			(<Pokedex
				pokemons={pokemons}
				loading={loading}
				page={page}
				setPage={setPage}
				totalPages={totalPages}
			/>)}
		</div>
		</FavoriteProvider>
  );
}

export default App;
