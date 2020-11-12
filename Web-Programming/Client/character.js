var character =  document.getElementById("character");

var move = 0;

var socket = io();

function movePlayer(e) {
    if(e.keyCode == 37) {
        move -= 20;
        character.style.left = move + "px"; //move left
        //socket.emit('keyPress',{inputId:'left',state:true});
    }
    else if(e.keyCode == 39) {
        move += 20;
        character.style.left = move + "px"; //move right
        //socket.emit('keyPress',{inputId:'right',state:true});
    }
};

document.onkeydown =movePlayer;
