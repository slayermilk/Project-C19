var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState;
var score = 0;
var gameOver, gameOverImg;
var cash, cashImg;
var lives = 3;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOverImg = loadImage("gameOver.png");
  cashImg = loadImage("cash.png");
}

function setup() {
  createCanvas(600, 600);


  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  
  gameOver = createSprite(300,300)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false

  ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4
  ghost.setCollider("rectangle", 0,0,80, 100)
  ghost.debug = true
  
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  cashGroup = new Group()

  ghost.velocityY = 0

  
}

function draw() {
  background(200);
  
  if(keyDown("space")) {

    gameState = "PLAY"

  }



  if (gameState === "PLAY") {

    tower.velocityY = 10;
    
    

    if(tower.y > 400) {

      tower.y = 300
  
    }

  
    if (keyDown("space")) {
  
      ghost.velocityY = -10
      
    }
    
    ghost.velocityY += 1
  
    if (keyDown("right_arrow")) {
  
      ghost.x += 4
  
    }
  
    if (keyDown("left_arrow")) {
  
      ghost.x -= 4
  
    }
  
    if (climbersGroup.isTouching(ghost)){
  
      ghost.velocityY = 0
      
  
    }


  if (cashGroup.isTouching(ghost)) {

    score += 50
    cash.destroy()

  }
  
  
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      
      lives -= 1
      ghost.y = 60
      
      
    }

    if (lives === 0) {
      ghost.destroy()
      gameState = "END"
      tower.velocityY = 0
      gameOver.visible = true
      climbersGroup.setVelocityEach = 0
      doorsGroup.setVelocityEach = 0
      invisibleBlockGroup.setVelocityEach = 0
      score = 0
      cashGroup.destroyEach()
      invisibleBlockGroup.destroyEach()
      climbersGroup.destroyEach()
      doorsGroup.destroyEach()
    }

    obstacles()

    cashSpawn()
    
  }
  
  

  

  drawSprites()

  push()
  textSize(25)
  fill("white")
  text("Score: " + score, 450, 50);
  pop()

  push()
  textSize(25)
  fill("white")
  text("Lives: "+lives, 30,50)
  pop()
}

function obstacles(){
    
  if (frameCount % 120 == 0) {
      door = createSprite(200, -50)
      door.addImage(doorImg)
      door.x = Math.round(random(120, 400))
      door.velocityY = 7

      climber = createSprite(200, 10)
      climber.addImage(climberImg)
      climber.x = door.x
      climber.velocityY = 7

      invisibleBlock = createSprite(door.x, 15, climber.width, 2);
      invisibleBlock.velocityY = 7
      invisibleBlock.debug = true
      
      doorsGroup.add(door);
      climbersGroup.add(climber);
      invisibleBlockGroup.add(invisibleBlock)

      door.lifetime = 800
      climber.lifetime = 800
      invisibleBlock = 800

      ghost.depth = door.depth
      ghost.depth+=1
    }


}
 
function cashSpawn() {

if (frameCount % 100 == 0) {

  cash = createSprite(200, 10);
  cash.addImage(cashImg)
  cash.x = Math.round(random(50, 500))
  cash.scale = 0.1
  cash.velocityY = 7
 
  cashGroup.add(cash)
}

}