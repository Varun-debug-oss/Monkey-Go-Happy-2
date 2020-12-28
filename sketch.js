var gameOver;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, backgroundImage;
var FoodGroup, obstacleGroup;
var score,invisibleGroup;
var ground,background;
var survivalTime;
var score=0;

function preload(){
  
  
monkey_running =           loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png") 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backgroundImage=loadImage("jungle.jpg");
  
}
function setup() {
 createCanvas(600, 600);
  
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 2
 
  monkey = createSprite(50,200,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.17;
  
  //ground = createSprite(200,500,990,20);
  //ground.x = ground.width /2;
  //ground.velocityX = -4;
  
  invisibleGround = createSprite(200,500,990,20);
  invisibleGround.x=invisibleGround.width/2;
  invisibleGround.visible = false;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  survivalTime=0;
  
  var rand =  Math.round(random(1,100))
  console.log(rand)
}
function draw() {

  //background(255);
  
  text("Score: "+ score, 500,50);
  
  if (invisibleGround.x < 600){
      invisibleGround.x = invisibleGround.width/2;
    }
  background.velocityX = -3 
  
  if (background.x < 0){
      background.x = background.width/2;
    }
  
  if (keyDown("space")&&monkey.y >=209) {
    monkey.velocityY = -15;
    }
  
   monkey.velocityY = monkey.velocityY + 0.9
  //console.log(monkey.y);
   spawnBananas();
  spawnObstacle ();
  
  
  monkey.collide(invisibleGround);
  
 if(obstacleGroup.isTouching(monkey)){
   monkey.scale=0.1;
   
 }
  
 if(FoodGroup.isTouching(monkey)){
   monkey.scale = 0.17;
   FoodGroup.destroyEach();
   score = score+2;
 }
  
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
      case 20: monkey.scale = 0.14;
      break;
      case 30: monkey.scale = 0.16;
      break;
      case 40: monkey.scale = 0.18;
      break;
      default: break;
  }
    
  
  
 survivalTime = survivalTime + Math.round(getFrameRate()/60); 
  spawnBananas();
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.08;
  }
  spawnObstacle();
  drawSprites();
  
  fill("red")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time ="+ survivalTime,100,50)
}

function spawnBananas(){
  if(frameCount%250===0){
  banana = createSprite(600,90,60,10);
  banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 130;
    banana.y = Math.round(random(10,300));
    //console.log(monkey.depth);
    //console.log(banana.depth);
    banana.depth = monkey.depth;
    monkey.depth =monkey.depth+1
    FoodGroup.add(banana);
    
    
}
}

function spawnObstacle (){ 
 if(frameCount % 170 === 0){
   obstacle = createSprite (600,460,10,40)
   obstacle.addImage(obstacleImage);
  obstacle.velocityX = -3;
   obstacle.scale = 0.16;
   obstacle.lifetime = 200;
   obstacleGroup.add(obstacle);
 }
}




