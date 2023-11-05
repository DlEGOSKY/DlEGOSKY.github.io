const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';  

cells.forEach(cell => {
    cell.addEventListener('click', handleMove);
});


function initializeGame() {
    
}

function handleMove(event) {
    const cell = event.target;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');
    
    if (checkWinner()) {
        displayMessage(currentPlayer + ' Gana!');
        displayResetButton();
    } else if ([...cells].every(cell => cell.classList.contains('taken'))) {
        displayMessage('Empate!');
        displayResetButton();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function displayWinningLine() {
    
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function displayMessage(message) {
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = message;
}

function displayResetButton() {
    const resetButton = document.getElementById('reset-button');
    resetButton.style.display = 'block';
    resetButton.addEventListener('click', resetGame);
}


function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = '';
    const resetButton = document.getElementById('reset-button');
    resetButton.style.display = 'none';
    currentPlayer = 'X';
}

initializeGame();
