var socket = io('http://triggerwarning.herokuapp.com');
var getter = new Getter();
//Arrays of all cards in use. It is faster to pass an ID to these than to the database.
var whiteCards = new Array();
var blackCards = new Array();
//Go use REST API to get all the card packs returned...
getCards("58e89f8646d21c0011cf5469")

//Round begins. If the black card is a pick2, read an array of new white cards.
socket.on('roundBegin', function(data) {
	console.log("Round Began.");
	console.log(data);
});
//Round has timed out. Throw out cards until you are down to 9.
socket.on('roundTimeout', function(data) {
	console.log("Round Timed out");
	console.log(data);
});
//Everyone has played a card. Host chooses, Everyone else just displays the answers.
socket.on('roundChoose', function(data) {
	console.log("Round in Choose Phase.");
	console.log(data);
});
//Czar has chosen. Round is over and everyone gets a card.
socket.on('roundComplete', function(data) {
	console.log("Round is over.");
	console.log("data");
});


//If this client has been marked as a host, create a room.
function createGame(players, winningScore, cardSets) {
	var object = {
		cardSets: ["58e89f8646d21c0011cf5469"],
		playerLimit: 2,
		scoreLimit: 2
	}
	socket.emit('gameCreate', object);
	
	//Client Stuff
	isHost = true;
}
socket.on('gameCreated', function(data) {
	console.log("Room Created.");
	roomCode = data.roomCode;
	//Display the Room Id until the host presses a start button.
	canvasState = 1;
});
socket.on('gameStart', function(data) {
	//Set the gameState to 2. Someone gets a card czar boolean.
	canvasState = 2;
	
});

socket.on('firstHand', function(data) {
	console.log("First Hand Received.");
	hand = data;
	for (var i = 0; i < hand.length; i++) {
		console.log(getWhiteCardText(hand[i]));
	}
	
});

//Clients send a room id to the server and are placed into that room if it is found.
function joinGame(roomId) {
	var object = {
		roomCode: roomId
	}
	socket.emit('gameJoin', object);
}
socket.on('gameJoined', function(data) {
	console.log("Room Joined.");
	console.log(data);
	canvasState = 3;
	console.log("Connected to Room.");
});
socket.on('gameNotFound', function(data) {
	console.log("Room Not Found.");
	console.log(data);
	//Bring the user back to the room join form.
	canvasState = 0;
});
socket.on('playerJoin', function(data) {
	console.log("Player Joined. " + data.name);
	players.push(data.name);
});
socket.on('error', function(data) {
	console.log(data);
});
socket.on('gameFull', function(data) {
	socket.emit('gameStart');
});

//Play a Card.
function playCards(playedCards) {
	var object = {
		ids: []
	}
	for (var i = 0; i < playedCards.length; i++) {
		object.ids[i] = playedCards[i];
		console.log("Played " + object.ids[i]);
	}
}
//If you are the card czar, pick a card.
function pickCard(pickedCard) {
	var object = {
		id: pickedCard
	}
	socket.emit('pickCard', object);
	console.log("Picked " + object);
}




//Object to make requests of the REST API.
function Getter() {
	this.get = function(url, callback) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				callback(JSON.parse(req.response)[0]);
				
			}
		}
		req.open('GET', url, true);
		req.send(null);
		//console.log("I'm the human green screen.");
	}
	this.post = function(url, callback) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				callback(JSON.parse(req.response)[0]); }
		}
		req.open('POST', url, true);
		req.send(null);
		//console.log("Viner of the month.");
	}
}
function Card(id, text, type, draw, pick) {
	this.id = id;		//This card's ID. used as a key in the cards arrays.
	this.text = text;	//This card's full text.
	this.type = type;	//Black or White?
	this.draw = draw;	//How many cards to draw
	this.pick = pick;	//How many cards to pick and play.
}
//Use Getter to populate the local array of all white cards.
function getCards(collectionId) {
	getter.get('http://triggerwarning.herokuapp.com/api/cardsets/' + collectionId + '?population=true', function(response) {
		for (var i = 0; i < response.whiteCards.length; i++) {
			var cIn = response.whiteCards[i];
			var c = new Card(cIn._id, cIn.text, cIn.type, cIn.draw, cIn.pick);
			whiteCards[i] = {id:cIn._id, text:cIn.text, type:cIn.type, draw:cIn.draw, pick:cIn.pick};
			//console.log(whiteCards[i].text);
		}
		console.log("Built Local White Card Array.");
		for (var i = 0; i < response.blackCards.length; i++) { 
			var cIn = response.blackCards[i];
			var c = new Card(cIn.id, cIn.text, cIn.type, cIn.draw, cIn.pick);
			blackCards[cIn.id] = c;
		}
		console.log("Built Local Black Card Array.");
	});
}
//Use Getter to populate the local array of all black cards.
function getBlackCards(collectionId) {
	getter.get('url', function(response) {
		//Find the String in the response.
	});
}
//Retrieve the text of a white card based on its id. 
function getWhiteCardText(id) {
	for (var i = 0; i < whiteCards.length; i++) {
		if (whiteCards[i].id == id) {
			return whiteCards[i].text;
		}
	}
	return "Card Not Found";
}
//Retrieve the text of a black card based on its id.
function getBlackCardText(id) {
	return blackCards[id];
}


