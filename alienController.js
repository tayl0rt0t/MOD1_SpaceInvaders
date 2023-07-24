import Alien from "./alien.js";
import moving from "./alienMovement.js";
export default class AlienController{
    enemyArr = [
        [3,3,1,1,2,1,1,3,3,3],
        [3,1,2,2,1,2,2,1,3,3],
        [2,3,1,2,2,2,1,3,3,2],
        [3,3,3,1,2,1,3,2,2,3],
        [2,2,3,3,1,3,3,3,2,2],
    ];
    enemyRows = [];
    direction = moving.right;
    xSpeed = 0;
    ySpeed = 0;
    defaultXSpeed = 1.5;
    defaultYSpeed = 1.5;
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;
    constructor(canvas,bulletController){
        this.canvas = canvas;
        this.bulletController = bulletController;
        this.createEnemies();
    }
    
    
    draw(ctx){
        this.decrementMoveDownTimer();
        this.updateDirection();
        this.collisions();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
    }
    updateDirection(){
        for(const enemyRow of this.enemyRows){
            if(this.direction == moving.right){
                this.xSpeed = this.defaultXSpeed;
                this.ySpeed = 0;
                const lastAlien = enemyRow[enemyRow.length - 1];
                if(lastAlien.x + lastAlien.width >= this.canvas.width){
                    this.direction = moving.leftDown;
                    break;
                }
            }
            else if (this.direction === moving.leftDown){
                if(this.moveDown(moving.left)){
                    break;
                }
            }
            else if (this.direction === moving.left){
                this.xSpeed = - this.defaultXSpeed;
                this.ySpeed = 0;
                const firstAlien = enemyRow[0];
                if(firstAlien.x <= 0){
                    this.direction = moving.rightDown;
                    break;
                }
            }
            else if (this.direction = moving.rightDown){
                if(this.moveDown(moving.right)){
                    break;
                }
            }
        }
    }
    decrementMoveDownTimer(){
        if(
            this.direction === moving.leftDown ||
            this.direction === moving.rightDown
        ){
            this.moveDownTimer--;
        }
    }
    resetMoveDownTimer(){
        if(this.moveDownTimer <= 0){
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }
    moveDown(newDirection){
        this.xSpeed = 0;
        this.ySpeed = this.defaultYSpeed;
        if(this.moveDownTimer <= 0){
            this.direction = newDirection;
            return true;
        }
        return false;
    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy)=> {
            enemy.move(this.xSpeed, this.ySpeed);
            enemy.draw(ctx)
        }); 
    }
    collisions(){
      this.enemyRows.forEach(enemyRow => {
        enemyRow.forEach((enemy, enemyIndex) => {
            if(this.bulletController.collideWith(enemy)){
                enemyRow.splice(enemyIndex,1);
            };
        });
      });
      this.enemyRows = this.enemyRows.filter(enemyRow => enemyRow.length > 0)  
    }
    createEnemies(){
        this.enemyArr.forEach((row,rowIndex)=>{
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber,enemyIndex)=>{
                if(enemyNumber > 0){
                    this.enemyRows[rowIndex].push(new Alien(enemyIndex * 70,rowIndex * 45, enemyNumber))
                }
            });
        })
    }
    collides(player){
        return this.enemyRows.flat().some(enemy => enemy.collides(player))
    }
    
}