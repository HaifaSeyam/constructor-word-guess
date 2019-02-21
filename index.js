var word = require("./word");
var inquirer = require("inquirer");
var colors = require("colors");
var randomWords = require("random-words");

//Random word from the random-words npm package
var randomWord = randomWords();

//An instance of Word Constructor
var wordToBeGuessed = new word(randomWord);
//Tries remaining
var triesRemaining = 10;
//Change the randomword that has been selected to an array
var lettersRemainingArr = randomWord.split('');

//Prompt question to check if the user is ready to play
function ready() {
    inquirer.prompt([{
        type: "list",
        name: "ready",
        message: "Are you ready to play?",
        choices: ["Yes ... Start", "No ... Quit"]
    }
    ]).then(function (response) {
        switch (response.ready) {
            case "Yes ... Start":
                startGame();
                break;
            case "No ... Quit":
                quitGame();
                break;
            default:
                console.log("Error");
        }
    });
};

//Start the Game function
function startGame() {
    console.log("Guess the word -- " + triesRemaining + " Tries remaining!");
    wordToBeGuessed.displayGuesses();

    //Get the user input (guess)
    inquirer.prompt([{
        type: "input",
        name: "letter",
        message: "Your Guess"
    }]).then(function (response) {
        var userGuess = response.letter.toLowerCase().trim();
        //Get the index of an object element of array
        var index = wordToBeGuessed.lettersArr.findIndex(x => x.char == userGuess);
        //If the index is not exist -- the letter not guessed (wrong guess)
        if (index == -1) {
            triesRemaining--;
            console.log(colors.red("Wrong Guess!"));
            if (triesRemaining > 0) {
                startGame();
            } else {
                lost();
            }
        } else if (index > -1) { //If the index exist -- the letter has been guessed (correct)
            console.log(colors.red("Correct!"));
            /*Update the boolean variable (guessed) -- 
            once wordToBeGuessed.displayGuesses() is called, a check will happen -- 
            if guessed = true display the char, if guessed = false display (-)*/
            wordToBeGuessed.updateGuessedLetterArr(userGuess);

            //Check this array elements, and return all the letters that are not equal to the guessed letter
            lettersRemainingArr = lettersRemainingArr.filter(function (char) { return char != userGuess });
            if (lettersRemainingArr.length > 0) {
                startGame();
            } else {
                won();
            }
        }
    })
} 

//End the Game function
function endGame() {
    inquirer.prompt([{
        type: "list",
        name: "endGame",
        message: "Do you want to play again?",
        choices: ["Yes", "No"]
    }
    ]).then(function (response) {
        switch (response.endGame) {
            case "Yes":
                //clearing the variables
                triesRemaining = 10;
                randomNum = Math.floor(Math.random() * 10);
                randomWord = randomWords();
                wordToBeGuessed = new word(randomWord);
                lettersRemainingArr = randomWord.split('');
                startGame();
                break;
            case "No":
                quitGame();
                break;
            default: break;
        }
    });
}

//End the Game function
function quitGame() {
    console.log(colors.red("SEE YOU NEXT TIME!"));
    return;
}

//If the user won the game
function won() {
    console.log("\n" + colors.green("Congratulations ... you have won! The word is " + randomWord) + "\n");
    endGame();
}

// If the user lost the game
function lost() {
    console.log("\n" + colors.yellow("Sorry ... you have lost! The word is " + randomWord) + "\n");
    endGame();
}

ready();
