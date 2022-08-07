import { useContext } from "react";
import Context from "../contexts/favoritesContext";

const Pokemon = (props) => {
    const {favoritePokemons, updateFavoritePokemons} = useContext (FavoriteContext)
    const {pokemon} = props;
    const onHeartClick = () => {
        updateFavoritePokemons(pokemon.name)
    }
    const heart = favoritePokemons.includes(pokemon.name) ? "❤️" : "🖤"
    return (
    <div className="pokemon-card">
        <div className="pokemon-image-container">
            <img alt ={pokemon.name} src={pokemon.sprites.front_default} className="pokemon-image" />
        </div>
        <div className="card-body"> 
            <div className="pokemon-type">
                {pokemon.types.map((type, index) => {
                    return (
                        <div key={index} className="pokemon-type-text">{type.type.name}</div>
                    )
                })}
            </div>
            <button className="pokemon-heart-btn" onClick={onHeartClick}>
                {heart}
            </button>
        </div>
        {pokemon.name}

    </div>)

}

export default Pokemon;