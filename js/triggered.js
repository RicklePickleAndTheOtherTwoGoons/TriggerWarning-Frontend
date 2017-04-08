



var startingCards = 10;
//Globals
var bgColor;
var whiteCardColor;
var blackCardColor;
var cards = [];
//Card Class
function Card(xStart, yStart, angle, width, cardText, type, guid){
	this.guid = guid;
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
}

function setup() {
	canvas = createCanvas(windowWidth,windowHeight);
	canvas.parent('game');
	colorMode(HSB, 100, 100, 100);
	rectMode(CENTER);
	bgColor = color(100, 80, 50);
	whiteCardColor = color(220);
	blackCardColor = color(20);
	
	hand = new Hand();
	for (var i = 0; i < startingCards; i++) {
		hand.cards[i] =  new Card(0, 0, .5, 200, "Ayy", "OTHER", 123);
	}
}

function draw() {
	background(bgColor);
	hand.draw();
	//for (var i = 0; i < hand.cards.length; i++) {
	//	hand.cards[i].draw();
	//}
	text(frameRate(), 10, 20);
}
function windowResized() {
	resizeCanvas(windowWidth,windowHeight);
}
