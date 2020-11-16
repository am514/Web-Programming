let character =  document.getElementById("character");

let interval;
let both = 0;








function moveLeft(){
    
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    let speed = 2;
    if(left > -40 ){
        character.style.left = left - speed + "px";
        //socket.emit('keyPress',{inputId:'left',state:true});
    }
    else{
        character.style.left = 800 + "px";
    }
    
    
}

function moveRight(){
    let speed = 2;
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 800 ){
        character.style.left = left + speed + "px";
        //socket.emit('keyPress',{inputId:'right',state:true});
    }
    else{
        character.style.left = 0 + "px";
    }
    
}


document.addEventListener("keydown", event => {
    if(both == 0){
        both++;
        if(event.key === "ArrowLeft"){
            interval = setInterval(moveLeft, 1);

        }
        if(event.key === "ArrowRight"){
            interval = setInterval(moveRight, 1);
        
        }
    }
});

document.addEventListener("keyup", event =>{
    clearInterval(interval);
    both = 0;
});
