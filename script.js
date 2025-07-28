function createPlayer(marker) {
    const player = marker;

    const printPlayer = () => console.log("Player: " + player);

    const getMarker = () => {return marker};

    return {printPlayer, getMarker};
};

const playerX = createPlayer('X');
const playerO = createPlayer('O');

const Gameboard = (function () {
    const board = ['','','','','','','','',''];

    const printBoard = () => {
        console.log("Board:");
        console.log("[" + board[0] + "] " + "[" + board[1] + "] " + "[" + board[2] + "] ");
        console.log("[" + board[3] + "] " + "[" + board[4] + "] " + "[" + board[5] + "] ");
        console.log("[" + board[6] + "] " + "[" + board[7] + "] " + "[" + board[8] + "] ");
    };

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

    return {printBoard, clearBoard, setSquare, isBoardFull, isBoardWinner};
})();

const GameController = (function () {
    const startGame = () => {
        let gameDone = false;
        let playerTurn = false;

        while (!gameDone) {
            let positionValid = 0, index = -1;
            if(playerTurn) {
                index = prompt("Turn for playerO, please introduce a position(0-8): ");
                positionValid = Gameboard.setSquare(index, playerO.getMarker());

                while (positionValid === -1) {
                    index = prompt("Introduce another position: ");
                    positionValid = Gameboard.setSquare(index, playerO.getMarker());
                }
            } else {
                index = prompt("Turn for playerX, please introduce a position(0-8): ");
                positionValid = Gameboard.setSquare(index, playerX.getMarker());

                while (positionValid === -1) {
                    index = prompt("Introduce another position: ");
                    positionValid = Gameboard.setSquare(index, playerX.getMarker());
                }
            }

            Gameboard.printBoard();

            playerTurn = !playerTurn;

            if (Gameboard.isBoardWinner() !== null) {
                console.log("The game has ended: Player" + Gameboard.isBoardWinner() + " wins");
                gameDone = true;
            } else {
                if (Gameboard.isBoardFull()) {
                    console.log("The game has ended: TIE");
                    gameDone = true;
                }
            }
        }
    };

    const resetGame = () => {
        Gameboard.clearBoard();
    };

    return {startGame, resetGame};
})();

GameController.startGame();