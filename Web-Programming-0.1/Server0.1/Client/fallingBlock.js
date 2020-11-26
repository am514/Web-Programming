let gameBox = document.getElementById("gamebox");
let counter = 0;


// block.addEventListener('animationiteration', () => {
//     let random = (Math.random() * 800);
//     block.style.left = random +"px";
// });


let block = document.createElement("div");
block.setAttribute("id", "block");
block.addEventListener('animationiteration', () => {
    let random = (Math.random() * 800);
    console.log(random);
    block.style.left = random +"px";
});
gameBox.appendChild(block);