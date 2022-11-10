var hangman = document.getElementById("hangman");
var white = "rgb(255,255,255)";

export function headHangman(){
    gibbet();
    let headHangman = hangman.getContext("2d");
    headHangman.fillStyle = white;
    headHangman.strokeStyle = white;
    headHangman.lineWidth = 3;
    headHangman.beginPath();
    headHangman.arc(150, 100, 20, 0, 2 * Math.PI, false);
    headHangman.stroke();
    headHangman.closePath();
}


export function bodyHangman(){
    headHangman();
    let bodyHangman = hangman.getContext("2d");
    bodyHangman.fillStyle = white;
    bodyHangman.strokeStyle = white;
    bodyHangman.beginPath();
    bodyHangman.lineWidth = 3;
    bodyHangman.moveTo(150,120);
    bodyHangman.lineTo(150,200);
    bodyHangman.stroke();
}

export function armRightHangman(){
    bodyHangman();
    let armRightHangman = hangman.getContext("2d");
    armRightHangman.fillStyle = white;
    armRightHangman.strokeStyle = white;
    armRightHangman.lineWidth = 3;
    armRightHangman.beginPath();
    armRightHangman.moveTo(180,160);
    armRightHangman.lineTo(150,130);
    armRightHangman.stroke();
}

export function armLeftHangman(){
    armRightHangman();
    let armLeftHangman = hangman.getContext("2d");
    armLeftHangman.fillStyle = white;
    armLeftHangman.strokeStyle = white;
    armLeftHangman.lineWidth = 3;
    armLeftHangman.beginPath();
    armLeftHangman.moveTo(120,160);
    armLeftHangman.lineTo(150,130);
    armLeftHangman.stroke();
}

export function legRightHangman(){
    armLeftHangman();
    let legRightHangman = hangman.getContext("2d");
    legRightHangman.fillStyle = white;
    legRightHangman.strokeStyle = white;
    legRightHangman.lineWidth = 3;
    legRightHangman.beginPath();
    legRightHangman.moveTo(180,230);
    legRightHangman.lineTo(150,200);
    legRightHangman.stroke();
}

export function legLeftHangman(){
    legRightHangman();
    let legLeftHangman = hangman.getContext("2d");
    legLeftHangman.fillStyle = white;
    legLeftHangman.strokeStyle = white;
    legLeftHangman.lineWidth = 3;
    legLeftHangman.beginPath();
    legLeftHangman.moveTo(120,230);
    legLeftHangman.lineTo(150,200);
    legLeftHangman.stroke();
}

export function gibbet(){
    let gibbetHead = hangman.getContext("2d");
    gibbetHead.fillStyle = white;
    gibbetHead.strokeStyle = white;
    gibbetHead.lineWidth = 3;
    gibbetHead.beginPath();
    gibbetHead.moveTo(150,60);
    gibbetHead.lineTo(150,80);
    gibbetHead.stroke();

    let gibbetTraverse = hangman.getContext("2d");
    gibbetTraverse.fillStyle = white;
    gibbetTraverse.strokeStyle = white;
    gibbetTraverse.lineWidth = 3;
    gibbetTraverse.beginPath();
    gibbetTraverse.moveTo(64,60);
    gibbetTraverse.lineTo(152,60);
    gibbetTraverse.stroke();

    let gibbetVertical = hangman.getContext("2d");
    gibbetVertical.fillStyle = white;
    gibbetVertical.strokeStyle = white;
    gibbetVertical.lineWidth = 3;
    gibbetVertical.beginPath();
    gibbetVertical.moveTo(65,60);
    gibbetVertical.lineTo(65,390);
    gibbetVertical.stroke();

    let gibbetSocle = hangman.getContext("2d");
    gibbetSocle.fillStyle = white;
    gibbetSocle.strokeStyle = white;
    gibbetSocle.lineWidth = 3;
    gibbetSocle.beginPath();
    gibbetSocle.moveTo(125,390);
    gibbetSocle.lineTo(5,390);
    gibbetSocle.stroke();
}
