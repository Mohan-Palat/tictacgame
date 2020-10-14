/****Global variables for Game */


let modal = document.querySelector(".modalDialog")
let computerBtn = document.querySelector(".button-computer ")
let humanBtn = document.querySelector(".button-human ")
const startoverdiv = document.querySelector(".subhead-b");
let computerBtn1 = document.querySelector(".button-computer-1 ")
let humanBtn1 = document.querySelector(".button-human-1")
let squareCount = 9;

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
const squares = document.querySelectorAll(".game-area-cube");
let gameOver = false;
//console.log(startoverdiv)
//player status
const playerstatus = document.querySelector(".subhead-a");
//console.log(playerstatus);
//all squares for the game
const gamesquares = document.querySelectorAll(".game-area-cube");

//game-area
const canvas = document.querySelector(".game-area");

// X & Y position of mouse click relative to the canvas


let cnum = localStorage.getItem("cw");
let hnum = localStorage.getItem("hw");
let playerx = localStorage.getItem("px");
let playero = localStorage.getItem("po");

console.log("playerx", playerx);
console.log("playero", playero);
console.log(cnum);
console.log(hnum);

let paragraph = document.querySelector("#gamestatus");
paragraph.innerHTML = `<span>Computer  won </span> <span id="head">  ${cnum}. </span><span>X won </span> <span id="head"> ${playerx} <span> <span> O won <span id="head">  ${playero}  </span>`
let resetGame = true;
let xIsNext = true; //if this is true x turn otherwise o S turn
/* event handlers section */
//game constants for players

const xSymbol = 'x';
const oSymbol = 'o';
let audio = new Audio('Winner.mp3');


/****End of Global variables for Game */


/***
 * GAME START OVER OR RESET BUTTON
 */
//startGame()


