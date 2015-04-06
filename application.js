//$(document).ready(function() {
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

// random ship direction... on a row or a column...would never had know how to do this without help from the web
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

var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  },

  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
}; 

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

var controller = {
  guesses: 0,
  processGuess: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
          view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
      }

    }

  }

}

// parse choices from the user

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  if (guess === null || guess.length !== 2) {
    alert("Oops, please enter a letter and a number on the board.");
  } else {
    var firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);
    if (isNaN(row) || isNaN(column)) {
      alert("Oops, that isn't on the board.");
    } else if (row < 0 || row >= model.boardSize ||
               column < 0 || column >= model.boardSize) {
      alert("Oops, that's off the board!");
    } else {
      return row + column;
    }

  }
  return null;

}

// events

function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value.toUpperCase();
  controller.processGuess(guess);
  guessInput.value = "";

}

function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");

  if (e.keyCode === 13) {

    fireButton.click();

    return false;
  }

}

// took this from another program I found...

window.onload = init;

function init() {
  // Launch! button onclick handler

  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;

  // handle "return" key press so easier to use and not just pressing the launch button all the time
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

  // puts the ships on the game board

  model.generateShipLocations();

}
