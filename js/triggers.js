var socket = io('http://triggerwarning.herokuapp.com');
var getter = new Getter();
//Arrays of all cards in use. It is faster to pass an ID to these than to the database.
var whiteCards = new Array();
var blackCards = new Array();

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
function createRoom(players, winningScore, cardSets) {
	var object = {
		cardSets: ["58e887990d79340011e5f689"],
		playerLimit: players,
		scoreLimit: winningScore
	}
	socket.emit('gameCreate', object);
}
socket.on('gameCreated', function(data) {
	console.log("Room Created.");
	console.log(data);
	//Display the Room Id until the host presses a start button.
});


//Clients send a room id to the server and are placed into that room if it is found.
function joinRoom(roomId) {
	var object = {
		id: roomId
	}
	socket.emit('gameJoin', object);
}
socket.on('gameJoined', function(data) {
	console.log("Room Joined.");
	console.log(data);
	//Go use REST API to get all the card packs returned..
});
socket.on('gameNotFound', function(data) {
	console.log("Room Not Found.");
	console.log(data);
	//Bring the user back to the room join form.
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
			if (req.readystate == 4 && req.status == 200) {
				callback(req.responseText);
			}
		}
		req.open('GET', url, true);
		req.send(null);
		console.log("I'm the human green screen.");
	}
	this.post = function(url, callback) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readystate == 4 && req.status == 200) {
				callback(req.responseText);
			}
		}
		req.open('POST', url, true);
		req.send(null);
		console.log("Viner of the month.");
	}
}
function Card(id, text, type, draw, pick) {
	this.id = id;
	this.text = text;
	this.type = type;
	this.draw = draw;
	this.pick = pick;
}
//Use Getter to populate the local array of all white cards.
function getCards(collectionId) {
	getter.get('http://triggerwarning.herokuapp.com/api/cardsets/' + collectionId + '?population=true', function(response) {
		console.log(response);
		for (var i = 0; i < response.whiteCards.length; i++) {
			whiteCards[response.whiteCards[i].id] = response.whiteCards[i].text;
		}
		console.log("Got White Cards")
		for (var i = 0; i < response.blackCards.length; i++) { 
			blackCards[response.whiteCards[i].id] = response.blackCards[i].text;
		}
	});
}
//Use Getter to populate the local array of all black cards.
function getBlackCards(collectionId) {
	getter.get('url', function(response) {
		//Find the String in the response.
		console.log(response);
		text = "Temp Black Card Value, Rick fix this.";
		whiteCards[id] = text;
	});
}
//Retrieve the text of a white card based on its id. 
function getWhiteCardText(id) {
	return whiteCards[id];
}
//Retrieve the text of a black card based on its id.
function getBlackCardText(id) {
	return blackCards[id];
}
createRoom(69, 420);
