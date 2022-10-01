const express = require('express');
const router = express.Router();
const {
    getListPokemonsController,
    getPokemonController }
= require('../controllers/pokeworld-controller');

router.get('/', async (req, res) => {
    res.render('home');
    // console.log(req.params.offset);
    // let offset = req.params.offset;
    // try {
    //     let pokemons = await getListPokemonsController(offset);
    //     res.render('home', { pokemons });
    // } catch (error) {
    //     next(error);
    // }
});

router.get('/pokemon/show/:name', async (req, res) => { 
    const name = req.params.name;
    try {
        let pokemon = await getPokemonController(name.toLowerCase());
        // let navigation = {};
        // let(pokemon.next != null) navigation.next = pokemon.next
        console.log(pokemon.stats[0].base_stat);
        res.render('show', { pokemon });
    } catch (error) {
        next(error);
    }
})

module.exports = router;