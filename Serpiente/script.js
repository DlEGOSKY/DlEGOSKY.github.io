const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const canvasWidth = window.innerWidth * 0.9;  // 90% del ancho de la ventana
const canvasHeight = canvasWidth; 
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const boxSize = 20;
let gameStarted = false;  
let isPaused = false;
let score = 0;
let snake = [];
snake[0] = { x: 10 * boxSize, y: 10 * boxSize };
let food = {
    x: Math.floor(Math.random() * 20) * boxSize,
    y: Math.floor(Math.random() * 20) * boxSize
};
let d;
document.addEventListener("keydown", direction);

let countdownTimer;




document.getElementById("startBtn").addEventListener("click", function() {
    gameStarted = false;
    isPaused = false;  // detecta que el juego no esté en pausa
    document.getElementById("pauseMessage").style.display = "none";  // Esconde el mensaje de pausa
    clearInterval(game);
    document.getElementById("gameOverMessage").style.display = "none";
    startCountdown();
});

function setCanvasSize() {
    let viewportWidth = window.innerWidth;
    let canvasSize = viewportWidth < 500 ? viewportWidth - 30 : 400;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
}
setCanvasSize();

window.addEventListener('resize', setCanvasSize);




function startCountdown(isResuming) {
    let count = 3;
    document.getElementById("countdown").innerText = count;
    document.getElementById("countdown").style.display = "block";

    countdownTimer = setInterval(function() {
        count--;
        if(count > 0) {
            document.getElementById("countdown").innerText = count;
        } else if(count === 0 && !isResuming) {  
            document.getElementById("countdown").innerText = "GO!";
        } else {
            clearInterval(countdownTimer);
            document.getElementById("countdown").style.display = "none";
            if (isResuming) {
                game = setInterval(draw, 100);  
            } else {
                gameStarted = true;
                startGame();
                game = setInterval(draw, 300);
                setTimeout(function() {
                    if (!isPaused) {
                        clearInterval(game);
                        game = setInterval(draw, 100);
                    }
                }, 1500);
            }
        }
    }, isResuming ? 500 : 1000); 
}



function getRandomDirection() {
    const directions = ["LEFT", "RIGHT", "UP", "DOWN"];
    return directions[Math.floor(Math.random() * directions.length)];
}


function startGame() {
    d = getRandomDirection();  
    score = 0;
    snake = [];
    snake[0] = { x: 10 * boxSize, y: 10 * boxSize };
    
    const numCells = canvas.width / boxSize;
    food = {
        x: Math.floor(Math.random() * numCells) * boxSize,
        y: Math.floor(Math.random() * numCells) * boxSize
    };
}



function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

let touchStartX = null;
let touchStartY = null;
let touchEndX = null;
let touchEndY = null;

canvas.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}, false);

canvas.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
}, false);

function handleSwipe() {
    let diffX = touchEndX - touchStartX;
    let diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) { 
        if (diffX > 0 && d !== "LEFT") {
            d = "RIGHT";
        } else if (diffX < 0 && d !== "RIGHT") {
            d = "LEFT";
        }
    } else { 
        if (diffY > 0 && d !== "UP") {
            d = "DOWN";
        } else if (diffY < 0 && d !== "DOWN") {
            d = "UP";
        }
    }
}

canvas.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameStarted) {  
        for (let i = 0; i < snake.length; i++) {
            if (i === 0) { 
                drawSnakeHead(snake[i].x, snake[i].y, d);
            } else {
                ctx.fillStyle = "#f4f4f4";
                ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
            }
            ctx.strokeStyle = "#282c34";
            ctx.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
        }
    

    

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

}

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === "LEFT") snakeX -= boxSize;
    if (d === "UP") snakeY -= boxSize;
    if (d === "RIGHT") snakeX += boxSize;
    if (d === "DOWN") snakeY += boxSize;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        
        const numCells = canvas.width / boxSize;
        food = {
            x: Math.floor(Math.random() * numCells) * boxSize,
            y: Math.floor(Math.random() * numCells) * boxSize
        };
        
    } else {
        snake.pop();
    }
    

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }

    
if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height) {
    gameOver();
}


    snake.unshift(newHead);
}

let game = setInterval(draw, 100);


document.getElementById("pauseBtn").addEventListener("click", function() {
    if (!gameStarted || document.getElementById("gameOverMessage").style.display === "block") return;

    if (isPaused) {
        startCountdown(true);  
        document.getElementById("pauseMessage").style.display = "none";
    } else {
        clearInterval(game);
        document.getElementById("pauseMessage").style.display = "block";
    }
    isPaused = !isPaused;
});




document.getElementById("resetBtn").addEventListener("click", function() {
    gameStarted = false;
    isPaused = false;
    document.getElementById("pauseMessage").style.display = "none";
    document.getElementById("gameOverMessage").style.display = "none"; 
    clearInterval(game);
    d = null;
    score = 0;
    snake = [];
    snake[0] = { x: 10 * boxSize, y: 10 * boxSize };
    food = {
        x: Math.floor(Math.random() * 20) * boxSize,
        y: Math.floor(Math.random() * 20) * boxSize
    };
    game = setInterval(draw, 100);
 });





function gameOver() {
    gameRunning = false;
    
    
    document.getElementById("gameOverMessage").style.display = "block";

    
}

function drawSnakeHead(snakeX, snakeY, direction) {
    ctx.beginPath();
    switch (direction) {
        case "UP":
            ctx.moveTo(snakeX, snakeY + boxSize);
            ctx.lineTo(snakeX + boxSize / 2, snakeY);
            ctx.lineTo(snakeX + boxSize, snakeY + boxSize);
            break;
        case "DOWN":
            ctx.moveTo(snakeX, snakeY);
            ctx.lineTo(snakeX + boxSize / 2, snakeY + boxSize);
            ctx.lineTo(snakeX + boxSize, snakeY);
            break;
        case "LEFT":
            ctx.moveTo(snakeX + boxSize, snakeY);
            ctx.lineTo(snakeX, snakeY + boxSize / 2);
            ctx.lineTo(snakeX + boxSize, snakeY + boxSize);
            break;
        case "RIGHT":
            ctx.moveTo(snakeX, snakeY);
            ctx.lineTo(snakeX + boxSize, snakeY + boxSize / 2);
            ctx.lineTo(snakeX, snakeY + boxSize);
            break;
    }
    ctx.closePath();
    ctx.fillStyle = "#98FB98"; 
    ctx.fill();

    
    ctx.fillStyle = "#000"; 
    if(direction === "UP" || direction === "DOWN") {
        ctx.fillRect(snakeX + boxSize/4, snakeY + boxSize/4, 3, 3);
        ctx.fillRect(snakeX + 3*boxSize/4 - 3, snakeY + boxSize/4, 3, 3);
    } else {
        ctx.fillRect(snakeX + boxSize/4, snakeY + boxSize/4, 3, 3);
        ctx.fillRect(snakeX + boxSize/4, snakeY + 3*boxSize/4 - 3, 3, 3);
    }
}

