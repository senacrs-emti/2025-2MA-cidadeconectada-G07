const skate = document.getElementById("skate");
const game = document.getElementById("game");
const scoreDiv = document.getElementById("score");
const menu = document.getElementById("menuGameOver");
const btnRestart = document.getElementById("btnRestart");

let pulando = false;
let pontos = 0;
let gameOver = false;


const ALTURA_DO_PULO = 200;  

document.addEventListener("keydown", function(e){
    if(e.code === "Space" && !pulando && !gameOver){
        pular();
    }
});

function pular(){
    pulando = true;
    skate.src = "./img/skatepulo.png";

    let altura = 0;
    let subir = setInterval(() => {
        if(altura >= ALTURA_DO_PULO){
            clearInterval(subir);
            let descer = setInterval(() => {
                if(altura <= 0){
                    clearInterval(descer);
                    pulando = false;
                    skate.src = "./img/sakateandando.png";
                }
                altura -= 12;
                skate.style.bottom = altura + "px";
            }, 20);
        }
        altura += 12;
        skate.style.bottom = altura + "px";
    }, 20);
}

function colisaoRetangulos(a, b) {
    return !(
        a.right < b.left ||
        a.left > b.right ||
        a.bottom < b.top ||
        a.top > b.bottom
    );
}

function criarObstaculo(){
    if (gameOver) return;

    let obs = document.createElement("div");
    obs.classList.add("obstaculo");
    obs.style.right = "-60px";
    game.appendChild(obs);

    let colisaoInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(colisaoInterval);
            return;
        }

        let obsRect = obs.getBoundingClientRect();
        let skRect = skate.getBoundingClientRect();

        let hitboxJogador = {
            left: skRect.left + 25,
            right: skRect.right - 25,
            top: skRect.top + 15,
            bottom: skRect.bottom - 5
        };

        let hitboxObs = {
            left: obsRect.left + 10,
            right: obsRect.right - 10,
            top: obsRect.top + 10,
            bottom: obsRect.bottom - 5
        };

        if (colisaoRetangulos(hitboxJogador, hitboxObs)) {
            morrer();
            clearInterval(colisaoInterval);
        }

    }, 10);

    setTimeout(() => {
        if(obs.parentNode) obs.remove();
    }, 2000);
}

function morrer(){
    gameOver = true;
    menu.style.display = "block";
    clearInterval(loopScore);
    clearInterval(loopObs);
}

btnRestart.onclick = () => {
    location.reload();
};

let loopScore = setInterval(() => {
    pontos++;
    scoreDiv.innerText = pontos;
}, 200);

let loopObs = setInterval(() => {
    criarObstaculo();
}, 1300);
