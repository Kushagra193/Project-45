var p1,p2,asteroid1,asteroid2,asteroid3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var laser,asteroidGroup,laserGroup;
var play = 1;
var end = 2;
var endline,canvas;
var gameState=play;

function preload() {
  spaceImage = loadImage("space.png");
  spaceShipImage = loadImage("spaceship.png");
  laserImage = loadImage("laser.png");
  asteroid1 = loadImage("as1.png");
  asteroid2 = loadImage("as2.png");
  asteroid3 = loadImage("as3.png");
  blastImage = loadImage("blast.png");
  explosionImage = loadImage("blast.png");
}

function setup() {  
  canvas = createCanvas(1000,700);
  space = createSprite(250,350,30,20);
  space.addImage(spaceImage);

  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  asteroidGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    // console.log(frameCount);
  
    
    if(space.y > 800) {
      space.y = 300;
    }
    

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(asteroidGroup.isTouching(p2) || asteroidGroup.isTouching(p1)) {
      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      spaceShip.destroy();
      gameState = end;
    }
    
    if(asteroidGroup.isTouching(laserGroup)) {
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
    }

  }

  

  asteroids();
    drawSprites();
    
    if(asteroidGroup.isTouching(endline)) {
      asteroidGroup.destroyEach();
      gameState = end;
    }
  }

  function asteroids() {
    if(frameCount % 110 === 0) {
    
      var asteroid = createSprite(Math.round(random(50,1350)),-20);
      asteroid.lifetime = 200;
      asteroid.scale = random(0.4,0.5);
      //asteroid.debug = true;
  
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: asteroid.addImage(asteroid1);
                asteroid.setCollider("circle",-80,10,160);
                break;
        case 2: asteroid.addImage(asteroid2);
                asteroid.setCollider("circle",50,0,150);
                break;
        case 3: asteroid.addImage(asteroid3);
                asteroid.setCollider("circle",0,0,170)
        default: break;
      }
      
      //console.log(asteroid.x);
      asteroidGroup.add(asteroid);
    }
  }
  