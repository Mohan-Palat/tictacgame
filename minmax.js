/*** using minmax algorithm and recurisive function */



const canvas = document.querySelector(".game-area");
console.log("canvas", canvas);
 // X & Y position of mouse click relative to the canvas
 let X = e.clientX - canvas.getBoundingClientRect().x;
 let Y = e.clientY - canvas.getBoundingClientRect().y;

 console.log("x==>",X);
 console.log("y==>",Y);



// X & Y position of mouse click relative to the canvas
function minimax(gameData, PLAYER){

    if (isWinner(gameData,player.man)){
        return { evaluation: -10};


    }
    else if (isWinner(gameData,player.computer)){

        return {evaluation : +10};
    }

    else if (isFinite(gameData)) {
        return {evaluation :0}
    }
}

// let EMPTY =emptySpaces(gameData);

// for (let i= 0; i< EMPTY.length; i++) {

//     let id =EMPTY[i];
//     let move ={};
//     move.id =id;
//     let savedBoardSpace =gameData[id];
//     gameData[id] = PLAYER;
//     //RECURSION
//     if (PLAYER == player.computer){
//         move.evaluation=minmax(gameData,player.man).evaluation;

//     }
//     else{
//        move.evaluation=minimax(gameData,player.computer).evaluation;
//     }
      
//     gameData[id] = savedBoardSpace;
//     moves.push(move);



// }

/*********** */

// let bestMove;
// if (PLAYER == player.computer){
//     let bestEvaluation= -Infinity;
//     for (let i=0; i< moves.length;i++){
//         if (moves[i].evaluation> bestEvaluation){
//             bestEvaluation =moves[i].evaluation;
//             bestMove= moves[i];

//         }

//     }
// }
// else{
//     let bestEvaluation=+Infinity;
//     for (let i=0; i < moves.length; i++){

//         if (moves[i].evaluation< bestEvaluation){
//             bestEvaluation =moves[i].evaluation;
//             bestMove= moves[i];

//         }
//     }
//     return bestMove;
// }