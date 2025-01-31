const cells = document.querySelectorAll(".cell");
const playerStatus = document.querySelector("#playerTurn");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
]

let cellOpts = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let gameRunning = false;

initGame();

function initGame()
{
    gameRunning = true;
    cells.forEach(cell => cell.addEventListener("click", cellClick));
    restartBtn.addEventListener("click", restartGame);
    playerStatus.textContent = `Player ${currPlayer}'s Turn`; // Fixed variable name
}

function cellClick()
{
    const cellIndex = this.getAttribute("cellid");
    if(cellOpts[cellIndex] != "" || !gameRunning) return;

    updateCell(this, cellIndex);
    checkWin();
}

function updateCell(cell, index)
{
    cellOpts[index] = currPlayer;
    cell.textContent = currPlayer;
}

function switchPlayer()
{
    if(currPlayer == "X") currPlayer = "O";
    else currPlayer = "X";
    playerStatus.textContent = `Player ${currPlayer}'s Turn`;
}

function checkWin()
{
    let roundWin = false;
    
    for(let i = 0; i < winConditions.length; i++)
    {
        const condition = winConditions[i];
        const cellA = cellOpts[condition[0]];
        const cellB = cellOpts[condition[1]];
        const cellC = cellOpts[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "") continue;

        if(cellA === cellB && cellB === cellC)
        {
            roundWin = true;
            break;
        }
    }

    if(roundWin)
    {
        playerStatus.textContent = `Player ${currPlayer} Wins!`;
        gameRunning = false;
    }
    else if(!cellOpts.includes("")) 
    {
        playerStatus.textContent = `It's a Draw!`;
        gameRunning = false;
    }
    else
    {
        switchPlayer();
    }
}

function restartGame()
{
    currPlayer = "X";
    playerStatus.textContent = `Player ${currPlayer}'s Turn`;
    cellOpts = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    gameRunning = true;
}