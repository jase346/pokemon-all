async function editPokemon(id, alias) {
    
    const { value: respuesta } = await Swal.fire({
        title: 'change aliases',
        input: 'text',
        inputLabel: `current aliases: ${alias}`,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
            return 'error'
            }
        }
    })

    if (respuesta) {
       
        $.ajax({
            url: '/pokemon/edit',
            data: {
                id: id,
                alias: respuesta  
            },
            type: 'PUT',
            success: function (result) {
                if (result.success) { 
                    location.reload();
                }
            }
        });

    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'error',
            showConfirmButton: false,
            timer: 1500
        })
    }
    
}

function deletePokemon(id){
    $.ajax({
        url: '/pokemon/remove/'+id,
        type: 'DELETE',
        success: function (result) {
            if (result.success) { 
                location.reload();
            }
        }
    });
}