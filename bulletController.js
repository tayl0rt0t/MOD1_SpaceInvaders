import Bullet from "./bullet.js";
export default class BulletController{
    bullets = [];
    time = 0;
    constructor(canvas){
        this.canvas = canvas;
    }

    shoot(x,y,speed,delay){
        if (this.time <= 0){
            this.bullets.push(new Bullet(x,y,speed));
            this.time = delay;
        }
        this.time--;
    }
    draw(ctx){
        this.bullets.forEach((bullet) => {
            if(this.bounds(bullet)){
              const index = this.bullets.indexOf(bullet);
              this.bullets.splice(index,1);  
            }
            bullet.draw(ctx)
        });
    }
    bounds(bullet){
        return bullet.y <= -bullet.height;
    }
}