const boardElem = document.getElementById('board');
const messageElem = document.getElementById('message');
const restartBtn = document.getElementById('restart');

let board, currentPlayer, gameActive;

function init() {
    board = Array(9).fill('');
    currentPlayer = 'X'; // You always play as 'X'
    gameActive = true;
    messageElem.textContent = '';
    drawBoard();
}

function drawBoard() {
    boardElem.innerHTML = '';
    board.forEach((cell, idx) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.textContent = cell;
        cellDiv.addEventListener('click', () => handleCellClick(idx));
        boardElem.appendChild(cellDiv);
    });
}

function handleCellClick(idx) {
    if (!gameActive || board[idx]) return;
    board[idx] = currentPlayer;
    drawBoard();
    if (checkWin(currentPlayer)) {
        messageElem.textContent = "great play, you win !";
        gameActive = false;
        return;
    }
    if (board.every(cell => cell)) {
        messageElem.textContent = "let's play again";
        gameActive = false;
        return;
    }
    currentPlayer = 'O';
    setTimeout(computerMove, 400);
}

function computerMove() {
    if (!gameActive) return;
    // Simple AI: pick first empty spot
    let emptyIndices = board.map((cell, i) => cell === '' ? i : null).filter(i => i !== null);
    if (emptyIndices.length === 0) return;
    let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[move] = 'O';
    drawBoard();
    if (checkWin('O')) {
        messageElem.textContent = "Hehe, better luck next time";
        gameActive = false;
        return;
    }
    if (board.every(cell => cell)) {
        messageElem.textContent = "let's play again";
        gameActive = false;
        return;
    }
    currentPlayer = 'X';
}

function checkWin(player) {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diags
    ];
    return wins.some(comb => comb.every(idx => board[idx] === player));
}

restartBtn.addEventListener('click', init);

init();
