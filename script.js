const player = document.getElementById("mainMan");
const gameWindow = document.getElementById("gameWindow");

let changeX = 5;
window.addEventListener("keydown", function(event){
    switch(event.key){
        case 'ArrowLeft':
            player.style.left = (parseInt(getComputedStyle(player).left) - changeX) + "px";
            console.log(event.key);
            break;
        case 'ArrowRight':
            player.style.left = (parseInt(getComputedStyle(player).left) + changeX) + "px";
            console.log(event.key);
            break;
    }
    
})


// class Player {
//     constructor(shields){
//         this.shields = shields;
//         this.shields = 100;
//     }
//     move(player){

//     }
// }