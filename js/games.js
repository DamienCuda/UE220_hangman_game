import * as hangman from "./hangman.js";

$(document).ready(function(){

    /***********LES VARIABLES*********/

    var choosen_letter = "";                              // Lettre choisit par le joueur au click ou au clavier
    var player_pseudo = sessionStorage.getItem('pseudo'); //Récupération du pseudo de session
    var dificulty_level = sessionStorage.getItem('level');//Récupération du niveau de session
    var coef = sessionStorage.getItem('coef');            //Récupération du coef
    var error_counter = 0;
    var errorSound = new Audio('./sound/error.mp3');
    var successSound = new Audio('./sound/success.mp3');
    var loseSound = new Audio('./sound/lose.mp3');
    var winSound = new Audio('./sound/win.mp3');
    let mute = sessionStorage.getItem('sound');          //Récupération de l'état du son
    let score = 0;                                       //On définit par défaut le score à 0
    let maxScore = 0;
    let scoreError = 0;
    let currentScore = 0;                                //On crée un score temportaire de la manche

    let mysteryWordArray = [];                           //Servira à accueillir le mot mytère
    let wordTemp = [];                                   //Servira à accueillir la tentative


    /***********INITIALISATION DU JEU*********/

    $("#current_difficulty").html(dificulty_level);     //Injection du niveau de difficulté
    $("#player_pseudo").html(player_pseudo);            //Injection du pseudo
    $("#player_score").html(score);                     //Injection du score

    generate_keyboard();                                //Le clavier virtuel est généré

    var mystery_word = generateWord();                  //Le mot mystère est généré et passé à la variable sous forme de promesses

    mystery_word
        .then(value => {
            init(value);                                //Le résultat de la promesse sert à initialiser le jeu
        });
    
    /***********LES ÉCOUTES*********/
        
    //Écoute de l'état du mute de SessionStorage
    if(mute == "false"){
        $("#volume").removeClass("bi-volume-mute")
        $("#volume").addClass("bi-volume-up")
    }else{
        $("#volume").addClass("bi-volume-mute")
        $("#volume").removeClass("bi-volume-up")
    }

    //Écoute du clavier virtuel
    var letters = $('.letter');
    $(letters).each(function(key, value){
        $(value).click(function(){
            verif(value.textContent, mysteryWordArray, wordTemp);
        })
    });

    //Écoute du clavier physique
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
    // Écoute des boutons "EXIT"
    let exitBtn = $(".btn-exit")
    $(exitBtn).each(function(key, value){

        $(value).click(function(){
            // On vide la sessionStorage
            sessionStorage.clear();
            // On reload la page pour refrech le jeu
            window.location.href = "index.html";
        })
    });

    // Écoute des boutons "RESTART"
    let restartBtn = $(".btn-restart")
    $(restartBtn).each(function(key, value){
        $(value).click(function(){
            error_counter = 0;
            currentScore = 0;
            scoreError = 0;
            // On génère un nouveau mot
            mystery_word = generateWord();                  //Le mot mystère est généré et passé à la variable sous forme de promesses

            mystery_word
                .then(value => {
                    init(value);                                //Le résultat de la promesse sert à initialiser le jeu
                });
        })
    });


    /***********LES FONCTIONS*********/

    //Fonction de génération du clavier virtuel
    function generate_keyboard(){
        for(var i = 65; i <= 90; i++){
            var letter = String.fromCharCode(i);
            $("#keyboard_container").append(`<span class="letter frederica_font">${letter}</span>`);
        };
    };

    //Fonction de choix du mot
    function generateWord(){
        return new Promise((resolve, reject) => {

            let json; //La variable json accueillera le nom du fichier json en fonction du niveau choisit

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
                url: "./js/json/" + json,
                type: "GET",
                data: {},
                dataType: "json",
                success: function(reponse) {
                    let random;
                    for(let i = 0; i < reponse.length; i++){
                        random = Math.floor(Math.random() * reponse.length)
                    }
                    mystery_word = reponse[random];
                    resolve(mystery_word);
                    console.log(mystery_word)
                },
                error: function(error){
                    reject(alert("Le mot n'a pu être généré"));
                }
            });

        })
    };

    //fonction d'initialisation du jeu
    function init(mystery_word){

        hidden_word(mystery_word);

        mysteryWordArray = mystery_word.toUpperCase().split('') //Le mot mystère est transformé en array
        wordTemp = [];
        for(let i = 0; i < mysteryWordArray.length; i++){       //Un array temporaire de la même longueur que le mot mystère est généré
            wordTemp.push("_");
        }

    };

    //Fonction de génération du mot mystère caché (appelée dans init())
    function hidden_word(word){
        for (var i = 0 ; i < word.length; i++){
            $("#mystery_word_container").append(`<span class="mystery_letters frederica_font">_</span>`)
        }
    };

    //Fonction de vérification de la proposition de lettre du joueur (appelée sur les ecouteurs des claviers)
    function verif(value, mysteryWordArray, wordTemp){ //Les paramètres correspondent à une lettre choisie, le mot mystère sous forme d'array et son double temporaire empli de _
        let error = false;                                          //Varibale d'erreur initialisé
        for(let i = 0; i < mysteryWordArray.length; i++){
            if(mysteryWordArray.includes(value)){                   // On vérifie si la lettre est dans l'array mystère
                if(mysteryWordArray[i].indexOf(value) !== -1){
                    if(wordTemp[i] !== value){
                        wordTemp[i] = value
                        show_letters(i, value);                     // On récupère l'index pour le passer à la fonction d'affichage des lettres
                        if(mute === "false"){                       //Si le son n'est pas coupé par le joueur
                            successSound.play();                    //Audio de win
                        }
                    }
                }
            }else{
                error = true;                                       //Si la lettre n'est pas dans l'array mystère la variable est modifié
            }
        }

        if(!wordTemp.includes("_")){
            setTimeout(() => {
                if(mute === "false") {
                    //On joue l'audio de win
                    winSound.play();
                }
            }, "200");
            score = score + 5 + 7 - error_counter * coef;
            maxScore = maxScore + 5 + 7 - error_counter * coef
            currentScore = currentScore + 5 + 7 - error_counter * coef;

            $("#player_score").html(score);
            win();
        }

        if(error == true){                                              //Si la variable a été modifiée
            error_counter++;                                            //Le compteur d'erreur est incrémenté
            hangman_steps(error_counter, value, mysteryWordArray);      //La fonction d'affichage du pendu est lancé

            score--;  //Le score est updaté
            scoreError++; //Le nombre de point perdu est stocké
            currentScore--

            if(score <= 0){
                score = 0
            }
            $("#player_score").html(score);

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
    };

    //Fonction d'affichage de la lettre si bonne pioche (appellée dans verif())
    function show_letters(index, letter){ //Prend 2 paramètres l'index de la lettre dans le mot et la lettre
        var mystery_letters = $('.mystery_letters');
        $(mystery_letters).each((key, value) =>{
            if(key === index){
                value.innerHTML = letter;
                // On enregistre le score dans le sessionStorage
                score++
                maxScore++
                currentScore++

                $("#player_score").html(score);

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

    //fonction d'affichage du hangman en fonction du nombre d'erreur du joueur (appellée dans verif())
    function hangman_steps(error_counter, letterPressed, word){
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

                    score = score - 5 - error_counter * coef;
                    scoreError = scoreError + 5 + error_counter * coef;

                    currentScore = currentScore - 5 - error_counter * coef;
                    if(score <= 0){
                        score = 0
                    }
                    $("#player_score").html(score);

                    lose(word);
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

    // Affichage de la modale d'échec (appelée dans hangman-steps si error-counter == 7)
    function lose(word){

        $('#show_lost_word').html(word); //on affiche le mot qui devait être trouvé

        // On affiche la modal de lose
        $("#modal-lose").css("display", "block");
        $("#modal-lose").addClass("in")

        let losePointZone = document.getElementById("lost_points")
        losePointZone.innerHTML = scoreError

        let restartBtn = document.getElementsByClassName("btn-restart")[0]
        restartBtn.addEventListener("click", function(){

            // On cache la modal lose
            $("#modal-lose").css("display", "none");
            $("#modal-lose").removeClass("in")

            // On vide le mot
            let container = document.getElementById("mystery_word_container")
            while(container.firstChild){
                container.removeChild(container.firstChild)
            }

            // On nettoie le canvas
            clearCanvas();
        });
    };

    //Affichage de la modale de réussite (appellée dans verif())
    function win(){
        // On affiche la modal de win
        $("#modal-win").css("display", "block");
        $("#modal-win").addClass("in")

        let winPointZone = document.getElementById("won_points")

        winPointZone.innerHTML =  currentScore

        let restartBtn = document.getElementsByClassName("btn-restart")[1]
        restartBtn.addEventListener("click", function(){

            // On cache la modal lose
            $("#modal-win").css("display", "none");
            $("#modal-win").removeClass("in")

            // On vide le mot
            let container = document.getElementById("mystery_word_container")
            while(container.firstChild){
                container.removeChild(container.firstChild)
            }

            // On nettoie le canvas
            clearCanvas();
        });
    };
    
    function clearCanvas(){
        let hangman = document.getElementById("hangman")
        let context = hangman.getContext('2d')
        context.clearRect(0, 0, 300, 400);
    };
});
