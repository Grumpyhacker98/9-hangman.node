function newLetter(char){

    this.char = char
    this.bool = false

    // if the letter is a space make .bool true as its not a letter to guess
    if(this.char===" "){
        this.bool = true
    }

    // pushes letters to printArr so printArr can print the whole word partially revealed
    this.printLetter = function(){
        if(this.bool){
            printArr.push(this.char)
        }else{
            printArr.push("_")
        }
    }

    this.check = function(arg){
        if(this.char === arg){
            this.bool = true
            // return true so that the convertToWord.guess can return true so that it can print an incorrect or correct statement
            return true
        }
    }
}

function ConvertToPuzzle(word){

    // create letter constructor array
    this.word = word
    this.array = []
    wordArr = word.split("")
    for(var i=0;i<wordArr.length;i++){
        letter = new newLetter(wordArr[i])
        this.array.push(letter)
    }

    // create and print printArr of covered/uncovered letters with dividers
    this.print = function(){
        printArr = []
        for(var i=0;i<this.array.length;i++){
            this.array[i].printLetter()
        }
        newPrint = printArr.join("|")
        console.log("|"+newPrint+"|")
    }

    // looks through every letter to see if the guess is correct
    // needs to return trueGuess instead of straight true value becouse if its in the if statement it wont reveal multi char correct awnsers
    this.guess = function(arg){
        trueGuess = false
        for(var i=0;i<this.array.length;i++){
            if(this.array[i].check(arg)){
                trueGuess = true
            }
        }
        return trueGuess
    }

    // if every letter.boolien value is true retun true so hangman.js can run congrats victory code
    this.winCon = function(){
        winScore = 0
        for(var i=0;i<this.array.length;i++){
            if(this.array[i].bool){
                winScore++
            }
            
        }
        if(winScore===this.array.length){
            return true
        }
    }

}

module.exports = ConvertToPuzzle
