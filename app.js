const body = document.querySelector("body");
const levelDisplay = document.querySelector("#level");
const gameStatus = document.querySelector("#status");
const colorHolder = document.querySelector(".container");
const colA = document.querySelector("#colA");
const colB = document.querySelector("#colB");
const colC = document.querySelector("#colC");
const colD = document.querySelector("#colD");

let playerTurn = false;
let lvl = 1;
let colorSequence = [];
let playerSequence = [];
let n = null;
let curr = null;

createStartEL();

function gameStart() {
  removeStartEL();
  computerMove();
}

colorHolder.addEventListener("click", (e) => {
  if (e.target.className === "color" && playerTurn === true && curr < n) {
    playerSequence.push(e.target.id);
    if (playerSequence[curr] != colorSequence[curr]) {
      gameRestart();
    } else if (curr === n - 1) {
      lvl++;
      computerMove();
    } else {
      curr++;
    }
  }
});

function computerMove() {
  playerTurn = false;
  playerSequence = [];
  gameStatus.textContent = "Computer is moving";
  levelDisplay.textContent = `Level ${lvl}`;
  let color = selectColorDiv(getColor());
  colorSequence.push(color.id);
  color.style.opacity = "0.7";
  setTimeout(() => {
    unGlowColor(color);
    playerMove();
  }, 500);
}

function playerMove() {
  playerTurn = true;
  gameStatus.textContent = "Your turn! Select the colors in order.";
  n = colorSequence.length;
  curr = 0;
}

function gameRestart() {
  playerTurn = false;
  lvl = 1;
  colorSequence = [];
  playerSequence = [];
  n = null;
  curr = null;
  levelDisplay.textContent = "You lost! Click anywhere to start the game";
  gameStatus.textContent = "Game not started";
}

// ===============================================================

function createStartEL() {
  body.addEventListener("click", gameStart);
}
function removeStartEL() {
  body.removeEventListener("click", gameStart);
}

function getColor() {
  let randNum = randomColorGen();
  if (randNum === 1) return "A";
  if (randNum === 2) return "B";
  if (randNum === 3) return "C";
  if (randNum === 4) return "D";
}

function unGlowColor(color) {
  color.style.opacity = null;
}

function selectColorDiv(color) {
  if (color === "A") return colA;
  if (color === "B") return colB;
  if (color === "C") return colC;
  if (color === "D") return colD;
}

function randomColorGen() {
  return Math.floor(Math.random() * 4 + 1);
}
