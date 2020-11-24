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
  constructor(name) {
    this.points = 0;
    this.name = name;
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

  firstGuess(arr) {
    this.firstChoice = arr;
  }
  secondGuess(arr) {
    this.secondChoice = arr;
  }
  thirdGuess(arr) {
    this.thirdChoice = arr;
  }
  fourthGuess(arr) {
    this.fourthChoice = arr;
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

    if (player1.thirdChoice === "Inside" && inside()) {
      player1.points += 30;
    } else if (player1.thirdChoice === "Outside" && !inside()) {
      player1.points += 30;
    }
  }

  fourthRound() {
    if (this.fourthCard.includes(this.fourthChoice)) {
      this.points += 40;
    }
  }
}

const player1 = new Player("You");
const player2 = new Player("Left");
const player3 = new Player("Right");
const player4 = new Player("Bottom");

// WHEN START IS CLICKED -->
player2.randomChoices();
player3.randomChoices();
player4.randomChoices();

player1.firstGuess("Red");
player1.firstRound();
player2.firstRound();
player3.firstRound();
player4.firstRound();

player1.secondGuess("Higher");
player1.secondRound();
player2.secondRound();
player3.secondRound();
player4.secondRound();

player1.thirdGuess("Inside");
player1.thirdRound();
player2.thirdRound();
player3.thirdRound();
player4.thirdRound();

player1.fourthGuess("Spades");
player1.fourthRound();
player2.fourthRound();
player3.fourthRound();
player4.fourthRound();

const players = [player1, player2, player3, player4];
const scores = [];

for (let i = 0; i < players.length; i++) {
  scores.push(players[i].name, players[i].points);
}

console.log(player1, player2, player3, player4);
console.log(scores);
