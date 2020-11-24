// WELCOME WINDOW & TOP BAR

const startBtn = document.querySelector("#start-btn");
const welcomeWindow = document.querySelector("#welcome");
const goBackBtn = document.querySelector("#go-back-btn");
const instructionsBtn = document.querySelector("#instructions-btn");
const instructionsWindow = document.querySelector("#instructions");
const instructionTopBar = document.querySelector("#instructions-link");

function hide(arr) {
  arr.style.visibility = "hidden";
}

function show(arr) {
  arr.style.visibility = "visible";
}

startBtn.addEventListener("click", () => hide(welcomeWindow));
goBackBtn.addEventListener("click", () => hide(instructionsWindow));
instructionsBtn.addEventListener("click", () => show(instructionsWindow));
instructionTopBar.addEventListener("click", () => show(instructionsWindow));

// DECK CLICKABLE

const deckCards = document.querySelector("#deck");
deckCards.onclick = draw;

function draw() {
  firstPromptWindow.style.visibility = "visible";
}

// FIRST PROMPT

const firstPromptWindow = document.querySelector("#first-prompt");
const redBtn = document.querySelector("#red-card-btn");
const blackBtn = document.querySelector("#black-card-btn");

function updateScore() {
  player1.score += 10;
}

function redAssign() {
  player1.firstChoice = "Red";
}

function blackAssign() {
  player1.firstChoice = "Black";
}

redBtn.addEventListener("click", () => console.log("red clicked"));
blackBtn.addEventListener("click", () => console.log("black clicked"));

// START -> ASSIGN CARDS TO THE 4 PLAYERS

// FIRST ROUND:
// player1.firstChoice = "Red" or "Black"
// flip the card, update score
// randomize left, flip the card, update score
// randomize top, flip the card, update score
// randomize bottom, flip the card, update score

// SECOND ROUND:
// player1.secondChoice = "Higher" or "Lower"
// flip the card, update score
// randomize left, flip the card, update score
// randomize top, flip the card, update score
// randomize bottom, flip the card, update score

// THIRD ROUND:
// player1.thirdChoice = "Inside" or "Outside"
// flip the card, update score
// randomize left, flip the card, update score
// randomize top, flip the card, update score
// randomize bottom, flip the card, update score

// FOURTH ROUND:
// player1.fourthChoice = "H" "S" "C" or "D"
// flip the card, update score
// randomize left, flip the card, update score
// randomize top, flip the card, update score
// randomize bottom, flip the card, update score
