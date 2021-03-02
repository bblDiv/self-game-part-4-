var crewAni,crew;
var arrowG,arrow,arrowImg;
var jumpS,levelS,deathS;
var reset,gameOver,resetImg,gameOverImg,ground,backg,back;
var coin,coinAni,coinG;
var speed,speedImg,speedG;
var INTRO=0;
var PLAY=1;
var END=2;
var gameState=INTRO;
var hearts1,hearts2,hearts3,heartsImg,score=0,heartG,life=3;
function preload(){
//jumpS=loadSound("jump.wav");
//levelS=loadSound("level.wav");
//deathS=loadSound("death.wav");
crewAni=loadAnimation("crew1.png","crew2.png","crew3.png");
arrowImg=loadImage("arrow.png");
resetImg=loadImage("restart.png");
gameOverImg=loadImage("gameOver.png");
//ground=loadImage("ground2.png");
backg=loadImage("background.jpg");
coinAni=loadAnimation("coin1.png","coin2.png","coin3.png");
speedImg=loadImage("speed.png");
heartsImg=loadImage("hearts.png");
introImg=loadImage("intro.png");
stopImg=loadImage("crew2.png");
}

function setup() {
	createCanvas(1350, 650);
  back=createSprite(675,325,1350,650);
  back.addImage(backg);
  back.scale=1.35
  back.velocityX=-6; 
  crew=createSprite(100,520,10,10);

  crew.scale=0.6;
  reset=createSprite(675,325,10,10);
  reset.addImage(resetImg);
  gameOver=createSprite(675,250,10,10);
  gameOver.addImage(gameOverImg);
  arrowG=createGroup();
  wall1=createSprite(650,650,1450,1);
  wall2=createSprite(650,0,1450,1);
  coinG=createGroup();
  speedG=createGroup();
  intro=createSprite(675,325,10,10);
  intro.addImage(introImg);
  crew.debug=true;
}


function draw() {
  background(0);
  if(keyDown("space")){
    gameState = PLAY;
    //change state
  }
  if(gameState===PLAY){
  if(back.x<10){
    back.x=back.width/2;
  }
  if(keyDown(UP_ARROW)){
    crew.y-=5;
  }
  if(keyDown(DOWN_ARROW)){
    crew.y+=5;
  }
 
  spawnArrows();
  spawnCoins();
  spawnSpeed();
  spawnHeart();
  

  if(arrowG.isTouching(crew)){
    life=life-1;
    arrowG.destroyEach();
  }  
  crew.addAnimation("run",crewAni);
  if(life===0){
   gameState=END; 

  }

  crew.collide(wall1);
  crew.collide(wall2);  

  intro.visible=false;

  gameOver.visible=false;
  reset.visible=false;
  
  }else if(gameState===END){
    gameOver.visible=true;
    reset.visible=true;
    back.velocityX=-0;   
    crew.addAnimation("run",crewAni);
  }
if(mousePressedOver(reset)){
  restart();
}
drawSprites();
fill("white"); 
textSize(30);
textFont("Italic");
text("life : "+life,1200,300);



fill("white"); 
  textSize(30);
  textFont("Italic");
  text("score : "+score,1200,100);
}
function spawnArrows(){
  if(frameCount%30===0){
  arrow=createSprite(1350,random(10,640),10,10);
  arrow.addImage("arrow",arrowImg);
  arrow.velocityX=-40;
  arrow.scale=1.4;
  arrowG.add(arrow);
  arrow.debug=true;
  arrow.setCollider("rectangle",0,0,90,5);
arrow.lifetime=100;
  }
}
function spawnCoins(){
  if(frameCount%1000===0){
    coin=createSprite(1350,random(10,640),10,10);
    coin.addAnimation("spin",coinAni);
    coin.velocityX=-50;
    coin.scale=0.19;
    coinG.add(coin);
    lifetime=100;
  }
}
function spawnSpeed(){
  if(frameCount%800===0){
    speed=createSprite(1350,random(10,640),10,10);
    speed.addImage(speedImg);
    speed.velocityX=-45;
    speed.scale=0.25;
    speedG.add(speed);
  }
}

function spawnHeart(){
  hearts1=createSprite(1200,150,10,10);
  hearts1.addImage(heartsImg);
  hearts1.scale=0.2;
  hearts2=createSprite(1250,150,10,10);
  hearts2.addImage(heartsImg);
  hearts2.scale=0.2;
  hearts3=createSprite(1300,150,10,10);
  hearts3.addImage(heartsImg);
  hearts3.scale=0.2;
  heartG=createGroup();
  heartG.add(hearts1);
  heartG.add(hearts2);
  heartG.add(hearts3);
}

function restart(){
  gameState=PLAY;
  life=3;
  score=0;
  back.velocityX=-6;   
}