// PLAYERS

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
}

const player1 = new Player("You");
const player2 = new Player("Left");
const player3 = new Player("Right");
const player4 = new Player("Bottom");

// DECK

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

function initDeck() {
  for (var i = 0; i < family.length; i++) {
    for (var j = 0; j < values.length; j++) {
      var cards = `${values[j]} ${family[i]}`;
      //   var card = { Value: values[j], Family: family[i] };
      deck.push(cards);
    }
  }
  return deck;
}

initDeck();

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getCard() {
  var card = deck[getRandomInt(deck.length)];
  const index = deck.indexOf(card);
  deck.splice(index, 1);
  return card;
}

player1.firstCard = getCard();
player1.secondCard = getCard();
player1.thirdCard = getCard();
player1.fourthCard = getCard();

// COMPUTER CHOICES

var firstRoundChoices = ["Red", "Black"];
var secondRoundChoices = ["Lower", "Higher"];
var thirdRoundChoices = ["Inside", "Outside"];
var fourthRoundChoices = ["Spades", "Diamonds", "Clubs", "Hearts"];

player1.firstChoice = firstRoundChoices[getRandomInt(2)];
player1.secondChoice = secondRoundChoices[getRandomInt(2)];
player1.thirdChoice = thirdRoundChoices[getRandomInt(2)];
player1.fourthChoice = fourthRoundChoices[getRandomInt(4)];

const playerOneFirstCardValue = Number(
  player1.firstCard.substr(0, player1.firstCard.indexOf(" "))
);
const playerOneSecondCardValue = Number(
  player1.secondCard.substr(0, player1.secondCard.indexOf(" "))
);
const playerOneThirdCardValue = Number(
  player1.thirdCard.substr(0, player1.thirdCard.indexOf(" "))
);

// first test

if (
  (player1.firstChoice === "Red" && player1.firstCard.includes("Hearts")) ||
  (player1.firstChoice === "Red" && player1.firstCard.includes("Diamonds"))
) {
  player1.points += 10;
} else if (
  (player1.firstChoice === "Black" && player1.firstCard.includes("Clubs")) ||
  (player1.firstChoice === "Black" && player1.firstCard.includes("Spades"))
) {
  player1.points += 10;
}

// second test

if (
  player1.secondChoice === "Lower" &&
  playerOneSecondCardValue < playerOneFirstCardValue
) {
  player1.points += 20;
} else if (
  player1.secondChoice === "Higher" &&
  playerOneSecondCardValue > playerOneFirstCardValue
) {
  player1.points += 20;
}

// third test

// extract values till the first space and sort them

var comparison = [];
comparison.push(playerOneFirstCardValue, playerOneSecondCardValue);
comparison.sort((a, b) => a - b);

if (
  player1.thirdChoice === "Inside" &&
  comparison[0] < playerOneThirdCardValue &&
  playerOneThirdCardValue < comparison[1]
) {
  player1.points += 30;
} else if (
  player1.thirdChoice === "Outside" &&
  comparison[0] > playerOneThirdCardValue &&
  playerOneThirdCardValue > comparison[1]
) {
  player1.points += 30;
}

// fourth test

if (player1.fourthCard.includes(player1.fourthChoice)) {
  player1.points += 40;
}

console.log(player1);

// function renderDeck(deck) {
//   document.getElementById("deck").innerHTML = "";

//   for (let i = 0; i < deck.length; i++) {
//     let card = document.createElement("div");
//     let value = document.createElement("div");
//     let suit = document.createElement("div");
//     card.className = "card";
//     value.className = "value";
//     suit.className = "suit " + deck[i].Suit;

//     value.innerHTML = deck[i].Value;
//     card.appendChild(value);
//     card.appendChild(suit);

//     document.getElementById("deck").appendChild(card);
//   }
// }

// renderDeck(deck1);
