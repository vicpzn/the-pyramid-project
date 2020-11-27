const instructionsBtn = document.querySelector("#instructions-btn");
const instructionsWindow = document.querySelector("#instructions");
const instructionTopBar = document.querySelector("#instructions-link");
const startBtn = document.querySelector("#start-btn");
const welcomeWindow = document.querySelector("#welcome");
const goBackBtn = document.querySelector("#go-back-btn");

var audio = new Audio("./flip-sound.mp3");

const cardsBottom = document.querySelectorAll("#bottom-cards img");
const cardsLeft = document.querySelectorAll("#left-cards img");
const cardsTop = document.querySelectorAll("#top-cards img");
const cardsRight = document.querySelectorAll("#right-cards img");

var cardsColorFiles = [];

function initCardsColorFiles() {
  cardsColorFiles.push(
    "./img/cards/green_back.png",
    "./img/cards/yellow_back.png",
    "./img/cards/purple_back.png",
    "./img/cards/blue_back.png"
  );
}

initCardsColorFiles();

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
const deckCardsBusy = document.querySelector("#deck-busy > img");
const arrowSelection = document.querySelector("#arrow");

var namesForComputer = [
  "Michael",
  "Daniel",
  "Christopher",
  "David",
  "James",
  "Joshua",
  "Andrew",
  "Matthew",
  "Nicholas",
  "Robert",
  "Elizabeth",
  "Samantha",
  "Brittany",
  "Jessica",
  "Ashley",
  "Nicole",
  "Jennifer",
  "Stephanie",
  "Amanda",
  "Sarah",
];

var family = ["Spades", "Diamonds", "Clubs", "Hearts"];
var values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
];

var deck = [];

function getDeck() {
  for (var i = 0; i < family.length; i++) {
    for (var j = 0; j < values.length; j++) {
      var cards = `${values[j]} ${family[i]}`;
      deck.push(cards);
    }
  }
  return deck;
}

getDeck();

// a bit of randomization

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// get a card and remove it from the deck

function getCard() {
  var card = deck[getRandomInt(deck.length)];
  const index = deck.indexOf(card);
  deck.splice(index, 1);
  return card;
}

// different choices

var firstRoundChoices = ["Red", "Black"];
var secondRoundChoices = ["Lower", "Higher"];
var thirdRoundChoices = ["Inside", "Outside"];
var fourthRoundChoices = ["Spades", "Diamonds", "Clubs", "Hearts"];

// Players

class Player {
  constructor() {
    this.points = 0;
    this.name = "";
    this.firstChoice = "";
    this.secondChoice = "";
    this.thirdChoice = "";
    this.fourthChoice = "";
    this.firstCard = getCard();
    this.secondCard = getCard();
    this.thirdCard = getCard();
    this.fourthCard = getCard();
    this.firstRoundPoints = "";
    this.secondRoundPoints = "";
    this.thirdRoundPoints = "";
    this.fourthRoundPoints = "";
  }

  randomChoices() {
    this.firstChoice = firstRoundChoices[getRandomInt(2)];
    this.secondChoice = secondRoundChoices[getRandomInt(2)];
    this.thirdChoice = thirdRoundChoices[getRandomInt(2)];
    this.fourthChoice = fourthRoundChoices[getRandomInt(4)];
  }

  firstRound() {
    if (
      (this.firstChoice === "Red" && this.firstCard.includes("Hearts")) ||
      (this.firstChoice === "Red" && this.firstCard.includes("Diamonds"))
    ) {
      this.points += 10;
      this.firstRoundPoints = `<i class="fas fa-check" id="green-check"></i>`;
    } else if (
      (this.firstChoice === "Black" && this.firstCard.includes("Clubs")) ||
      (this.firstChoice === "Black" && this.firstCard.includes("Spades"))
    ) {
      this.points += 10;
      this.firstRoundPoints = `<i class="fas fa-check" id="green-check"></i>`;
    } else {
      this.firstRoundPoints = `<i class="fas fa-times" id="red-mark"></i>`;
    }
  }

