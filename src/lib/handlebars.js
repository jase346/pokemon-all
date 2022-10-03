//const hbs = require('express-handlebars')

const helpers = {};

helpers.listpokemons = (pokemons) => {
    
    items = '';

    console.log(pokemons);
    
    pokemons.map((x) => {
        items += '<tr>';
        items += `<td><img width="40" class="app-table-avatar" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x.dni}.png" alt="${x.name}"></td>`;
        items += `<td>${x.name}</td>`;
        items += `<td>${x.alias}</td>`;
        items += `<td>${x.experience}</td>`;
        items += `<td>${x.hp}</td>`;
        items += `<td>${x.attack}</td>`;
        items += `<td>${x.defense}</td>`;
        items += `<td>${x.speed}</td>`;
        items += `<td d-flex>
            <a class="btn btn-success btn-sm" href="pokemon/show/${x.name}" role="button">show</a>
            <button type="button" onclick="editPokemon(${x.id},'${x.alias}')" class="btn btn-primary btn-sm">change aliases</button>
            <button type="button" onclick="deletePokemon(${x.id})" class="btn btn-danger btn-sm">release pokemon</button>
        </td>`;
        items += '</tr>';
    });

    return items;
}

helpers.isnull = (value) => {
    return value !== null;
}

module.exports = helpers;