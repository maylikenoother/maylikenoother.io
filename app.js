const game = {
    xTurn: true,
    xState: [],
    oState: [],
    winningStates: [
      // Rows
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
  
      // Columns
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
  
      // Diagonal
      ["0", "4", "8"],
      ["2", "4", "6"],
    ],
  };
  
  document.addEventListener("click", (event) => {
    const target = event.target;
    const isCell = target.classList.contains("grid-cell");
    const isDisabled = target.classList.contains("disabled");
  
    if (isCell && !isDisabled) {
      // The player clicked on a cell that is still empty
      const cellValue = target.dataset.value;
      if (game.xTurn) {
        game.xState.push(cellValue);
        target.classList.add("x");
      } else {
        game.oState.push(cellValue);
        target.classList.add("o");
      }
  
      target.classList.add("disabled");
  
      game.xTurn = !game.xTurn;
  
      checkGameOver();
    }
  });
  
  function checkGameOver() {
    const emptyCells = document.querySelectorAll(".grid-cell:not(.disabled)");
    if (emptyCells.length === 0) {
      endGame("Draw!");
      return;
    }
  
    game.winningStates.forEach((winningState) => {
      const xWins = winningState.every((state) => game.xState.includes(state));
      const oWins = winningState.every((state) => game.oState.includes(state));
  
      if (xWins || oWins) {
        endGame(xWins ? "X wins!" : "O wins!");
      }
    });
  }
  
  function endGame(message) {
    document.querySelectorAll(".grid-cell").forEach((cell) => {
      cell.classList.add("disabled");
    });
  
    document.querySelector(".game-over").classList.add("visible");
    document.querySelector(".game-over-text").textContent = message;
  }
  
  document.querySelector(".restart").addEventListener("click", () => {
    document.querySelector(".game-over").classList.remove("visible");
    document.querySelectorAll(".grid-cell").forEach((cell) => {
      cell.classList.remove("disabled", "x", "o");
    });
  
    game.xTurn = true;
    game.xState = [];
    game.oState = [];
  });
  