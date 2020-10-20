var character =  document.getElementById("character");


window.addEventListener( 'keydown', (event) => {
    switch (event.key){
      case ('ArrowLeft'): character.style.left = parseInt(character.style.left) - 5 + "px";
        break;
      case ('ArrowRight'): character.style.left = parseInt(character.style.left) + 5 + "px";
        break;

    }
})
