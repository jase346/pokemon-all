//const hbs = require('express-handlebars')

const helpers = {};

helpers.listpokemons = (pokemons) => {
    let items = '';
    let iteration = pokemons.length;
    for (let i = 0; i < iteration; i++) { 
        items += `<tr>`;
        items += `<td>${i+1}</td>`;
        items += `<td><img height="40" class="app-table-avatar" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png" alt="${pokemons[i].name}"></td>`;
        items += `<td>${pokemons[i].name}</td>`;
        items += `<td><button onclick="show_pokemon('${pokemons[i].name}')" type="button" class="btn btn-success btn-sm">show</button></td>`;
        items += `</tr>`;
    }
    return items;
}

helpers.isnull = (value) => {
    return value !== null;
}

module.exports = helpers;