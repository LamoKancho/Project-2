const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 15;
const paddleHeight = grid * 5; // 80
const maxPaddleY = canvas.height - grid - paddleHeight;

function attach_eventhandler(d){
  d.onclick = function(){
      this.style.visibility = "hidden";
  }
}
var myArray = document.getElementsByTagName("img");
for(var d of myArray){
attach_eventhandler(d);
}
// function disableScroll() {
//   scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
//     }
function disableScroll() {
  document.body.classList.add("stop-scrolling");
}


let paddleSpeed = 6;
let ballSpeed = 5 + 0.1;


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
let playerl = 
  document.querySelector('.playerl');
let playerr = 
  document.querySelector('.playerr');
let balgif =
  document.querySelector('#bal');
let h1gif =
  document.querySelector('#balpic2');
let gif =
  document.querySelector('img');

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

  // bal snelheid 
  dx: ballSpeed,
  dy: -ballSpeed
};

// kijkt of de objecten tegen elkaar gaan
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

  
  // de peddels laten bewegen
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;

  // zorgt ervoor dat de peddels niet door de muren gaan
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

  //tekent de peddels
  context.fillStyle = '#00c0f9';
  context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  context.fillStyle = '#fd0e0b';
  context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

  // beweegt de bal
  ball.x += ball.dx;
  ball.y += ball.dy;

  // zorgt ervoor dat de bal niet door de muren of peddels gaat
  if (ball.y < grid) {
    ball.y = grid;
    ball.dy *= -1;
  }
  else if (ball.y + grid > canvas.height - grid) {
    ball.y = canvas.height - grid * 2;
    ball.dy *= -1;
  }

  // reset de bal nadat iemand heeft gescoord
  if ( (ball.x > canvas.width) && !ball.resetting) {
    ball.resetting = true;
    alert("speler 1  heeft gescoord");
    score_val.innerHTML = +score_val.innerHTML + 1;

  // wacht even voordat het de bal terug gooit
    setTimeout(() => {
        ball.resetting = false;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
      }, 1000);

    }   
  
    if ( (ball.x < 0) && !ball.resetting) {
      ball.resetting = true;
      alert("speler 2  heeft gescoord");
    score_val2.innerHTML = +score_val2.innerHTML + 1;

  // wacht even voordat het de bal terug gooit
    setTimeout(() => {
      ball.resetting = false;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
    }, 1000);
  
  }

  // als de bal tegen een peddel gaat, verandert hij zijn richting
  if (collides(ball, leftPaddle)) {
    context.fillStyle = 'blue';  
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
    ball.dx *= -1;
    ballSpeed + 8;
    
    

    // beweegt de bal een beetje opzij zodat de collision niet 2 keer gebeurd
    ball.x = leftPaddle.x + leftPaddle.width;
  }
  else if (collides(ball, rightPaddle)) {
    ball.dx *= -1;
    ballSpeed + 8;

    // context.fillStyle = 'red';  
    // context.fillRect(ball.x, ball.y, ball.width, ball.height);
    // beweegt de bal een beetje opzij zodat de collision niet 2 keer gebeurd
    ball.x = rightPaddle.x - ball.width;
  }

  // tekent bal
  context.fillStyle = '#bb13fe';
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // tekent de muren
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, grid);
  context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

  // de gestipelde lijn in het midden
  for (let i = grid; i < canvas.height - grid; i += grid * 2) {
    context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
  }
}

// luistert naar de keyboard events om de peddels te bewegen
document.addEventListener('keydown', function(e) {

  // pijltoets omhoog
  if (e.which === 38) {
    rightPaddle.dy = -paddleSpeed;
  }
  // pijltoets omlaag
  else if (e.which === 40) {
    rightPaddle.dy = paddleSpeed;
  }

  // W toets
  if (e.which === 87) {
    leftPaddle.dy = -paddleSpeed;
  }
  // S toets
  else if (e.which === 83) {
    leftPaddle.dy = paddleSpeed;
  }
});


// luistert naar de keyboard events om de peddels te stoppen wanneer je niet meer drukt
document.addEventListener('keyup', function(e) {
  if (e.which === 38 || e.which === 40) {
    rightPaddle.dy = 0;
  }

  if (e.which === 83 || e.which === 87) {
    leftPaddle.dy = 0;
  }
});
function disableScroll() {
  // Get the current page scroll position
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

      // if any scroll is attempted, set this to the previous value
      window.onscroll = function() {
          window.scrollTo(scrollLeft, scrollTop);
      };
    }

// begin het spel
document.addEventListener("keydown", function(e){
    if (e.which === 13){
        requestAnimationFrame(start);
        message.innerHTML = null;
        message1.innerHTML = null;
        message2.innerHTML = null;
        message3.innerHTML = null;
        // balgif.innerText = '';
        // h1gif.innerText = '';
        // gif.innerText = '';
        // menu.innerHTML = '';
        score_title.innerHTML = score_val.innerHTML = 0, score_val2.innerHTML = 0;
        score_val.innerHTML = '0';
        score_val2.innerHTML = '0';
    }
})
// document.addEventListener("keydown", function(e){
//   if (e.which === 13){
//     document.body.style.background = "url('img/tengen_fight.gif') no-repeat";   
//     document.body.style.backgroundSize = "cover";
//   }})
document.addEventListener("keydown", function(event) {
    console.log(event.which);
  })


