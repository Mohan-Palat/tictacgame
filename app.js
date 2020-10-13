console.log('app linked');
//startover div
//let humanBtn = document.querySelector(".button-human ")
humanBtn.addEventListener("click", function(e) {
    alert( "h0",e.target.id)
    //startGame();
    modal.style.display = "none"
    for (const gamesquare of gamesquares){
        gamesquare.addEventListener('click',handleGameCubeClick)
        console.log( '====',gamesquare);
    }
})
humanBtn1.addEventListener("click", function(e) {
    alert( "h1",e.target.id);
    startGame();
    console.log( humanBtn1);
    modal.style.display = "none"
    for (const gamesquare of gamesquares){
        gamesquare.addEventListener('click',handleGameCubeClick)
        console.log( '====',gamesquare);
    }
})
    

const letterToSymbol=(letter)=> letter==='x' ? xSymbol : oSymbol;
const winnerStatus=(letter)=> {
        winner = letter;
        resetGame= false;
        console.log(resetGame);
        if (winner==='x'){
             playerstatus.innerHTML= `${letterToSymbol(winner)}  has won!!!!`  ;
        }
        else{
            playerstatus.innerHTML= `${letterToSymbol(winner)}  has won!!!!`  ;  
        }
}
/***
 * GAME START OVER OR RESET BUTTON
 */
const handleStartOverH= ()=>{
    startGame();
    // resetGame= true;
    // xIsNext =true;
    // playerstatus.innerHTML= `${xSymbol}  is Next`  ;  
    // for (const gamesquare of gamesquares){
    //     gamesquare.classList.remove('xc');
    //     gamesquare.classList.remove('oc');
    //     gamesquare.classList.remove('x');
    //     gamesquare.classList.remove('o');
      
    // }
    // for( let i = 0; i < winConditions.length; i++ ){     
    //     for( let j = 0; j < winConditions[i].length; j++ ){
    //      document.getElementById( winConditions[i][j] ).innerHTML ="";
    //    }
    // }
    // // for (const gamesquare of gamesquares){
    // //      console.log("human====>");
    // //     gamesquare.addEventListener('click',handleGameCubeClick)
     
    // // }
    // gameOver =false;
    
};
//should be called after every game move
const udateGameStatus=(e)=>{
    //console.log(gamesquares[0].classList[1]);
    const topLeft=gamesquares[0].classList[1];
    const topMiddle=gamesquares[1].classList[1];
    const topRight=gamesquares[2].classList[1];
    const middleLeft=gamesquares[3].classList[1];
    const middleMiddle=gamesquares[4].classList[1];
    const middleRight=gamesquares[5].classList[1];
    const bottomLeft=gamesquares[6].classList[1];
    const bottomMiddle=gamesquares[7].classList[1];
    const bottomRight=gamesquares[8].classList[1];
    console.log(topLeft, topMiddle,topRight,middleLeft,middleMiddle,middleRight,bottomLeft,bottomMiddle,bottomRight)
   
   //horizontal wins
    if (topLeft && topLeft ===topMiddle && topLeft ===topRight){
        console.log (topLeft);
        winnerStatus(topLeft);
    }
    else if (middleLeft && middleLeft===middleMiddle && middleLeft===middleRight){
        
        console.log ("middleleft",middleLeft);
        winnerStatus(middleLeft);
    }
    else if ( bottomLeft && bottomLeft===bottomMiddle && bottomLeft===bottomRight){
        winnerStatus(bottomLeft);
    }
    //vertical wins
    else if (topLeft && topLeft===middleLeft&& topLeft===bottomLeft){
        winnerStatus(topLeft);
    }
    else if ( topMiddle && topMiddle===middleMiddle && topMiddle===bottomMiddle){
        winnerStatus(topMiddle);
    }
    else if ( topRight && topRight===middleRight && topRight===bottomRight){
        winnerStatus(topRight);
    }
    //diagonal wins
    else if (topRight && topRight===middleMiddle && topRight===bottomLeft){
        winnerStatus(topRight);
    }
    else if (topLeft && topLeft===middleMiddle && topLeft===bottomRight) {
        winnerStatus(topLeft);
    
    }
    //tie condition
    else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && bottomLeft && bottomMiddle &&bottomRight){
        resetGame= false;
        playerstatus.innerHTML= "Game is tied" ;  

    }
    else{
        xIsNext=!xIsNext;
        if (xIsNext){
            playerstatus.innerHTML= `${xSymbol}  is next` ; 
        }
        else{
            playerstatus.innerHTML= `<span>${oSymbol} </span> is next`  ; 
        }

    }


}



const handleGameCubeClick =(e)=>{
    
    alert( e.target.id);
    //get the classname from the target attribute
    //console.log(e);
    // console.log(e.target.classList);
    /* we need the classlist just to make sure the class is not added twice8*/
    const gamecubeClassList = e.target.classList;
    const location =e.target.classList[1];//gives the exact location
    console.log (gamecubeClassList);
   //https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
   //if the class is aleady there dont do anything--just return
    console.log("resetGame---->",resetGame);
    if(!resetGame){
        return;
    }
     
     if ((gamecubeClassList.contains("x"))|| (gamecubeClassList.contains("o"))) {
        return;
     }
     for (const gamesquare of gamesquares){
        gamesquare.classList.remove('xc');
        gamesquare.classList.remove('oc');
       // gamesquare.classList.remove('x');
        //gamesquare.classList.remove('o');
         //gamesquare.classList.innerHTML=""
        // console.log( '====',gamesquare.classList);
          for( let i = 0; i < winConditions.length; i++ ){     
            for( let j = 0; j < winConditions[i].length; j++ ){
             document.getElementById( winConditions[i][j] ).innerHTML ="";
           }
     }
 } 
    //console.log(location);
    //the class should not contain x and o
   
    if (xIsNext){
       e.target.classList.add('x');
       udateGameStatus();
       console.log(xIsNext);
    }
    else{
       e.target.classList.add('o');
       udateGameStatus();     

    }
};



//event listener seection
// event listener to reset 
//humanBtn1.addEventListener('click',handleStartOver);

//event listeners to nine game cubes