  secondRound() {
    const playerFirstCardValue = Number(
      this.firstCard.substr(0, this.firstCard.indexOf(" "))
    );
    const playerSecondCardValue = Number(
      this.secondCard.substr(0, this.secondCard.indexOf(" "))
    );
    if (
      this.secondChoice === "Lower" &&
      playerSecondCardValue < playerFirstCardValue
    ) {
      this.points += 20;
      this.secondRoundPoints = `<i class="fas fa-check" id="green-check"></i>`;
    } else if (
      this.secondChoice === "Higher" &&
      playerSecondCardValue > playerFirstCardValue
    ) {
      this.points += 20;
      this.secondRoundPoints = `<i class="fas fa-check" id="green-check"></i>`;
    } else if (playerSecondCardValue === playerFirstCardValue) {
      this.points += 10;
      this.secondRoundPoints = `<i class="fas fa-check" id="orange-check"></i>`;
    } else {
      this.secondRoundPoints = `<i class="fas fa-times" id="red-mark"></i>`;
    }
  }

  thirdRound() {
    var comparison = [];
    const playerFirstCardValue = Number(
      this.firstCard.substr(0, this.firstCard.indexOf(" "))
    );
    const playerSecondCardValue = Number(
      this.secondCard.substr(0, this.secondCard.indexOf(" "))
    );
    const playerThirdCardValue = Number(
      this.thirdCard.substr(0, this.thirdCard.indexOf(" "))
    );
    comparison.push(playerFirstCardValue, playerSecondCardValue);
    comparison.sort((a, b) => a - b);

    function inside() {
      return (
        playerThirdCardValue > comparison[0] &&
        playerThirdCardValue < comparison[1]
      );
    }

    function outside() {
      if (playerThirdCardValue < comparison[0]) {
        return true;
      } else if (playerThirdCardValue > comparison[1]) {
        return true;
      }
    }

    if (this.thirdChoice === "Inside" && inside()) {
      this.points += 30;
      this.thirdRoundPoints = `<i class="fas fa-check" id="green-check"></i>`;
    } else if (this.thirdChoice === "Outside" && outside()) {
      this.points += 30;
      this.thirdRoundPoints = `<i class="fas fa-check" id="green-check"></i>`;
    } else if (
      playerFirstCardValue === playerThirdCardValue ||
      playerSecondCardValue === playerThirdCardValue
    ) {
      this.points += 15;
      this.thirdRoundPoints = `<i class="fas fa-check" id="orange-check"></i>`;
    } else {
      this.thirdRoundPoints = `<i class="fas fa-times" id="red-mark"></i>`;
    }
  }

  fourthRound() {
    if (this.fourthCard.includes(this.fourthChoice)) {
      this.points += 40;
      this.fourthRoundPoints = `<i class="fas fa-check" id="green-check"></i>`;
    } else {
      this.fourthRoundPoints = `<i class="fas fa-times" id="red-mark"></i>`;
    }
  }

  changeFirstCardFileName(arr, num) {
    var index = this.firstCard.indexOf(" ");
    var pictureValue = this.firstCard.substr(0, index);
    if (pictureValue.length === 2) {
      var pictureFamily = this.firstCard.substr(index, index);
    } else {
      var pictureFamily = this.firstCard.substr(index, index + 1);
    }
    var nameCardImg = `./img/cards/${pictureValue}${pictureFamily}.png`;
    nameCardImg = nameCardImg.replace(/\s/g, "");
    arr[num].src = nameCardImg;
    audio.play();
  }

  changeSecondCardFileName(arr, num) {
    var index = this.secondCard.indexOf(" ");
    var pictureValue = this.secondCard.substr(0, index);
    if (pictureValue.length === 2) {
      var pictureFamily = this.secondCard.substr(index, index);
    } else {
      var pictureFamily = this.secondCard.substr(index, index + 1);
    }
    var nameCardImg = `./img/cards/${pictureValue}${pictureFamily}.png`;
    nameCardImg = nameCardImg.replace(/\s/g, "");
    arr[num].src = nameCardImg;
    audio.play();
  }

  changeThirdCardFileName(arr, num) {
    var index = this.thirdCard.indexOf(" ");
    var pictureValue = this.thirdCard.substr(0, index);
    if (pictureValue.length === 2) {
      var pictureFamily = this.thirdCard.substr(index, index);
    } else {
      var pictureFamily = this.thirdCard.substr(index, index + 1);
    }
    var nameCardImg = `./img/cards/${pictureValue}${pictureFamily}.png`;
    nameCardImg = nameCardImg.replace(/\s/g, "");
    arr[num].src = nameCardImg;
    audio.play();
  }

