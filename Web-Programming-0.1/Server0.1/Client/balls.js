
let blockcounter = 0;
let rockCounter = 0;
let score = 0;
let currentBlocks = [];
let currentRocks = [];
let currentPowerUp =[];
let done = false;
let collected = false;
let start = false;
// create falling block and add it to html
setInterval(function(){ 





    let blockLast = document.getElementById("block" + (blockcounter -1));
    let rockLast = document.getElementById("rocks" + (rockCounter -1));

    if(blockcounter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
    }
    if(rockCounter>0){
        var rockLastTop = parseInt(window.getComputedStyle(rockLast).getPropertyValue("top"));
    }


     if((blockLastTop < 800 || blockcounter == 0 ) && blockcounter < 6 ){
        let block = document.createElement("div");
        block.setAttribute("class", "block");
        block.style.left = (Math.random() * 760) + "px";
        block.setAttribute("id", "block" + blockcounter);
        //     let random = (Math.random() * 760);
        block.style.top = (blockLastTop + 200) + "px";
        //     block.style.left = random +"px";
        gameBox.appendChild(block);
        // if(block.style.top > 0 && block.style.top < 760 ){
            currentBlocks.push(blockcounter);
        //}


        blockcounter++;
    }

    if((rockLastTop >= 400 || rockCounter == 0 ) && rockCounter < 4 ){
        let rock = document.createElement("img");
        rock.setAttribute("id", "rocks" + rockCounter);
        rock.setAttribute("class", "rocks");
        rock.style.left = (Math.random() * 760) + "px";
        rock.style.top =  -500 + "px";
        //     block.style.left = random +"px";
        gameBox.appendChild(rock);
        // if(block.style.top > 0 && block.style.top < 760 ){
            currentRocks.push(rockCounter);
        //}


        rockCounter++;
    }




    for(var j = 0; j < currentRocks.length; j++){
        let current = currentRocks[j];
        let indexRock = document.getElementById("rocks" + current);
        let rockTop = parseFloat(window.getComputedStyle(indexRock).getPropertyValue("top"));
        let rockBot = (rockTop + parseFloat(window.getComputedStyle(indexRock).getPropertyValue("height")));
        let rockLeft = parseFloat(window.getComputedStyle(indexRock).getPropertyValue("left"));
        let rockRight = (rockLeft + parseFloat(window.getComputedStyle(indexRock).getPropertyValue("width")));
        indexRock.style.top = rockTop + 1 + "px";
        if(rockTop >= 1200){
            indexRock.style.top = -100 + "px";
            indexRock.style.left = (Math.random() * 760) + "px";
        }

        if(!(( (newCharacter.y + newCharacter.height) < rockTop) || (newCharacter.y > rockBot) 
            || ((newCharacter.x + newCharacter.width) < rockLeft) 
            || (newCharacter.x > rockRight))){
                indexRock.style.top = -400 + "px";
                indexRock.style.left = (Math.random() * 760) + "px";
                newCharacter.lifeDown();
                score = score -2;
                document.getElementById("score").innerHTML = "Score:" + score;
                document.getElementById("playerLife").innerHTML = "lives: " + newCharacter.playerLife;
                console.log("player Life: " + newCharacter.playerLife);
            }
    }



    for(var i = 0; i < currentBlocks.length; i++){
        let collides = false;
        let current =currentBlocks[i];
        let indexblock = document.getElementById("block" + current);
        let blockTop = parseFloat(window.getComputedStyle(indexblock).getPropertyValue("top"));
        let blockBot = (blockTop + parseFloat(window.getComputedStyle(indexblock).getPropertyValue("height")));
        let blockLeft = parseFloat(window.getComputedStyle(indexblock).getPropertyValue("left"));
        let blockRight = (blockLeft + parseFloat(window.getComputedStyle(indexblock).getPropertyValue("width")));
        indexblock.style.top = blockTop + 1 + "px";
        if(blockTop >= 1200){
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
                document.getElementById("score").innerHTML = "Score: " + score;

                
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

    if(done){
        let powerUp = document.getElementById("increase-size");
        powerUpTop = parseFloat(window.getComputedStyle(powerUp).getPropertyValue("top"));
        powerUp.style.top = powerUpTop + 1 + "px";
        let powerUpBot = (powerUpTop + parseFloat(window.getComputedStyle(powerUp).getPropertyValue("height")));
        let powerUpLeft = parseInt(window.getComputedStyle(powerUp).getPropertyValue("left"));
        let powerUpRight= (powerUpLeft + parseInt(window.getComputedStyle(powerUp).getPropertyValue("width")));



        if(powerUpTop == 900){
            powerUp.style.top = -5000 + "px";
        }
        if(!(  
                    ( (newCharacter.y + newCharacter.height) < powerUpTop)
                    || (newCharacter.y > powerUpBot) 
                    || ((newCharacter.x + newCharacter.width) < powerUpLeft) 
                    || (newCharacter.x > powerUpRight)
                    
                    )){
                        console.log("hit");
                        collides = true;
                        powerUp.style.top = -5000 + "px";
                        newCharacter.width = (newCharacter.width + 50 );
                        newCharacter.velocity = 40;
                        newCharacter.lifeUp();
                        document.getElementById("playerLife").innerHTML = "lives: " + newCharacter.playerLife;
                        newCharacter.sketchCharacter();
                        setTimeout(function(){
                            newCharacter.width = (newCharacter.width - 50 );
                            newCharacter.velocity = 10;
                            newCharacter.sketchCharacter();
                        }, 8000);
        
        
                        
                    }

    }

    if(newCharacter.playerLife == 0){
        let pos = JSON.stringify({"score" : score});
        let xhr = new XMLHttpRequest();
        let url = "setScore"
    
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.send(pos);
        alert("You died, press okay to redirect to the welcome page. || PlayerScore = " + score);
        window.location = '/welcome';
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