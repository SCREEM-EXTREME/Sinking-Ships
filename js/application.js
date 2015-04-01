$(document).ready(function() {
var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  };
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
    
  }
},
var game = {
  gridSize:7,
  numShips: 3,
  shipLength:3,
  shipsSunk:0,
  ship
}

ship1 = [{location:["10","20","30"], hits: [" "," "," "]},
  ;

ship2 = {location:["26","36","46"], hits: [" "," "," "]},
  ;
 
ship3 = {location:["52","53","54"], hits: [" "," "," "]}], 

});

launchTorpedoes : function (guessXY)

	view.displayMiss("00");
    view.displayHit("34");
    view.displayMiss("55");
    view.displayHit("12");
    view.displayMiss("25");
    view.displayHit('26');
    view.displayMessage("Tap tap, is this thing on?");