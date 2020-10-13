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

//game-area
const canvas = document.querySelector(".game-area");

// X & Y position of mouse click relative to the canvas

let compwinner=0;
let humwinner=0;
console.log(compwinner);
console.log(humwinner);

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
//startGame()
function startGame() {

    var mode = getStoredValue(cw);
    console.log('hhhhh==',mode);
    console.log(humwinner);
    resetGame= true;
    xIsNext =true;
    gameOver =false;
    modal.style.display = "none"
    for (const gamesquare of gamesquares){
       gamesquare.classList.remove('xc');
       gamesquare.classList.remove('oc');
       gamesquare.classList.remove('x');
       gamesquare.classList.remove('o');
     
         for( let i = 0; i < winConditions.length; i++ ){     
           for( let j = 0; j < winConditions[i].length; j++ ){
            document.getElementById( winConditions[i][j] ).innerHTML ="";
          }
    }
} 
//gameOver = true;

}

function getStoredValue(key) {
    if (localStorage) {
        return localStorage.getItem(key);
    } else {
        return $.cookies.get(key);
    }
}




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
  
    event.preventDefault();


	if( !gameOver )
	{
		setMessageBox( "Pick a square!" );
	    let id = this.getAttribute("id");
        let square = document.getElementById( id );
       
	    if( squareIsOpen( square ) ) 
	    {
           
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
                    
                    console.log(compwinner);
                    console.log(humwinner);
                    compwinner =compwinner+1;
                    console.log(compwinner);
                    
                    localStorage.setItem("cw", compwinner);
                    localStorage.setItem("hw", humwinner);
                    gameOver = true;
	    			//highlightWinningSquares( lost, "rgb(102, 0, 204)" );
	    			setMessageBox( "You lost!" );
	    		}
	    	}
	    	else
	    	{
                console.log(compwinner);
                console.log(humwinner);
                gameOver = true
                humwinner =humwinner+1;
                console.log(humwinner);
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

computerBtn.addEventListener("click", function(e) {
    e.preventDefault();
  
    modal.style.display = "none"

    var mode = getStoredValue("cw");
    console.log('hhhhh==',mode);
    console.log(humwinner);
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', chooseSquare, false);
    }
    
    })
    
 computerBtn1.addEventListener("click", function(e) {
       
    console.log(compwinner);
    console.log(humwinner);
         window.location.reload();
         e.preventDefault();
        })
        

    //computerBtn1.addEventListener('click',handleStartOverC);






