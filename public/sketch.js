var socket;
var highScore = 0;
var snake;
var food;
var scl = 20;
var movementScale = 20;

function setup() {
	frameRate(10);
	createCanvas(800, 800);
	snake = new Snake();
	food = new Food();
	food.setLocation();
	
	socket = io.connect('http://192.168.1.56:3000');
	
	socket.on('highScore', updateScore);
}

function updateScore(data){
	console.log("RECIEVING" + data);
	highScore = data.totalLength;
}

function keyPressed(){
	if((keyCode === 87 || keyCode === 38) && snake.yspeed !== 1){//up
		snake.dir(0,-1);
	}
	if((keyCode === 83 || keyCode === 40) && snake.yspeed !== -1){//down
		snake.dir(0,1);
	}
	if((keyCode === 68 || keyCode === 39) && snake.xspeed !== -1){//right
		snake.dir(1,0);
	}
	if((keyCode === 65 || keyCode === 37) && snake.xspeed !== 1){//left
		snake.dir(-1,0);
	}
}

function draw() {
	background(51);
	food.draw();
	if(snake.eat(food)){
		console.log("eat");
		snake.total++;
		food.setLocation();
	}
	snake.death();
	snake.update();
	snake.show();
	
	fill(255);
	text("LENGTH: " + nf(snake.total),700,25);
	text("High Score: " + nf(highScore),700,45);
}