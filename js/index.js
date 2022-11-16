$(document).ready(function(){

    /***********LES VARIABLES*********/

    const pseudo_input = $('#pseudo_input');                    // Input d'entrée du pseudo
    const dificulty_level = $('#level_choice_wrapper input');   // Choix du niveau de difficulté
    const start_btn = $('#start_btn');                          // Bouton de démarrage du jeu
    const error_message = $('#error_message');                  // Balise <p> d'affichage d'erreur

    

    $(start_btn).click(start_game);

    $(pseudo_input).keypress(function( event ) {
        if (event.which == 13) {
            start_game(event)
        }
    })
      /***********LES FONCTIONS*********/

    //Fonction de vérification du pseudo et verification du niveau de difficulté
    function start_game(e){
        if ($(pseudo_input).val() === ""){
            e.preventDefault();
            $(error_message).html('Vous devez entrer votre pseudo pour jouer ⛔') //Affichage message d'erreur si pas de pseudo choisit
        }else{
            let regex = /^[a-z0-9]+$/gi;
            let pseudo = escape($(pseudo_input).val());
            if(regex.test(pseudo)){
                sessionStorage.setItem('pseudo',pseudo ); //récupération du pseudo
                sessionStorage.setItem('sound', false); //On active par défaut le son
                
                $.each( dificulty_level, function( key, value ) {
                    if (value.checked){
                        sessionStorage.setItem('level', value.value); //récupération niveau de dificulté choisit

                        let coef;
                        switch(value.value){
                            case "Facile":
                                coef = 1.5;
                                // On enregistre le coeff dans le sessionStorage
                                sessionStorage.setItem('coef', coef);
                                break;
                            case "Normal":
                                coef = 2; 
                                // On enregistre le coeff dans le sessionStorage
                                sessionStorage.setItem('coef', coef);
                                break;
                            case "Difficile":
                                coef = 2.5;
                                // On enregistre le coeff dans le sessionStorage
                                sessionStorage.setItem('coef', coef);
                                break;
                        }
                    }
                });

                // On charge le jeu
                window.location.href = "game.html";
            }else{
                e.preventDefault();
                $(error_message).html('Vous devez entrer un pseudo correct pour jouer ⛔') //Affichage message d'erreur si pseudo pas correct
            }
        }
    }
});