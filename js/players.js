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
    this.firstCard = "";
    this.secondCard = "";
    this.thirdCard = "";
    this.fourthCard = "";
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
    // console.log(comparison, playerThirdCardValue);

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
}

const player1 = new Player("You");
const player2 = new Player("Left");
const player3 = new Player("Right");
const player4 = new Player("Bottom");

// WHEN START IS CLICKED -->
player2.randomChoices();
player3.randomChoices();
player4.randomChoices();

player1.firstCard = "9 Diamonds";
player1.secondCard = "9 Hearts";
player1.thirdCard = "9 Spades";
player1.fourthCard = "Clubs";
player1.firstChoice = "Black";
player1.secondChoice = "Higher";
player1.thirdChoice = "Outside";
player1.fourthChoice = "Diamonds";

player1.firstRound();
player1.secondRound();
player1.thirdRound();
player1.fourthRound();

player2.points = 150;
player3.points = 50;
player4.points = 70;

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

  // for (let i = 0; i < scores.length; i++) {
  //   endList.innerHTML += `<li>${scores[i][0]}${scores[i][1]}</li>`;
  // }

  console.log(scores);
  console.log(scores[0][0], scores[0][1]);
}
getScores();
