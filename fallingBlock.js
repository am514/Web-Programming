let gameBox = document.getElementById("gamebox");
let counter = 0;
let score = 0;
let currentBlocks = [];

// block.addEventListener('animationiteration', () => {
//     let random = (Math.random() * 800);
//     block.style.left = random +"px";
// });









// create falling block and add it to html
setInterval(function(){ 

    let blockLast = document.getElementById("block" + (counter -1));
    
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
    }

     if((blockLastTop < 800 || counter == 0 ) && counter < 6 ){
        let block = document.createElement("div");
        block.setAttribute("class", "block");
        block.style.left = (Math.random() * 760) + "px";
        block.setAttribute("id", "block" + counter);
        //     let random = (Math.random() * 760);
        block.style.top = (blockLastTop + 200) + "px";
        //     block.style.left = random +"px";
        gameBox.appendChild(block);
        // if(block.style.top > 0 && block.style.top < 760 ){
            currentBlocks.push(counter);
        //}
        
        
        counter++;
    }

    for(var i = 0; i < currentBlocks.length; i++){
        let current =currentBlocks[i];
        let indexblock = document.getElementById("block" + current);
        let blockTop = parseFloat(window.getComputedStyle(indexblock).getPropertyValue("top"));
        indexblock.style.top = blockTop + 0.5 + "px";
        if(blockTop == 1200){
            indexblock.style.top = 0 + "px";
            indexblock.style.left = (Math.random() * 760) + "px";
        }
    }

    

},1);







//scoreboard for player


//create score board 
