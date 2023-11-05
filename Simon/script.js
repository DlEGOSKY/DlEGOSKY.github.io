const tiles = document.querySelectorAll('.tile');
const scoreElement = document.getElementById('score');
let gamePattern = [];
let userPattern = [];
let score = 0;
let level = 0;
let gameStarted = false;  


tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        const tileNumber = tile.dataset.tile;
        userPattern.push(tileNumber);
        playSound(tileNumber);  // Función para el pitido
        checkPattern();
    });
});

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    score = 0;
    level = 0;  
    scoreElement.textContent = score;
    nextSequence();
}
function nextSequence() {
    userPattern = [];
    level++;
    document.getElementById('level-title').innerText = level;
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    gamePattern.push(randomNumber.toString());

    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(() => {
            const tileNumber = gamePattern[i];
            playSound(tileNumber);  // para el pitido
            animateTile(tileNumber);  // animación de iluminación
        }, i * 700);  // tiempo en milisegundos de espera entre cada tile
    }
}


function checkPattern() {
    if (!gameStarted) return;
    for (let i = 0; i < userPattern.length; i++) {
        if (userPattern[i] !== gamePattern[i]) {
            gameOver();
            return;
        }
    }
    if (userPattern.length === gamePattern.length) {
        score++;
        scoreElement.textContent = score;
        nextSequence();
    }
}

function animateTile(tileNumber) {
    const tile = document.querySelector(`.tile[data-tile="${tileNumber}"]`);
    tile.classList.add('illuminated');
    tile.style.opacity = '0.7';
    setTimeout(() => {
        tile.style.opacity = '1';
        tile.classList.remove('illuminated');
    }, 600);
}



function playSound(tileNumber) {
   
}

function gameOver() {
    gameStarted = false;
    level = 0;  
    document.getElementById('level-title').innerText = 'Nivel ' + level; 
    scoreElement.textContent = "PERDISTE";
    setTimeout(() => {
        scoreElement.textContent = "0";  
        gamePattern = [];
        startGame();
    }, 2000);
}