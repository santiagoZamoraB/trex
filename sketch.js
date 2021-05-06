var trex, trexA, trexD, trexC;
var edges;
var ground, groundA;
var groundInvisible;
var nubeImage
var obstacle, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var checkPoint, jump, die;
var cactusGroup
var gameState;
var cloudGroup;
var score;
var restartImage, gameOverImage;
var restart, gameOver; 
var teroA;

function preload(){
 trexA =  loadAnimation("trex1.png","trex3.png","trex4.png");
 trexD = loadAnimation("trex_collided.png");
 trexC = loadAnimation("trex_down1.png","trex_down2.png");
 groundA = loadImage("ground2.png");
 nubeImage = loadImage("cloud.png");
 obstacle = loadImage("obstacle1.png");
 obstacle2 = loadImage("obstacle2.png");
 obstacle3 = loadImage("obstacle3.png");
 obstacle4 = loadImage("obstacle4.png");
 obstacle5 = loadImage("obstacle5.png");
 obstacle6 = loadImage("obstacle6.png");
 checkPoint = loadSound("checkPoint.mp3");
 jump = loadSound("jump.mp3");
 die = loadSound("die.mp3");
 restartImage = loadImage("restart.png");
 gameOverImage = loadImage("gameOver.png");
 teroA = loadAnimation("tero1.png","tero2.png");
}

function setup() {
  createCanvas(windowWidth, 200);
 gameState = "start";
  // creating the ground 
  ground = createSprite(200,180,400,20);
  ground.addImage(groundA);
  
  // creating the trex
  trex = createSprite(50 ,165,20,20);
  trex.addAnimation("runing",trexA);
  trex.addAnimation("die",trexD)
  trex.addAnimation("crouch",trexC);
  trex.scale = 0.5;
  trex.setCollider ("circle",0,0,40);
  
  
 //creatig array
  edges = createEdgeSprites();
  // creating an invisible ground 
  groundInvisible = createSprite(200,190,400,10);
  groundInvisible.visible = false;
  
  restart = createSprite(width / 2,100,20,20);
  restart. addImage (restartImage);
  restart. scale = 0.3
  restart. visible = false;
  
  gameOver = createSprite(width / 2,75,20,20);
  gameOver. addImage(gameOverImage);
  gameOver. scale = 0.5;
  gameOver. visible = false;
  
  score = 0;
  
  cactusGroup = new Group();
  cloudGroup = new Group();
}

function draw() {
  background(205);
  console.log(ground.velocityX);
  textSize (9);
  fill ("black");
  text("SCORE:  "+ score,width - 100,75)
  // loop of the ground 
  if (ground.x < 0){
    ground.x = ground.width / 2;
  }
  if (gameState === "start" && ( keyDown ("space")|| touches. length >0)){
    gameState = "play";
    touches = []
  }
  if (gameState === "play"){
     ground.velocityX = -3 +( score / -10);
    clouds();
    obstacles();
    tero();
  trex.velocityY = trex.velocityY +0.5;
    //trex jump
  if((keyDown("space")|| touches. length > 0) && trex.y >100 ){
    trex.velocityY = -8;
    jump.play();
    touches = [];
  }
    if(keyWentDown("ctrl")){
      trex. changeAnimation("crouch",trexC);
      trex. scale = 0.35;
    }
    if(keyWentUp("ctrl")){
      trex. changeAnimation("runing", trexA);
      trex.scale = 0.5;
    }
    if(trex.isTouching (cactusGroup)){
      die.play();
      gameState = "gameover"
      
    }
    if (frameCount %10 === 0 ){
      score = score +1;
     }
   // score= score + Math.round(frameCount / 20)
    if(score %100 === 0 && score > 0){
      checkPoint.play();
    }
  }
  if (gameState === "gameover"){
    ground.velocityX = 0;
    cactusGroup.setVelocityXEach (0);
    cloudGroup. setVelocityXEach (0);
    cloudGroup.setLifetimeEach (-1);
    cactusGroup.setLifetimeEach (-1);
    trex.velocityY = 0;
    trex. changeAnimation("die", trexD);
    restart. visible = true;
    gameOver.visible = true;
    
    if(mousePressedOver(restart) || touches. length > 0){
      reinicio();
      touches = [];
    }
    
  }
  console.log(frameCount);

//trex collide
  trex. collide(groundInvisible);
  //console.log();
  
  drawSprites();

}
//making the clouds 
function clouds(){
  if (frameCount % 100 === 0){
    //creating the random movement 
    var rdm = random (0,50);
   //craeating the cloud 
    var nube = createSprite(width +50,rdm,10,10);
    nube.velocityX = -3;
    nube.addImage(nubeImage)
    //console.log(rdm);
    nube.lifetime = width / 2;
    cloudGroup.add (nube);
  }
}
//making the obstacles
function obstacles(){
  if (frameCount % 120 === 0){
    //creating the random cases 
    var rdm = Math.round (random (1,6));
   //craeating the cactus
    var cactus = createSprite(width + 50,175,10,10);
    cactus.velocityX =  -3 +( score / -10);

//creating the cases 
    switch(rdm){
      case 1 :
      cactus.addImage(obstacle);
      break;
      case 2 :
      cactus.addImage(obstacle2);
      break;
      case 3 :
      cactus.addImage(obstacle3);
      break;
      case 4 :
      cactus.addImage(obstacle4);
      break;
      case 5 :
      cactus.addImage(obstacle5);
      break;
      case 6 :
      cactus.addImage(obstacle6);
      break;
      default: break;
    }
    cactus.scale = 0.7;
    console.log(rdm);
    cactus.lifetime = width / 2;
    cactusGroup.add (cactus);
  }
}

function reinicio(){
  
  gameState = "start"
  
  gameOver. visible = false;
  restart. visible = false;
  cactusGroup. destroyEach();
  cloudGroup. destroyEach();
  trex.y = 165;
  trex. changeAnimation ("runing",trexA);
  score = 0;
  
}

function tero(){
  if(frameCount % 200 === 0){
    var teroS = createSprite(width + 50,50,20,20);
    teroS. addAnimation ("movement", teroA);
    teroS. velocityX = -3;
   teroS.lifetime = width / 2
  }
}
/*if(teroS.x < 600){
      teroS. velocityY = +0.3;
    }
    else{
      teroS. velocityY = teroS.velocityY -2;
    }*/