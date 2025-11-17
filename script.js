const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');
const W=canvas.width,H=canvas.height;
let running=false,frame=0,score=0,pipes=[],speed=2.5;

const planeImg=new Image();
planeImg.src='https://www.pngarts.com/files/5/Airplane-Transparent-Background-PNG.png';
const buildingImg=new Image();
buildingImg.src='https://static.vecteezy.com/ti/fotos-gratis/p2/16866039-janelas-em-um-predio-de-apartamentos-como-uma-textura-foto.jpg';

const plane={x:100,y:H/2,w:80,h:60,dy:0,gravity:0.45,jumpPower:-8.5,rotation:0};

function reset(){score=0;frame=0;speed=2.5;pipes=[];plane.y=H/2;plane.dy=0;running=false;document.getElementById('score').textContent=0;}

function spawnPipe(){const gap=160;const min=80;const max=H-160-gap;const topH=Math.floor(Math.random()*(max-min)+min);const bottomY=topH+gap;pipes.push({x:W+60,topH,bottomY,w:100,passed:false});}

function rectsOverlap(a,b){return!(a.x+a.w<b.x||a.x>b.x+b.w||a.y+a.h<b.y||a.y>b.y+b.h);}

function update(){if(!running)return;frame++;plane.dy+=plane.gravity;plane.y+=plane.dy;plane.rotation=Math.max(-0.6,Math.min(1.2,plane.dy*0.07));
  pipes.forEach(p=>p.x-=speed);
  if(frame%100===0)spawnPipe();
  pipes=pipes.filter(p=>{if(!p.passed&&p.x+ p.w<plane.x){p.passed=true;score++;document.getElementById('score').textContent=score;}return p.x+p.w>-50;});
  const planeRect={x:plane.x-plane.w/2+15,y:plane.y-plane.h/2+15,w:plane.w-30,h:plane.h-30};
  for(const p of pipes){
    const topRect={x:p.x,y:0,w:p.w,h:p.topH};
    const botRect={x:p.x,y:p.bottomY,w:p.w,h:H-p.bottomY};
    if(rectsOverlap(planeRect,topRect)||rectsOverlap(planeRect,botRect))endGame();
  }
  if(plane.y+plane.h/2>H||plane.y-plane.h/2<0)endGame();
}

function draw(){ctx.clearRect(0,0,W,H);
  ctx.fillStyle='rgba(135,215,255,0.3)';ctx.fillRect(0,0,W,H);
  pipes.forEach(p=>{
    ctx.drawImage(buildingImg,p.x,0,p.w,p.topH);
    ctx.drawImage(buildingImg,p.x,p.bottomY,p.w,H-p.bottomY);
  });
  ctx.save();ctx.translate(plane.x,plane.y);ctx.rotate(plane.rotation);
  ctx.drawImage(planeImg,-plane.w/2,-plane.h/2,plane.w,plane.h);
  ctx.restore();
}

function loop(){update();draw();requestAnimationFrame(loop);}

function flap(){plane.dy=plane.jumpPower;running=true;document.getElementById('message').style.display='none';}
function endGame(){
  running=false;
  document.getElementById('message').innerHTML=`<img src="./img/2025-11-13-MORREU-.gif"><div>Pontuação: ${score}</div><div class='button' id='startBtn2'>Jogar Novamente</div><br><a href='./flappypoamenu.html' class='button'>Sair</a>`;
  document.getElementById('message').style.display='block';
}

window.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();flap();}if(e.key.toLowerCase()==='r')reset();});
canvas.addEventListener('mousedown',flap);
canvas.addEventListener('touchstart',e=>{e.preventDefault();flap();},{passive:false});

document.addEventListener('click',e=>{if(e.target.id==='startBtn'||e.target.id==='startBtn2'){reset();running=true;document.getElementById('message').style.display='none';}});

reset();loop();