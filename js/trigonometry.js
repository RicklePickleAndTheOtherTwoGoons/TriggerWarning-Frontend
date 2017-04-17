/** Globals **/
var vars;
var buttons = [];
var textBoxes = [];
/** Core Functions **/
//Happens once when the page is loading.
function preload() {}
//Happens once before the game starts.
function setup() {
	canvas = createCanvas(windowWidth,windowHeight);
	canvas.parent('game');
	colorMode(HSB, 100, 100, 100, 1);
	rectMode(CENTER);
	//Set up the vars object.
	vars = new CanvasVars();
	vars.calculate();
	vars.backgroundColor = color(1, 80, 60);
	vars.foregroundColor = color(0, 0, 100);//0 80 30
	vars.midrangeColor = color(0, 80, 50);
	vars.blackCardColor = color(0, 0, 20);
	vars.whiteCardColor = color(0, 0, 95);
	
	//Build Buttons and TextBoxes.
	
	var createGameButton = new Button(vars.xCenter, 200, "New Game", function() {
		console.log("New Game.");
	});
	var joinGameText = new TextBox(vars.xCenter, 300, 4);
	var joinGameButton = new Button(vars.xCenter, 360, "Join Game", function() {
		console.log("Join Game: " + joinGameText.getValue());
	});
	
	//Testing Cards.
	var c0c = new CardContent(1, "Men's Rights activisim bleeding into the brony fandom.", 'white', 0, 0); //Use CardContent to make cards.
	var c2c = new CardContent(1, "2", 'white', 0, 0);
	var c3c = new CardContent(1, "3", 'white', 0, 0);
	var c4c = new CardContent(1, "4", 'white', 0, 0);
	var c5c = new CardContent(1, "5", 'white', 0, 0);
	var c6c = new CardContent(1, "6", 'white', 0, 0);
	var c7c = new CardContent(1, "7", 'white', 0, 0);
	var c8c = new CardContent(1, "8", 'white', 0, 0);
	var c9c = new CardContent(1, "9", 'white', 0, 0);
	var c1c = new CardContent(1, "1", 'white', 0, 0);
	card = new Card(c0c, 300, 300, 0, false); //Example of a card.
	c2 = new Card(c2c, 200, 100, 0, false);
	c3 = new Card(c3c, 0, 0, 0, false);
	c4 = new Card(c4c, 0, 0, 0, false);
	c5 = new Card(c5c, 0, 0, 0, false);
	c6 = new Card(c6c, 0, 0, 0, false);
	c7 = new Card(c7c, 0, 0, 0, false);
	c8 = new Card(c8c, 0, 0, 0, false);
	c9 = new Card(c9c, 0, 0, 0, false);
	c1 = new Card(c1c, 0, 0, 0, false);
	//card.flip();
	var cards = [];
	cards.push(card);
	cards.push(c2);
	cards.push(c3);
	cards.push(c4);
	cards.push(c5);
	cards.push(c6);
	cards.push(c7);
	cards.push(c8);
	cards.push(c9);
	cards.push(c1);
	hand = new Hand(cards); //Example of a hand of cards.
	var lessCards = [];
	lessCards.push(card);
	lessCards.push(card);
	lessCards.push(card);
	bundle = new Bundle(lessCards); //Example of a bundle of cards.
	
	bandle = new Bundle(lessCards);
	bondle = new Bundle(lessCards);
	var bs = [];
	bs.push(bundle);
	bs.push(bandle);
	bs.push(bondle);
	
	pile = new Pile(width - 400, 200, bs); //Example of a pile of bundles.
	pole = new Pile(width - 400, 600, lessCards);
	
	ps = new PlaySpace(3);
	
}
//Happens many times a second.
function draw() {
	background(vars.backgroundColor);
	//textSize(vars.largeTextSize);
	//textStyle(BOLD);
	//textAlign(CENTER);
	//fill(vars.foregroundColor);
	//text("Trigger Warning", vars.xCenter, vars.largeTextSize + 10);
	//textSize(vars.smallTextSize);
	//text("Like Cards Against Humanity, but legally separate.", vars.xCenter, vars.largeTextSize + vars.smallTextSize + 40);
	//text("- OR -", vars.xCenter, 255);
	//for (var i = 0; i < buttons.length; i++) {
		//buttons[i].draw();
	//}
	//for (var i = 0; i < textBoxes.length; i++) {
		//textBoxes[i].draw();
	//}
	//card.draw(300, 600, 2);
	ps.draw();
	hand.draw(ps);
	
	//bundle.draw(300, 200, 0);
	
	//pile.draw();
	//pole.draw();
	
	
}
//Happens when the user resizes their browser window.
function windowResized() {
	resizeCanvas(windowWidth,windowHeight);
	vars.calculate();
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].move(vars.xCenter, buttons[i].y);
	}
	for (var i = 0; i < textBoxes.length; i++) {
		textBoxes[i].move(vars.xCenter, textBoxes[i].y);
	}
}
//Happens when the user presses any key on their keyboard.
function keyPressed() {
	for (var i = 0; i < textBoxes.length; i++) {
		textBoxes[i].input();
	}
	
}
function mousePressed() {
	vars.mousePressedX = mouseX;
	vars.mousePressedY = mouseY;
}

