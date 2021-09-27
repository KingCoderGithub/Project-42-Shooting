var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life = 3;
var score = 0;
var gameState = 1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   

  heading = createElement("h1");
  scoreboard = createElement("h1");


  
}


function draw() {
  background("#BDA297");

  heading.html("Life -" +life);
  heading.style("color : red");
  heading.position(150, 20);

  scoreboard.html("Score -" +score);
  scoreboard.style("color : red");
  scoreboard.position(600, 20);

  //display Score and number of lifes


  if(gameState===1){
    gun.y=mouseY  
    if(keyDown ("space")) {
    shootBullet();
    }

    if (frameCount % 80 === 0) {
      drawBlueBubble();
    }

    if (frameCount % 100 === 0) {
      drawRedBubble();
    }


    if (blueBubbleGroup.collide(bulletGroup)) {
      handleBubbleCollision(blueBubbleGroup);
    }

    if (blueBubbleGroup.collide(backBoard)) {
      handleGameOver(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(bulletGroup)) {
      handleBubbleCollision(redBubbleGroup);
    }

    if (redBubbleGroup.collide(backBoard)) {
      handleGameOver(redBubbleGroup);
    }
    
    
    drawSprites();
  }
     
}

function shootBullet() {
bullet = createSprite(150, width/2, 50, 20);
bullet.y = gun.y;
bullet.addImage(bulletImg);
bullet.scale = 0.2;
bullet.velocityX = 5;
bullet.lifetime = 400;
bulletGroup.add(bullet);
}


function drawBlueBubble() {
  blueBubble = createSprite(1600, random(20, 780), 40, 40);
  blueBubble.addImage(blueBubbleImg);
  blueBubble.scale = 0.1;
  blueBubble.velocityX = -8;
  blueBubble.lifetime = 400;
  blueBubbleGroup.add(blueBubble);
}

function drawRedBubble() {
  redBubble = createSprite(1600, random(20, 780), 40, 40);
  redBubble.addImage(redBubbleImg);
  redBubble.scale = 0.1;
  redBubble.velocityX = -8;
  redBubble.lifetime = 400;
  redBubbleGroup.add(redBubble);
}



function handleBubbleCollision(bubbleGroup) {
if (life > 0 ) {
  score = score + 1;
}

blast = createSprite(bullet.x + 60,bullet.y, 50, 50);
blast.addImage(blastImg);
blast.scale = 0.3;
blast.lifetime = 20;
bulletGroup.destroyEach();
bubbleGroup.destroyEach();
}

function handleGameOver(bubbleGroup) {
life = life - 1;
bubbleGroup.destroyEach();
if (life === 0) {
gameState = 2;
swal({
  title: "GameOver",
  text: "Oops you lost the game....!!!",
  text: "Your Score is " + score,
  imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
  imageSize: "100x100",
  confirmButtonText: "Thanks For Playing"
})
}
}