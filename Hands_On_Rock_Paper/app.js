var game = {};

game.usersChoice = null;
game.computersChoice = null;
game.wins = null;
game.losses = null;
game.ties = null;

game.setup = function () {
    game.setupChoices();
}

game.setupChoices = function() {
    var choicesDiv = document.getElementsByTagName("p");
    for (var i = 0; i< choicesDiv.length; i++)
    {
        choicesDiv[i].onclick = game.run;
    }
}

game.updateUsersChoice = function(el) {
    // 1 == Rock, 2 == scissors and 3 == paper
    var personChoice = el.getAttribute("choice");
    
    game.usersChoice = parseInt(personChoice) || 1; //default Rock
    
    game.updateChoice(game.usersChoice, "userChoice", "You");
}

game.updateChoice = function(selection, divId, user) {
    if (selection === 1)
    {
        document.getElementById(divId).innerHTML = user +" chose: Rock"; 
    }
    else if(selection === 2)
    {
        document.getElementById(divId).innerHTML = user +" chose: Scissors"; 
    }
    else 
    {
        document.getElementById(divId).innerHTML = user +" chose: Paper"; 
    }
}

game.generateComputersChoice = function() {
    // 1 == Rock, 2 == scissors and 3 == paper
    game.computersChoice = Math.floor((Math.random() * 3) + 1);
    
    game.updateChoice(game.computersChoice, "compChoice", "Computer");
}
    
game.generateScore = function() {
   if (game.usersChoice === game.computersChoice)
   {
       game.updateForTie();
   }
   else if ((game.usersChoice == 1 && game.computersChoice == 2) ||
        (game.usersChoice == 2 && game.computersChoice == 3) ||
       (game.usersChoice == 3 && game.computersChoice == 1))
   {
       game.updateForWin();
   }
    else 
    {
        game.updateForLoss();
    }
       
}

game.updateForWin = function () {
    game.wins = game.wins || 0;
    game.wins++;
    game.updateResult("Won");
    document.getElementById("wins").innerHTML = "Wins: " + game.wins;
}

game.updateForLoss = function() {
    game.losses = game.losses || 0;
    game.losses++;
    game.updateResult("Lost");
    document.getElementById("loses").innerHTML = "Loses: " + game.losses;
}

game.updateForTie = function() {
    game.ties = game.ties || 0;
    game.ties++;
    game.updateResult("Tie");
    document.getElementById("ties").innerHTML = "Ties: " + game.ties;
}

game.updateResult = function(result) {
    document.getElementById("result").innerHTML = "Result: " + result;
}

game.run = function() {
    game.updateUsersChoice(this);
    game.generateComputersChoice();
    game.generateScore();
}

game.setup();