  changeFourthCardFileName(arr, num) {
    var index = this.fourthCard.indexOf(" ");
    var pictureValue = this.fourthCard.substr(0, index);
    if (pictureValue.length === 2) {
      var pictureFamily = this.fourthCard.substr(index, index);
    } else {
      var pictureFamily = this.fourthCard.substr(index, index + 1);
    }
    var nameCardImg = `./img/cards/${pictureValue}${pictureFamily}.png`;
    nameCardImg = nameCardImg.replace(/\s/g, "");
    arr[num].src = nameCardImg;
    audio.play();
  }

  assignRandomName(query, player) {
    var newName = namesForComputer[getRandomInt(namesForComputer.length)];
    const index = namesForComputer.indexOf(newName);
    namesForComputer.splice(index, 1);
    this.name = newName;
    query.innerHTML = `${player.name}`;
  }

  resetPlayer() {
    this.points = 0;
    this.firstChoice = "";
    this.secondChoice = "";
    this.thirdChoice = "";
    this.fourthChoice = "";
    this.firstCard = getCard();
    this.secondCard = getCard();
    this.thirdCard = getCard();
    this.fourthCard = getCard();
    this.firstRoundPoints = 0;
    this.secondRoundPoints = 0;
    this.thirdRoundPoints = 0;
    this.fourthRoundPoints = 0;
  }
}

const player1 = new Player();
const player2 = new Player();
const player3 = new Player();
const player4 = new Player();

// Assign random cards color

function randomColorCards(cards) {
  var color = cardsColorFiles[getRandomInt(cardsColorFiles.length)];
  const index = cardsColorFiles.indexOf(color);
  cardsColorFiles.splice(index, 1);
  for (let i = 0; i < cards.length; i++) {
    cards[i].src = color;
  }
}

function assignRandomChoices() {
  player2.randomChoices();
  player3.randomChoices();
  player4.randomChoices();
}

const nameBoardOne = document.querySelector("#name-bottom");
const nameBoardTwo = document.querySelector("#name-left");
const nameBoardThree = document.querySelector("#name-top");
const nameBoardFour = document.querySelector("#name-right");

function namesBoard() {
  nameBoardOne.innerHTML = player1.name;
  nameBoardTwo.innerHTML = player2.name;
  nameBoardThree.innerHTML = player3.name;
  nameBoardFour.innerHTML = player4.name;
}

// WHEN START IS CLICKED -->
startBtn.addEventListener("click", () => {
  assignRandomChoices();
  deckCards.addEventListener("click", () => show(firstPromptWindow));
  player1.name = prompt("What is your name?");
  if (player1.name.length === 0) {
    player1.name = "You";
    nameScore1.innerHTML = "Your";
  } else {
    nameScore1.innerHTML = `${player1.name}`;
  }
  player2.assignRandomName(nameScore2, player2);
  player3.assignRandomName(nameScore3, player3);
  player4.assignRandomName(nameScore4, player4);
  randomColorCards(cardsBottom);
  randomColorCards(cardsLeft);
  randomColorCards(cardsTop);
  randomColorCards(cardsRight);
  namesBoard();
});

// FIRST PROMPT

const firstPromptWindow = document.querySelector("#first-prompt");
const redBtn = document.querySelector("#red");
const blackBtn = document.querySelector("#black");

// SECOND PROMPT

const secondPromptWindow = document.querySelector("#second-prompt");
const higherBtn = document.querySelector("#higher-card-btn");
const inferiorBtn = document.querySelector("#inferior-card-btn");

// THIRD PROMPT

const thirdPromptWindow = document.querySelector("#third-prompt");
const insideBtn = document.querySelector("#inside-card-btn");
const outsideBtn = document.querySelector("#outside-card-btn");

// FOURTH PROMPT

const fourthPromptWindow = document.querySelector("#fourth-prompt");
const spadesBtn = document.querySelector("#spades-card-btn");
const heartsBtn = document.querySelector("#hearts-card-btn");
const clubsBtn = document.querySelector("#clubs-card-btn");
const diamondsBtn = document.querySelector("#diamonds-card-btn");

// END OF GAME
const endOfGameWindow = document.querySelector("#end-of-game");
const restartBtn = document.querySelector("#restart-btn");

// SCORE INCREMENT

