var PLAY = 1;
var END = 2;
var gameState = 1;
var ground , Ground;
var monkey , monkey_running;
var bananaImage,keeperImage;
var foodGroup, obstacleGroup;
var score
var gameOver , gameOver_img;
function preload(){
  
  Ground = loadImage("Ground.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  keeperImage = loadImage("zookeeper.png");
 
  gameOver_img = loadImage("gameOver.png");
}



function setup() {
  createCanvas(windowWidth,windowHeight);

  ground = createSprite(450,height-40,10,40);
  ground.addImage("ground",Ground);
  ground.scale = 0.2
  
  monkey = createSprite(100,height - 140,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2
  
  invisibleGround = createSprite(300,height-30,width,25);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  foodGroup  = createGroup();
  
  monkey.setCollider("circle",0,0,300);
  monkey.debug = false;
  
  gameOver = createSprite(width - 300,height-300,50,50);
  gameOver.addImage("over",gameOver_img);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  score = 0;
}


function draw() {
   
  background("white");
  
  
  
  monkey.velocityY = 3;
  
  monkey.collide(invisibleGround);
  
  if(gameState === 1){
     text("Score: "+ score, width-100,height-350);
    
      ground.velocityX = -(6 + score/2);
       if (ground.x < 0){
          ground.x = 900;
    }
  
   if((touches.length > 0 || keyDown("space"))&&monkey.y > height - 106){
     monkey.velocityY = -185;
     touches = [];
   } 
   
   if(monkey.isTouching(foodGroup)){
     score = score + 1;
     foodGroup.destroyEach();
   }
   
    spawnObstacles();
    spawnBanana();
    
    if(monkey.isTouching(obstacleGroup)){
     gameState = 0;
   }
    
  }
  
  else if(gameState===0){
    ground.velocityX = 0;
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    gameOver.visible = true;
    textSize(40)
    text("Your Score:"+score,width-400,height - 170);
  }
  
  drawSprites()
}

function spawnObstacles(){
  if(frameCount % 200 === 0 ){
    
    var obstacle = createSprite(600,height - 120,50,50);
    obstacle.velocityX = -(6 + score/2);
    obstacle.addImage(keeperImage);
    obstacle.scale = 0.2
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle",0,200,200,500);
    obstacle.debug = false;
  }
}
function spawnBanana(){
  if(frameCount % 100 ===0){
    
    var banana = createSprite(600,200,40,40);
    banana.velocityX = -(6 + score/2);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(height - 300, height-150));
    banana.lifetime = 150;
    foodGroup.add(banana);
    banana.setCollider("circle",0,0);
    banana.debug = false;
  }
}




