/**
 * 
 * @returns valida para acceder a guardar el pokemon
 */
function capture_pokemon() {
    let available = parseInt($("#pokeava").val());
    if (available == 0) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `oops! you don't have pokeballs`,
            showConfirmButton: false,
            timer: 2000
        });
        return false;
    }
    $("#pokeava").val(available - 1);

    let timerInterval
    Swal.fire({
    title: 'throwing pokeball!',
    html: 'Go... <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
    /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            let par = Math.floor(Math.random() * 10);
            if (par % 2 == 0) {
                oportunity();
            }else{
                Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: `he's a rude pokemon, keep trying!`,
                showConfirmButton: false,
                timer: 2500
                })
            }
        console.log('I was closed by the timer')
    }
    })
}

async function oportunity() {

    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let sum = parseInt(num1) + parseInt(num2);

const { value: respuesta } = await Swal.fire({
  title: 'it is our opportunity!',
  input: 'text',
  inputLabel: `the sum of ${num1} + ${num2} is:`,
  showCancelButton: true,
  inputValidator: (value) => {
    if (!value) {
      return 'wrong answer'
    }
  }
})

    if (respuesta == sum) {
        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Very good, finish it!',
        showConfirmButton: false,
        timer: 1500
        })
        $("#btncapture").hide('slow');
        $("#btntake").show('slow')
        $("#alias").show('slow');
    } else {
        Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'try again',
        showConfirmButton: false,
        timer: 1500
        })
    }
}