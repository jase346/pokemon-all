/**
 * action de seleccionar un pokemos de la lista de pokeworld y mostrarlo
 */

$("#name").keydown(function (e){//buscar con enter
   // Capturamos qué telca ha sido
   var keyCode= e.which;
   // Si la tecla es el Intro/Enter
   if (keyCode == 13){
     // Evitamos que se ejecute eventos
       show_pokemon(0);
     // Devolvemos falso
     return false;
   }
});
 
function show_pokemon(ref) {
    if (ref == 0) ref = $("#name").val()//verificamos que venga del input search
    if (ref == undefined || ref == '' || ref == null) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'fill in the name/identification field',
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }
    //concatenamos la url con el name del pokemon
    url = "/pokemon/show/" + ref;
    //limpiamos el input name
    $("#name").val('');
    //vamos a la  url para mostrar el pokemon
    $(location).attr('href',url);
}

window.PREV = null;
window.NEXT = null;
window.API = 'https://pokeapi.co/api/v2/pokemon/';

//navegacion para lista de pokemones
function listprevpokemons(action = 'all') {
    
    let url = API + '?offset=0&limit=10'
    if (action == 'next') url = NEXT;
    if (action == 'prev') url = PREV;

    $(".content-data").hide('slow')
    $("#loader").show('slow');

    $.get(url)
        .done(function (data) {
            if(data.next != null){
                NEXT = data.next;
                $('.navnext').removeClass('disabled');
            } else {
                $('.navnext').addClass('disabled');
            }
            if(data.previous != null){
                PREV = data.previous;
                $('.navprev').removeClass('disabled');
            } else {
                $('.navprev').addClass('disabled');
            }

            let urlParams = new URLSearchParams(url);
            let offset = urlParams.get(API+'?offset');

            let items = '';
            let pokemons = data.results;
            let iteration = pokemons.length;
            let id = 1;
            if (offset >= 10) id = parseInt(offset) + 1;
            for (let i = 0; i < iteration; i++) { 
                items += `<tr>`;
                items += `<td>${id}</td>`;
                items += `<td><img width="40" class="app-table-avatar" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${pokemons[i].name}"></td>`;
                items += `<td>${pokemons[i].name}</td>`;
                items += `<td><button onclick="show_pokemon('${pokemons[i].name}')" type="button" class="btn btn-success btn-sm">show</button></td>`;
                items += `</tr>`;
                id++;
            }
            $("#pokemonworld").html(items);
            $(".amount").html(data.count);

        $(".content-data").show('slow')
        $("#loader").hide('slow')   
    }).fail(function() {
        console.log( "error" );
    });
}

listprevpokemons();