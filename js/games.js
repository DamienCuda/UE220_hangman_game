import * as hangman from "./hangman.js";

$(document).ready(function(){

    /***********LES VARIABLES*********/

    var choosen_letter = ""; // Lettre choisit par le joueur au click ou au clavier
    var player_pseudo = sessionStorage.getItem('pseudo'); //Récupération du pseudo de session
    var dificulty_level = sessionStorage.getItem('level'); //Récupération du niveau de session
    var player_score = sessionStorage.getItem('score'); //Récupération du score de session
    var coef = sessionStorage.getItem('coef'); //Récupération du coef
    var error_counter = 0;
    var errorSound = new Audio('./sound/error.mp3');
    var successSound = new Audio('./sound/success.mp3');
    var loseSound = new Audio('./sound/lose.mp3');
    var winSound = new Audio('./sound/win.mp3');
    let mute = sessionStorage.getItem('sound'); //Récupération de l'état du son

    /***********INITIALISATION DU JEU*********/

    $("#current_difficulty").html(dificulty_level);     //Injection du niveau de difficulté
    $("#player_pseudo").html(player_pseudo);            //Injection du pseudo
    $("#player_score").html(player_score);                     //Injection du score

    generate_keyboard();                                //Le clavier est généré
                                                        //choix aléatoire du mot à injecter dans la variable mystery_word

    var mystery_word = "test"; // Mot à découvrir

    generateWord()

    /***********JEU EN COURS (peut-être joué au clavier physique et virtuel)*********/

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

        //Écoute du clavier virtuel
        $(letters).each(function(key, value){
            $(value).click(function(){
                verif(value.textContent, mysteryWordArray, wordTemp);
            })
        });

        //Écoute du clavier phisique
        $(document).keydown(function(event){
            if ((event.keyCode >= 65) && (event.keyCode <= 90)){ //Seul les lettres avec le keycode entre 65 et 90 sont ajoutées à la variable choosen_letter
                choosen_letter = event.key.toUpperCase();
                verif(choosen_letter, mysteryWordArray, wordTemp);
            }
        });

        $("#volume").click(function(){
            if($("#volume").hasClass("bi-volume-up")){
                $("#volume").addClass("bi-volume-mute")
                $("#volume").removeClass("bi-volume-up")
                mute = "true";
                sessionStorage.setItem('sound', mute);
            }else{
                $("#volume").addClass("bi-volume-up")
                $("#volume").removeClass("bi-volume-mute")
                mute = "false";
                sessionStorage.setItem('sound', mute);
            }
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

                    if(mute === "false"){
                        //On joue l'audio de success
                        successSound.play();
                    }
                }
            }else{
                error = true;
            }
        }


        if(!wordTemp.includes("_")){

            setTimeout(() => {
                if(mute === "false") {
                    //On joue l'audio de win
                    winSound.play();
                }
            }, "200");

            // On enregistre le score dans le sessionStorage
            let score = parseInt(sessionStorage.getItem('score')) + 30 - 5 * error_counter * coef;
                if(score <= 0){
                    score = 0
                }
            sessionStorage.setItem('score', score);

            win();
        }


        if(error == true){
            error_counter++
            hangman_steps(error_counter, value)

            if(mute === "false") {
                //On joue l'audio de l'erreur
                errorSound.play();
            }
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

    function generateWord(){

        let json;

        switch(coef){
            case "1.5":
                json = "wordeasy.json";
                break;
            case "2":
                json = "wordmedium.json";
                break;
            case "2.5":
                json = "wordhard.json";
                break;
        }

        $.ajax({
            url: "./js/json/wordeasy.json",
            type: "GET",
            data: {},
            dataType: "json",
            success: function(reponse) {
                let random;
                for(let i = 0; i < reponse.length; i++){
                    random = Math.floor(Math.random() * reponse.length)
                }
                init(reponse[random])
            },
            error: function(error){
                console.log(error)
            }
        });



    }

    //Fonction d'affichage de la lettre si bonne pioche
    function show_letters(index, letter){ //Prend 2 paramètres l'index de la lettre dans le mot et la lettre
        var mystery_letters = $('.mystery_letters');
        $(mystery_letters).each((key, value) =>{
            if(key === index){
                value.innerHTML = letter;

                // On enregistre le score dans le sessionStorage
                let score = parseInt(sessionStorage.getItem('score')) + 5;
                sessionStorage.setItem('score', score);

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

    function lose(){

        // On affiche la modal de lose
        $("#modal-lose").css("display", "block");
        $("#modal-lose").addClass("in")

        let restartBtn = document.getElementsByClassName("btn-restart")[0]
        restartBtn.addEventListener("click", function(){

            // On cache la modal lose
            $("#modal-lose").css("display", "none");
            $("#modal-lose").removeClass("in")

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

            // On cache la modal lose
            $("#modal-win").css("display", "none");
            $("#modal-win").removeClass("in")

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

                    if(mute === "false") {
                        //On joue l'audio de lose
                        loseSound.play();
                    }

                    // On vide le score
                    let score = 0
                    sessionStorage.setItem('score', score);

                    lose();
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