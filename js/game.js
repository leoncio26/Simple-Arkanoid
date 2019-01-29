let btnStart = document.querySelector("#btnStart");
let btnRetry = document.querySelector("#btnRetry");
let c = document.querySelector('#myCanvas');
let ctx = c.getContext('2d');
let balls;
let bricks;
let ball;
let paddle;
let isLoop;
let isStart = false;
let isCompleted;

showHideButton(btnRetry, 0);

function startGame()
{
    //Inicializando as variáveis
    balls = 3;
    bricks = [];
    ball = new Ball(ctx, ctx.canvas.width * 0.5, ctx.canvas.height - 50, 4, 'white');
    paddle = new Paddle(ctx, ctx.canvas.width * 0.5 - 35, ctx.canvas.height - 40, 70, 10, 'white');
    isLoop = true;
    isCompleted = false;

    // oculta os botões start e retry
    showHideButton(btnStart, 0);
    showHideButton(btnRetry, 0);

    createLevel(1, 1);
    
    if(!isStart){
        loop();// inicia o game loop
        isStart = true;
    }
}

function retryGame() 
{
    showHideButton(btnRetry, 1);
    isLoop = false;
}

function showHideButton(btn, flag)
{
    if(flag == 1){
        btn.style.display = 'block';
    }else{
        btn.style.display = 'none';
    }
}

function createLevel(rows, columns) 
{
    let width = 40;
    let height = 15; 
    let x = 30, y = 40;

    for(let i = 0; i < rows; i++)
    {
        for(let j = 0; j < columns; j++)
        {
            let brick = new Brick(ctx, x + j * (width + 4), y + i * (height + 4), width,
                                  height, 'white');
            bricks.push(brick);
        }
    }
}

function update() 
{
    if(bricks.length === 0)
        isCompleted = true;

    ball.update();

    if(isCollision(ball, paddle))
    {
        let d = ball.x - (paddle.x + paddle.width * 0.5);
        
        ball.vy *= -1;
        ball.vx *= d/Math.abs(d);
    }

    for(let i in bricks){
        if(isCollision(ball, bricks[i])){
            ball.vy *= -1;
            bricks.splice(i, 1);
        }
    }

    if(balls === 0){
        retryGame();
    }
}

function draw()
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Hud
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = '2';
    ctx.rect(4, -1, 70, 25);
    ctx.stroke();
    ctx.restore();

    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText('Ball: ' + balls, 16, 20);

    for(let i in bricks){
        bricks[i].draw();
    }

    ball.draw();
    paddle.draw();

    //Nivel completo
    if(isCompleted){
        ctx.font = 'bold 34px Arial, sans-serif';
        ctx.fillText('Level Completed!', 180, 150);
        retryGame();
    }
}

function loop()
{
    if(isLoop){
        update();
        draw();
    }

    requestAnimationFrame(loop);
}

document.addEventListener('mousemove', function(event){
    if(typeof paddle !== 'undefined'){
        let mouseX = event.clientX - paddle.width * 0.5;

        paddle.update(mouseX);
    }
});

function isCollision(circle, collider){
    return circle.x < collider.x + collider.width && circle.x + circle.radius > collider.x
            && circle.y < collider.y + collider.height && circle.y + circle.radius > collider.y;
}