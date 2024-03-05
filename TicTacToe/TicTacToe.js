let boxes = document.querySelectorAll(".box");
let restbtn = document.querySelector("#reset");
let newbtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msgContent = document.querySelector("#msg");
let stats = document.querySelector("#statistics");
let turn0 = true;
let count = 0;
let winX = 0;
let winO = 0;
let Draw = 0;

const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const displayStatistics = () => {
    document.getElementById("stats-x").innerText = `Wins for X: ${winX}`;
    document.getElementById("stats-o").innerText = `Wins for O: ${winO}`;
    document.getElementById("stats-draws").innerText = `Draws: ${Draw}`;
};
const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    restbtn.innerText = "Reset Game!";
}; 
// const resetStatistics = () => {
//     winX = 0;
//     winO = 0;
//     Draw = 0;
//     displayStatistics(); 
// };

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && isWinner != true) {
            drawGame();
        }
    });
});
const drawGame = () => {
    Draw++;
    displayStatistics();
    msgContent.innerText = "Match Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
const displayWinner = (winner) => {

    if (winner === 'X') {
        winX++;
    } else if (winner === 'O') {
        winO++;
    }
    displayStatistics(); 
    msgContent.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    restbtn.innerText = "New Game";
    disableBoxes();
};
const checkWinner = () => {
    for (let pattern of winningPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                displayWinner(pos1Val);
            }
        }
    }
};
restbtn.addEventListener("click", () => {
    resetGame();
});