/** Objects **/
function CanvasVars() {
	this.backgroundColor;
	this.foregroundColor;
	this.blackCardColor;
	this.whiteCardColor;
	
	this.xCenter;
	this.yCenter;
	this.cardWidth;
	this.cardHeight;
	
	this.largeTextSize;
	this.mediumTextSize;
	this.smallTextSize;
	
	this.mousePressedX;//Position of the mouse when the button was pressed.
	this.mousePressedY;
	
	this.calculate = function () {
		this.xCenter = width / 2;
		this.yCenter = height / 2;
		this.cardWidth = width / 10;
		this.cardHeight = this.cardWidth * 1.5;
		this.largeTextSize = max(new Array(ceil(width*0.05), 36));
		this.mediumTextSize = max(new Array(ceil(width*0.015), 18));
		this.smallTextSize = max(new Array(ceil(width*0.01), 10));
	}
}
//PlaySpace is where cards are played to locally. Global object though.
function PlaySpace(cardsNeeded) {
	this.currentlyPlaying = []; // Array of cards to be turned into a bundle when confirmed.
	this.cardsNeeded = cardsNeeded;// How many cards do we need to put in the bundle? 1,or 3
	this.cardSpaces = [];
	this.submitButton = new Button(vars.xCenter, vars.yCenter - vars.cardHeight - 30, "Submit Cards", this.submitCards);
	for (var i = 0; i < this.cardsNeeded; i++) {
		this.cardSpaces[i] = new CardSpace;
	}
	this.draw = function() {
		switch(this.cardsNeeded) { //This may be the ugliest method in this codebase.
			case 1: 
				var x1 = vars.xCenter;
				var y = vars.yCenter - vars.cardHeight / 2;
				if (this.currentlyPlaying[0] === undefined) {
					this.cardSpaces[0].draw(x1, y, 0);
				} else {
					this.currentlyPlaying[0].draw(x1, y, 0);
				}
				break;
			case 2:
				var x1 = vars.xCenter - vars.cardWidth;
				var x2 = vars.xCenter + vars.cardWidth;
				var y = vars.yCenter - vars.cardHeight / 2;
				if (this.currentlyPlaying[0] === undefined) {
					this.cardSpaces[0].draw(x1, y, 0);
				} else {
					this.currentlyPlaying[0].draw(x1, y, 0);
				}
				if (this.currentlyPlaying[1] === undefined) {
					this.cardSpaces[1].draw(x2, y, 0);
				} else {
					this.currentlyPlaying[1].draw(x2, y, 0);
				}
				break;
			case 3:
			  
				var x1 = vars.xCenter - vars.cardWidth * 1.5;
				var x2 = vars.xCenter;
				var x3 = vars.xCenter + vars.cardWidth * 1.5;
				var y = vars.yCenter - vars.cardHeight / 2;
				if (this.currentlyPlaying[0] === undefined) {
					this.cardSpaces[0].draw(x1, y, 0);
				} else {
					this.currentlyPlaying[0].draw(x1, y, 0);
				}
				if (this.currentlyPlaying[1] === undefined) {
					this.cardSpaces[1].draw(x2, y, 0);
				} else {
					this.currentlyPlaying[1].draw(x2, y, 0);
				}
				if (this.currentlyPlaying[2] === undefined) {
					this.cardSpaces[2].draw(x3, y, 0);
				} else {
					this.currentlyPlaying[2].draw(x3, y, 0);
				}
				break;
			default:
				console.log("Invalid cardsNeeded amount: " + this.cardsNeeded);
		}
		//Determine if a filled playspace has been clicked, signalling that the user wants to return a card to their hand.
		if (mouseIsPressed) {
			for (var i = 0; i < this.cardsNeeded; i++) {
				if (this.currentlyPlaying[i] != undefined && this.cardSpaces[i].containsPoint(vars.mousePressedX, vars.mousePressedY)) {
					console.log("Returning a card to your hand.");
					hand.addCard(this.currentlyPlaying[i]);
					this.currentlyPlaying[i] = undefined;
				}
			}
		}
		//Find out if all cardSpaces have been filled, and display the submit button if they have.
		var complete = true;
		for (var i = 0; i < this.cardsNeeded; i++) {
			if (this.currentlyPlaying[i] === undefined) {
				complete = false
			}
		}
		if (complete) {
			this.submitButton.show();
		} else {
			this.submitButton.hide();
		}
		this.submitButton.draw();
	}
	//Return -1 for a failure, or the position of the card for success.
	this.addCard = function(card, x, y, hand) {
		var position = -1;
		for (var i = 0; i < this.cardsNeeded; i++) {
			if (this.cardSpaces[i].containsPoint(x, y)) {
				position = i;
			}
		}
		if (position < this.cardsNeeded && position >= 0 && card instanceof Card) {
			console.log("Checking Playspace Position "+ position);
			if (this.currentlyPlaying[position] === undefined) {
				console.log("All Good!");
				this.currentlyPlaying[position] = card;
				return position;
			} else {
				console.log("Returning an already played card to your hand.");
				hand.addCard(this.currentlyPlaying[position]);
				this.currentlyPlaying[position] = card;
				return position;
				
			}
			
		}
		return -1;
	}
	//Sends the currentlyPlaying Array to the server.
	this.submitCards = function() {
		console.log("Not Yet Implemented.");
	}
}
function Button(x, y, value, callback) {
	this.x = x;
	this.y = y;
	this.value = value;
	this.w = value.length * vars.smallTextSize*1.2;
	this.h = vars.smallTextSize * 2;

	this.visible = true;
	this.disable = -1;
	//Add this button to the buttons array.
	buttons.push(this);
	
	this.draw = function() {
		if (this.disable != -1 && this.disable <= frameCount) {
			//Reenable after clicking
			this.disable = -1;
		}
		if (this.visible) {
			//Step
			if (mouseIsPressed && this.disable == -1) {
				if (vars.mousePressedX > this.x - this.w / 2 && vars.mousePressedX < this.x + this.w / 2) {
					if (vars.mousePressedY > this.y - this.h / 2 && vars.mousePressedY < this.y + this.h / 2) {
						this.clicked();
						//Disable for .5 seconds to avoid sending multiple messages.
						this.disable = frameCount + 15;
					}
				}
			}
			
			//Draw
			push();
			strokeWeight(3);
			stroke(vars.foregroundColor);
			fill(vars.midrangeColor);
			rect(this.x, this.y, this.w, this.h, 5);
			noStroke();
			textSize(vars.smallTextSize);
			textAlign(CENTER);
			fill(vars.foregroundColor);
			text(this.value, this.x, this.y + vars.smallTextSize / 2.5);	
			pop();
		}
	}
	
	this.clicked = function() {
		callback();
	}
	this.move = function(x, y) {
		this.x = x;
		this.y = y;
		this.w = value.length * vars.smallTextSize*1.2;
		this.h = vars.smallTextSize * 2;
	}
	this.hide = function() {
		this.visible = false;
	}
	this.show = function() {
		this.visible = true;
	}
}

