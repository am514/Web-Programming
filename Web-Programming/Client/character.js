// var character =  document.getElementById("character");

// var move = 0;

// var socket = io();

// function movePlayer(e) {
//     if(e.keyCode == 37) {
//         move -= 20;
//         character.style.left = move + "px"; //move left
//         //socket.emit('keyPress',{inputId:'left',state:true});
//     }
//     else if(e.keyCode == 39) {
//         move += 20;
//         character.style.left = move + "px"; //move right
//         //socket.emit('keyPress',{inputId:'right',state:true});
//     }
// };

// document.onkeydown =movePlayer;




let gameBox = document.getElementById("gamebox"); //define fame box, area where game will take place



class Character {
    constructor() { // character attributes as constructor parameter
        this.character = document.createElement("div");
        this.character.setAttribute("id", "character");
        this.x = 400; //sets x position , left in css, to 400, half the game box
        this.y = 778; //sets y position , top in css, to the value passed in the parameter when new Character is created
        this.width = 50;  //sets width to the value passed in the parameter
        this.height = 20; //sets height to the value passed in the parameter
        this.color = "green"; //sets color to the value passed in the parameter
        this.sketched = false; //whether the character has been spawned in yet
        this.velocity = 10; //starting velocity is zero while the 
        this.maxVelocity = this.velocity * 1.25
        this.acceleration = 1.25; // acceleration is set to 0.5
        this.movingLeft = false; //moving left set to false
        this.movingRight = false; //moving right set to false
        this.playerLife = 3;
    }

    sketchCharacter(){
        
        if (!this.sketched){ //if the character has not been spawned in yet then the code below is executed
            this.sketched = true; // sets sketched to true
            this.character.style.left = this.x + "px"; // sets the left position, x
            this.character.style.top = this.y + "px";  // sets the left position, y
            this.character.style.width = this.width + "px"; // sets the width
            this.character.style.height = this.height + "px"; // sets the width
            this.character.style.background = this.color; // sets the color of the character
            this.character.style.position = "relative"; 
            this.character.style.zIndex = 100;
            gameBox.appendChild(this.character); //places the new character element inside of the game box
        }
        else{ //if the character has already been spawned in

            
            if(this.movingLeft || this.movingRight){ //if the character is moving the code below is ran
                if(this.x < 0){ //character pops out on the opposite sides if it ever reaches the sides of the game box
                    this.x = 798;
                    this.character.style.width = this.width + "px"; 
                    this.character.style.left = this.x + "px";

                }
                else if(this.x > 800){ //for right side
                    this.x = 0;
                    this.character.style.width = this.width + "px";
                    this.character.style.left = this.x + "px";
                }
                else if(this.velocity >= this.maxVelocity){ //if the velocity reaches the max, it does not increase anymore
                    this.character.style.left = this.x + "px";
                    this.character.style.width = this.width + "px";
                }
                else{
                    this.velocity *= this.acceleration;  //increases the character velocity by the value of the acceleration
                    this.character.style.left = this.x + "px";
                    this.character.style.width = this.width + "px";
                }
                
            }
            else if(!(this.movingLeft) && !(this.movingRight)){ //if the character is still the velocity will gradually decrease
                this.character.style.left = this.x + "px";
                this.character.style.width = this.width + "px";
            }
            
            
        }
    }
    moveLeft(){ //move left function, sets movingLeft to true and decreases the value of x
        this.movingLeft = true;
        this.movingRight = false;
        // console.log(this.velocity);
        this.x -= this.velocity;
        this.sketchCharacter();

    }
    moveRight(){ //move left function, sets movingRight to true and increases the value of x
        this.movingLeft = false;
        this.movingRight = true;
        // console.log(this.velocity);
        this.x += this.velocity;
        this.sketchCharacter();
    }

    lifeDown(){
        this.playerLife = this.playerLife - 1;
    }
    lifeUp(){
        this.playerLife = this.playerLife + 1;
    }

    //////////////////////////////////////
    //////code below tries but fails//////
    /////to implement decceleration///////
    ////////////////instead //////////////
    //////////////////////////////////////
    //////////////////////////////////////

    // reduceVelocity(){
    //     if(!this.movingLeft){
    //         this.velocity = 10;
    //         this.sketchCharacter();
    //     }
    //     else if(!this.movingRight){
    //         this.velocity = 10;
    //         this.sketchCharacter();

    //     }
    // }
    
    

}






let newCharacter = new Character();
newCharacter.sketchCharacter();
document.onkeydown = keyDown;
function keyDown(event){
    event = event || window.event;
    if (event.keyCode == "37") {
        newCharacter.moveLeft();
    }
    else if(event.keyCode == "39"){
        newCharacter.moveRight();
    }
}

// document.onkeyup = keyUp;
// function keyUp(event){
//     event = event || window.event;
//     newCharacter.reduceVelocity();
    
// }


