const board = document.getElementById("board");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      status.textContent = `Player ${gameState[a]} wins!`;
      gameActive = false;
      return;
    }
  }
  if (!gameState.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
  }
}

function cellClick(event) {
  const index = parseInt(event.target.dataset.index);
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  board.innerHTML = "";
  createBoard();
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", cellClick);
    board.appendChild(cell);
  }
}

restartBtn.addEventListener("click", resetGame);

createBoard();