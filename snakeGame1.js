//Access the canvas element in the javaScript
const canvas = document.querySelector('#game');
//getContext method method returns a drawing context on the canvas
const ctx = canvas.getContext("2d");

//class
class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let speed = 7;// Speed of the snake movement
let tileCount = 20;//x y axis grid
let tileSize = canvas.clientWidth / tileCount - 10 //size of the object
let headX = 15;// starting X position of the snake
let headY = 15;// starting Y position of the snake

let snakeParts = [];
let tailLength = 3;//lenght of the snake

let appleX = 5;
let appleY = 5;

let xMove = 0;
let yMove = 0;

let score = 0;

// Use the game loop for continusly update the Screen (requestAnimationFrame/setTimeOut)

function drawGame() {

    snakePosition();

   let result=gameOver();
   if(result) return;

    clearScreen();
   
    appleCollision()
    drawApple();
    drawSnake();
    gameScore();
    setTimeout(drawGame, 1000 / speed)
}

function gameScore() {
    ctx.fillStyle = "red";
    ctx.font = "25px verdana"
    ctx.fillText("Score-" + score, canvas.clientWidth - 90, 25)
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

function drawSnake() {

    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeParts.push(new snakePart(headX, headY))//add the item in the last

    while (snakeParts.length > tailLength) {
        snakeParts.shift();//remove the item in the first
    }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

}

function snakePosition() {
    headX = headX + xMove;
    headY = headY + yMove
}

// generate random apples
function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function appleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

function gameOver(){
    let Gameover=false;

    if(headX<0){
        Gameover=true;
    }
    if(headY<0){
        Gameover=true;
    }
    if(headX>29){
        Gameover=true;
    }
    if(headY>29){
        Gameover=true;
    }

    if(Gameover){
        // const heading=document.createElement('h1')
        // heading.innerHTML="GAME OVER"
        // heading.style.color="red"
        // document.body.appendChild(heading);
        ctx.fillStyle = "white";
        ctx.font = "80px verdana"
        ctx.fillText("Game Over!!!" , canvas.clientWidth-500,300);
    }

    return Gameover;
}

document.body.addEventListener('keydown', keyDown);// keybord events

function keyDown(event) {
    //keyCode 38 is Arrow Up
    if (event.keyCode == 38) {
        if (yMove == 1) return //snake move only forward
        yMove = -1;
        xMove = 0;
    }
    // keyCode 40 is Arrow down
    if (event.keyCode == 40) {
        if (yMove == -1) return
        yMove = 1;
        xMove = 0;
    }
    // keyCode 39 is Left Arrow
    if (event.keyCode == 39) {
        if (xMove == -1) return
        yMove = 0;
        xMove = 1;
    }
    //keyCode 37 is right Arrow
    if (event.keyCode == 37) {
        if (xMove == 1) return
        yMove = 0;
        xMove = -1;
    }

}

drawGame()