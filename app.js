const body = document.querySelector("body");
const levelDisplay = document.querySelector("#level");
const colA = document.querySelector("#colA");
const colB = document.querySelector("#colB");
const colC = document.querySelector("#colC");
const colD = document.querySelector("#colD");

body.addEventListener("click", gameStart);

function randomColorGen() {
  return Math.floor(Math.random() * 4 + 1);
}

function getColor() {
  let randNum = randomColorGen();
  if (randNum === 1) return "A";
  if (randNum === 2) return "B";
  if (randNum === 3) return "C";
  if (randNum === 4) return "D";
}

let playerTurn = false;
let lvl = 1;
let colorSequence = [];
let playerSequence = [];

function gameStart() {
  body.removeEventListener("keydown", gameStart);
  computerMove();
}

function selectColorDiv(color) {
  if (color === "A") return colA;
  if (color === "B") return colB;
  if (color === "C") return colC;
  if (color === "D") return colD;
}

function unGlowColor(color) {
  color.style.opacity = null;
}

function computerMove() {
  levelDisplay.textContent = `Level ${lvl}`;
  let color = selectColorDiv(getColor());
  colorSequence.push(color);
  color.style.opacity = "0.7";
  setTimeout(() => {
    unGlowColor(color);
  }, 500);
}

// function playerTurn
