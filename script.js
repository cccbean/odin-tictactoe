const players = (() => {
  const player1 = {
    "name": "",
    "marker": "X"
  }
  const player2 = {
    "name": "",
    "marker": "O"
  }
  return {player1, player2};
})();


const gameboard = (() => {
  const gameboardArr = [];
  for (let i = 0; i < 9; i++) {
    gameboardArr.push("");
  }

  const resetGameboardArr = () => {
    let tempArr = [];
    for (let i = 0; i < 9; i++) {
      tempArr.push("");
    }
    gameboard.gameboardArr = tempArr;
  }
  
  const createGameboard = () => {
    const gameboardDiv = document.querySelector(".gameboard");
    const emptyBut = document.createElement("button");

    while (gameboardDiv.lastChild) {
      gameboardDiv.removeChild(gameboardDiv.lastChild);
    }

    for (let i = 0; i < 9; i++) {
      let cloneBut = emptyBut.cloneNode();
      cloneBut.setAttribute("data-index", i);
      cloneBut.addEventListener("click", (e) => {
        let thisBut = e.target;
        let index = thisBut.dataset.index;
        let marker = game.checkTurn().marker;
        let hasWon = game.checkWin.rows() || game.checkWin.cols() || game.checkWin.diags();

        if (hasWon === false) {
          displayController.updateMarker(thisBut, marker);
          gameboard.gameboardArr[index] = marker;
          game.incrementTurn();
          displayController.updateTurn();

          let hasWon = game.checkWin.rows() || game.checkWin.cols() || game.checkWin.diags();
          if (hasWon === true) {
            let name = game.checkTurn().name === players.player1.name ? players.player2.name : players.player1.name;
            displayController.displayWinner(name);
          }
        }
      })
      gameboardDiv.appendChild(cloneBut);
    }
  }

  return {gameboardArr, createGameboard, resetGameboardArr};
})();


const displayController = (() => {
  const headerDiv = document.querySelector(".header");
  const h2 = document.querySelector(".header h2");
  const optionsDiv = document.querySelector(".options");
  const newGameBut = document.querySelector("#new-game");
  const startBut = document.querySelector("#start");
  const gameTextDiv = document.querySelector(".game-text");
  const player1Input = document.querySelector("#player1");
  const player2Input = document.querySelector("#player2");

  optionsDiv.remove();

  const updateh2 = () => {
    h2.textContent = `${players.player1.name} vs ${players.player2.name}`;
  }
  
  newGameBut.addEventListener("click", () => {
    headerDiv.appendChild(optionsDiv);
  })

  startBut.addEventListener("click", () => {
    players.player1.name = player1Input.value;
    players.player2.name = player2Input.value;
    optionsDiv.remove();
    updateh2();
    game.resetTurn();
    gameboard.resetGameboardArr();
    displayController.updateTurn();
    gameboard.createGameboard();
    player1Input.value = "";
    player2Input.value = "";
  })

  const updateTurn = () => {
    const currPlayer = game.checkTurn().name;
    gameTextDiv.textContent = `${currPlayer}'s turn:`
  }

  const updateMarker = (element, marker) => {
    element.textContent = marker;
  }

  const displayWinner = (winnerName) => {
    gameTextDiv.textContent = `${winnerName} has won!!!`
  }

  return {updateTurn, updateMarker, displayWinner};
})();

const game = (() => {
  let turn = 1;
  const incrementTurn = () => turn++;

  const resetTurn = () => turn = 1;

  const checkTurn = () => turn % 2 !== 0 ? players.player1 : players.player2;

  const checkWin = (() => {
    const rows = () => {
      const gb = gameboard.gameboardArr;
      const row1 = [gb[0], gb[1], gb[2]];
      const row2 = [gb[3], gb[4], gb[5]];
      const row3 = [gb[6], gb[7], gb[8]];
      const testSet1 = new Set(row1);
      const testSet2 = new Set(row2);
      const testSet3 = new Set(row3);
      let testArr = [];
      testArr.push(Array.from(testSet1));
      testArr.push(Array.from(testSet2));
      testArr.push(Array.from(testSet3));

      for (let i = 0; i < testArr.length; i++) {
        if (testArr[i].length === 1 && testArr[i][0] !== "") {
          return true;
        }
      }
      return false;
    };

    const cols = () => {
      const gb = gameboard.gameboardArr;
      const col1 = [gb[0], gb[3], gb[6]];
      const col2 = [gb[1], gb[4], gb[7]];
      const col3 = [gb[2], gb[5], gb[8]];
      const testSet1 = new Set(col1);
      const testSet2 = new Set(col2);
      const testSet3 = new Set(col3);
      let testArr = [];
      testArr.push(Array.from(testSet1));
      testArr.push(Array.from(testSet2));
      testArr.push(Array.from(testSet3));

      for (let i = 0; i < testArr.length; i++) {
        if (testArr[i].length === 1 && testArr[i][0] !== "") {
          return true;
        }
      }
      return false;
    };

    const diags = () => {
      const gb = gameboard.gameboardArr;
      const diag1 = [gb[0], gb[4], gb[8]];
      const diag2 = [gb[2], gb[4], gb[6]];
      const testSet1 = new Set(diag1);
      const testSet2 = new Set(diag2);
      let testArr = [];
      testArr.push(Array.from(testSet1));
      testArr.push(Array.from(testSet2));

      for (let i = 0; i < testArr.length; i++) {
        if (testArr[i].length === 1 && testArr[i][0] !== "") {
          return true;
        }
      }
      return false;
    };

    return {rows, cols, diags}
  })();

  return {incrementTurn, resetTurn, checkTurn, checkWin};
})();



