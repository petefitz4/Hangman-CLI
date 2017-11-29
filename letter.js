//Used for each letter in the current word. 
//Each letter object should either display an underlying character, or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. 
//this should contain letter specific logic and data

// `letter.js` should control whether or not a letter shows as a "_" or as itself on-screen.


var Letter = function(lttr){
	// property to store the actual letter
	this.guess = lttr;
	// boolean if the letter can be shown
	this.show = false;
	  
	this.letterDisplay = function() {
	    if(this.guess == ' '){
	      //makes sure that when the function checks if the word is found doesn't read the blank as false.
	      this.show = true;
	      return '  ';
	    }if(this.show === false){
	      return ' _ ';
	    } else{ 
	      return this.guess;
	    }
  	};
};

//export the constructor
module.exports = Letter;


