let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#userScore");
const compScorePara = document.querySelector("#computerScore");

let userScore = 0;
let computerScore = 0;

const playCmpChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const showWinner = (userWin, userchoiceId, compchoiceId) =>{
if(userWin){
    userScore++;
    console.log("You win");
    userScorePara.innerText = userScore;
    msg.innerText = `You win! :) Your ${userchoiceId} beats ${compchoiceId}`;
    msg.style.backgroundColor = "green";

}else{
    computerScore++;
    console.log("You Lose");
    compScorePara.innerText = computerScore;
    msg.innerText = `You lose! :( computers ${compchoiceId} beats ${userchoiceId}`;
    msg.style.backgroundColor = "Red";

}
};

const drawGame = () =>{
 msg.innerText = "Game Draw. Play Again";
};

const playGame = (userchoiceId) => {
    console.log("user choice", userchoiceId)
    let compchoiceId = playCmpChoice();
    console.log("comp choice", userchoiceId);
    if(userchoiceId === compchoiceId){
        drawGame();
     }

    else {
        let userWin = true;
        if (userchoiceId === "rock") {
          //scissors, paper
          userWin = compchoiceId === "paper" ? false : true;
        } else if (userchoiceId === "paper") {
          //rock, scissors
          userWin = compchoiceId === "scissor" ? false : true;
        } else {
          //rock, paper
          userWin = compchoiceId === "rock" ? false : true;
        }
        showWinner(userWin, userchoiceId, compchoiceId); 
    }   
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        let userchoiceId = choice.getAttribute("id");
        playGame(userchoiceId);

    });
});
