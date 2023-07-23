import Alien from "./alien.js";
import moving from "./alienMovement.js";
export default class AlienController{
    enemyArr = [
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
    ];
    enemyRows = [];
    direction = moving.right;
    xSpeed = 0;
    ySpeed = 0;
    defaultXSpeed = 1;
    defaultYSpeed = 1;
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;
    constructor(canvas){
        this.canvas = canvas;
        this.createEnemies();
    }
    
    draw(ctx){
        this.decrementMoveDownTimer();
        this.updateDirection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
        //console.log(this.yTimer);
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
    createEnemies(){
        this.enemyArr.forEach((row,rowIndex)=>{
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber,enemyIndex)=>{
                if(enemyNumber){
                    this.enemyRows[rowIndex].push(new Alien(enemyIndex * 70,rowIndex * 45, enemyNumber))
                }
            });
        })
    }
}