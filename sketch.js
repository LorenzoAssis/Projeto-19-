var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,10);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.35
  ghost.setCollider("rectangle",-15,30,160,240);
  ghost.depth = ghost.depth
 

  climbersGroup = new Group();
  doorsGroup = new Group();
  
}


function draw() {
  background(200);
  
  if(gameState === "play"){

    if(tower.y > 400){
      tower.y = 300
    }
  
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x + 2;
    }
    
    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x - 2;
    }   

    if(keyDown("SPACE")){
      ghost.velocityY = - 4.5;
    }


  
    ghost.velocityY  = ghost.velocityY + 0.35;
    if(climbersGroup.isTouching(ghost) || ghost.y >= 600 || ghost.y <= -5 || ghost. x <= 0 || ghost.x >= 600){
      gameState = "end";

    }

    drawSprites();
  }  

  else if(gameState === "end"){
    fill("black")
    rect(0,-1,601,605)
    textSize(35);
    fill("red");
    text("GAME OVER",190,290);
  }

  doorCreater();
}


 function doorCreater(){
   if(frameCount%120 === 0){
      door = createSprite (300,0);
      door.addImage("door", doorImg);  
      door.x = Math.round(random(105,490));
      door.velocityY = 2;
      doorsGroup.add(door);
      door.lifetime = 330
      door.depth = ghost.depth - 1;

      climber = createSprite(300,0);
      climber.addImage("climber", climberImg);
      climber.x = door.x
      climber.y = door.y + 70;
      climber.velocityY = 2
      climbersGroup.add(climber);
      climber.lifetime = 270
   }
 }
