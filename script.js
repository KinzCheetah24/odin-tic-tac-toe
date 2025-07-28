function createPlayer(name, marker) {
    const player = {name, marker};

    const printPlayer = () => console.log("Player: " + name + " Marker: " +  marker);

    const setName = (newName) => player.name = newName;

    const getName = () => {return player.name};

    const getMarker = () => {return player.marker};

    return {printPlayer, setName, getName, getMarker};
};

const playerX = createPlayer("PlayerX", 'X');
const playerO = createPlayer("PlayerO", 'O');

const Gameboard = (function () {
    const board = ['','','','','','','','',''];

    const printBoard = () => {
        console.log("Board:");
        console.log("[" + board[0] + "] " + "[" + board[1] + "] " + "[" + board[2] + "] ");
        console.log("[" + board[3] + "] " + "[" + board[4] + "] " + "[" + board[5] + "] ");
        console.log("[" + board[6] + "] " + "[" + board[7] + "] " + "[" + board[8] + "] ");
    };

    const getBoard = () => {return board};

    const clearBoard = () => {
        for (let i = 0 ; i < board.length ; i++) {
            board[i] = '';
        }
    };

    const setSquare = (index, marker) => {
        if(board[index] === '') {
            board[index] = marker;
            return 0;
        } else {
            return -1;
        }
    };

    const isBoardFull = () => {
        let full = true;
        board.forEach(item => item === '' ? full = false : null);
        return full;
    };

    const isBoardWinner = () => {
        const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
        ];

        let winner = null;

        for (let i = 0 ; i < winningCombos.length ; i++) {
            if(board[winningCombos[i][0]] === board[winningCombos[i][1]] && board[winningCombos[i][1]] === board[winningCombos[i][2]] && (board[winningCombos[i][2]] === "X" || board[winningCombos[i][2]] === "O")) {
                winner = board[winningCombos[i][0]];
            }
        }

        return winner;
    };

    return {printBoard, getBoard, clearBoard, setSquare, isBoardFull, isBoardWinner};
})();

const GameController = (function () {
    let gameOver = false;
    let currentPlayer = playerX;

    const playRound = (index) => {
        if(!gameOver) {
            if (Gameboard.setSquare(index, currentPlayer.getMarker()) === 0) {
                DisplayDomLogic.render();
                currentPlayer = currentPlayer === playerX ? playerO : playerX; 
            }

            if (Gameboard.isBoardWinner() !== null) {
                gameOver = true;

                return "The game has ended: " + (Gameboard.isBoardWinner() === "X" ? playerX.getName() : playerO.getName()) + " wins";
            } else {
                if (Gameboard.isBoardFull()) {
                    gameOver = true;

                    return "The game has ended: TIE";
                }
            }
        }
        return null;
    };

    const resetGame = () => {
        gameOver = false;
        currentPlayer = playerX;
        Gameboard.clearBoard();
        DisplayDomLogic.render()
        DisplayDomLogic.updateStatus(null);
    };

    return {playRound, resetGame};
})();

const DisplayDomLogic = (function () {
    const playerXName = document.querySelector(".playerXName");
    const playerOName = document.querySelector(".playerOName");
    const squares = document.querySelector(".gameboard").children;
    const status = document.querySelector(".status");
    const restartBtn = document.querySelector(".restartBtn");

    const render = () => {
        const board = Gameboard.getBoard();
        for (let i = 0 ; i < squares.length ; i++) {
            squares[i].textContent = board[i];
        }
    };

    const updateStatus = (message) => {
        status.textContent = message;
    };

    for (let i = 0 ; i < squares.length ; i++) {
        squares[i].addEventListener("click", () => {
            const index = i;
            let roundResult = GameController.playRound(index);
            render();

            if(roundResult !== null) {
                updateStatus(roundResult);
            }
        });
    }

    restartBtn.addEventListener("click", () => GameController.resetGame());

    playerXName.addEventListener("input", (e) => playerX.setName(e.target.value));
    playerOName.addEventListener("input", (e) => playerO.setName(e.target.value));
    
    return {render, updateStatus};
})();