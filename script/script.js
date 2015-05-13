$(document).ready(function(){
setUpEventListeners();

// THE STEPS 
var battlefield = {
  'row1': [1,2,3],
  'row2': [4,5,6],
  'row3': [7,8,9] 
};
// WHY: when I did var battlefieldInit, then var battle = battleInit, for the duration of the program, Init gets all values that I pass to battle only??
var usedFields = [];
var allPlayers = {
  'player1': {'name': 'player1', 'avatar': 'X', 'winCount': 0},
  'player2': {'name': 'player2', 'avatar': 'O', 'winCount': 0}, 
  'whoseTurn': ''
     };
var player1 = allPlayers.player1;
var player2 = allPlayers.player2;
// NEXT var player1 = prompt('What is your name?'); 
// NEXT choose your Avatar, NEXT: click on picture you want as avatar
// getPlayer_1_Avatar();

var whoseTurn = allPlayers.whoseTurn;
whoseTurn = player1.name;
// NEXT: randomize who starts: equal chances = pure random
// whoseTurn = Math.floor(Math.random()*10) % 2 ) ===0 ? player1 : player2;
// alert('Let us play! \n'+ whoseTurn+' will start! Click to choose your first move!');

// END OF STEPS

// EVENT LISTERNERS
function setUpEventListeners() {

  // Upon click, store the move and check if winner
  $('.battlefield li').on('click', function(){
  // get coord of where i clicked
    var x = getXAxis($(this));
    var y = getYAxis($(this));
    // only perform action if this area hasn't been clicked on before
    if ( usedFields.indexOf($(this).attr('id')) === -1 ) {
     if (whoseTurn === player1.name) {
        computeMoveAndCheck(player1, x, y, $(this) );
        // !!! PROBLEM this is pushing the whole <li> down !!!
        whoseTurn = player2.name;
        } else {
        computeMoveAndCheck(player2, x, y, $(this) );
        whoseTurn = player1.name;       
      }
    } else { alert('Click on an available zone')  }     
  })

  $('#reset').on('click', resetBattlefield)

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

function computeMoveAndCheck(player, x, y, $item) {
  // update usedFields with my move, and battlefield array with player.name
  usedFields.push($item.attr('id'));
  battlefield[x][y] = player.name; 
  $item.append(player.avatar);
  // PROBLEM this is pushing the whole <li> down !!!
  if (isWinning(player, x, y)  ) {
    player.winCount++;
    alert(player.name + ' wins!');
    // PROBLEM: at this stage how can i FREEZE the board? ie no further clicks impact anything? can I mute the event listernes? don't wanna do a reset
  } else if (usedFields.length === 9){
    return alert('Tie game!')
    }
}
function isWinning(player, x, y) {
  return isWinningRow(player, x, y) || isWinningColumn(player, x, y) || isWinningDiagonal(player, x, y);
}
function isWinningRow(player, x, y) {
  // is current row all player.name?
  return JSON.stringify([player.name, player.name, player.name]) === JSON.stringify(battlefield[x]);
  // PROBLEM: why does it not work without the JSON.string?? 2 bits are the same on the console but i get === false
}
function isWinningColumn(player, x, y) {
  // column is defined by y, pass the 3 other rows
  return JSON.stringify(battlefield['row1'][y]) === JSON.stringify(battlefield['row2'][y]) &&  JSON.stringify(battlefield['row2'][y]) === JSON.stringify(battlefield['row3'][y]);
}
function isWinningDiagonal(player, x, y) {
  // only two possible diagonal combo
  return ( JSON.stringify(battlefield['row1'][0]) === JSON.stringify(battlefield['row2'][1]) &&  JSON.stringify(battlefield['row2'][1]) === JSON.stringify(battlefield['row3'][2]) )
    || (  JSON.stringify(battlefield['row1'][2]) === JSON.stringify(battlefield['row2'][1]) &&  JSON.stringify(battlefield['row2'][1]) === JSON.stringify(battlefield['row3'][0]) );
}
function resetBattlefield() {
  battlefield = {
  'row1': [1,2,3],
  'row2': [4,5,6],
  'row3': [7,8,9] 
};
  usedFields = [];
  whoseTurn = player1.name;
  // or random, or whoever started
  $('.battlefield li').text('');
}


}) // END DOC READY
