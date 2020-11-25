let counter = 0;
let score = 0;
let currentBlocks = [];
let currentPowerUp =[];
let done = false;
let collected = false;
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
        let collides = false;
        let current =currentBlocks[i];
        let indexblock = document.getElementById("block" + current);
        let blockTop = parseFloat(window.getComputedStyle(indexblock).getPropertyValue("top"));
        let blockBot = (blockTop + parseFloat(window.getComputedStyle(indexblock).getPropertyValue("height")));
        let blockLeft = parseFloat(window.getComputedStyle(indexblock).getPropertyValue("left"));
        let blockRight = (blockLeft + parseFloat(window.getComputedStyle(indexblock).getPropertyValue("width")));
        indexblock.style.top = blockTop + 0.5 + "px";
        if(blockTop == 1200){
            indexblock.style.top = 0 + "px";
            indexblock.style.left = (Math.random() * 760) + "px";
        }
        if(!(  
            ( (newCharacter.y + newCharacter.height) < blockTop)
            || (newCharacter.y > blockBot) 
            || ((newCharacter.x + newCharacter.width) < blockLeft) 
            || (newCharacter.x > blockRight)
            
            )){
                indexblock.style.top = -100 + "px";
                indexblock.style.left = (Math.random() * 760) + "px";
                collides = true;
                score ++;
                console.log("score: " + score);

                
            }

        
    }
    if(score == 6 && !done){
        let powerUp = document.createElement("img");
        powerUp.setAttribute("id", "increase-size");
        powerUp.style.left = (Math.random() * 760) + "px";
        powerUp.style.height = 40 + "px";
        powerUp.style.width = 40 + "px";
        powerUp.style.top = -100 + "px";
        
        gameBox.appendChild(powerUp);
        done = true;
    
    }

    if(!collected && done){
        let powerUp = document.getElementById("increase-size");
        powerUpTop = parseFloat(window.getComputedStyle(powerUp).getPropertyValue("top"));
        powerUp.style.top = powerUpTop + 0.5 + "px";
        let powerUpBot = (powerUpTop + parseFloat(window.getComputedStyle(powerUp).getPropertyValue("height")));
        let powerUpLeft = parseInt(window.getComputedStyle(powerUp).getPropertyValue("left"));
        let powerUpRight= (powerUpLeft + parseInt(window.getComputedStyle(powerUp).getPropertyValue("width")));



        if(powerUpTop == 3000){
            powerUp.style.top = -100 + "px";
        }
        if(!(  
                    ( (newCharacter.y + newCharacter.height) < powerUpTop)
                    || (newCharacter.y > powerUpBot) 
                    || ((newCharacter.x + newCharacter.width) < powerUpLeft) 
                    || (newCharacter.x > powerUpRight)
                    
                    )){
                        collides = true;
                        powerUp.style.top = 1000 + "px";
                        newCharacter.width = (newCharacter.width + 50 );
                        newCharacter.velocity = 40;
                        newCharacter.sketchCharacter();
                        setTimeout(function(){
                            newCharacter.width = (newCharacter.width - 50 );
                            newCharacter.velocity = 10;
                            newCharacter.sketchCharacter();
                        }, 8000);
        
        
                        
                    }

    }




    // for(var i = 0; i<currentPowerUp.length; i++){
    //     let current = currentPowerUp[i];
    //     let indexPowerUp = document.getElementById("increase-size");
    //     let powerUpTop = parseFloat(window.getComputedStyle(indexPowerUp).getPropertyValue("top"));
    //     let powerUpBot = (blockTop + parseFloat(window.getComputedStyle(indexPowerUp).getPropertyValue("height")));
    //     let powerUpLeft = parseFloat(window.getComputedStyle(indexPowerUp).getPropertyValue("left"));
    //     let powerUpRight= (blockLeft + parseFloat(window.getComputedStyle(indexPowerUp).getPropertyValue("width")));
    //     indexPowerUp.style.top = powerUpTop + 0.5 + "px";

    //     if(powerUpTop == 1200){
    //         indexPowerUp.style.top = 0 + "px";
    //         indexPowerUp.style.left = (Math.random() * 760) + "px";
    //     }

    //     if(!(  
    //         ( (newCharacter.y + newCharacter.height) < powerUpTop)
    //         || (newCharacter.y > powerUpBot) 
    //         || ((newCharacter.x + newCharacter.width) < powerUpLeft) 
    //         || (newCharacter.x > powerUpRight)
            
    //         )){
    //             indexPowerUp.style.top = -100 + "px";
    //             indexPowerUp.style.left = (Math.random() * 760) + "px";
    //             collides = true;
    //             indexPowerUp.removeChild();
    //             newCharacter.width = (newCharacter.width + 20 );
    //             newCharacter.sketchCharacter();


                
    //         }

    // }
        
    



},1);







//scoreboard for player


//create score board 


