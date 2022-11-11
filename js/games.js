
import * as hangman from "./hangman.js";
import {headHangman} from "./hangman.js";

$(document).ready(function(){

    /***********LES VARIABLES*********/

    var mystery_word = "test"; // Mot à découvrir
    var choosen_letter = ""; // Lettre choisit par le joueur au click ou au clavier
    var player_pseudo = sessionStorage.getItem('pseudo'); //Récupération du pseudo de session
    var dificulty_level = sessionStorage.getItem('level'); //Récupération du niveau de session
    var player_score = sessionStorage.getItem('score'); //Récupération du score de session
    var error_counter = 0;

    var isGameOver = false;
    /***********INITIALISATION DU JEU*********/

    $("#current_difficulty").html(dificulty_level);     //Injection du niveau de difficulté
    $("#player_pseudo").html(player_pseudo);            //Injection du pseudo
    $("#player_score").html(player_score);                     //Injection du score

    generate_keyboard();                                //Le clavier est généré
                                                        //choix aléatoire du mot à injecter dans la variable mystery_word


    init(mystery_word)


    /***********JEU EN COURS (peut-être joué au clavier physique et virtuel)*********/
    
    //Écoute du clavier phisique
    $(document).keydown(function(event){
        if ((event.keyCode >= 65) && (event.keyCode <= 90)){ //Seul les lettres avec le keycode entre 65 et 90 sont ajoutées à la variable choosen_letter
            choosen_letter = event.key.toUpperCase();
            show_letters(0, choosen_letter);
        }
    });

    function init(mystery_word){

        hidden_word(mystery_word);

        //Écoute du clavier virtuel
        var letters = $('.letter');

        let mysteryWordArray = [];
        let wordTemp = [];

        mysteryWordArray = mystery_word.toUpperCase().split('')

        for(let i = 0; i < mysteryWordArray.length; i++){
            wordTemp.push("_");
        }

        $(letters).each(function(key, value){
            $(value).click(function(){
                verif(value.textContent, mysteryWordArray, wordTemp);
            })
        });
    }

    // Fonction exit lors du click sur l'un des boutons exit
    let exitBtn = $(".btn-exit")
    $(exitBtn).each(function(key, value){

        $(value).click(function(){
            // On vide la sessionStorage
            sessionStorage.clear();
            // On reload la page pour refrech le jeu
            window.location.href = "index.html";
        })
    });

    function verif(value, mysteryWordArray, wordTemp){

        let error = false;
        for(let i = 0; i < mysteryWordArray.length; i++){
            if(mysteryWordArray.includes(value)){
                if(mysteryWordArray[i].indexOf(value) !== -1){
                    wordTemp[i] = value
                    show_letters(i, value);
                }
            }else{
                error = true;
            }
        }


        if(!wordTemp.includes("_")){
            win();
        }


        if(error == true){
            error_counter++
            hangman_steps(error_counter, value)
        }

        let tempWord = $(".mystery_letters")
        let tempWordSize = 0;
        $(tempWord).each((key, value) =>{
            if(value.textContent !== "_"){
                tempWordSize++
            }
        })

        /* Je ne sais pas à quoi servais exactement cette ligne damien donc je l'ai commenté au cas ou c'était important */
        //choosen_letter = value.innerHTML;
    }
    
    /***********LES FONCTIONS*********/

    //Fonction de génération du mot mystère caché
    function hidden_word(word){
        for (var i = 0 ; i < word.length; i++){
            $("#mystery_word_container").append(`<span class="mystery_letters frederica_font">_</span>`)
        }
    };
    //Fonction de génération du clavier virtuel
    function generate_keyboard(){
        for(var i = 65; i <= 90; i++){
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

                $('.letter').each(function(key, value){
                    if(value.textContent == letter){
                        $(value).addClass("success-letter")
                        setTimeout(() => {
                            $(value).removeClass("success-letter")
                        }, "500");
                    }
                });

            }
        })
    };

    function loose(error_counter){

        // On affiche la modal de loose
        $("#modal-loose").css("display", "block");
        $("#modal-loose").addClass("in")

        let restartBtn = document.getElementsByClassName("btn-restart")[0]
        restartBtn.addEventListener("click", function(){

            // On cache la modal loose
            $("#modal-loose").css("display", "none");
            $("#modal-loose").removeClass("in")

            // On reload la page pour refrech le jeu
            location.reload();
        });
    }

    function win(){
        // On affiche la modal de win
        $("#modal-win").css("display", "block");
        $("#modal-win").addClass("in")

        let restartBtn = document.getElementsByClassName("btn-restart")[1]
        restartBtn.addEventListener("click", function(){

            // On cache la modal loose
            $("#modal-win").css("display", "none");
            $("#modal-win").removeClass("in")

            // On enregistre le score dans le sessionStorage
            let score = parseInt(sessionStorage.getItem('score')) + 10;
            sessionStorage.setItem('score', score);

            // On reload la page pour refrech le jeu
            location.reload();
        });
    }

    //fonction d'affichage du hangman en fonction du nombre d'erruer du joueur
    function hangman_steps(error_counter, letterPressed){
        switch(error_counter){
            case 1:
                hangman.gibbet();
                $('.letter').each(function(key, value){
                    if(value.textContent == letterPressed){
                        $(value).addClass("error-letter")
                        setTimeout(() => {
                            $(value).removeClass("error-letter")
                        }, "500");
                    }
                });
                break;
            case 2:
                hangman.headHangman();
                $('.letter').each(function(key, value){
                    if(value.textContent == letterPressed){
                        $(value).addClass("error-letter")
                        setTimeout(() => {
                            $(value).removeClass("error-letter")
                        }, "500");
                    }
                });
                break;
            case 3:
                hangman.bodyHangman();
                $('.letter').each(function(key, value){
                    if(value.textContent == letterPressed){
                        $(value).addClass("error-letter")
                        setTimeout(() => {
                            $(value).removeClass("error-letter")
                        }, "500");
                    }
                });
                break;
            case 4:
                hangman.armRightHangman();
                $('.letter').each(function(key, value){
                    if(value.textContent == letterPressed){
                        $(value).addClass("error-letter")
                        setTimeout(() => {
                            $(value).removeClass("error-letter")
                        }, "500");
                    }
                });
                break;
            case 5:
                hangman.armLeftHangman();
                $('.letter').each(function(key, value){
                    if(value.textContent == letterPressed){
                        $(value).addClass("error-letter")
                        setTimeout(() => {
                            $(value).removeClass("error-letter")
                        }, "500");
                    }
                });
                break;
            case 6:
                hangman.legRightHangman();
                $('.letter').each(function(key, value){
                    if(value.textContent == letterPressed){
                        $(value).addClass("error-letter")
                        setTimeout(() => {
                            $(value).removeClass("error-letter")
                        }, "500");
                    }
                });
                break;
            case 7:
                hangman.legLeftHangman();
                setTimeout(() => {
                    loose(error_counter);
                }, "300");
                $('.letter').each(function(key, value){
                    if(value.textContent == letterPressed){
                        $(value).addClass("error-letter")
                        setTimeout(() => {
                            $(value).removeClass("error-letter")
                        }, "500");
                    }
                });
                break;
        };
    };

});


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