const canvas = document.getElementById('game');
// const leftPaddle = document.getElementById('player1');
const context = canvas.getContext('2d');
const grid = 15;
const paddleHeight = grid * 5; // 80
const maxPaddleY = canvas.height - grid - paddleHeight;

let paddleSpeed = 6;
let ballSpeed = 5;
// let puntpunt = ':'
// let score1 = 0;
// let score2 = 0;
// let scoreboard = (score1)-(score2);
// let beginscreen = "druk op enter om te beginnen";

let score_val =
	document.querySelector('.score_val');
let score_val2 =
	document.querySelector('.score_val2');  
let message =
	document.querySelector('#message');
let message1 =
	document.querySelector('#message1');
let message2 =
	document.querySelector('#message2');
let message3 =
	document.querySelector('#message3');
let menu =
	document.querySelector('header');
let score_title =
	document.querySelector('.score_title');
let gameding =
  document.querySelector('.canvas');
let player = 
  document.querySelector('.player');

const leftPaddle = {
  // start het spel links van het veld
  x: grid * 2,
  y: canvas.height / 2 - paddleHeight / 2,
  width: grid,
  height: paddleHeight,

  // peddel snelheid
  dy: 0
};
const rightPaddle = {
  // start het spel rechts van het veld
  x: canvas.width - grid * 3,
  y: canvas.height / 2 - paddleHeight / 2,
  width: grid,
  height: paddleHeight,

  // peddel snelheid
  dy: 0
};
const ball = {
  // start in het midden van het veld
  x: canvas.width / 2,  
  y: canvas.height / 2,
  width: grid,
  height: grid,

  
  // houd in de gaten wanneer de ball gereset moet worden
  resetting: false,

  // ball velocity (start going to the top-right corner)
  dx: ballSpeed,
  dy: -ballSpeed
};

// check for collision between two objects using axis-aligned bounding box (AABB)
// @see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// game loop
function start() {
  requestAnimationFrame(start);
  context.clearRect(0,0,canvas.width,canvas.height);

  
  // move paddles by their velocity
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;

  // prevent paddles from going through walls
  if (leftPaddle.y < grid) {
    leftPaddle.y = grid;
  }
  else if (leftPaddle.y > maxPaddleY) {
    leftPaddle.y = maxPaddleY;
  }

  if (rightPaddle.y < grid) {
    rightPaddle.y = grid;
  }
  else if (rightPaddle.y > maxPaddleY) {
    rightPaddle.y = maxPaddleY;
  }

  // draw paddles
  context.fillStyle = 'blue';  
  context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  context.fillStyle = 'red';
  context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

  // move ball by its velocity
  ball.x += ball.dx;
  ball.y += ball.dy;

  // prevent ball from going through walls by changing its velocity
  if (ball.y < grid) {
    ball.y = grid;
    ball.dy *= -1;
  }
  else if (ball.y + grid > canvas.height - grid) {
    ball.y = canvas.height - grid * 2;
    ball.dy *= -1;
  }

  // reset ball if it goes past paddle (but only if we haven't already done so)
  if ( (ball.x > canvas.width) && !ball.resetting) {
    ball.resetting = true;
    alert("speler 1  heeft gescoord");
    // score1 ++;
    score_val.innerHTML = +score_val.innerHTML + 1;

    setTimeout(() => {
        ball.resetting = false;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
      }, 1000);

    }   
  
    if ( (ball.x < 0) && !ball.resetting) {
    ball.resetting = true;
    alert("speler 2  heeft gescoord");
    // score2 ++;
    score_val2.innerHTML = +score_val2.innerHTML + 1;

    // give some time for the player to recover before launching the ball again
    setTimeout(() => {
      ball.resetting = false;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
    }, 1000);
  
  }

  // check to see if ball collides with paddle. if they do change x velocity
  if (collides(ball, leftPaddle)) {
    context.fillStyle = 'blue';  
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
    ball.dx *= -1;
    ballSpeed + 5;
    ballSpeed + 0.1;
    

    // move ball next to the paddle otherwise the collision will happen again
    // in the next frame
    ball.x = leftPaddle.x + leftPaddle.width;
  }
  else if (collides(ball, rightPaddle)) {
    ball.dx *= -1;
    ballSpeed + 5;
    ballSpeed + 0.1;
    context.fillStyle = 'red';  
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
    // move ball next to the paddle otherwise the collision will happen again
    // in the next frame
    ball.x = rightPaddle.x - ball.width;
  }

  // draw ball
  context.fillStyle = 'purple';
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // draw walls
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, grid);
  context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

  // draw dotted line down the middle
  for (let i = grid; i < canvas.height - grid; i += grid * 2) {
    context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
  }
}

// listen to keyboard events to move the paddles
document.addEventListener('keydown', function(e) {

  // up arrow key
  if (e.which === 38) {
    rightPaddle.dy = -paddleSpeed;
  }
  // down arrow key
  else if (e.which === 40) {
    rightPaddle.dy = paddleSpeed;
  }

  // w key
  if (e.which === 87) {
    leftPaddle.dy = -paddleSpeed;
  }
  // a key
  else if (e.which === 83) {
    leftPaddle.dy = paddleSpeed;
  }
});

// listen to keyboard events to stop the paddle if key is released
document.addEventListener('keyup', function(e) {
  if (e.which === 38 || e.which === 40) {
    rightPaddle.dy = 0;
  }

  if (e.which === 83 || e.which === 87) {
    leftPaddle.dy = 0;
  }
});

// begin het spel
document.addEventListener("keydown", function(e){
    if (e.which === 13){
        requestAnimationFrame(start);
        message.innerHTML = '';
        message1.innerHTML = '';
        message2.innerHTML = '';
        message3.innerHTML = '';
        menu.innerHTML = '';
        score_title.innerHTML = 'Score', player, score_val.innerHTML, score_val2.innerHTML;
        player.innerHTML = 'p1 p2';
        score_val.innerHTML = '0';
        score_val2.innerHTML = '0';
        // canvas1.innerHTML = '<canvas width="1000" height="700" id="game"></canvas>';
        // canvas1.innerHTML = '.canvas{ height: 100vh; width: 100vw;';
        // gameding.innerHTML = '.canvas{margin-top: 50vh; height: 50vh; padding-right: 50vw;}';
    }
})
document.addEventListener("keydown", function(e){
  if (e.which === 13){
    document.body.style.background = "url('img/tengen_fight.gif') no-repeat";   
    document.body.style.backgroundSize = "cover";
  }})

document.addEventListener("keydown", function(event) {
    console.log(event.which);
  })