const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startGameBtn = document.getElementById('startGame');

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreElement.innerText = "Score: 0";
    placeFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(drawGame, 100);
}

function placeFood() {
    function randomFood(min, max) {
        return Math.round((Math.random() * (max - min) + min) / 20) * 20;
    }
    food.x = randomFood(0, canvas.width - 20);
    food.y = randomFood(0, canvas.height - 20);
}

function drawGame() {
    updateSnake();
    if (checkCollision()) {
        alert(`Game over. Your score was: ${score}`);
        clearInterval(gameInterval);
        return;
    }
    clearCanvas();
    drawFood();
    drawSnake();
    updateScore();
}

function clearCanvas() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 20, 20);
    });
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        placeFood();
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
}

function checkCollision() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 20;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - 20;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function updateScore() {
    scoreElement.innerText = `Score: ${score}`;
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) direction = { x: 0, y: -20 }; break;
        case 'ArrowDown': if (direction.y === 0) direction = { x: 0, y: 20 }; break;
        case 'ArrowLeft': if (direction.x === 0) direction = { x: -20, y: 0 }; break;
        case 'ArrowRight': if (direction.x === 0) direction = { x: 20, y: 0 }; break;
    }
});

startGameBtn.addEventListener('click', resetGame);

placeFood(); // Initial placement of food
