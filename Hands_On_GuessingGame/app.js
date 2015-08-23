var guessingGame = {
    computerPick:"",
    resultId:"",
    userInput:"",
    history:"",
    checkButton:"",
    replayButton:"",

    InitializeGame : function(){
        this.replayButton = document.getElementById("replay");
        this.replayButton.style.display = "none";
        this.replayButton.onclick = guessingGame.InitializeGame.bind(this);

        // perform computer related initialization
        this.GenerateRandomNumber();

        // perform user related initialization
        this.resultId = document.getElementById("result");
        this.resultId.innerHTML = "Enter a number";

        this.history = document.getElementById("history");
        this.history.innerHTML = "History <br>";

        this.checkButton = document.getElementById("check");
        this.checkButton.style.display = "inline";
        this.checkButton.onclick = guessingGame.EvaluateResult.bind(this);

        this.userInput = document.getElementById("userInput");
        this.userInput.style.display = "inline";
        this.userInput.value = "";
    },

    GenerateRandomNumber : function(){
        // generates a random number between 1 and 20
        this.computerPick = parseInt((Math.random() * 20) + 1);
    },

    AddUserNumberToHistory : function(result) {
        this.history.innerHTML = 
            this.history.innerHTML + 
            this.userInput.value + 
            " --> " + 
            result +
            "<br>";
    },

    EvaluateResult : function() {
        var userInput = parseInt(this.userInput.value);
        var result;
        if (isNaN(userInput) || (userInput > 20 || userInput < 1)){
            result = "You've an invalid number, try any number between 1 and 20!"; 
        }
        else if (this.computerPick === userInput){
            result = "You've guessed the correct number!";  
        }
        else if (this.computerPick <= userInput){
            result = "You've guessed  high!"; 
        }
        else {
            result = "You've guessed low!"; 
        }

        this.AddUserNumberToHistory(result);
        this.resultId.innerHTML = result;

        if ((guessingGame.computerPick !== userInput)) {
            guessingGame.SetButtonTimeout();
        }
        else {
            this.replayButton.style.display = "inline";
            this.checkButton.style.display = "none";
        }
    },

    SetButtonTimeout : function() {
        guessingGame.checkButton.setAttribute("disabled", "disabled");
        setTimeout(function() { 
            guessingGame.checkButton.removeAttribute("disabled");
        }, 3000);
    }
};

guessingGame.InitializeGame();