
var BasicCard = require("./constructor/basicCard.js");
var cardData = require("./basic.json");
var inquirer = require("inquirer");


startGame();

function startGame() {

  var currentCard;
  var cardArray = [];
  var initialScore = 0;
  var initialIndex = 0;
  
  for (var i = 0; i < cardData.length; i++) {
    currentCard = new BasicCard(cardData[i].front, cardData[i].back);
    cardArray.push(currentCard);
  }

  playRound(initialScore, cardArray, initialIndex);
}

function endGame(score) {

  console.log("GAME OVER!");
  console.log("Your score is: ", score);
  inquirer.prompt([{

    type: "input",
    name: "text",
    message: "TYPE [y] TO PLAY AGAIN or PRESS ENTER TO QUIT"

  }]).then(function(answer) {

    if (answer.text.charAt(0).toLowerCase() === "y") {
  
      startGame();
    } 
    else {
    
      console.log("PLAY AGAIN SOON!");
    }
  });
}

function playRound(currentScore, cardArray, currentIndex) {

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
    message: card.front + "\nANSWER: "

  }]).then(function(answer) {

    if (answer.text.trim().toLowerCase() === card.back.trim().toLowerCase()) {
   
      currentScore++;
      console.log("CORRECT!");
    } 
    else {

      console.log("INCORRECT! YOU SHOULD HAVE SAID '" + card.back + "'.");
    }

    currentIndex++;

    console.log("-------------------------");

    playRound(currentScore, cardArray, currentIndex);
  });
}