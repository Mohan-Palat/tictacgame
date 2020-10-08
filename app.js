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

const handleStartOver= (e)=>{
    //console.log(e);
};
//should be called after every game move
const udateGameStatus=(e)=>{
    console.log(gamesquares[0].classList[2]);
    const topLeft=gamesquares[0].classList[2];
    const topMiddle=gamesquares[1].classList[2];
    const topRight=gamesquares[2].classList[2];

    const middleleft=gamesquares[3].classList[2];
    const middleMiddle=gamesquares[4].classList[2];
    const middleRight=gamesquares[5].classList[2];

    const bottomLeft=gamesquares[6].classList[2];
    const bottomMiddle=gamesquares[7].classList[2];
    const bottomRight=gamesquares[8].classList[2];
    console.log(topLeft, topMiddle,topRight,middleleft,middleMiddle,middleRight,bottomLeft,bottomMiddle,bottomRight)
    if (topLeft && topLeft ===topMiddle && topLeft ===topRight){
        console.log (topLeft);
        winner = topLeft;
        stausDiv.innerHTML=`$(letterToSymbol) has won!` ;


    }
}



const letterToSymbol=(letter)=> letter==='x'? xSymbol :oSymbol;
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
     console.log("hello world");
          return;
     }

    //console.log(location);
    //the class should not contain x and o
   
    if (xIsNext){
        
       e.target.classList.add('x');
       console.log("hello world-added-x");
       udateGameStatus();
       xIsNext=!xIsNext; //make it opposite
       console.log(xIsNext);
    }
    else{
       e.target.classList.add('o');
       console.log("hello world-added-o");
       udateGameStatus();
       xIsNext=!xIsNext;//make it opposite
       console.log(xIsNext);

    }
};



//event listener seection
// event listener to reset 
startoverdiv.addEventListener('click',handleStartOver);

//event listeners to nine game cubes
for (const gamesquare of gamesquares){
    gamesquare.addEventListener('click',handleGameCubeClick)
    console.log( 'LINE84',gamesquare);
}






