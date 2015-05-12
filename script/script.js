$(document).ready(function(){
setUpEventListeners();
}) // END DOC READY

// THE STEPS 
var battlefield = {
  'row1': [1,2,3],
  'row2': [4,5,6],
  'row3': [7,8,9] 
}
var usedFields = [];
var allPlayers = {
  'player1': {'name': 'player1', 'avatar': 'X'},
  'player2': {'name': 'player2', 'avatar': 'O'},
  'whoseTurn': 'player1'
     };
var player1 = allPlayers.player1;
var player2 = allPlayers.player2;
// NEXT var player1 = prompt('What is your name?'); 
// NEXT choose your Avatar, NEXT: click on picture you want as avatar
// getPlayer_1_Avatar();

var whoseTurn = allPlayers.whoseTurn;
// NEXT: randomize who starts: equal chances = pure random
// whoseTurn = Math.floor(Math.random()*10) % 2 ) ===0 ? player1 : player2;
// alert('Let us play! \n'+ whoseTurn+' will start! Click to choose your first move!');

/* Steps: 
Player1 clicks and it updates the battlefield with his name on the corresponding element
Switch turns - player2 clicks and it updates with his name - but only if the area hasnt been clicked on before
*/

// END OF STEPS

// EVENT LISTERNERS

var setUpEventListeners = function(){

  // UPDATES ARRAY WHEN WE CLICK
  $('.battlefield li').on('click', function(){

    // get coord of where i clicked
    var x = getXAxis($(this));
    var y = getYAxis($(this));
    // only perform action if this area hasnt been clicked on before
    if ( usedFields.indexOf($(this).attr('id')) === -1 ) {

      if (whoseTurn === player1.name) {
        computeMove(player1, x, y, $(this) );
        // // PROBLEM this is pushing the whole <li> down !!!
        whoseTurn = player2.name;
        } else {
        computeMove(player2, x, y, $(this) )
        whoseTurn = player1.name;       
      }

    } else {
     alert('Click on an available zone')
   }     
  })

} // End Listerners

// THE FUNCTIONS

function getXAxis ($item) {
  // X axis in battlefield oject = id of the parent <ul>
  return $item.parent().attr('id');
}
function getYAxis ($item) {
  // Y axis is the Nth <li> of its siblings)
  return $item.index();
}

function computeMove(player,x,y, $item) {
  usedFields.push($item.attr('id'));
  battlefield[x][y] = player.name; 
  $item.append(player.avatar);
  // PROBLEM this is pushing the whole <li> down !!!
}

// function getPlayer_1_Avatar() {
//   avatar1 = prompt('Hey '+player1+ ', are you the X or the O type?');
// }
// function getPlayer_2_Avatar() {
//   avatar2 = prompt('Hey '+player2+ ', are you the X or the O type?');
// }