function TextBox(x, y, length) {
	this.x = x;
	this.y = y;
	this.value = "";
	this.length = length;
	this.w = length * vars.mediumTextSize*1.2;
	this.h = vars.mediumTextSize * 2;

	this.visible = true;
	this.focused = true;
	//Add this button to the buttons array.
	textBoxes.push(this);
	
	this.draw = function() {
		if (this.visible) {
			//Step
			if (mouseIsPressed) {
				if (vars.mousePressedX > this.x - (this.w / 2) && vars.mousePressedX < (this.x + this.w / 2)) {
					if (vars.mousePressedY > this.y - (this.h / 2) && vars.mousePressedY < this.y + (this.h / 2)) {
						this.clicked();
					} else {
						this.defocus();
					}
				} else {
					this.defocus();
				}
			}
			//Draw
			push();
			if (this.focused) {
				strokeWeight(3);
				stroke(vars.foregroundColor);
			} else {
				noStroke();
			}
			
			fill(vars.midrangeColor);
			rect(this.x, this.y, this.w, this.h, 5);
			noStroke();
			textSize(vars.mediumTextSize);
			textAlign(CENTER);
			fill(vars.foregroundColor);
			text(this.value, this.x, this.y + vars.mediumTextSize / 2.5);	
			pop();
		}
	}
	
	this.clicked = function() {
		this.makeFocused();
	}
	this.input = function() {
		if (this.focused && this.value.length < this.length ) {
			if (key >= 'A' && key <= 'Z') {
				this.value += key;
				key = '';
			} else if (key >= 'a' && key <= 'z') {
				this.value += key.toUpperCase();
				key = '';
			}
		}
		if (this.focused && this.value.length > 0) {
			if (keyCode == DELETE) {
				this.value = this.value.substring(0, this.value.length - 1);
			}
		}
	}
	this.getValue = function() {
		return this.value;
	}
	this.move = function(x, y) {
		this.x = x;
		this.y = y;
		this.w = this.length * vars.mediumTextSize*1.2;
		this.h = vars.mediumTextSize * 2;
	}
	this.makeFocused = function() {
		this.focused = true;
		for (var i = 0; i < textBoxes.length; i++) {
			if (textBoxes[i] != this) {
				textBoxes[i].defocus();
			}
		}
	}
	this.defocus = function() {
		this.focused = false;
	}
	this.hide = function() {
		this.visible = false;
	}
	this.show = function() {
		this.visible = true;
	}
}

