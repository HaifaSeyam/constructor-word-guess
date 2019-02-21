var Letter = require("./letter");

function Word(word) {
    this.lettersArr = word.split("").map(letter => {return new Letter(letter)});
    console.log(this.lettersArr);

    this.displayGuesses = function () {
        var guesses = "";
        this.lettersArr.forEach(function(letter) {
            guesses += letter.displayGuessed() + " ";
        });
        
        console.log(guesses);
    }

    this.updateGuessedLetterArr = function(inputChar){
        this.lettersArr.forEach(function(letter){
            if(letter.guessed === false && letter.checkGuessed(inputChar) === true){
                letter.guessed = true;
            }
        });
}

}

module.exports = Word;