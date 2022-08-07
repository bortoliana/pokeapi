import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";

const Pokedex = (props) => {
    const {pokemons, loding, page, setPage, totalPages } = props;
    const onLeftClicktHandler =() => {
        if(page >0) {
            setPage(page-1)
        }
    }
    const onRightClicktHandler = () => {
        if(page !== totalPages) {
            setPage(page+1)
        }
    }
    return (
        <div>
            <div className="pokedex-header"> 
                <h1>Pokedex</h1>
                <Pagination
                    page={page+1}
                    totalPage={totalPages}
                    onLeftClick={onLeftClicktHandler}
                    onRightClick={onRightClicktHandler}
                />
            </div>
            {loding ? (
                <div>Carregando, segura fera...</div>
            ) : (
            <div className="pokemon-grid"> 
                {pokemons && pokemons.map((pokemon, index) => {
                    return (
                    <Pokemon key={index} pokemon={pokemon}/>
                    );
                })}
            </div>
            )}
        </div>
    );
};

export default Pokedex;