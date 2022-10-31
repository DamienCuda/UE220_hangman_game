document.addEventListener("DOMContentLoaded", function(){

    const modal = document.querySelector('#login_modal'); //Initialisation de variable en vanillaJs pour utiliser la méthode showModal()
    modal.showModal();

    const pseudo_input = $('#pseudo_input');
    const dificulty_level = $('#level_choice_wrapper input');
    const start_btn = $('#start_btn');
    const error_message = $('#error_message');
    var difficulty = 0;

    $(start_btn).click(start_game)

    function start_game(){
        var player_pseudo = $(pseudo_input).val();
        if (player_pseudo == ""){
            $(error_message).html('Vous devez entrer votre pseudo pour jouer ;)')
            
        }else{
            $.each( dificulty_level, function( key, value ) {
                if (value.checked){
                    difficulty =  value.value;
                }
              });
            modal.style.display = "none";
        }
    }
});