function CardContent(id, fullText, color, draw, pick) {
	this.id = id;
	this.fullText = fullText;
	this.color = color; //Either 'black' or 'white'
	this.draw = draw; //0 for white.
	this.pick = pick; //0 for white.
	this.custom = false;
}

function Card(content, x, y, rotation, focused) {
	this.content = content;
	this.x = x;
	this.y = y;
	this.r = rotation;
	this.focused = focused;
	this.flipped = false;
	this.draw = function(x, y, r, s) {
		//Defaults.
		if (x === undefined || y === undefined) {
			x = this.x;
			y = this.y;
		}
		if (r === undefined) {
			r = this.r;
		}
		if (s === undefined) {
			s = 1;
		}
		var cardWidth = vars.cardWidth * s;
		var cardHeight = vars.cardHeight * s;
		//Draw.
		push();
		translate(x, y);//Rotate to the correct angle.
		rotate(r);
		//Draw the shape of the card.
		if (this.content.color == 'white') { //Figure out Colors.
			fill(vars.whiteCardColor);
		} else {
			fill(vars.blackCardColor);
		}
		stroke(vars.backgroundColor);
		strokeWeight(4);
		rect(0, 0, cardWidth, cardHeight, 8);
		//Draw the text of the card.
		if (this.content.color == 'white') {
			fill(vars.blackCardColor);
		} else {
			fill(vars.whiteCardColor);
		}
		noStroke();
		if (this.flipped) { 
			// Back of the card.
			textAlign(CENTER);
			text("TRIGGER WARNING", 0, 0, cardWidth - 20, 50);
		} else { 
			//Front of the card.
			textAlign(LEFT);
			text(this.content.fullText, 0, 0, cardWidth - 30, cardHeight - 30);
		}
		
		pop();
	}
	this.flip = function(input) {
		if (input === undefined) {
			this.flipped = !(this.flipped);
		}
		else this.flipped = input;
	}
}
//Some number of cards to be kept together. Used for draw 2 pick 3.
function Bundle(cards) {
	this.cards = cards;//Array of cards, in order
	
	this.draw = function(x, y, r) {
		for (var i = 0; i < cards.length; i++) {
			cards[i].draw(x + (i * 0), y + (i * 0), r + (i / 10));
		}
	}
	this.flip = function() {
		for (var i = 0; i < cards.length; i++) {
			cards[i].flip();
		}
	}
	this.addCard = function(card) {
		this.cards.push(card);
	}
	this.removeCard = function(i) {
		console.log("Unimplemented. Sorry");
	}
	this.getCard = function(i) {
		console.log("Unimplemented. Sorry");
	}
}
//A collection of cards that can be played. There should only be one of these.
function Hand(cards) {
	this.cards = cards;
	this.moving = false;
	this.movingCardXOffset = 0;
	this.movingCardYOffset = 0;
	this.movingCard = null;
	this.yNoise = [];
	this.selected = 4;
	for (var i = 0; i < cards.length + 2; i++) {
		this.yNoise[i] = random(5);
	}
	this.rNoise = [];
	for (var i = 0; i < cards.length + 2; i++) {
	  this.rNoise[i] = random(.1) - .05;
	}
	
	this.draw = function(playspace) {
	  	//Assign X positions to cards.
		var offset = vars.cardWidth / 2;
		for (var i = 0; i < cards.length; i++) {
			cards[i].x = (vars.xCenter - offset * ((cards.length/2) - .5)) + (offset * i);
			cards[i].y = height - vars.cardWidth/2 + this.yNoise[i];
			cards[i].r = this.rNoise[i];
		}
		if (this.moving) {
			//Assign Positional values to movingCard.
			this.movingCard.x = mouseX + this.movingCardXOffset;
			this.movingCard.y = mouseY + this.movingCardYOffset;
			if (!mouseIsPressed) { //Mouse has been released. check where.
				if (playspace != undefined) { //Find a way to test where the card is in relation to CardSpaces.
					if (playspace.addCard(this.movingCard, this.movingCard.x, this.movingCard.y, this) == -1) { //addCard Failed.
						this.cards.push(this.movingCard);
						this.movingCard = null;
						this.moving = false;
						console.log("Failed move (addCard Failed). Returning card to your hand.");
					} else {
						this.movingCard = null;
						this.moving = false;
						console.log("Move Successful!");
					}
				} else { // Failed move.
					this.cards.push(this.movingCard);
					this.movingCard = null;
					this.moving = false;
					console.log("Failed move (There is no playspace?). Returning card to your hand.");
				}
			}
		} else {
			//Find the selected card or if selected is -1.
			var leftBound = cards[0].x - (vars.cardWidth/2);
			var rightBound = cards[cards.length - 1].x + (vars.cardWidth/2);
			if (mouseX > leftBound && mouseX < rightBound && mouseY > cards[0].y - vars.cardWidth/2) {
				var minDiff = width;
				for (var i = 0; i < cards.length; i++) {
					var diff = abs(cards[i].x - mouseX);
					if (diff < minDiff) {
						minDiff = diff;
						this.selected = i;
					}
				}
			} else {
				this.selected = -1;
			}
			//Check if we need to start moving a card.
			if (mouseIsPressed && this.selected >= 0) { 
				//Change a selected card into a moving card.
				this.movingCard = this.cards.splice(this.selected, 1)[0];
				this.movingCardXOffset = this.movingCard.x - mouseX;
				this.movingCardYOffset = this.movingCard.y - mouseY;
				this.selected = -1;
				this.moving = true;
			}
		}
		
		
		
		//Draw from outside in to the index, drawing it last.
		if (this.selected == undefined) {
			this.selected = -1;
		}
	  	if (this.selected >= 0 && this.selected < this.cards.length) {
	    		for (var l = 0; l < this.selected; l++) {
	      			this.cards[l].draw();
	    		}
	    		for (var r = cards.length - 1; r > this.selected; r--) {
	      			this.cards[r].draw();
	    		}
	    		this.cards[this.selected].draw(undefined, undefined, undefined, 1.2);
	  	} else {
	    		for (var i = 0; i < this.cards.length; i++) {
	      			this.cards[i].draw();
	   		}
		}
		//Draw the moving card, if there is one.
		if (this.movingCard != null) {
			this.movingCard.draw(undefined, undefined, undefined, 1.2);
		}
	}
	this.addCard = function(card) {
		this.cards.push(card);
	}
	this.removeCard = function(index) {
		
	}
	this.addBundle =function(bundle) {
	  
	}
}

