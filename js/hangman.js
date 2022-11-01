window.addEventListener("DOMContentLoaded", function(){
    var hangman = document.getElementById("hangman");
    var black = "rgb(0,0,0)";

    init();

    function init(){
        /*
            Pour afficher un partie du pendu, il suffit d'appeler la fonction de la partie souhaiter.
            Note: Gibbet signifie potence en anglais.
         */

        gibbet();
        headHangman();
        bodyHangman();
        armRightHangman();
        armLeftHangman();
        legRightHangman();
        legLeftHangman();

    }

    function headHangman(){
        headHangman = hangman.getContext("2d");
        headHangman.fillStyle = black;
        headHangman.strokeStyle = black;
        headHangman.lineWidth = 3;
        headHangman.beginPath();
        headHangman.arc(150, 100, 20, 0, 2 * Math.PI, false);
        headHangman.stroke();
        headHangman.closePath();
    }

    function bodyHangman(){
        bodyHangman = hangman.getContext("2d");
        bodyHangman.fillStyle = black;
        bodyHangman.strokeStyle = black;
        bodyHangman.beginPath();
        bodyHangman.lineWidth = 3;
        bodyHangman.moveTo(150,120);
        bodyHangman.lineTo(150,200);
        bodyHangman.stroke();
    }

    function armRightHangman(){
        armRightHangman = hangman.getContext("2d");
        armRightHangman.fillStyle = black;
        armRightHangman.strokeStyle = black;
        armRightHangman.lineWidth = 3;
        armRightHangman.beginPath();
        armRightHangman.moveTo(180,160);
        armRightHangman.lineTo(150,130);
        armRightHangman.stroke();
    }

    function armLeftHangman(){
        armLeftHangman = hangman.getContext("2d");
        armLeftHangman.fillStyle = black;
        armLeftHangman.strokeStyle = black;
        armLeftHangman.lineWidth = 3;
        armLeftHangman.beginPath();
        armLeftHangman.moveTo(120,160);
        armLeftHangman.lineTo(150,130);
        armLeftHangman.stroke();
    }

    function legRightHangman(){
        legRightHangman = hangman.getContext("2d");
        legRightHangman.fillStyle = black;
        legRightHangman.strokeStyle = black;
        legRightHangman.lineWidth = 3;
        legRightHangman.beginPath();
        legRightHangman.moveTo(180,230);
        legRightHangman.lineTo(150,200);
        legRightHangman.stroke();
    }

    function legLeftHangman(){
        legLeftHangman = hangman.getContext("2d");
        legLeftHangman.fillStyle = black;
        legLeftHangman.strokeStyle = black;
        legLeftHangman.lineWidth = 3;
        legLeftHangman.beginPath();
        legLeftHangman.moveTo(120,230);
        legLeftHangman.lineTo(150,200);
        legLeftHangman.stroke();
    }

    function gibbet(){
        gibbetHead = hangman.getContext("2d");
        gibbetHead.fillStyle = black;
        gibbetHead.strokeStyle = black;
        gibbetHead.lineWidth = 3;
        gibbetHead.beginPath();
        gibbetHead.moveTo(150,60);
        gibbetHead.lineTo(150,80);
        gibbetHead.stroke();

        gibbetTraverse = hangman.getContext("2d");
        gibbetTraverse.fillStyle = black;
        gibbetTraverse.strokeStyle = black;
        gibbetTraverse.lineWidth = 3;
        gibbetTraverse.beginPath();
        gibbetTraverse.moveTo(58,60);
        gibbetTraverse.lineTo(152,60);
        gibbetTraverse.stroke();

        gibbetVertical = hangman.getContext("2d");
        gibbetVertical.fillStyle = black;
        gibbetVertical.strokeStyle = black;
        gibbetVertical.lineWidth = 3;
        gibbetVertical.beginPath();
        gibbetVertical.moveTo(60,60);
        gibbetVertical.lineTo(60,397);
        gibbetVertical.stroke();

        gibbetSocle = hangman.getContext("2d");
        gibbetSocle.fillStyle = black;
        gibbetSocle.strokeStyle = black;
        gibbetSocle.lineWidth = 3;
        gibbetSocle.beginPath();
        gibbetSocle.moveTo(120,398);
        gibbetSocle.lineTo(0,398);
        gibbetSocle.stroke();
    }
})