const nameScore1 = document.querySelector("#score > tbody > tr > td");
const nameScore2 = document.querySelector(
  "#score > tbody > tr:nth-child(2) > td"
);
const nameScore3 = document.querySelector(
  "#score > tbody > tr:nth-child(3) > td"
);
const nameScore4 = document.querySelector(
  "#score > tbody > tr:nth-child(4) > td"
);

const yourScore = document.querySelector("#score > tbody > tr > td:last-child");
const leftScore = document.querySelector(
  "#score > tbody > tr:nth-child(2) > td:last-child"
);
const topScore = document.querySelector(
  "#score > tbody > tr:nth-child(3) > td:last-child"
);
const rightScore = document.querySelector(
  "#score > tbody > tr:nth-child(4) > td:last-child"
);

const playerOneFirstRoundScore = document.querySelector(
  "#score > tbody > tr > td:nth-child(2)"
);
const playerTwoFirstRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(2) > td:nth-child(2)"
);
const playerThreeFirstRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(3) > td:nth-child(2)"
);
const playerFourFirstRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(4) > td:nth-child(2)"
);

const playerOneSecondRoundScore = document.querySelector(
  "#score > tbody > tr > td:nth-child(3)"
);
const playerTwoSecondRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(2) > td:nth-child(3)"
);
const playerThreeSecondRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(3) > td:nth-child(3)"
);
const playerFourSecondRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(4) > td:nth-child(3)"
);

const playerOneThirdRoundScore = document.querySelector(
  "#score > tbody > tr > td:nth-child(4)"
);
const playerTwoThirdRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(2) > td:nth-child(4)"
);
const playerThreeThirdRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(3) > td:nth-child(4)"
);
const playerFourThirdRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(4) > td:nth-child(4)"
);

const playerOneFourthRoundScore = document.querySelector(
  "#score > tbody > tr > td:nth-child(5)"
);
const playerTwoFourthRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(2) > td:nth-child(5)"
);
const playerThreeFourthRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(3) > td:nth-child(5)"
);
const playerFourFourthRoundScore = document.querySelector(
  "#score > tbody > tr:nth-child(4) > td:nth-child(5)"
);

// FIRST ROUND

function actionsPlayerOneFirstRound() {
  hide(firstPromptWindow);
  player1.firstRound();
  yourScore.innerHTML = player1.points;
  playerOneFirstRoundScore.innerHTML = player1.firstRoundPoints;
  player1.changeFirstCardFileName(cardsBottom, 0);
  simulationFirstRound();
  deckCards.addEventListener("click", () => show(secondPromptWindow));
  getTheValue();
}

function getTheValue() {
  const spanHigher = document.querySelector("#second-prompt > p > span");
  var index = player1.firstCard.indexOf(" ");
  var pictureValue = player1.firstCard.substr(0, index);
  if (pictureValue == 11) {
    spanHigher.innerHTML = "jack";
  } else if (pictureValue == 12) {
    spanHigher.innerHTML = "queen";
  } else if (pictureValue == 13) {
    spanHigher.innerHTML = "king";
  } else if (pictureValue == 14) {
    spanHigher.innerHTML = "ace";
  } else {
    spanHigher.innerHTML = pictureValue;
  }
}

redBtn.addEventListener("click", () => {
  player1.firstChoice = "Red";
  actionsPlayerOneFirstRound();
});

blackBtn.addEventListener("click", () => {
  player1.firstChoice = "Black";
  actionsPlayerOneFirstRound();
});

function busyState() {
  show(deckCardsBusy);
  hide(arrowSelection);
}

function yourTurn() {
  hide(deckCardsBusy);
  show(arrowSelection);
}

function simulationFirstRound() {
  busyState();
  setTimeout(() => {
    player2.firstRound();
    player2.changeFirstCardFileName(cardsLeft, 0);
    leftScore.innerHTML = player2.points;
    playerTwoFirstRoundScore.innerHTML = player2.firstRoundPoints;
  }, 1000);
  setTimeout(() => {
    player3.firstRound();
    player3.changeFirstCardFileName(cardsTop, 0);
    topScore.innerHTML = player3.points;
    playerThreeFirstRoundScore.innerHTML = player3.firstRoundPoints;
  }, 2000);
  setTimeout(() => {
    player4.firstRound();
    player4.changeFirstCardFileName(cardsRight, 0);
    rightScore.innerHTML = player4.points;
    playerFourFirstRoundScore.innerHTML = player4.firstRoundPoints;
  }, 3000);
  setTimeout(() => {
    yourTurn();
  }, 4000);
}