function startGame() {

    let mode = getStoredValue(cw);
    console.log('hhhhh==', mode);
    console.log(humwinner);
    resetGame = true;
    xIsNext = true;
    gameOver = false;
    modal.style.display = "none"
    for (const gamesquare of gamesquares) {
        gamesquare.classList.remove('xc');
        gamesquare.classList.remove('oc');
        gamesquare.classList.remove('x');
        gamesquare.classList.remove('o');

        for (let i = 0; i < winConditions.length; i++) {
            for (let j = 0; j < winConditions[i].length; j++) {
                document.getElementById(winConditions[i][j]).innerHTML = "";
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




let setMessageBox = function (caption) {
    let messageBox = document.querySelector(".subhead-a");
    messageBox.innerHTML = caption;
}


let findClaimedSquares = function (marker) {

    let claimedSquares = [];
    let value;
    for (let id = 0; id < squareCount; id++) {
        value = document.getElementById(id).innerHTML;
        if (value === marker) {
            claimedSquares.push(id);
        }

    }
    return claimedSquares;
}



let checkForDraw = function () {
    let draw = true;
    for (let id = 0; id < squareCount; id++) {
        if (squareIsOpen(document.getElementById(id))) {
            draw = false;
            break;
        }
    }
    return draw;
}

let checkForWinCondition = function (marker) {
    let claimedSquares = findClaimedSquares(marker);


    let win = false;
    for (let i = 0; i < winConditions.length; i++) {

        win = winConditions[i].every(element => claimedSquares.indexOf(element) > -1);

        if (win) {

            win = winConditions[i];

            break;
        }
    }
    return win;
};

let secureWin = function () {
    return makeMove("O");
}

let preventDefeat = function () {
    return makeMove("X");
}

let makeMove = function (marker) {
    let moveMade = false;
    for (let i = 0; i < winConditions.length; i++) {
        let count = 0;
        for (let j = 0; j < winConditions[i].length; j++) {
            if (marker === document.getElementById(winConditions[i][j]).innerHTML) {

                count++;
            }
        }

        if (count == 2) {
            for (j = 0; j < winConditions[i].length; j++) {
                let square = document.getElementById(winConditions[i][j])
                if (squareIsOpen(square)) {

                    square.innerHTML = "O";
                    square.classList.add('oc');
                    moveMade = true;
                    break;
                }
            }
        }

        if (moveMade) {
            break;
        }
    }
    return moveMade;
}

let opponentMove = function () {

    let moveMade = secureWin()
    if (!moveMade) {
        moveMade = preventDefeat();
        if (!moveMade) {

            let center = document.getElementById(4);
            if (squareIsOpen(center)) {  //center.classList.add('o');

                center.innerHTML = "O";
                center.classList.add('oc');
                //center.classList.add('o');
            }
            else {
                makeMoveAtFirstAvailableSquare();
            }
        }
    }
}

let makeMoveAtFirstAvailableSquare = function () {

    for (let id = 0; id < squareCount; id++) {
        square = document.getElementById(id);
        if (squareIsOpen(square)) {
            square.innerHTML = "O";
            square.classList.add('oc');
            break;
        }
    }
}

let squareIsOpen = function (square) {
    return (square.innerHTML !== "X" && square.innerHTML !== "O");
}

let highlightWinningSquares = function (winningSquares, color) {

    for (let i = 0; i < winningSquares.length; i++) {
        document.getElementById(winningSquares[i]).style.backgroundColor = color;
    }
}

let chooseSquare = function () {

    event.preventDefault();


    if (!gameOver) {
        setMessageBox("Pick a square!");
        let id = this.getAttribute("id");
        let square = document.getElementById(id);

        if (squareIsOpen(square)) {

            square.innerHTML = "X";
            square.classList.add('xc');
            let win = checkForWinCondition("X");
            if (!win) {
                opponentMove();

                let lost = checkForWinCondition("O");
                if (!lost) {
                    let draw = checkForDraw();
                    if (draw) {
                        gameOver = true;
                        setMessageBox("It's a draw!");
                    }
                }
                else {
                    cnum = Number(cnum) + 1;
                    console.log(cnum);
                    localStorage.setItem("cw", cnum);
                    let paragraph = document.querySelector("#gamestatus");
                    paragraph.innerHTML = `<span>Computer won</span> <span id="head"> ${cnum} </span>`
                    gameOver = true;
                    //highlightWinningSquares( lost, "rgb(102, 0, 204)" );
                    setMessageBox("You lost!");
                    audio.play();
                }
            }
            else {
                console.log(cnum);
                console.log(hnum);
                gameOver = true
                hnum = Number(hnum) + 1;
                let paragraph = document.querySelector("#gamestatus");
                paragraph.innerHTML = `<span>Human won <span><span id="head">  ${hnum} </span>`

                //highlightWinningSquares( win, "rgb(102, 0, 204)" );
                setMessageBox("You won!");
                audio.play();

            }

        }
        else {
            setMessageBox("That square is already taken!");
        }
    }
};

computerBtn.addEventListener("click", function (e) {
    e.preventDefault();

    modal.style.display = "none"


    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', chooseSquare, false);
    }

})

computerBtn1.addEventListener("click", function (e) {


    window.location.reload();
    e.preventDefault();
})


humanBtn1.addEventListener("click", function (e) {
    localStorage.setItem("cw", 0);
    localStorage.setItem("hw", 0);
    localStorage.setItem("px", 0);
    localStorage.setItem("po", 0);

    window.location.reload();
    e.preventDefault();
})

const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;
const winnerStatus = (letter) => {
    winner = letter;
    resetGame = false;

    if (winner === 'x') {
        audio.play();
        playerx = Number(playerx) + 1;
        localStorage.setItem("px", playerx);
        let paragraph = document.querySelector("#gamestatus");
        paragraph.innerHTML = `<span>X  won </span><span id="head"> ${playerx}<span>`
        console.log(playerx);
        playerstatus.innerHTML = `${letterToSymbol(winner)}  has won!!!!`;

    }
    else {
        audio.play();
        playero = Number(playero) + 1;

        localStorage.setItem("po", playero);
        let paragraph = document.querySelector("#gamestatus");
        paragraph.innerHTML = `<span>X  won</span> <span id="head"> ${playero}<span>`
        console.log(playerx);
        playerstatus.innerHTML = `${letterToSymbol(winner)}  has won!!!!`;

    }
}

const udateGameStatus = (e) => {

    const topLeft = gamesquares[0].classList[1];
    const topMiddle = gamesquares[1].classList[1];
    const topRight = gamesquares[2].classList[1];
    const middleLeft = gamesquares[3].classList[1];
    const middleMiddle = gamesquares[4].classList[1];
    const middleRight = gamesquares[5].classList[1];
    const bottomLeft = gamesquares[6].classList[1];
    const bottomMiddle = gamesquares[7].classList[1];
    const bottomRight = gamesquares[8].classList[1];
    //console.log(topLeft, topMiddle,topRight,middleLeft,middleMiddle,middleRight,bottomLeft,bottomMiddle,bottomRight)

    //horizontal wins
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {

        winnerStatus(topLeft);
    }
    else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {

        winnerStatus(middleLeft);
    }
    else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        winnerStatus(bottomLeft);
    }
    //vertical wins
    else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        winnerStatus(topLeft);
    }
    else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        winnerStatus(topMiddle);
    }
    else if (topRight && topRight === middleRight && topRight === bottomRight) {
        winnerStatus(topRight);
    }
    //diagonal wins
    else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        winnerStatus(topRight);
    }
    else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        winnerStatus(topLeft);

    }
    //tie condition
    else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && bottomLeft && bottomMiddle && bottomRight) {
        resetGame = false;
        playerstatus.innerHTML = "Game is tied";

    }
    else {
        xIsNext = !xIsNext;
        if (xIsNext) {
            playerstatus.innerHTML = `${xSymbol}  is next`;
        }
        else {
            playerstatus.innerHTML = `<span>${oSymbol} </span> is next`;
        }

    }


}



const handleGameCubeClick = (e) => {
    e.preventDefault();

    /* we need the classlist just to make sure the class is not added twice8*/
    const gamecubeClassList = e.target.classList;
    const location = e.target.classList[1];//gives the exact location
    console.log(gamecubeClassList);
   
    if (!resetGame) {
        return;
    }

    if ((gamecubeClassList.contains("x")) || (gamecubeClassList.contains("o"))) {
        return;
    }
    for (const gamesquare of gamesquares) {
        gamesquare.classList.remove('xc');
        gamesquare.classList.remove('oc');

        for (let i = 0; i < winConditions.length; i++) {
            for (let j = 0; j < winConditions[i].length; j++) {
                document.getElementById(winConditions[i][j]).innerHTML = "";
            }
        }
    }

    if (xIsNext) {
        e.target.classList.add('x');
        udateGameStatus();
        //console.log(xIsNext);
    }
    else {
        e.target.classList.add('o');
        udateGameStatus();

    }
};

humanBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //startGame();
    modal.style.display = "none"
    for (const gamesquare of gamesquares) {
        gamesquare.addEventListener('click', handleGameCubeClick)

    }
})






