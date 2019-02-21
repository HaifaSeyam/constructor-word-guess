
function Letter(char) {
    this.char = char;
    this.guessed = false;

    this.displayGuessed = function() {
        if (this.guessed) {
            return this.char + " ";
        } else {
            return ("_ ");
        }
    };
    this.checkGuessed = function (guessedChar) {
        if (guessedChar === this.char) {
            this.guessed = true;
        } else {
            this.guessed = false;
        }
    }
}

module.exports = Letter;