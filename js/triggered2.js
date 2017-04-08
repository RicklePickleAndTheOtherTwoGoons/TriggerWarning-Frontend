var isHost = false;
var isCzar = true;
var roomCode = "";
var canvasState = 0;
var players = [];
var hand = []; //Array of IDs.
function setup() {
	canvas = createCanvas(windowWidth,windowHeight);
	canvas.parent('game');
	
	//Join/Create
	roomCreate = createButton("Create New Game");
	roomCreate.position(20, 140);
	roomCreate.mousePressed(createGameWrapper);//Can't pass parameters to functions with this terrible dom lib.
	

	roomId = createInput();
	roomId.position(roomCreate.x + roomCreate.width + 20, roomCreate.y + 1);
	
	roomIdSubmit = createButton("Enter Room Code");
	roomIdSubmit.position(roomId.x + roomId.width, roomId.y - 1);
	roomIdSubmit.mousePressed(joinGameWrapper);

	//Display Room Code
	gameStart = createButton("Start Game");
	gameStart.position(20, 140);
	gameStart.mousePressed(startGameWrapper);
	gameStart.hide();
	
}

function draw() {
	background(255,255,255);
	text(floor(frameRate()), 10, 20);
	switch(canvasState) {
		case 0: //Join or Create - Enter room number or create hardcoded room.
			push();
			textSize(80);
			text("TriggerWarning", 20, 100);
			roomCreate.show();
			roomId.show();
			roomIdSubmit.show();
			pop();
			break;
		case 1: //HOST - Display room Code.
			push();
			textSize(80);
			text(roomCode, 20, 100);
			roomCreate.hide();
			roomId.hide();
			roomIdSubmit.hide();
			gameStart.show();
			textSize(15);
			for (var i = 0; i < players.length; i++) {
				text(players[i], 20, 180 + (20*i));
			}
			pop();
			break;
		case 2: //Hand / Play
			push();
			if (isCzar) {
				textSize(80);
				text("You are the Card Czar.", 20, 100);
				textSize(60);
				text("Wait for other players, then judge them.", 20, 180);
				text("The text of a black card goes here, and on the host.", 20, 260);
			} else {
				textSize(80);
				text("Choose a card to play.", 20, 100);
				textSize(20);
				for (var i = 0; i < hand.length; i++) {
					text(whiteCards[hand[i]], 20, 140 + (20*i);
				}
			}
			pop();
			break;
		case 3: //Card Czar Wait
			push();
			
			pop();
			break;
		case 4: //Card Czar Select
			push();

			pop();
			break;
		case 0: //
			push();

			pop();
			break;
		default:

	}
}

function windowResized() {
	resizeCanvas(windowWidth,windowHeight);
}


//Wrappers around buttons actions.
function createGameWrapper() {
	console.log("Building Room...");
	createGame(10, 10, ["58e89f8646d21c0011cf5469"]);
}
function joinGameWrapper() {
	roomCode = roomId.value();
	console.log("Connecting To Room " + roomCode + "...");
	joinGame(roomCode.toUpperCase());
}
function startGameWrapper() {
	
}