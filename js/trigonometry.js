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
	var c = new CardContent(1, "Men's Rights activisim bleeding into the brony fandom.", 'white', 0, 0); //Use CardContent to make cards.
	card = new Card(c, 300, 300, 0, false); //Example of a card.
	card.flip();
	var cards = [];
	cards.push(card);
	cards.push(card);
	cards.push(card);
	cards.push(card);
	cards.push(card);
	cards.push(card);
	cards.push(card);
	cards.push(card);
	cards.push(card);
	cards.push(card);
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
	hand.draw();
	
	//bundle.draw(300, 200, 0);
	
	//pile.draw();
	//pole.draw();
	
	ps.draw();
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
	
	this.draw = function() {
		switch(this.cardsNeeded) { //Could do math for every possible case but we really only have 3 cases.
			case 1: //This may be the ugliest method in this codebase.
				var x1 = vars.xCenter;
				var y = vars.yCenter - vars.cardHeight / 2;
				if (this.currentlyPlaying[0] === undefined) {
					var c = new CardSpace(x1, y, 0);
					c.draw();
				} else {
					this.currentlyPlaying[0].draw(x1, y, 0);
				}
				break;
			case 2:
				var x1 = vars.xCenter - vars.cardWidth;
				var x2 = vars.xCenter + vars.cardWidth;
				var y = vars.yCenter - vars.cardHeight / 2;
				if (this.currentlyPlaying[0] === undefined) {
					var c = new CardSpace(x1, y, 0);
					c.draw();
				} else {
					this.currentlyPlaying[0].draw(x1, y, 0);
				}
				if (this.currentlyPlaying[1] === undefined) {
					var c = new CardSpace(x2, y, 0);
					c.draw();
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
					var c = new CardSpace(x1, y, 0);
					c.draw();
				} else {
					this.currentlyPlaying[0].draw(x1, y, 0);
				}
				if (this.currentlyPlaying[1] === undefined) {
					var c = new CardSpace(x2, y, 0);
					c.draw();
				} else {
					this.currentlyPlaying[1].draw(x2, y, 0);
				}
				if (this.currentlyPlaying[2] === undefined) {
					var c = new CardSpace(x3, y, 0);
					c.draw();
				} else {
					this.currentlyPlaying[2].draw(x3, y, 0);
				}
				break;
			default:
				console.log("Invalid cardsNeeded amount: " + this.cardsNeeded);
		}
	}
	
	this.addCard = function(card, position) {
	  if (position < this.cardsNeeded && position > 0 && card instanceof Card) {
	    this.currentlyPlaying[position] = card;
	  }
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
				if (mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2) {
					if (mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
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
				if (mouseX > this.x - (this.w / 2) && mouseX < (this.x + this.w / 2)) {
					if (mouseY > this.y - (this.h / 2) && mouseY < this.y + (this.h / 2)) {
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
	this.draw = function(x, y, r) {
		//Defaults.
		if (x === undefined || y === undefined) {
			x = this.x;
			y = this.y;
		}
		if (r === undefined) {
			r = 0;
		}
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
		rect(0, 0, vars.cardWidth, vars.cardHeight, 8);
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
			text("TRIGGER WARNING", 0, 0, vars.cardWidth - 20, 50);
		} else { 
			//Front of the card.
			textAlign(LEFT);
			text(this.content.fullText, 0, 0, vars.cardWidth - 30, vars.cardHeight - 30);
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
	this.yNoise = [];
	this.selected = -1;
	for (var i = 0; i < cards.length + 2; i++) {
		this.yNoise[i] = random(5);
	}
	this.rNoise = [];
	for (var i = 0; i < cards.length + 2; i++) {
	  this.rNoise[i] = random(.1) - .05;
	}
	
	this.draw = function() {
	  //Find Selected, Draw from outside in to the index, drawing it last.
	  var offset = vars.cardWidth/2;
	  if (this.selected > 0 && this.selected < this.cards.length) {
	    
	    for (var l = 0; l < this.selected; l++) {
	      this.cards[l].draw(200 + (offset*l), 200 + this.yNoise[l], this.rNoise[l]);
	    }
	    for (var r = cards.length - 1; r > this.selected; r--) {
	      this.cards[r].draw(200 + (offset*r), 200 + this.yNoise[r], this.rNoise[r]);
	    }
	    this.cards[this.selected].draw(200 + (offset*r), 200 + this.yNoise[r] + offset, this.rNoise[r]);
	  } else {
	    for (var i = 0; i < this.cards.length; i++) {
	      this.cards[i].draw(200 + (offset*i), 200 + this.yNoise[i], this.rNoise[i]);
	    }
	  }
	  
	  //for (var i = 0; i < cards.length; i++) {
      //this.cards[i].draw(200 + (vars.cardWidth*i), 200 + this.yNoise[i], this.rNoise[i]);
	  //}
	}
	/*this.draw = function() {
		if (mouseY > height - vars.cardHeight && mouseX > vars.xCenter - vars.cardWidth*3 && mouseX < vars.xCenter + vars.cardWidth * 3) {
			this.selected = floor((mouseX - (vars.xCenter - vars.cardWidth*3)) / (vars.cardWidth*6) * 10);
		} else {
			this.selected = -1;
		}
		//console.log("Drawing " + cards.length + " Cards.");
		for (var i = 0; i < cards.length; i++) {
			cardOffset = (cards.length - 1)/2;
			//console.log(cardOffset);
			xDifference = vars.cardWidth / 2.5;
			xRelative = vars.xCenter + (i - cardOffset) * xDifference;
			yDifference = height * .01;
			yRelative = (height - vars.cardHeight/3) + abs(i - cardOffset) * yDifference;
			rotation = (i - cardOffset) * vars.cardHandAngle;
			if (i == this.selected) {
				cards[i].draw(xRelative, yRelative - this.yNoise[i] - 10, rotation);
			} else {
				cards[i].draw(xRelative, yRelative - this.yNoise[i], rotation);
			}
		}
	}*/
	this.addCard = function(card) {
		
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
		}
		if (r === undefined) {
			r = 0;
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
}
function Trophy(x, y, scale) {
	this.draw = function() {
		console.log("Rick, fix this.");
	}
}
