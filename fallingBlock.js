let block =  document.getElementById("block");
let gameBox = document.getElementById("gamebox");


block.addEventListener('animationiteration', () => {
    let random = (Math.random() * 800);
    block.style.left = random +"px";
});
