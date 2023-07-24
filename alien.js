import Bullet from "./bullet.js";

export default class Alien{
    constructor(x,y,imageNumber){
        
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.image = new Image();
        this.image.src = `sprites/a${imageNumber}.png`
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height)
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