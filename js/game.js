$(document).ready(function(){

    /***********LES VARIABLES*********/

    var mystery_word = "test"; // Mot à découvrir
    var choosen_letter = ""; // Lettre choisit par le joueur au click ou au clavier
    var player_pseudo = sessionStorage.getItem('pseudo'); //Récupération du pseudo de session
    var dificulty_level = sessionStorage.getItem('level'); //Récupération du niveau de session
    

    /***********INITIALISATION DU JEU*********/

    $("#current_difficulty").html(dificulty_level);     //Injection du niveau de difficulté
    $("#player_pseudo").html(player_pseudo);            //Injection du pseudo

    generate_keyboard();                                //Le clavier est généré
    //choix aléatoire du mot à injecter dans la variable mystery_word
    hidden_word(mystery_word);                          //Les tirets représentant le mot mystère sont générés en fonction de la longueur
    user_keyboard_listener();                           //Le clavier physique est écouté
    virtuel_keyboard_listener();                        //Le clavier virtuel est écouté
    

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

    //Fonction d'écoute du clavier virtuel
    function virtuel_keyboard_listener(){
        var letters = $('.letter');
        $.each(letters.click((letter)=> {
            choosen_letter= letter.currentTarget.innerHTML;
            //Ajouter la fonction de vérification ici
        }));
    };

    //Fonction d'écoute du clavier de l'utilisateur
    function user_keyboard_listener(){
        $(document).keydown(function(event){
            if ((event.keyCode >= 65) && (event.keyCode <= 90)){ //Seul les lettres avec le keycode entre 65 et 90 sont ajoutées à la variable choosen_letter
                choosen_letter = event.key.toUpperCase();
                //Ajouter la fonction de vérification ici
            }
        });
    };
});