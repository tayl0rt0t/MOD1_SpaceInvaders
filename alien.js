import Bullet from "./bullet.js";

export default class Alien{
    constructor(x,y,width,height,canvas){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.width = 32;
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
    
}