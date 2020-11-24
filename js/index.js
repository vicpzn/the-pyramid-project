const startBtn = document.querySelector("#start-btn");
const welcomeWindow = document.querySelector("#welcome");
const goBackBtn = document.querySelector("#go-back-btn");
const instructionsBtn = document.querySelector("#instructions-btn");
const instructionsWindow = document.querySelector("#instructions");
const instructionTopBar = document.querySelector("#instructions-link");
const firstPromptWindows = document.querySelector("#first-prompt");

startBtn.onclick = hideWelcome;
instructionsBtn.onclick = showInstructions;
goBackBtn.onclick = hideInstructions;
instructionTopBar.onclick = showInstructions;

function hideWelcome() {
  welcomeWindow.style.visibility = "hidden";
}

function hideInstructions() {
  instructionsWindow.style.visibility = "hidden";
}

function showInstructions() {
  instructionsWindow.style.visibility = "visible";
}

// DECK CLICKABLE

const deckCards = document.querySelector("#deck");
deckCards.onclick = draw;

function draw() {
  firstPromptWindows.style.visibility = "visible";
}
