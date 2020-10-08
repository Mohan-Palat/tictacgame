console.log('app linked');
//startover div
const startoverdiv = document.querySelector(".subhead-b");
//console.log(startoverdiv)
//player status
const playerstatus = document.querySelector(".subhead-a");
//console.log(playerstatus);
//all squares for the game
const gamesquares=document.querySelectorAll(".game-area-cube");
console.log("GAME SQUARES==",gamesquares);

let winner=null;

//main game boolean variables
let gameIsOver = true;
let xIsNext =true; //if this is true x turn otherwise o S turn
/* event handlers section */
//game constants for players

const xSymbol='x';
const oSymbol='o';
const letterToSymbol=(letter)=> letter==='x' ? xSymbol : oSymbol;
const winnerStatus=(letter)=> {
        winner = letter;
        gameIsOver= false;
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
const handleStartOver= ()=>{
    xIsNext =true;
    playerstatus.innerHTML= `${xSymbol}  is Next`  ;  
    for (const gamesquare of gamesquares){
        gamesquare.classList.remove('x');
        gamesquare.classList.remove('o');
        //console.log( '====',gamesquare);
    }
    
};
//should be called after every game move
const udateGameStatus=(e)=>{
    console.log(gamesquares[0].classList[1]);
    const topLeft=gamesquares[0].classList[1];
    const topMiddle=gamesquares[1].classList[1];
    const topRight=gamesquares[2].classList[1];

    const middleLeft=gamesquares[3].classList[1];
    const middleMiddle=gamesquares[4].classList[1];
    const middleRight=gamesquares[5].classList[2];

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
        gameIsOver= false;
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
    //get the classname from the target attribute
    //console.log(e);
   // console.log(e.target.classList);
    /* we need the classlist just to make sure the class is not added twice8*/
    const gamecubeClassList = e.target.classList;
    const location =e.target.classList[1];//gives the exact location
    console.log (gamecubeClassList);
   
   //https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
   //if the class is aleady there dont do anything--just return
     if ((gamecubeClassList.contains("x"))|| (gamecubeClassList.contains("o"))) {
        return;
     }

    //console.log(location);
    //the class should not contain x and o
   
    if (xIsNext){
       e.target.classList.add('x');
       console.log("hello world-added-x");
       udateGameStatus();
       console.log(xIsNext);
    }
    else{
       e.target.classList.add('o');
       console.log("hello world-added-o");
       udateGameStatus();
    
      

    }
};



//event listener seection
// event listener to reset 
startoverdiv.addEventListener('click',handleStartOver);

//event listeners to nine game cubes
for (const gamesquare of gamesquares){
    gamesquare.addEventListener('click',handleGameCubeClick)
    //console.log( '====',gamesquare);
}






