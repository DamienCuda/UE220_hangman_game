$(document).ready(function(){

    /***********LES VARIABLES*********/

    const pseudo_input = $('#pseudo_input');                    // Input d'entrée du pseudo
    const dificulty_level = $('#level_choice_wrapper input');   // Choix du niveau de difficulté
    const start_btn = $('#start_btn');                          // Bouton de démarrage du jeu
    const error_message = $('#error_message');                  // Balise <p> d'affichage d'erreur

    

    $(start_btn).click(start_game);

      /***********LES FONCTIONS*********/

    //Fonction de vérification du pseudo et verification du niveau de difficulté
    function start_game(e){
        if ($(pseudo_input).val() == ""){
            e.preventDefault();
            $(error_message).html('Vous devez entrer votre pseudo pour jouer ⛔') //Affichage message d'erreur si pas de pseudo choisit
        }else{
            sessionStorage.setItem('pseudo', $(pseudo_input).val()); //récupération du pseudo
            sessionStorage.setItem('score', 0); //récupération du pseudo
            $.each( dificulty_level, function( key, value ) {
                if (value.checked){
                    sessionStorage.setItem('level', value.value); //récupération niveau de dificulté choisit
                }
              });
        }
    }
});