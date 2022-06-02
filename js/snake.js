const KeyE=37;
const KeyD=39;
const KeyC=38;
const KeyB=40;
var intervalo;
var tipo = 0;
var nome = nome_aleatorio();
document.querySelector("#nome_user").innerText = "Nome: " + nome;






function getDados()
{
    let ajax;
    ajax = new XMLHttpRequest();

    ajax.open("GET",'http://localhost:3000/');
    var cont = 0    
    ajax.onreadystatechange = function()
        {
            if (ajax.readyState == 4 && ajax.status == 200)
                {
                if (ajax.responseText)
                        {
                            var corpo_tabela = document.querySelector("tbody")
                            var data =  ajax.responseText;
                            data = JSON.parse(data)
                        
                            
                            
                            for(var i=0; i<data.rowCount;i++)
                            {
                                var linha = document.createElement("tr")
                                var campo_nome = document.createElement("td")
                                var campo_pontos = document.createElement("td")
                                var texto_nome = document.createTextNode(data.rows[i].nome)
                                var texto_pontos = document.createTextNode(data.rows[i].pontos)
            
                                campo_nome.appendChild(texto_nome)
                                campo_pontos.appendChild(texto_pontos)
            
                                linha.appendChild(campo_nome)
                                linha.appendChild(campo_pontos)
                                corpo_tabela.appendChild(linha)
                            }
                            
                        }
                }
            };
    ajax.send() 
}

getDados();
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


function nome_aleatorio()
{
     return "usuario" +(getRandomIntInclusive(1,200)).toString()
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


    movimentarcobra();
    colisao();
    conferePos(tipo);
    comeuFruta();

    for(var i=0; i<snake.length;i++)
    {
            ccontext.fillStyle= "green";
            ccontext.fillRect(snake[i].x,snake[i].y,16,16);
    }

}
var botao = document.getElementById("botao1");

botao.addEventListener("click",function()
{
    nome = document.querySelector("#name").value;
    document.querySelector("#nome_user").innerText = "Nome: " + nome;

})

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
        console.log("ouii")
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
            alert("Colidiu");
            adicionaRanking(nome,pontos);

        }
        if(snake[0].y == -16)
        {
            alert("Colidiu");
            adicionaRanking(nome,pontos);


        }
        if(snake[0].x == 640)
        {
            alert("Colidiu");
            adicionaRanking(nome,pontos);


        }
        if(snake[0].x == -16)
        {
            alert("Colidiu");
            adicionaRanking(nome,pontos);


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
            adicionaRanking(nome,pontos);
            clearInterval(intervalo);
        }
    }
}
var pontos = 0;
function score()
{
    pontos = pontos+1;
    document.getElementById("score").innerHTML = pontos;
}
function adicionaRanking(nome,pontos)
{
    let ajax;
    ajax = new XMLHttpRequest();
    console.log("teste");
    ajax.open("POST",'http://localhost:3000/inserir');
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.onreadystatechange = function()
    {
        if(ajax.status=200 && ajax.readyState===4)
        {
            console.log(ajax.responseText);
            window.location.reload()
        }
    }


    var obj = {
        nome  : this.nome,
        pontos : this.pontos
    }
    var data = JSON.stringify(obj)
    ajax.send(data);

}

    




