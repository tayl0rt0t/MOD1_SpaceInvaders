import BulletController from "./bulletController.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("screen");
const ctx = canvas.getContext('2d');


//variables 
let leftPressed = false;
let rightPressed = false;
let spacePressed = false;
let speed = 5;
let playerWidth = 32;
let playerHeight = 32;
let playerX = 400;
let playerY = 568;

//functs to run in drawloop
function clear(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}



//event listeners
document.body.addEventListener('keydown',function(event){
    let key = event.key;
    if(key == "ArrowLeft"){
        leftPressed = true;
    }
    if(key == "ArrowRight"){
        rightPressed = true;
    }
})
document.body.addEventListener('keyup',function(event){
    let key = event.key;
    if(key == 'ArrowLeft'){
        leftPressed = false;
    }
    if(key == 'ArrowRight'){
        rightPressed = false;
    }
    
})
document.body.addEventListener('keydown',function(event){
    let key = event.code;
    if(key == "Space"){
        spacePressed = true;
        console.log(key)
    }
})
document.body.addEventListener('keyup',function(event){
    let key = event.code;
    if(key == 'Space'){
        spacePressed = false;
        console.log('space up');
    }
    
})
//classes
class Player {
    constructor(bulletController,lives){
        lives = this.lives;
        lives = 3;
        this.bulletController = bulletController;
        
    }
    drawPlayer(){
        ctx.fillStyle = "green";
        ctx.fillRect(playerX,playerY,playerWidth,playerHeight);
        
    }
    move(){
            if(leftPressed){
               playerX = playerX - speed;
            }
            if(rightPressed){
                playerX = playerX + speed;
            }
        
        //boundaries
            
            if (playerX < playerWidth - 32){
                playerX = playerWidth - 32;
            }
            if (playerX > canvas.width -32){
                playerX = canvas.width - 32;
            }
        }
    
    shoot(){
        if(spacePressed){
            console.log('bang');
            const delay = 7;
            const bulletX = playerX + playerWidth / 2;
            const bulletY = playerY;
            this.bulletController.shoot(bulletX,bulletY,speed * 2, delay);
        }
        
    }
    die(player){
        //if alien bullet hits player
        //if alien touches player
        lives--;
    }
    respawn(player){
        //respawn if lives >= 1
    }
    gameOver(player){
        if(lives < 0){
            console.log('Mission Failed');
        }
        //if aliens dead, win screen
    }
}
const bulletController = new BulletController(canvas);
const P1 = new Player(bulletController);

//setting up drawloop that holds functs
function draw(){
    clear();
    P1.move();
    bulletController.draw(ctx);
    P1.drawPlayer();
    P1.shoot();
}
// running drawLoop
setInterval(draw, 1000/60);
