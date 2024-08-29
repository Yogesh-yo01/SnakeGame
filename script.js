const gameBoard=document.getElementById('gameBoard');
const context =gameBoard.getContext('2d');
const scoreTxt = document.getElementById("scoreVal")
const WIDTH =gameBoard.width;
const HEIGHT =gameBoard.height;


const UNIT=25;
let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score=0;
let active=true;
let started =false;
let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0},// SNAKE INITIAL POINT VALUE
];

window.addEventListener("keydown",keyPress)

startGame();



function startGame(){
    context.fillStyle= '#212121';
    // fillreact(xstart,ystart,widht,height)
    context.fillRect(0,0,WIDTH,HEIGHT);

    creatFood();
    displayFood();
    drawSnake();

}

function clearBoard(){
    context.fillStyle= '#212121';
    // fillreact(xstart,ystart,widht,height)
    context.fillRect(0,0,WIDTH,HEIGHT);

}

function creatFood(){
    
    foodX=Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}
function displayFood(){
    context.fillStyle='red'
    context.fillRect(foodX,foodY,UNIT,UNIT);

}
function drawSnake(){
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121';

    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT);
        
    })
}

function moveSnake(){
    const head ={x:snake[0].x+xVel,
                    y:snake[0].y+yVel}
    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){

        score +=1;
        scoreTxt.textContent=score;
        creatFood();
    }else{
        snake.pop();
    }

}

function nextTick(){
    if(active){
    setTimeout(()=>{

        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameover();
        nextTick();
        
    },300);
    }else{
        clearBoard();
        context.font = 'bold 50px serif';
        context.fillStyle = 'red';
        context.textAlign= 'center';
        context.fillText("Game Over!!!",WIDTH/2,HEIGHT/2)
        //started=false;
       // Restart();
       
    }
}

function keyPress(event){
    

    if(!started){
        started=true;
        nextTick();
    }
    
    const LEFT= 37;
    const UP =38;
    const RIGHT =39;
    const DOWN =40;

    switch(true){
        case(event.keyCode===LEFT && xVel!=UNIT):
            xVel=-UNIT;
            yVel=0;
            break;
        case(event.keyCode===RIGHT && xVel!=-UNIT):
            xVel=UNIT;
            yVel=0;
            break;
        case(event.keyCode===UP && yVel!=UNIT):
            xVel=0;
            yVel=-UNIT;
            break;
        case(event.keyCode===DOWN && yVel!=-UNIT):
            xVel=0;
            yVel =UNIT;
            break;

    }
    
}
function checkGameover(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
            active=false;
            break;
    }
}

window.addEventListener("click",Restart)

function Restart(){
        if(active==false){
                active=true;
                started=false;

                xVel = 25;
                yVel = 0;
                score=0;
                scoreTxt.textContent=score;
                active=true;
                started =false;
                snake = [
                    {x:UNIT*3,y:0},
                    {x:UNIT*2,y:0},
                    {x:UNIT,y:0},
                    {x:0,y:0},// SNAKE INITIAL POINT VALUE
                ];
        
                startGame();
                //nextTick();
        }
        

}