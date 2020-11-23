const startBtn = document.querySelector("#start-btn");
const welcomeWindow = document.querySelector("#welcome");
const goBackBtn = document.querySelector("#go-back-btn");
const instructionsBtn = document.querySelector("#instructions-btn");
const instructionsWindow = document.querySelector("#instructions");

startBtn.onclick = hide;
instructionsBtn.onclick = show;
goBackBtn.onclick = hideInstructions;

function hide() {
  welcomeWindow.style.visibility = "hidden";
}

function hideInstructions() {
  instructionsWindow.style.visibility = "hidden";
}

function show() {
  instructionsWindow.style.visibility = "visible";
}

// DECK CLICKABLE

const deckCards = document.querySelector("#deck");
deckCards.onclick = draw;

function draw() {
  console.log("deck click");
}
