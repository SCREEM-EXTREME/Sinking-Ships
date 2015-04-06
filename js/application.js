var board = [[null, null, null, null, null, null, null ],
             [null, null, null, null, null, null, null ],
             [null, null, null, null, null, null, null ],
             [null, null, null, null, null, null, null ],
             [null, null, null, null, null, null, null ],
             [null, null, null, null, null, null, null ],
             [null, null, null, null, null, null, null ]];

var numOfBoats = 5;
var numOfGuesses = 0;

// put 5 pieces in the board ramdomly and mark them all as one
var setup = function () {
  i = 0;
  while (i < numOfBoats) {
    var x = Math.floor(Math.random() * 6) ;
    var y = Math.floor(Math.random() * 6) ;
    
    if (board[x][y] !== 1) {
      board[x][y] = 1;
      console.log("boats at " + x + " ," + y);
      i++
    }
  }
}

// identify which td user clicked
$(document).on('click',"td",function(){
  // <td id="00"></td>

  if (numOfBoats > 0) {

    var x = $(this).attr("id")[0];
    var y = $(this).attr("id")[1];

    console.log("in this position: (" + x + ", " + y + ") we have a " + board[x][y]);
    numOfGuesses++; 

    //messageBoard info
    if (board[x][y] == 1) {
      numOfBoats--;
      //alert("it's a hit!");
      $('#messageBoard').text("It's a hit and you have " + numOfBoats +" left.")
      $(this).css({
        
        "background":"url('image/battleship-target-pics.gif') no-repeat center center", 
        "background-color":"red"
      });
    } else {
      board[x][y] = 0
      //alert("too bad, missed"); 
      $(this).css({
        
        "background":"url('image/Missed_1.png') no-repeat center center",
        "background-color":"green",
        
      });
console.log(this);
    } 

    // keep track of the total number of guesses
    if (numOfBoats == 0) {
      alert("You have won in " + numOfGuesses + " guesses.")
      //view.messageBoard("You have won in " + numOfGuesses + " guesses."); 
      // selecting an element by ID
      $('#messageBoard').text("You have won in " + numOfGuesses + " guesses.")
      
    }
  }
});

setup();
console.log(board);
