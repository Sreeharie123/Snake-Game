//Access the canvas element in the javaScript
const canvas = document.querySelector('#game');
//getContext method method returns a drawing context on the canvas
const ctx = canvas.getContext("2d");

let speed = 7;// Speed of the snake movement
let tileCount = 30;//x y axis grid
let tileSize = canvas.clientWidth / tileCount-2 //size of the object
let headX = 10;// starting X position of the snake
let headY = 10;// starting Y position of the snake

let xMove=0;
let yMove=0;

// Use the game loop for continusly update the Screen (requestAnimationFrame/setTimeOut)

function drawGame() {
    clearScreen();
    drawSnake();
    setTimeout(drawGame, 1000 / speed)
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

function drawSnake() {
    ctx.fillStyle = 'green';
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize)
}


document.body.addEventListener('keydown',keyDown)

drawGame()