/****Global variables for Game */


let modal = document.querySelector(".modalDialog")
let computerBtn = document.querySelector(".button-computer ")
let humanBtn = document.querySelector(".button-human ")
const startoverdiv = document.querySelector(".subhead-b");
let computerBtn1 = document.querySelector(".button-computer-1 ")
let humanBtn1 = document.querySelector(".button-human-1 ")
let squareCount=9;
 
let origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
const squares=document.querySelectorAll(".game-area-cube");
let gameOver =false;
//console.log(startoverdiv)
//player status
const playerstatus = document.querySelector(".subhead-a");
//console.log(playerstatus);
//all squares for the game
const gamesquares=document.querySelectorAll(".game-area-cube");
console.log("GAME SQUARES==",gamesquares);
//game-area
const canvas = document.querySelector(".game-area");
console.log("canvas", canvas);
// X & Y position of mouse click relative to the canvas

let winner=null;

let resetGame = true;
let xIsNext =true; //if this is true x turn otherwise o S turn
/* event handlers section */
//game constants for players

const xSymbol='x';
const oSymbol='o';

/****End of Global variables for Game */


/***
 * GAME START OVER OR RESET BUTTON
 */
 const handleStartOverC= ()=>{
     resetGame= true;
     xIsNext =true;

     //playerstatus.innerHTML= `${xSymbol}  is Next`  ;  
     for (const gamesquare of gamesquares){
        gamesquare.classList.remove('xc');
        gamesquare.classList.remove('oc');
         //gamesquare.classList.innerHTML=""
        // console.log( '====',gamesquare.classList);
        for( let i = 0; i < winConditions.length; i++ )
       {
            for( let j = 0; j < winConditions[i].length; j++ ){
             document.getElementById( winConditions[i][j] ).innerHTML ="";
           }
     }
 } 
 //gameOver = true;
 gameOver =false;
 setMessageBox( "Pick a square!" );


 for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', chooseSquare, false);
}
 };



let buttonElements = document.querySelectorAll('#alphabet button');
function getbtnid (){
    for (let i = 0;i < buttonElements.length;i++){
    buttonElements[i].addEventListener('click',function(){
    console.log(this.getAttribute('id') );
    let y=this.getAttribute('id');
    return y;
   

    });
};

}


computerBtn.addEventListener("click", function(e) {
  
    modal.style.display = "none"
    console.log("hheee");

    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', chooseSquare, false);
    }
    
    })
    
    

let setMessageBox= function(caption){
    let messageBox= document.querySelector(".subhead-a");
    messageBox.innerHTML= caption;
}


let findClaimedSquares = function(marker){

    let   claimedSquares =[];
    let value ;
    for (let id =0; id < squareCount;id++){
        value=document.getElementById(id).innerHTML;
        if (value ===marker){
            claimedSquares.push(id);
        }

    }
    return claimedSquares;
}



let checkForDraw = function()
{
	let draw = true;
	for( let id = 0; id < squareCount; id++ )
	{
		if( squareIsOpen( document.getElementById( id ) ) )
		{
			draw = false;
			break;
		}
	}
	return draw;
}

let checkForWinCondition = function( marker )
{
	let claimedSquares = findClaimedSquares(marker);

	let win = false;
	for( let i = 0; i < winConditions.length; i++ )
	{
		win = winConditions[i].every( element => claimedSquares.indexOf( element ) > -1 );
		if( win )
		{
			win = winConditions[i];
			break;
		}
	}
	return win;
};

let secureWin = function(){
	return makeMove( "O" );
}

let preventDefeat = function(){
	return makeMove( "X" );
}

let makeMove = function( marker )
{
	let moveMade = false;
	for( let i = 0; i < winConditions.length; i++ )
	{
		let count = 0;
		for( let j = 0; j < winConditions[i].length; j++ )
		{
			if(  marker === document.getElementById( winConditions[i][j] ).innerHTML )
			{
				count++;
			}
		}

		if( count == 2 )
		{
			for( j = 0; j < winConditions[i].length; j++ )
			{
				let square = document.getElementById( winConditions[i][j] )
				if( squareIsOpen( square ) )
                {   
                   
                    console.log("ist os turn");
                    square.innerHTML = "O";
                    square.classList.add('oc');
					moveMade = true;
					break;
				}
			}
		}

		if( moveMade )
		{
			break;
		}
	}
	return moveMade;
}

let opponentMove = function()
{
	
		let moveMade = secureWin()
		if( !moveMade )
		{
			moveMade = preventDefeat();
			if( !moveMade )
			{
				let center = document.getElementById(4);
				if( squareIsOpen( center  ) )
                {  //center.classList.add('o');
                    console.log("ist os turn");
                    center.innerHTML = "O";
                    center.classList.add('oc');
                    //center.classList.add('o');
				}
				else
				{
					makeMoveAtFirstAvailableSquare();
				}
			}
		}
	}

    let makeMoveAtFirstAvailableSquare = function()
    {
        for( let id = 0; id < squareCount; id++ )
        {
            square = document.getElementById( id );
            if( squareIsOpen( square ) )
            {
                square.innerHTML = "O";
                square.classList.add('oc');
                break;
            }
        }
    }

    let squareIsOpen = function( square ){
	return ( square.innerHTML !== "X" && square.innerHTML !== "O" );
    }

    let highlightWinningSquares = function( winningSquares, color ){
	for( let i = 0; i < winningSquares.length; i++ ){
		document.getElementById( winningSquares[i] ).style.backgroundColor = color;
	}
}

let chooseSquare = function() 
{
	
	if( !gameOver )
	{
		setMessageBox( "Pick a square!" );
	    let id = this.getAttribute("id");
        let square = document.getElementById( id );
        //console.log( "Im getting id",square )
	    if( squareIsOpen( square ) ) 
	    {
            square.classList.add('xc');
           //
            square.innerHTML = "X";
            square.classList.add('xc');
	    	let win = checkForWinCondition( "X" );
	    	if( !win )
	    	{
	    		opponentMove();
	    		let lost = checkForWinCondition( "O" );
	    		if( !lost)
	    		{
	    			let draw = checkForDraw();
	    			if( draw )
	    			{
	    				gameOver = true;
	    				setMessageBox( "It's a draw!" );
	    			}
	    		}
	    		else
	    		{
	    			gameOver = true;
	    			//highlightWinningSquares( lost, "rgb(102, 0, 204)" );
	    			setMessageBox( "You lost!" );
	    		}
	    	}
	    	else
	    	{
	    		gameOver = true
	    		//highlightWinningSquares( win, "rgb(102, 0, 204)" );
	    		setMessageBox( "You won!" );
	    	}

	    }
	    else
	    {
	    	setMessageBox( "That square is already taken!" );
	    }
	}
};

 computerBtn1.addEventListener("click", function(e) {
   
    modal.style.display = "none"
   

    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', chooseSquare, false);
    }
    
    })
    
    


    computerBtn1.addEventListener('click',handleStartOverC);






