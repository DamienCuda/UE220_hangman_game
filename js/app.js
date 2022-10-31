document.addEventListener("DOMContentLoaded", function(){

    const modal = document.querySelector('#login_modal'); //Initialisation de variable en vanillaJS pour utiliser la méthode showModal()
    modal.showModal(); //La modal apparait dès le lenacement du jeu

    const pseudo_input = $('#pseudo_input');
    const dificulty_level = $('#level_choice_wrapper input');
    const start_btn = $('#start_btn');
    const error_message = $('#error_message');
    var difficulty = 0;

    $(start_btn).click(start_game)

    //Fonction de vérifiacation du pseudo et verification du niveau de difficulté
    function start_game(){
        var player_pseudo = $(pseudo_input).val(); //récupération pseudo
        if (player_pseudo == ""){
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
});