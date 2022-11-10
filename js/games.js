$(document).ready(function(){

    /***********LES VARIABLES*********/

    var mystery_word = "test"; // Mot à découvrir
    var choosen_letter = ""; // Lettre choisit par le joueur au click ou au clavier
    var player_pseudo = sessionStorage.getItem('pseudo'); //Récupération du pseudo de session
    var dificulty_level = sessionStorage.getItem('level'); //Récupération du niveau de session
    var error_counter = 0;
    

    /***********INITIALISATION DU JEU*********/

    $("#current_difficulty").html(dificulty_level);     //Injection du niveau de difficulté
    $("#player_pseudo").html(player_pseudo);            //Injection du pseudo

    generate_keyboard();                                //Le clavier est généré
                                                        //choix aléatoire du mot à injecter dans la variable mystery_word
    hidden_word(mystery_word);                          //Les tirets représentant le mot mystère sont générés en fonction de la longueur


    
    /***********JEU EN COURS (peut-être joué au clavier physique et virtuel)*********/
    
    //Écoute du clavier phisique
    $(document).keydown(function(event){
        if ((event.keyCode >= 65) && (event.keyCode <= 90)){ //Seul les lettres avec le keycode entre 65 et 90 sont ajoutées à la variable choosen_letter
            choosen_letter = event.key.toUpperCase();
            show_letters(0, choosen_letter);
        }
    });
     
    //Écoute du clavier virtuel
    var letters = $('.letter');
    $(letters).each(function(key, value){
        $(value).click(function(){
            choosen_letter = value.innerHTML;
            show_letters(0, choosen_letter);
        })
    });

    
    /***********LES FONCTIONS*********/

    //Fonction de génération du mot mystère caché
    function hidden_word(word){
        for (var i = 0 ; i < word.length; i++){
            $("#mystery_word_container").append(`<span class="mystery_letters frederica_font">_</span>`)
        }
    };
    //Fonction de génération du clavier virtuel
    function generate_keyboard(){
        for( var i = 65; i <= 90; i++){
           var letter = String.fromCharCode(i);
           $("#keyboard_container").append(`<span class="letter frederica_font">${letter}</span>`);
        };
    };

    //Fonction d'affichage de la lettre si bonne pioche
    function show_letters(index, letter){ //Prend 2 paramètres l'index de la lettre dans le mot et la lettre
        var mystery_letters = $('.mystery_letters');
        $(mystery_letters).each((key, value) =>{
            if(key === index){
                value.innerHTML = letter;
            }
        })
    };

});

/*********Écoute du clavier physique tout le document************/




/*
while(error_counter < 7){

};
    
if error_counter == 7 Fonction GAME OVER

FONCTION SCORE

FONCTION RESTART

FONCTION verif(choosen_letter)
    si lettre dans le mot 
        fonction affichage
            si tableau_temp == mystery_word
            fonction WIN
            break
    sinon error_counter ++
    fonction afffichage canvas
*/