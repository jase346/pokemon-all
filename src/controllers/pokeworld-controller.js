'use strict';
const fetch = require('cross-fetch');

const API = 'https://pokeapi.co/api/v2/pokemon/';

//mostrar lista de la api
const getListPokemonsController = async (offset = 0) => {
    try {
        let url = API + `?offset=${offset}&limit=10`;
        console.log(url);
        
        const res = await fetch(url);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        const pokemons = await res.json();

        if (pokemons.next != null) {
            pokemons.nextOffset = await getValueOffset(pokemons.next);    
        } else {
            pokemons.nextOffset = null;
        }

        if (pokemons.previous != null) {
            pokemons.prevOffset = await getValueOffset(pokemons.previous);    
        } else {
            pokemons.prevOffset = null;
        }

        return pokemons;

    } catch (error) {
       console.error(error) 
    } 

};

//obtener offset de la url de la api
const getValueOffset = async (url) => {
    let urlParams = new URLSearchParams(url);
    return urlParams.get(API+'?offset');
}

//obtener pokemon de la api
const getPokemonController = async (name) => {
    try {
        if (name == undefined) throw new Error("InvalidPokemon");
        let url = API + name;
        
        const res = await fetch(url);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        const pokemon = await res.json();
        console.log(pokemon);
        return pokemon;
    } catch (error) {
        console.error(error);
    }
} 

module.exports = {
    getListPokemonsController,
    getPokemonController
} 