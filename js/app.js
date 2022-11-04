document.addEventListener("DOMContentLoaded", function(){

    const modal = document.querySelector('#login_modal'); //Initialisation de variable en vanillaJS pour utiliser la méthode showModal()
    const pseudo_input = $('#pseudo_input');
    const dificulty_level = $('#level_choice_wrapper input');
    const start_btn = $('#start_btn');
    const error_message = $('#error_message');
    var difficulty = 0;

    generate_keyboard(); //Le clavier est généré

    $(start_btn).click(start_game)

    //Fonction de vérification du pseudo et verification du niveau de difficulté
    function start_game(e){
        var player_pseudo = $(pseudo_input).val(); //récupération pseudo
        if (player_pseudo == ""){
            e.preventDefault();
            $(error_message).html('Vous devez entrer votre pseudo pour jouer ;)') //Affichage message d'erreur si pas de pseudo choisit
            
        }else{
            $.each( dificulty_level, function( key, value ) {
                if (value.checked){
                    difficulty =  value.value; //récupération niveau de dificulté choisit
                }
              });
            modal.style.display = "none"; //La modale est caché
        }
    }

    //Fonction de génération du clavier
    function generate_keyboard(){
        for( var i = 65; i <= 90; i++){
           var letter = String.fromCharCode(i);
           $("#keyboard_container").append(`<span class="letter">${letter}</span>`);
        };
    };
});