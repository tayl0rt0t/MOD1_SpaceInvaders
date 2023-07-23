
export default class Bullet{
    constructor(x,y,speed){
        this.x=x;
        this.y=y;
        this.speed = speed;

        this.width = 5;
        this.height = 15;
        this.color = 'blue';
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        this.y -= this.speed;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    collideWith(alien){
        if(this.x + this.width > alien.x &&
            this.x < alien.x + alien.width &&
            this.y + this.height > alien.y &&
            this.y < alien.y + alien.height){
                return true;
            }
            else{
                return false;
            }
    }
}