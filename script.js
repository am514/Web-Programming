var block =  document.getElementById("block");

//let iterationCount = 0;
block.addEventListener('animationiteration', () => {
   // iterationCount++;
    var random = (Math.random() * 800);
    var random2 = (Math.random(), random);
    block.style.left = random2 +"px";
});