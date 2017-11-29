//create an object representing the current word the user is attempting to guess. 
//This should contain word specific logic and data

// require letter objects
var Letter = require('./letter.js');

function Word(wrd) {
  var that = this;
  //store the string wrd
  this.word = wrd;
  //collection of letter objects
  this.letters = [];
  this.wordFound = false;

  this.pushLetters = function() {
    //populate the collection above with new Letter objects
    for(var i = 0; i<that.word.length; i++){
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };

  //guessed the current word
  this.guessedWord = function() {
    if(this.letters.every(function(lttrs){
      return lttrs.show === true;
    })){
      this.wordFound = true;
      return true;
    }

  };

  this.showLetter = function(guessedLetter) {
    var whatToReturn = 0;
    //iterates through each letter to see if it matches the guessed letter
    this.letters.forEach(function(lttrs){
      if(lttrs.guess === guessedLetter){
        lttrs.show = true;
        whatToReturn++;
      }
    })
    //if guessLetter matches Letter property, the letter object should be shown
    return whatToReturn;
  };

  this.wordDisplay = function() {
    var display = '';
    //display the word based on if letters are found or not
    that.letters.forEach(function(lttrs){
      var currentLetter = lttrs.letterDisplay();
      display+= currentLetter;
    });

    return display;
  };
}



module.exports = Word;