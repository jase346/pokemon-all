'use strict';
const fetch = require('cross-fetch');
//conexion bd
const pool = require('../database');

const API = 'https://pokeapi.co/api/v2/pokemon/';


//funcion para capturar pokemon desde la api
const getPokemonAPiExternal = async (name) => {
    let url = API + name;

    const res = await fetch(url);
    
    if (res.status >= 400) {
        throw new Error("Bad response from server");
    }
    
    const pokemon = await res.json();

    const poke = {
        dni: pokemon.id,
        image: pokemon.sprites.other.home.front_default,
        name:pokemon.name,
        experience:pokemon.base_experience,
        hp:pokemon.stats[0].base_stat,
        attack:pokemon.stats[1].base_stat,
        defense:pokemon.stats[2].base_stat,
        speed:pokemon.stats[5].base_stat,
        alias: null,
        capture: false,
        error: false,
        success: false
    }

    return poke;
}

//obtener pokemon de la api
const getPokemonController = async (req, res) => {
    try {
        //obtenemos el nombre del poke
        const name = req.params.name;

        //validamos el name
        if (name == undefined) throw new Error("InvalidPokemon");

        //buscamos el poke a la api
        const pokemon = await getPokemonAPiExternal(name);

        pool.query('select * from pokemons where name = ?', [pokemon.name], (error,result) => {
            if (error) throw new Error(error);
            if (result.length > 0) {
                pokemon.alias = result[0].alias;
                pokemon.capture = true;
                res.render('show', { pokemon });
            } else {
                res.render('show', { pokemon });
            }
        });
    
    } catch (error) {
        console.error(error);
    }
}

/***
 * agregar pokemones capturados
 */
const createPokemonController = async (req, res) => {
    //recibimos los datos 
    const { dni, image, name, experience, hp, attack, defense, speed, alias } = req.body;
    //creamos un nuevo objeto
    const newPokemon = { dni, image, name, experience, hp, attack, defense, speed, alias };

    console.log(newPokemon);

    try {

        pool.query('INSERT INTO pokemons set ?',[newPokemon], (error, result) => {
            if (error) throw new Error(error);
            
                (newPokemon.capture = true),
                (newPokemon.error = false),
                (newPokemon.success = "Successful pokemon catch."),

                res.redirect(`/pokemon/show/${newPokemon.name}`);
        });
        
    } catch (error) {
        console.error(error);
    }

}

const getlistPokemonsController = async (req, res) => { 

    try {

        pool.query('SELECT * FROM pokemons', (error, result) => {
            if (error) throw new Error(error);

            if (result.length > 0) {

                res.render('mypoke',{result});
                
            } else {
                res.render('mypoke');
            }

        });
        
    } catch (error) {
        console.error(error);
    }

}

const editPokemonController = async (req,res) => {
    const id = req.body.id
    const alias = req.body.alias

    pool.query('update pokemons set alias = ? where id= ?', [alias,id], (error, results) => { 
        if (error) throw new Error(error);

        res.json(200,{msg:'updated aliases',success: true})
    });

}

const deletePokemonController = async (req,res) => {
    const id = req.params.id

    pool.query('delete from pokemons where id = ?', [id], (error, results) => { 
        if (error) throw new Error(error);

        res.json(200,{msg:'pokemon released', success: true})
    });

    
}


module.exports = {
    getPokemonController,
    createPokemonController,
    getlistPokemonsController,
    editPokemonController,
    deletePokemonController
} 