// SECOND ROUND

function actionsPlayerOneSecondRound() {
  hide(firstPromptWindow);
  hide(secondPromptWindow);
  player1.secondRound();
  yourScore.innerHTML = player1.points;
  playerOneSecondRoundScore.innerHTML = player1.secondRoundPoints;
  player1.changeSecondCardFileName(cardsBottom, 1);
  simulationSecondRound();
  deckCards.addEventListener("click", () => show(thirdPromptWindow));
  getTheValues();
}

function getTheValues() {
  const spanInterval = document.querySelector("#third-prompt > p > span");
  var index = player1.firstCard.indexOf(" ");
  var pictureValue = player1.firstCard.substr(0, index);
  var index2 = player1.secondCard.indexOf(" ");
  var pictureValue2 = player1.secondCard.substr(0, index2);
  if (Number(pictureValue) <= Number(pictureValue2)) {
    spanInterval.innerHTML = `${pictureValue} - ${pictureValue2}`;
  } else if (Number(pictureValue) >= Number(pictureValue2)) {
    spanInterval.innerHTML = `${pictureValue2} - ${pictureValue}`;
  }
}

higherBtn.addEventListener("click", () => {
  player1.secondChoice = "Higher";
  actionsPlayerOneSecondRound();
});

inferiorBtn.addEventListener("click", () => {
  player1.secondChoice = "Lower";
  actionsPlayerOneSecondRound();
});

function simulationSecondRound() {
  busyState();
  setTimeout(() => {
    player2.secondRound();
    player2.changeSecondCardFileName(cardsLeft, 1);
    leftScore.innerHTML = player2.points;
    playerTwoSecondRoundScore.innerHTML = player2.secondRoundPoints;
  }, 1000);
  setTimeout(() => {
    player3.secondRound();
    player3.changeSecondCardFileName(cardsTop, 1);
    topScore.innerHTML = player3.points;
    playerThreeSecondRoundScore.innerHTML = player3.secondRoundPoints;
  }, 2000);
  setTimeout(() => {
    player4.secondRound();
    player4.changeSecondCardFileName(cardsRight, 1);
    rightScore.innerHTML = player4.points;
    playerFourSecondRoundScore.innerHTML = player4.secondRoundPoints;
  }, 3000);
  setTimeout(() => {
    yourTurn();
  }, 4000);
}

// THIRD ROUND

function actionsPlayerOneThirdRound() {
  hide(firstPromptWindow);
  hide(secondPromptWindow);
  hide(thirdPromptWindow);
  player1.thirdRound();
  yourScore.innerHTML = player1.points;
  playerOneThirdRoundScore.innerHTML = player1.thirdRoundPoints;
  player1.changeThirdCardFileName(cardsBottom, 2);
  simulationThirdRound();
  deckCards.addEventListener("click", () => show(fourthPromptWindow));
}

insideBtn.addEventListener("click", () => {
  player1.thirdChoice = "Inside";
  actionsPlayerOneThirdRound();
});

outsideBtn.addEventListener("click", () => {
  player1.thirdChoice = "Outside";
  actionsPlayerOneThirdRound();
});

function simulationThirdRound() {
  busyState();
  setTimeout(() => {
    player2.thirdRound();
    player2.changeThirdCardFileName(cardsLeft, 2);
    leftScore.innerHTML = player2.points;
    playerTwoThirdRoundScore.innerHTML = player2.thirdRoundPoints;
  }, 1000);
  setTimeout(() => {
    player3.thirdRound();
    player3.changeThirdCardFileName(cardsTop, 2);
    topScore.innerHTML = player3.points;
    playerThreeThirdRoundScore.innerHTML = player3.thirdRoundPoints;
  }, 2000);
  setTimeout(() => {
    player4.thirdRound();
    player4.changeThirdCardFileName(cardsRight, 2);
    rightScore.innerHTML = player4.points;
    playerFourThirdRoundScore.innerHTML = player4.thirdRoundPoints;
  }, 3000);
  setTimeout(() => {
    yourTurn();
  }, 4000);
}

// FOURTH ROUND