//A pile of cards or bundles of cards.
function Pile(x, y, bundles) {
	this.draw = function() {
		if (this.visible) {
			for (i = 0; i < bundles.length; i++) {
				xCalc = x + this.xNoise[i];
				yCalc = y + this.yNoise[i];
				bundles[i].draw(xCalc, yCalc, this.rotations[i]);
			}
		}
	}
	this.addCard = function(card) { //Puts a card into a bundle, puts that bundle in the pile.
		var b = [];//Wraps the card in a bundle.
		b.push(card);
		this.bundles.push(b);
		this.xNoise.push(random(this.spread*2 - this.spread));
		this.yNoise.push(random(this.spread*2 - this.spread));
		this.rotations.push(random(2 * PI));
	  
	}
	this.addBundle = function(bundle) { //Puts a bundle in the pile.
		this.bundles.push(bundle);
		this.xNoise.push(random(this.spread*2 - this.spread));
		this.yNoise.push(random(this.spread*2 - this.spread));
		this.rotations.push(random(2 * PI));
	}
	this.getCard = function(i) { //Returns a single card, rather than a bundle. Useful if you used addCard.
		return bundles[i].cards[0];
	}
	
	//Constructor.
	this.x = x;
	this.y = y;
	this.bundles; //An array of bundles.
	this.spread = vars.cardWidth;
	this.xNoise = [];
	this.yNoise = [];
	this.rotations = [];
	this.visible = true;
	
	if (bundles === undefined) { //Initialize Bundles.
		this.bundles = []; //Empty Pile.
	} else {
		if (bundles[0] instanceof Bundle) {
			this.bundles = bundles;
		} else {  //Some idiot put cards into a bundle holder. Update them.
			this.bundles = [];
			for (var i = 0; i < bundles.length; i++) {
				this.addCard(bundles[i]);
			}
		}
	}
	for (var i = 0; i < bundles.length; i++) {
		this.xNoise[i] = random(this.spread*2 - this.spread);
		this.yNoise[i] = random(this.spread*2 - this.spread);
		this.rotations[i] = random(2*PI);
	}
}

/** Shapes **/
function CardSpace(x, y, r){
	this.x = x;
	this.y = y;
	this.r = r;
	
	this.draw = function(x, y, r) {
		//Defaults.
		if (x === undefined || y === undefined) {
			x = this.x;
			y = this.y;
		} else {
			this.x = x;
			this.y = y;
		}
		if (r === undefined) {
			r = r;
		} else {
			this.r = r;
		}
		//Draw.
		push();
		translate(x, y);//Rotate to the correct angle.
		rotate(r);
		//Draw the shape of the card.
		noFill();
		stroke(vars.foregroundColor);
		strokeWeight(4);
		rect(0, 0, vars.cardWidth, vars.cardHeight, 8);
		
		pop();
	}
	//Returns true if the provided xy coordinates are within the bounds of the playspace.
	this.containsPoint = function (x, y) {
		if (x > this.x - vars.cardWidth / 2 && x < this.x + vars.cardWidth / 2 && y > this.y - vars.cardHeight / 2 && y < this.y + vars.cardHeight / 2) {
			return true;
		}
		return false;
	}
}
function Trophy(x, y, scale) {
	this.draw = function() {
		console.log("Rick, fix this.");
	}
}
