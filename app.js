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

body.addEventListener("click", gameStart);

function gameStart() {
  body.removeEventListener("keydown", gameStart);
  computerMove();
}

function computerMove() {
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
  let n = colorSequence.length;
  let curr = 0;

  colorHolder.addEventListener("click", (e) => {
    if (e.target.className === "color" && playerTurn === true && curr < n) {
      playerSequence.push(e.target.id);
      if (playerSequence[curr] != colorSequence[curr]) {
        gameEnd();
      } else {
        curr++;
      }
    }
  });
}

// ===============================================================

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
