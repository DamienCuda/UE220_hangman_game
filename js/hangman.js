window.addEventListener("DOMContentLoaded", function(){
    var hangman = document.getElementById("hangman");
    var white = "rgb(255,255,255)";

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
        headHangman.fillStyle = white;
        headHangman.strokeStyle = white;
        headHangman.lineWidth = 3;
        headHangman.beginPath();
        headHangman.arc(150, 100, 20, 0, 2 * Math.PI, false);
        headHangman.stroke();
        headHangman.closePath();
    }

    function bodyHangman(){
        bodyHangman = hangman.getContext("2d");
        bodyHangman.fillStyle = white;
        bodyHangman.strokeStyle = white;
        bodyHangman.beginPath();
        bodyHangman.lineWidth = 3;
        bodyHangman.moveTo(150,120);
        bodyHangman.lineTo(150,200);
        bodyHangman.stroke();
    }

    function armRightHangman(){
        armRightHangman = hangman.getContext("2d");
        armRightHangman.fillStyle = white;
        armRightHangman.strokeStyle = white;
        armRightHangman.lineWidth = 3;
        armRightHangman.beginPath();
        armRightHangman.moveTo(180,160);
        armRightHangman.lineTo(150,130);
        armRightHangman.stroke();
    }

    function armLeftHangman(){
        armLeftHangman = hangman.getContext("2d");
        armLeftHangman.fillStyle = white;
        armLeftHangman.strokeStyle = white;
        armLeftHangman.lineWidth = 3;
        armLeftHangman.beginPath();
        armLeftHangman.moveTo(120,160);
        armLeftHangman.lineTo(150,130);
        armLeftHangman.stroke();
    }

    function legRightHangman(){
        legRightHangman = hangman.getContext("2d");
        legRightHangman.fillStyle = white;
        legRightHangman.strokeStyle = white;
        legRightHangman.lineWidth = 3;
        legRightHangman.beginPath();
        legRightHangman.moveTo(180,230);
        legRightHangman.lineTo(150,200);
        legRightHangman.stroke();
    }

    function legLeftHangman(){
        legLeftHangman = hangman.getContext("2d");
        legLeftHangman.fillStyle = white;
        legLeftHangman.strokeStyle = white;
        legLeftHangman.lineWidth = 3;
        legLeftHangman.beginPath();
        legLeftHangman.moveTo(120,230);
        legLeftHangman.lineTo(150,200);
        legLeftHangman.stroke();
    }

    function gibbet(){
        gibbetHead = hangman.getContext("2d");
        gibbetHead.fillStyle = white;
        gibbetHead.strokeStyle = white;
        gibbetHead.lineWidth = 3;
        gibbetHead.beginPath();
        gibbetHead.moveTo(150,60);
        gibbetHead.lineTo(150,80);
        gibbetHead.stroke();

        gibbetTraverse = hangman.getContext("2d");
        gibbetTraverse.fillStyle = white;
        gibbetTraverse.strokeStyle = white;
        gibbetTraverse.lineWidth = 3;
        gibbetTraverse.beginPath();
        gibbetTraverse.moveTo(64,60);
        gibbetTraverse.lineTo(152,60);
        gibbetTraverse.stroke();

        gibbetVertical = hangman.getContext("2d");
        gibbetVertical.fillStyle = white;
        gibbetVertical.strokeStyle = white;
        gibbetVertical.lineWidth = 3;
        gibbetVertical.beginPath();
        gibbetVertical.moveTo(65,60);
        gibbetVertical.lineTo(65,390);
        gibbetVertical.stroke();

        gibbetSocle = hangman.getContext("2d");
        gibbetSocle.fillStyle = white;
        gibbetSocle.strokeStyle = white;
        gibbetSocle.lineWidth = 3;
        gibbetSocle.beginPath();
        gibbetSocle.moveTo(125,390);
        gibbetSocle.lineTo(5,390);
        gibbetSocle.stroke();
    }
})