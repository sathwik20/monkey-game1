var monkey , monkey_running;
var banana ,bananaImage;
var rock,rockImage;
var foodGroup, rockGroup;
var score, survialTime;
var ground;



var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
  //Monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");

  rockImage= loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,600)
  
  
  rockGroup = createGroup();
  bananaGroup = createGroup();
  TimeGroup = createGroup();
  
  
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
  //score
  score = 0;
  survialTime = 0;
  
}

//Draw
function draw() {
  
  //Background
  background (180);
  
   
  stroke("black");
    fill("black");
      textSize(20);
  
  text("Survial Time:"+  survialTime, 100, 50);
  
  //displaying score
  stroke("black");
    fill("black");
      textSize(20);
  text("Score:"+  score, 300, 100);
  
 //Monkey
  monkey.collide(ground);
  //PLAY
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    survialTime = Math.ceil(frameCount/frameRate());
     
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score+1;
    }
   
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  rockGroup.setLifetimeEach(-1);
  
  food();
  rock();
        
    if(rockGroup.isTouching(monkey)){    
        gameState = END;
      
    }
  }
  //END
   if (gameState === END) {
     rockGroup.destroyEach();
    foodGroup.destroyEach();
     survialTime.visible = false;
     

     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 110, 200);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("Monkey is dead", 100, 240);
   }
 
  
  
 

  //draw Sprites
  drawSprites();
}

//Banana
function food () {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
}


function rock() {
  if (frameCount % 300 === 0){
    rock = createSprite(250,325,10,10);
    rock.addImage(rockImage);
    rock.velocityX = -3;
    rock.lifetime = 200;
    rock.scale = 0.1 ;
     rockGroup.add(rock);
  }

}