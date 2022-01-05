const KeyE=37;
const KeyD=39;
const KeyC=38;
const KeyB=40;
var intervalo;
var tipo = 0;

function inicio (velocidade){
    clearInterval(intervalo);
    canvas = document.getElementById("gc");
    console.log(canvas);
    ccontext = canvas.getContext("2d");
    canvas.onkeydown = input;
    posFrutaX = 16 * getRandomIntInclusive(0,39);
    posFrutaY = 16 * getRandomIntInclusive(0,29);
    iniciaObjetos();
    snake = [];
    dir = 2;
    snake.push({x:64,y:64});
    snake.push({x:48,y:64});
    snake.push({x:32,y:64});
    snake.push({x:16,y:64});
    intervalo = setInterval(update,velocidade);
}


function update()
{
    draw()
}
function draw()
{   
    ccontext.fillStyle= "black";
    ccontext.fillRect(0,0,canvas.width,canvas.height);
    ccontext.fillStyle= "red";
    ccontext.fillRect(x = posFrutaX,y = posFrutaY ,fruta.width,fruta.height);

    for(var i=0; i<snake.length;i++)
    {
            ccontext.fillStyle= "green";
            ccontext.fillRect(snake[i].x,snake[i].y,16,16);
    }

    colisao();
    movimentarcobra();
    conferePos(tipo);
    comeuFruta();

}
function input(ev)
{
    console.log("Direcao:",dir);
    if(ev.type=="keydown")
    {
        if(ev.keyCode == KeyE && dir != 2)
        {
            dir = 0;
        
        }

        else if(ev.keyCode == KeyC && dir != 3)
        {
            dir = 1;
            
        }
        else if(ev.keyCode == KeyD && dir != 0)
        {
            dir = 2;
            
        }
        else if(ev.keyCode == KeyB && dir != 1)
        {
            dir = 3;
            
        }
            console.log("x:" +snake[0].x);
            console.log("y:" +snake[0].y);
            console.log("\n");
       
        

       
    }
}
// confere se a cobra saiu da tela,se saiu coloca ela do outro lado. 
function conferePos(tipo)
{
    if(tipo==0)
    {
        if(snake[0].y == 480)
        {
            snake[0].y=0;
        }
        if(snake[0].y == -16)
        {
            snake[0].y=464;
        }
        if(snake[0].x == 640)
        {
            snake[0].x=0;
        }
        if(snake[0].x == -16)
        {
            snake[0].x=624;
        }
    }
    if(tipo==1)
    {
        if(snake[0].y == 480)
        {
            alert("Colidiu")
            window.location.reload();
        }
        if(snake[0].y == -16)
        {
            alert("Colidiu")
            window.location.reload();

        }
        if(snake[0].x == 640)
        {
            alert("Colidiu")
            window.location.reload();

        }
        if(snake[0].x == -16)
        {
            alert("Colidiu")
            window.location.reload();

        }
    }
}
// copia um elemento do vetor para o proximo, para movimentar a cobra. Depois movimenta a cabeça
function movimentarcobra()
{
    
    for(var i=snake.length-1;i>0;i--)
    {
      
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }
    if(dir == 0)
    {
        snake[0].x -=16;
    }
    else if(dir == 1)
    {
        snake[0].y -=16;
    }
    else if(dir == 2)
    {
        snake[0].x +=16;
    }
    else if(dir == 3)
    {
        snake[0].y +=16;
    }
}
//confere se comeu a fruta
function comeuFruta()
{
    
    if(snake[0].x == posFrutaX && snake[0].y == posFrutaY)
    {
        posFrutaX =  16 * getRandomIntInclusive(0,39);
        posFrutaY = 16 *  getRandomIntInclusive(0,29);
        crescecauda();
        score();
    }
    
}
function iniciaObjetos()
{
    snake = {
        x:16,
        y:16,
    }

    fruta = {
        width:14,
        height:14
    }
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//coloca um novo elemento no vetor da cobra,fazeno ela crscer
function crescecauda()
{
    snake.push({x:480,y:600})    
}
//detecta colisao. Se a cabeca estiver em na mesma posicao que outra parte do corpo
function colisao()
{
    for(var i=1;i<snake.length;i++)
    {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
        {
            alert("Voce bateu!");
            console.log("Colisao x:",snake[i].x);
            console.log("Colisao y:",snake[i].y);
            clearInterval(intervalo);
            window.location.reload();

        }
    }
}
var pontos = 0;

function score()
{
    pontos = pontos+1;
    document.getElementById("score").innerHTML = pontos;
}

