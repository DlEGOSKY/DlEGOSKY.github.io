const gameboard = document.querySelector(".gameboard");
const icons = ['fa-apple-alt', 'fa-atom', 'fa-bell', 'fa-bolt', 'fa-bomb', 'fa-bone', 'fa-car', 'fa-cloud'];
let cards = [...icons, ...icons]; // Duplicamos para tener pares
let flippedCards = [];
let canFlip = true;

let moveCounter = 0;
let cardFlips = 0; // Nueva variable para rastrear las cartas volteadas en un turno
let timerInterval = null;
let seconds = 0;
let minutes = 0;

function startGame() {
    cardFlips = 0;  // Reiniciar cardFlips
    resetLogic();   // Resetear lógica de tarjetas volteadas

    const difficulty = document.getElementById('difficulty').value;
    const selectedIcons = icons.slice(0, difficulty/2); // Seleccionamos dependiendo de la dificultad
    cards = [...selectedIcons, ...selectedIcons];
    
    shuffle(cards);
    gameboard.innerHTML = ''; 

    for (let icon of cards) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `<i class="fas ${icon} icon"></i>`;
        cardElement.addEventListener('click', flipCard);
        gameboard.appendChild(cardElement);
    }

    moveCounter = 0;
    document.getElementById('moveCounter').innerText = moveCounter;
    
   
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    document.getElementById('timer').innerText = '00:00';
    timerInterval = setInterval(updateTimer, 1000);

    document.getElementById('timer').style.opacity = "1";
    document.getElementById('timer').style.transform = "translateY(0)";  
}


function updateTimer() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }

    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    document.getElementById('timer').innerText = `${formattedMinutes}:${formattedSeconds}`;
}

function flipCard() {
    if (!canFlip) return;
    this.classList.add('flipped');
    flippedCards.push(this);
    cardFlips++;

    if (flippedCards.length === 2) {
        canFlip = false;
        checkMatch();

       
        if (cardFlips === 2) {
        moveCounter++;
        const moveCounterElement = document.getElementById('moveCounter');
        moveCounterElement.innerText = moveCounter;
        cardFlips = 0;
            
        moveCounterElement.style.animation = 'pulse 0.5s';
            setTimeout(() => {
        moveCounterElement.style.animation = 'none';
        }, 500);

     }
  }
}

function checkMatch() {
    if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
        flippedCards.forEach(card => card.removeEventListener('click', flipCard));
        resetLogic();
    } else {
        
        flippedCards.forEach(card => card.classList.add('shake'));
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.classList.remove('shake');
            });
            resetLogic();
        }, 1000);
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function resetLogic() {
    flippedCards = [];
    canFlip = true;
}


startGame();
