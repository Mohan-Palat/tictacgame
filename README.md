# tictacgame
# Description:
    A tic tac toe game with two options. You can play against a player or computer. The player who succeeds in placing three of their symbols in a horizontal, vertical, or diagonal row is the winner.


# Technology:

HTML, CSS, Javascript

# User Stories
1. As a user, I should be able to start a new tic tac toe game
2. As a user, I should be able to click on a square to add  X first  and then O, and so on
3. As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
4. As a user, I should not be able to click the same square twice
5. As a user, I should be shown a message when I win, lose or tie
6. As a user, I should not be able to continue playing once I win, lose, or tie
7. As a user, I should be able to play the game again without refreshing the page

#  Methodolgy
1. Divide and Conquer Approach
2. Created wire frame 
   UI will be like tic tac toe played in elementry school days
3. Selected a color scheme ( color.adobe.com)
   Catchy color needed 
4. Developed MVP
5. Implemented AI concept
5. MinMax algorithm and alpha beta pruning alogorithm
6. Model Dialog
7. Player score card.
8. Winner will be notified using an audio file

# WireFrame
https://docs.google.com/drawings/d/1Oyx7ZyWaybIIRFGaPvbX8s1hT3ObB8x_gMKuRhCizfk/edit?usp=sharing


# How to run the project
 1. You can play the game using the

 https://sunitha1022.github.io/tictacgame/

 2. Clone the repo and run index.html

# Code 

1. CSS

CSS Flex and CSS grid is used

2. HTML 5

3. Javascript

   * Loops and Array
   * Local Storage
   * Event Listeners
   * Modal Dialog

# how winner is selected
   1. Human vs Human

   The main div has 9 div placed using css grid. Using the querySelectorAll , selected the nine grids in an array. 
   Declared each position in the array
    const topLeft = gamesquares[0].classList[1];
    const topMiddle = gamesquares[1].classList[1];
    const topRight = gamesquares[2].classList[1];
    const middleLeft = gamesquares[3].classList[1];
    const middleMiddle = gamesquares[4].classList[1];
    const middleRight = gamesquares[5].classList[1];
    const bottomLeft = gamesquares[6].classList[1];
    const bottomMiddle = gamesquares[7].classList[1];
    const bottomRight = gamesquares[8].classList[1];

    Then checked for the whether x or o is present in that location
   
    //horizontal wins
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {

        winnerStatus(topLeft);
    }


    const winnerStatus = (letter) => {
    winner = letter;
    ----
    ---
    }
    2. AI vs Human

     A. MINMAX Alogithm
     B. WINNING STATES - TWO DIMENSIONAL ARRAY
     C. KEEP TRACK OF STATES
     D. CHECK EMPTY POSITIONS AND WINNING CONDITIONS


    

   

# TO DO

1. Compbine ai and player approch logic in one method
2. Testing in different browsers
3. Media query testing




