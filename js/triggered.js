//Globals
var cards = [];

var canvasState = 0;
var client = new Client();

function Client() {
	var cards = [];
	var host = false;
	var czar = false;

	var roomCode = "ASDF";
}

function setup() {
	canvas = createCanvas(windowWidth,windowHeight);
	canvas.parent('game');

	rectMode(CENTER);


	//Create/Join Room DOM Features
	roomCreate = createButton("Create New Game");
	roomCreate.position(20, 140);
	roomCreate.mousePressed(buildRoom);//Can't pass parameters to functions with this terrible lib.
	roomId = createInput();
	roomId.position(roomCreate.x + roomCreate.width + 20, roomCreate.y + 1);
	roomIdSubmit = createButton("Enter Room Code");
	roomIdSubmit.position(roomId.x + roomId.width, roomId.y - 1);
}

function draw() {
	background(255,255,255);
	switch(canvasState) {
		case 0: //Create or join room.
			push();
			textStyle(BOLD);
			textSize(80);
			text("TriggerWarning", 20, 100);
			roomCreate.show();
			roomId.show();
			roomIdSubmit.show();
			pop();
			break;
		case 1: //Display Room Creation Options.
			push();
			text(client.roomCode, 10 ,30);
			pop();
			break;
		case 2:
			push();

			pop();
			break;
		case 3:
			push();

			pop();
			break;
		default:
			push();

			pop();
			
	}
	push();
	text(floor(frameRate()), 10, 20);
	pop();
}
function windowResized() {
	resizeCanvas(windowWidth,windowHeight);
}

function buildRoom() {
	var cardSets = ["58e89f8646d21c0011cf5469"];
	var playerLimit = 10;
	var scoreLimit = 10;
	createRoom(playerLimit, scoreLimit, cardSets);
}



/*function Card(xStart, yStart, angle, width, cardText, type){
	this.x = xStart;
	this.y = yStart;
	this.w = width;
	this.h = width*1.5;
	this.a = angle;
	this.type = type;
	this.c;
	this.textC;
	if (this.type == "PROMPT") {
		this.c = blackCardColor;
		this.textC = whiteCardColor;
	}  else {
		this.c = whiteCardColor;
		this.textC = blackCardColor;
	}
	this.t = cardText;
	this.draw = function() {
		push();
		fill(this.c);
		stroke(bgColor);
		strokeWeight(4);
		translate(this.x, this.y);
		rotate(this.a);
		rect(0, 0, this.w, this.h, 10);

		fill(this.textC);
		noStroke();
		fill(75, 10, 80);
		rect(0, -this.h/2 + 20, this.w - 20, 20);
		this.a += .05;
		pop();
	}
}
function Hand() {
	this.cards = [];
	
	this.draw = function() {
		var x = this.width/2;
		var y = this.height;
		for (var i = 0; i < this.cards.length; i++) {
			var c = this.cards[i];
			c.a = .1*(i-this.cards.length/2);
			c.y = y + 40 - (5*abs(i-this.cards.length/2));
			c.draw(); 
		}
	}
}*/
