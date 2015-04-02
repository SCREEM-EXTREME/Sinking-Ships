$(document).ready(function() {
// have to go thru and put in the $ whereever its required. 

//game parameters
var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  
// ship locations
  ships: [
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] }

  ],
//launching torpedoes (shots)

  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);

//if the choice (guess) has already been chosen and hit then let the user know

      if (ship.hits[index] === "hit") {
        view.displayMessage("Waste of torpedoes. You already hit these firing coordinates!");
        return true;
      } else if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");

        if (this.isSunk(ship)) {
          view.displayMessage("You destroyed one of my ships!");
          this.shipsSunk++;

        }
        return true;
      }
    }

    view.displayMiss(guess);
    view.displayMessage("Loser. You missed.");
    return false;

  },

  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++)  {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
      return true;
  },

//random choice of ship locations

  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }

  },

// random ship direction... on a row or a column...
  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if (direction === 1) { // horizontal
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    } else { // vertical
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      col = Math.floor(Math.random() * this.boardSize);

    }

    var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },

  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
}; 
















