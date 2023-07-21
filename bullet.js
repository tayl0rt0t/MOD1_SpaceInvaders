
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
}