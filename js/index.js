// WELCOME WINDOW & TOP BAR

const startBtn = document.querySelector("#start-btn");
const welcomeWindow = document.querySelector("#welcome");
const goBackBtn = document.querySelector("#go-back-btn");
const instructionsBtn = document.querySelector("#instructions-btn");
const instructionsWindow = document.querySelector("#instructions");
const instructionTopBar = document.querySelector("#instructions-link");

var audio = new Audio("../flip-sound.mp3");

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
  "Joshua",
  "Joseph",
  "Daniel",
  "Matthew",
  "James",
  "Alexander",
  "Thomas",
  "Michael",
  "Benjamin",
  "John",
  "Andrew",
  "David",
  "Jonathan",
  "Nicholas",
  "Aaron",
  "Jacob",
  "Samuel",
  "Adam",
  "Nathan",
  "Luke",
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
    } else if (
      (this.firstChoice === "Black" && this.firstCard.includes("Clubs")) ||
      (this.firstChoice === "Black" && this.firstCard.includes("Spades"))
    ) {
      this.points += 10;
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
    } else if (
      this.secondChoice === "Higher" &&
      playerSecondCardValue > playerFirstCardValue
    ) {
      this.points += 20;
    } else if (playerSecondCardValue === playerFirstCardValue) {
      this.points += 10;
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
    console.log(comparison);

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
    } else if (this.thirdChoice === "Outside" && outside()) {
      this.points += 30;
    } else if (
      playerFirstCardValue === playerThirdCardValue ||
      playerSecondCardValue === playerThirdCardValue
    ) {
      this.points += 15;
    }
  }

  fourthRound() {
    if (this.fourthCard.includes(this.fourthChoice)) {
      this.points += 40;
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
    query.innerHTML = `${player.name}'s`;
  }
}

const player1 = new Player();
const player2 = new Player();
const player3 = new Player();
const player4 = new Player();

// WHEN START IS CLICKED -->
startBtn.addEventListener("click", () => {
  player2.randomChoices();
  player3.randomChoices();
  player4.randomChoices();
  deckCards.addEventListener("click", () => show(firstPromptWindow));
  player1.name = prompt("What is your name?");
  if (player1.name.length === 0) {
    nameScore1.innerHTML = "Your";
  } else {
    nameScore1.innerHTML = `${player1.name}'s`;
  }
  player2.assignRandomName(nameScore2, player2);
  player3.assignRandomName(nameScore3, player3);
  player4.assignRandomName(nameScore4, player4);
});

// FIRST PROMPT

const firstPromptWindow = document.querySelector("#first-prompt");
const redBtn = document.querySelector("#red-card-btn");
const blackBtn = document.querySelector("#black-card-btn");

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

// SCORE INCREMENT

const nameScore1 = document.querySelector("#score > p > span:nth-child(1)");
const nameScore2 = document.querySelector(
  "#score > p:nth-child(2) > span:nth-child(1)"
);
const nameScore3 = document.querySelector(
  "#score > p:nth-child(3) > span:nth-child(1)"
);
const nameScore4 = document.querySelector(
  "#score > p:nth-child(4) > span:nth-child(1)"
);
const yourScore = document.querySelector("#score > p > span:nth-child(2)");
const leftScore = document.querySelector(
  "#score > p:nth-child(2) > span:nth-child(2)"
);
const topScore = document.querySelector(
  "#score > p:nth-child(3) > span:nth-child(2)"
);
const rightScore = document.querySelector(
  "#score > p:nth-child(4) > span:nth-child(2)"
);

function disableDeck() {
  deckCards.removeEventListener("click", () => draw(firstPromptWindow));
}

const cardsBottom = document.querySelectorAll("#bottom-cards img");
const cardsLeft = document.querySelectorAll("#left-cards img");
const cardsTop = document.querySelectorAll("#top-cards img");
const cardsRight = document.querySelectorAll("#right-cards img");

// FIRST ROUND

function actionsPlayerOneFirstRound() {
  hide(firstPromptWindow);
  player1.firstRound();
  yourScore.innerHTML = player1.points;
  player1.changeFirstCardFileName(cardsBottom, 0);
  simulationFirstRound();
  deckCards.addEventListener("click", () => show(secondPromptWindow));
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
  }, 1000);
  setTimeout(() => {
    player3.firstRound();
    player3.changeFirstCardFileName(cardsTop, 0);
    topScore.innerHTML = player3.points;
  }, 2000);
  setTimeout(() => {
    player4.firstRound();
    player4.changeFirstCardFileName(cardsRight, 0);
    rightScore.innerHTML = player4.points;
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
  player1.changeSecondCardFileName(cardsBottom, 1);
  simulationSecondRound();
  deckCards.addEventListener("click", () => show(thirdPromptWindow));
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
  }, 1000);
  setTimeout(() => {
    player3.secondRound();
    player3.changeSecondCardFileName(cardsTop, 1);
    topScore.innerHTML = player3.points;
  }, 2000);
  setTimeout(() => {
    player4.secondRound();
    player4.changeSecondCardFileName(cardsRight, 1);
    rightScore.innerHTML = player4.points;
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
  }, 1000);
  setTimeout(() => {
    player3.thirdRound();
    player3.changeThirdCardFileName(cardsTop, 2);
    topScore.innerHTML = player3.points;
  }, 2000);
  setTimeout(() => {
    player4.thirdRound();
    player4.changeThirdCardFileName(cardsRight, 2);
    rightScore.innerHTML = player4.points;
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
  player1.changeFourthCardFileName(cardsBottom, 3);
  simulationFourthRound();
  deckCards.addEventListener("click", () => show(endOfGameWindow));
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
  }, 1000);
  setTimeout(() => {
    player3.fourthRound();
    player3.changeFourthCardFileName(cardsTop, 3);
    topScore.innerHTML = player3.points;
  }, 2000);
  setTimeout(() => {
    player4.fourthRound();
    player4.changeFourthCardFileName(cardsRight, 3);
    rightScore.innerHTML = player4.points;
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

  console.log(scores);
}

// const cardsColorFiles = [
//   "./img/cards/green_back.png",
//   "./img/cards/yellow_back.png",
//   "./img/cards/purple_back.png",
//   "./img/cards/blue_back.png",
// ];

// function randomColorCards() {
//   var color = cardsColorFiles[getRandomInt(cardsColorFiles.length)];
//   const index = cardsColorFiles.indexOf(color);
//   cardsColorFiles.splice(index, 1);
//   return color;
// }
