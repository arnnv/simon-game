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
  color.style.opacity = "0.5";
  setTimeout(() => {
    unGlowColor(color);
    playerMove();
  }, 600);
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

  let start = 5;

  gameStatus.textContent = "Game not started";
  levelDisplay.textContent = `You lost! Game will refresh in ${start} seconds...`;

  let gameRefresh = setInterval(() => {
    if (start > 0) {
      start--;
      levelDisplay.textContent = `You lost! Game will refresh in ${start} seconds...`;
    }
  }, 1000);

  setTimeout(() => {
    clearInterval(gameRefresh);
    refreshGame();
    levelDisplay.textContent = "Click anywhere to start the game";
  }, 5000);
}

// ===============================================================

function refreshGame() {
  createStartEL();
}
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
