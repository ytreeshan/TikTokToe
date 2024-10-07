
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]             
];

let board;
let turn;
let win;
let scoreX = 0;
let scoreO = 0;

const squares = Array.from(document.querySelectorAll('.square'));
const messages = document.querySelector('h2');


document.getElementById('board').addEventListener('click', handleTurn);
document.getElementById('reset-button').addEventListener('click', init);


function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    win = null;
    render();
}

function render() {
    board.forEach((mark, idx) => {
        squares[idx].textContent = mark;
    });
    if (win === 'T') {
        messages.textContent = `It's a tie!`;
    } else if (win) {
        messages.textContent = `${win} wins!`;
        updateScore(win);
    } else {
        messages.textContent = `It's ${turn}'s turn!`;
    }
}

function handleTurn(event) {
    const idx = squares.findIndex(square => square === event.target);
    if (board[idx] || win) return;
    board[idx] = turn;
    win = getWinner();
    turn = turn === 'X' ? 'O' : 'X';
    render();
}

function getWinner() {
    let winner = null;
    winningCombos.forEach(combo => {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
        }
    });
    return winner ? winner : board.includes('') ? null : 'T';
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
    } else if (winner === 'O') {
        scoreO++;
    }
    document.getElementById('scoreX').textContent = `X: ${scoreX}`;
    document.getElementById('scoreO').textContent = `O: ${scoreO}`;
}

function setFirstTurn() {
    turn = document.getElementById('starter').value;
    render();
}

init();
