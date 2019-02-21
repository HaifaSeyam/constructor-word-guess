var Letter = require("./letter");

function Word(word) {
    this.lettersArr = word.split("").map(letter => {return new Letter(letter)});

    this.displayGuesses = function () {
        var guesses = "";
        for (var i = 0 ; i < this.lettersArr.length ; i++){
            guesses += this.lettersArr[i].displayGuessed();
        }

        console.log(guesses);
    };
    this.updateGuessedLetterArr = function (inputChar) {
        for (var i = 0 ; i < this.lettersArr.length ; i++) {
            this.lettersArr[i].guessedLetter(inputChar);
        }
    }
}

module.exports = Word;