import BulletController from "./bulletController.js";
import Alien from "./alien.js";
import AlienController from "./alienController.js";
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
let isGameOver = false;
let win = false;
const bulletController = new BulletController(canvas);


const alienController = new AlienController(canvas,bulletController);

//functs to run in drawloop
function clear(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
function gameOverScreen(){
    if(isGameOver){
        let text = win ? 'You Win!' : `Game Over!`;
        let offSet = win ? 2.5 : 3;
         
        ctx.fillStyle = 'Green';
        ctx.font = '45px Arial';
        ctx.fillText(text, canvas.width / offSet, canvas.height / 2);
    }
};
function gameOver(){
    if(isGameOver){
         return;
    }
    if(alienController.collides(player)){
        isGameOver = true;
    }
    if(alienController.enemyRows.length == 0){
        win = true;
        isGameOver = true;
    }
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
    if(key == "r"){
        window.location.reload();
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
//player Class
class Player {
    constructor(bulletController,x,y,width,height){
        this.x = playerX;
        this.y = playerY;
        this.width = playerWidth;
        this.height = playerHeight;    
        this.bulletController = bulletController;
        this.sprite = new Image();
        this.sprite.src = 'sprites/playerShip.png'
    }
    drawPlayer(){
        ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height)
        
    }
    move(){
            if(leftPressed){
               this.x = this.x - speed;
            }
            if(rightPressed){
                this.x = this.x + speed;
            }
        
        //boundaries
            
            if (this.x < this.width - 32){
                this.x = this.width - 32;
            }
            if (this.x > canvas.width -32){
                this.x = canvas.width - 32;
            }
        }
    
    shoot(){
        if(spacePressed){
            const delay = 7;
            const bulletX = this.x + this.width / 2;
            const bulletY = this.y;
            this.bulletController.shoot(bulletX,bulletY,speed * 2, delay);
        }
    }
}
const player = new Player(bulletController);

//main game loop
function draw(){
    clear();
    gameOver();
    gameOverScreen();
    if(isGameOver == false){
        player.move();
        bulletController.draw(ctx);
        player.drawPlayer();
        player.shoot();
        alienController.draw(ctx);
        console.log(isGameOver)
    }
    
}
// running drawLoop
setInterval(draw, 1000/60);
