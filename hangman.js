//require inquirer
var inquirer = require('inquirer');

//require objects/exports
var Word = require('./word.js');

console.log("===================================================")
console.log("This is a hangman game with cartoon character words")
console.log("===================================================")

var playGame = {
	wordList: ['BUGS BUNNY','SPONGEBOB','BETTY BOOP','ROGER RABBIT','MICKEY MOUSE','HOMER SIMPSON','WOODY WOODPECKER','FELIX THE CAT','CHARLIE BROWN','POPEYE','FRED FLINTSTONE','SCOOBY DOO','YOGI BEAR','STEWIE GRIFFIN','WINNIE THE POOH','MIGHTY MOUSE','GEORGE JETSON','BAMBI','UNDERDOG','MAGILLA GORILLA'],
	guessesRemaining: 10,
	//empty array to hold guessed letters
	guessedLetters: [],
	currentWord: null,
	
	//asks if ready to play
	startGame: function(){
		var that = this;
		//clear guessedLetters before new game starts
		if(this.guessedLetters.length>0){
			this.guessedLetters = [];
		}

		inquirer.prompt([{
			name: "play",
			type: "confirm",
			message: "Ready to guess the Cartoon Character?"
		}]).then(function(answer){
			if(answer.play){
				that.newGame();
			} else{
				//if no then post this message
				console.log("what's the matter, you don't like cartoons??");
			}
		})
	},
	//
	newGame: function(){
		if(this.guessesRemaining ===10){
			console.log("Good Luck");
			//generate random number based on wordList
			var randomNumber = Math.floor(Math.random()*this.wordList.length);
			this.currentWord = new Word(this.wordList[randomNumber]);
			this.currentWord.pushLetters();
			//console.log("Current Word is: ", this.currentWord);
			//display current word as blank spaces
			console.log(this.currentWord.wordDisplay());
			this.chooseLetter();
		} else{
			this.resetGuesses();
			this.newGame();
		}
	},
	resetGuesses:function(){
		this.guessesRemaining = 10;
	},
	chooseLetter: function(){
		var that = this;
		//ask user to type a letter
		inquirer.prompt([{
			name: "letterChoice",
			type: "input",
			message: "Guess a letter:"
		}]).then(function(lttr){
			//convert letter to upper case since all words in WordArray are capital
			var letterReturned = (lttr.letterChoice).toUpperCase();
			//adds to guessedLetters array
			var guessedAlready = false;
				for(var i = 0; i<that.guessedLetters.length; i++){
					if(letterReturned === that.guessedLetters[i]){
						guessedAlready = true;
					}
				} 
				//if letter wasn't guessed already go through function
				if (guessedAlready === false){
					that.guessedLetters.push(letterReturned);

					var found = that.currentWord.showLetter(letterReturned);
					//if none found then incorrect
					if(found === 0 ){
						console.log("You are incorrect!");
						that.guessesRemaining--;
						that.display++;
						console.log("Guesses Remaining: " + that.guessesRemaining);
						console.log("\n-------------------");
						console.log(that.currentWord.wordDisplay());
						console.log("\n-------------------");
						console.log("Letters guessed: " + that.guessedLetters);
					} else {
						console.log("Correct!");
							//check to see if player won
							if(that.currentWord.guessedWord() === true){
								console.log(that.currentWord.wordDisplay());
								console.log("You got it right!");
							} else{
								console.log("Guesses remaining: " + that.guessesRemaining);
								console.log(that.currentWord.wordDisplay());
								console.log("\n------------------");
								console.log("Letters guessed: " + that.guessedLetters);
							}
					}
					if(that.guessesRemaining > 0 && that.currentWord.wordFound === false){
						that.chooseLetter();
					}else if(that.guessesRemaining === 0){
						console.log("Game Over");
						console.log("The cartoon character is: " + that.currentWord.word);
					}
				} else{
					console.log("You guessed that letter already")
					that.chooseLetter();
				}
		});
	}
}

playGame.startGame();
