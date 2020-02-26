const inquirer = require('inquirer');

var ConvertToPuzzle = require("./constructors.js");

// word bank
var words = ["conundrum","implication","onamonapia"]

const maxCount = 7


// (re)start game prompt
function startGame(){
    console.log("=================================")
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you wish to play a game of hangman?",
            name: "data"
        }
    ]).then(function (response) {
        // setup game
        if(response.data){
            // generate new word constructor from word array index
            word = new ConvertToPuzzle(words[Math.floor(Math.random() * 3)])
            count = maxCount
            guessArr = []
            console.log("you can type 'exit' to leave")
            console.log("=================================")
            word.print()
            console.log("=================================")
            askQuestion()
        }else{
            // exit program
            console.log("take care!")
            console.log("=================================")
            return false;
        }
    });
}

// game cycle, asks questions until counter variable is 0
function askQuestion() {

    inquirer.prompt([
        {
            type: "input",
            message: "Guess a letter >",
            name: "data"
        }
    ]).then(function (response) {
        guess = response.data.toLowerCase()
        
        // to leave at any time
        if(guess==="exit"){
            console.log("take care!")
            console.log("=================================")
            return false;
        }
        
        // reasks question if guess is longer than 1 character or non alphabet or empty
        if(guess.length>1||!/^[a-z]*$/g.test(guess)||guess===" "){
            console.log("unacceptable guess")
            console.log("=================================")
            askQuestion()
            return false;
        }

        // checks to see if letter has been guessed b4 to prevent unneccisary counter losses
        for(var i=0;i<guessArr.length;i++){
            if(guess===guessArr[i]){
                console.log("You have guessed this choice before")
                console.log("=================================")
                askQuestion()
                return false;
            }
        }

        // runs guess function if it returns true even once it will console log Correct statement
        if(word.guess(guess)){
            console.log("Correct")
        }else{
            console.log("Incorrect")
            guessArr.push(guess)
            count--;
        }

        console.log("Wrong tries: "+guessArr)
        word.print()

        // if all letter.bool values are true then it will return true and run victory
        if(word.winCon()){
            console.log("=================================")
            console.log("Congratulations! You Won!")
            console.log("The word was: "+word.word)
            startGame()
            return false;
        }

        console.log("Attempts left: "+count)
        console.log("=================================")

        // reAsk askquestion()
        if(count>0){
            askQuestion()
        }else{
            console.log("Sorry, but you lost!")
            console.log("The word was: "+word.word)
            startGame()
        }

    });
}

// nuff said
startGame()
