var block =  document.getElementById("block");
var gameBox = document.getElementById("gamebox");
var character = document.getElementById("character");

block.addEventListener('animationiteration', () => {
    var random = (Math.random() * 800);
    block.style.left = random +"px";
});

var move = 0;



function movePlayer(e) {
    if(e.keyCode == 37) {
        move -= 20;
        character.style.left = move + "px"; //move left
    }
    else if(e.keyCode == 39) {
        move += 20;
        character.style.left = move + "px"; //move right
    }
};

document.onkeydown =movePlayer;
