const board = document.getElementById("board");
const statusDiv = document.getElementById("status");

let currentPlayer = "❌";
let cells = Array(9).fill(null);
let gameActive = true;

function renderBoard() {
  board.innerHTML = "";
  board.style.display = "grid";
  board.style.gridTemplateColumns = "repeat(3, 100px)";
  board.style.gap = "10px";
  board.style.margin = "20px auto";

  cells.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.style.width = "100px";
    cell.style.height = "100px";
    cell.style.fontSize = "2.5rem";
    cell.style.display = "flex";
    cell.style.alignItems = "center";
    cell.style.justifyContent = "center";
    cell.style.background = "white";
    cell.style.border = "2px solid #00796b";
    cell.style.cursor = "pointer";
    cell.textContent = value || "";
    cell.addEventListener("click", () => handleMove(index));
    board.appendChild(cell);
  });
}

function handleMove(index) {
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    statusDiv.textContent = `🎉 Ganó ${currentPlayer}!`;
    gameActive = false;
  } else if (cells.every(cell => cell)) {
    statusDiv.textContent = "🤝 ¡Empate!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
    statusDiv.textContent = `Turno de: ${currentPlayer}`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => cells[i] === currentPlayer)
  );
}

window.resetGame = function() {
  cells = Array(9).fill(null);
  currentPlayer = "❌";
  gameActive = true;
  statusDiv.textContent = `Turno de: ${currentPlayer}`;
  renderBoard();
};

renderBoard();