function actionsPlayerOneFourthRound() {
  hide(firstPromptWindow);
  hide(secondPromptWindow);
  hide(thirdPromptWindow);
  hide(fourthPromptWindow);
  player1.fourthRound();
  yourScore.innerHTML = player1.points;
  playerOneFourthRoundScore.innerHTML = player1.fourthRoundPoints;
  player1.changeFourthCardFileName(cardsBottom, 3);
  simulationFourthRound();
}

heartsBtn.addEventListener("click", () => {
  player1.fourthChoice = "Hearts";
  actionsPlayerOneFourthRound();
});

clubsBtn.addEventListener("click", () => {
  player1.fourthChoice = "Clubs";
  actionsPlayerOneFourthRound();
});

diamondsBtn.addEventListener("click", () => {
  player1.fourthChoice = "Diamonds";
  actionsPlayerOneFourthRound();
});

spadesBtn.addEventListener("click", () => {
  player1.fourthChoice = "Spades";
  actionsPlayerOneFourthRound();
});

function simulationFourthRound() {
  busyState();
  setTimeout(() => {
    player2.fourthRound();
    player2.changeFourthCardFileName(cardsLeft, 3);
    leftScore.innerHTML = player2.points;
    playerTwoFourthRoundScore.innerHTML = player2.fourthRoundPoints;
  }, 1000);
  setTimeout(() => {
    player3.fourthRound();
    player3.changeFourthCardFileName(cardsTop, 3);
    topScore.innerHTML = player3.points;
    playerThreeFourthRoundScore.innerHTML = player3.fourthRoundPoints;
  }, 2000);
  setTimeout(() => {
    player4.fourthRound();
    player4.changeFourthCardFileName(cardsRight, 3);
    rightScore.innerHTML = player4.points;
    playerFourFourthRoundScore.innerHTML = player4.fourthRoundPoints;
  }, 3000);
  setTimeout(() => {
    show(endOfGameWindow);
    getScores();
  }, 4000);
}

// FINAL RANKING

const endList = document.querySelector("#end-list");

function getScores() {
  const players = [player1, player2, player3, player4];
  const scores = [];

  for (let i = 0; i < players.length; i++) {
    scores.push([players[i].name, players[i].points]);
  }

  scores.sort(sortScores);

  function sortScores(a, b) {
    return b[1] - a[1];
  }

  for (let i = 0; i < scores.length; i++) {
    endList.innerHTML += `<li>${scores[i][0]} ${scores[i][1]} points</li>`;
  }
}

// RESTART THE GAME

restartBtn.addEventListener("click", () => {
  hide(endOfGameWindow);
  deck = [];
  getDeck();
  player1.resetPlayer();
  yourScore.innerHTML = 0;
  player2.resetPlayer();
  leftScore.innerHTML = 0;
  player3.resetPlayer();
  topScore.innerHTML = 0;
  player4.resetPlayer();
  rightScore.innerHTML = 0;
  playerOneFirstRoundScore.innerHTML = "";
  playerOneSecondRoundScore.innerHTML = "";
  playerOneThirdRoundScore.innerHTML = "";
  playerOneFourthRoundScore.innerHTML = "";
  playerTwoFirstRoundScore.innerHTML = "";
  playerTwoSecondRoundScore.innerHTML = "";
  playerTwoThirdRoundScore.innerHTML = "";
  playerTwoFourthRoundScore.innerHTML = "";
  playerThreeFirstRoundScore.innerHTML = "";
  playerThreeSecondRoundScore.innerHTML = "";
  playerThreeThirdRoundScore.innerHTML = "";
  playerThreeFourthRoundScore.innerHTML = "";
  playerFourFirstRoundScore.innerHTML = "";
  playerFourSecondRoundScore.innerHTML = "";
  playerFourThirdRoundScore.innerHTML = "";
  playerFourFourthRoundScore.innerHTML = "";
  assignRandomChoices();
  initCardsColorFiles();
  randomColorCards(cardsBottom);
  randomColorCards(cardsLeft);
  randomColorCards(cardsTop);
  randomColorCards(cardsRight);
  yourTurn();
  deckCards.addEventListener("click", () => hide(secondPromptWindow));
  deckCards.addEventListener("click", () => hide(thirdPromptWindow));
  deckCards.addEventListener("click", () => hide(fourthPromptWindow));
  deckCards.addEventListener("click", () => show(firstPromptWindow));
  endList.innerHTML = "";
});
