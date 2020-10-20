var block =  document.getElementById("block");

//let iterationCount = 0;
block.addEventListener('animationiteration', () => {
   // iterationCount++;
    var random = (Math.random() * 800);
    block.style.left = random +"px";
});