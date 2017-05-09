var ClozeCard = require("./constructor/ClozeCard.js");
var cardData = require("./cloze.json");
var inquirer = require("inquirer");


start();

function start() {

  var currentCard;
  var cardArray = [];
  var initialScore = 0;
  var initialIndex = 0;
 
  for (var i = 0; i < cardData.length; i++) {
    currentCard = new ClozeCard(cardData[i].partial, cardData[i].cloze);
    cardArray.push(currentCard);
  }
 
  play(initialScore, cardArray, initialIndex);
}

function endGame(score) {

  console.log("GAME OVER!");
  console.log("YOUR SCORE IS: ", score);

  inquirer.prompt([{

    type: "input",
    name: "text",
    message: "TYPE [y] TO PLAY AGAIN or PRESS ENTER TO QUIT"

  }]).then(function(answer) {
  
    if (answer.text.charAt(0).toLowerCase() === "y") {
    
      start();
    } 
    else {
   
      console.log("PLAY AGAIN SOON!");
    }
  });
}

function play(currentScore, cardArray, currentIndex) {
 
  if (currentIndex < cardArray.length) {

    promptUser(cardArray, currentIndex, currentScore);
  }
 
  else {

    endGame(currentScore);
  }
}

function promptUser(cardArray, currentIndex, currentScore) {

  var card = cardArray[currentIndex];

  inquirer.prompt([{

    type: "input",
    name: "text",
    message: card.partial + "\nANSWER: "

  }]).then(function(answer) {

    if (answer.text.trim().toLowerCase() === card.cloze.trim().toLowerCase()) {
   
      currentScore++;
      console.log("\nCORRECT!");
    }

    else {
      
      console.log("\nINCORRECT!");
    }
   
    console.log(card.displayCard());
   
    currentIndex++;
  
    console.log("-------------------------\n");
 
    play(currentScore, cardArray, currentIndex);
  });
}