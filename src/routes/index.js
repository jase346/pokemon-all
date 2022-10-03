'use strict';
const express = require('express');
const router = express.Router();
const { getPokemonController, createPokemonController, getlistPokemonsController, editPokemonController, deletePokemonController } = require('../controllers/pokeworld-controller');

router.get('/', async (req, res) => {
    res.render('home');
});

//capturar informacion del pokemon
router.get('/pokemon/show/:name', getPokemonController)

//guardar el pokemon
router.post('/pokemon/show/', createPokemonController);

//ver lista de pokemones
router.get('/mypokemons', getlistPokemonsController);

//editar pokemon
router.put('/pokemon/edit/', editPokemonController);

//eliminar pokemon
router.delete('/pokemon/remove/:id', deletePokemonController);

module.exports = router;