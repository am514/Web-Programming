var block =  document.getElementById("block");
var gameBox = document.getElementById("gamebox");


block.addEventListener('animationiteration', () => {
    var random = (Math.random() * 800);
    block.style.left = random +"px";
});
