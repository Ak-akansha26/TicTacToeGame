// let user1Turn = "O"
let currentPlayer = "X";

let buttons = ["","","","","","","","",""];
let gameStarted = false;
let gameActive = true;
let clickTimer = null;
// 

const winningConditions = [[0,1,2],[3,4,5],[6,7,8],
                           [0,3,6],[1,4,7],[2,5,8],
                           [0,4,8],[2,4,6]]; 

let h3 = document.querySelector("h3");
let start = document.querySelector(".start");
let p = document.getElementById("p1");
start.addEventListener("click",function(){
  if(gameStarted == false){
    gameStarted = true;
    gameActive = true;
    h3.innerText = "";
    console.log("Game started");
     p.innerText = "Double tap for 'O' single tap for 'X'";
  }
 
});

// function gameClick(){
//   let randidx = Math.floor(Math.random()*8);
//   let randnum = btns[randidx];
//   gameTurn.push(randnum);
 
//   // if((userTurn || gameTurn )= ans){
//   //   h3.innerText = "Yay! you won";
//   // }
// }

function handleTap(e){
    if (!gameStarted || !gameActive) return;

  let clickedButton = e.target;
  let index = Array.from(btns).indexOf(clickedButton);

  if(buttons[index] !== "") return;

  // 1. If the timer is already running, this is a DOUBLE CLICK!
  if (clickTimer) {
    clearTimeout(clickTimer); // Stop the pending single click action
    clickTimer = null;        // Reset the timer state
    buttons[index] = "O";

    clickedButton.innerText = "O";
    clickedButton.style.backgroundColor = "pink";
    console.log("Pink (O)");
     checkWin("O"); // Check if O won
  } 
  // 2. Otherwise, this is the FIRST CLICK!
  else {
    // Start a window of 300ms to see if a second click arrives
    clickTimer = setTimeout(function(){
      buttons[index] = "X";
      clickedButton.innerText = "X";
      clickedButton.style.backgroundColor = "blue";
      console.log("blue (X)");
      
      clickTimer = null; // Clear the timer state after executing
      checkWin("X");
    }, 300); 
  }
}

let btns = document.querySelectorAll(".btn");

for(let Btn of btns){
  Btn.addEventListener("click", handleTap);
  // Btn.addEventListener("dblclick", handleTap);
} 

function checkWin(player){
  let roundWon = false;

  for(let i =0; i<winningConditions.length; i++){
    const winCondition = winningConditions[i];
    let a = buttons[winCondition[0]];
    let b = buttons[winCondition[1]];
    let c = buttons[winCondition[2]];
    
    if(a === "" || b === "" || c === ""){
      continue;
    }
    if(a === b && b ===c){
      roundWon = true;
      break;
      // h3.innerText = `Yay! Player ${currentPlayer} won!`;
      // gameActive = false;
    }

  }

  if (roundWon) {
    // FIX 3: Use the dynamic 'player' variable instead of 'currentPlayer'
    h3.innerText = `Yay! Player ${player} won!`;
    gameActive = false;
    return;
  }
  
   let roundDraw = !buttons.includes("");
    if (roundDraw) {
        h3.innerText = "It's a draw!";
        gameActive = false;
        return;
    }
}


let reset = document.querySelector(".reset");
reset.addEventListener("click", function() {
  // Loop through all buttons to clear them
  for(let btn of btns) {
    btn.innerText = "";
    btn.style.backgroundColor = "green"; 
  }
 
  buttons = ["","","","","","","","",""]; 
  gameStarted = false;
  gameActive = false;
  //  if (clickTimer) {
  //   clearTimeout(clickTimer); // Clear any pending single-tap timers
  //   clickTimer = null;
  // }
  h3.innerText = ""; 
  p.innerText = "Press start to start the game";  
  console.log("Game Reset");
});

