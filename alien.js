import Bullet from "./bullet.js";

export default class Alien{
    constructor(x,y,width,height,canvas){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.width = width;
        this.width = 32;
        this.height = height;
        this.height = 32;
        
    }
    draw(ctx){
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    shoot(){}
    move(xSpeed, ySpeed){
        this.x += xSpeed;
        this.y += ySpeed;
    }
    collides(player){
        if(this.x + this.width > player.x &&
            this.x < player.x + player.width &&
            this.y + this.height > player.y &&
            this.y < player.y + player.height){
                return true;
            }
            else{
                return false;
            }
    }
}