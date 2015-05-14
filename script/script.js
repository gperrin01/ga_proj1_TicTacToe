$(document).ready(function(){
  setUpEventListeners();
  updateRecapDivs();
}) // END DOC READY

/********************************
 THE STEPS         ****************************/

var battlefield = battlefieldInitialise();
var usedFields = [];
var allPlayers = allPlayersInitialise() ;
var player1 = allPlayers.player1;
var player2 = allPlayers.player2;
updateRecapDivs();
// NEXT do I want var player1 = prompt('What is your name?') ?
var whoseTurn = allPlayers.whoseTurn;
whoseTurn = player1.name;

// NEXT: randomize who starts: equal chances = pure random
// whoseTurn = Math.floor(Math.random()*10) % 2 ) ===0 ? player1 : player2;
// alert('Let us play! \n'+ whoseTurn+' will start! Click to choose your first move!');

/******************************* end Steps

THE EVENT LISTERNERS  ***********************/

function setUpEventListeners() {

  // Upon click, store the move and check if winner
  $('.battlefield li').on('click', function(){
    // get coord of where i clicked
    var x = getXAxis($(this));
    var y = getYAxis($(this));

    // only perform action if this area hasn't been clicked on before
    // Record(which player, which move, which area), then switch turn
    if ( usedFields.indexOf($(this).attr('id')) === -1 ) {
     if (whoseTurn === player1.name) {
        computeMoveAndCheck(player1, x, y, $(this) );
        whoseTurn = player2.name;
        } else {
        computeMoveAndCheck(player2, x, y, $(this) );
        whoseTurn = player1.name;       
      }
    } else { alert('Click on an available zone')  }     
  })
  $('#reset').on('click', resetBattlefield)
} 
/*********** End Listerners

THE FUNCTIONS       *******************************/

// Initialise: create battlefield and get players' avatars
function battlefieldInitialise (){
  // NEXT: choose your theme pacman/mario, add appropriate class to the background header etc
  return {
      'row1': [1,2,3],
      'row2': [4,5,6],
      'row3': [7,8,9] 
  };
}
function allPlayersInitialise() {
  var firstP = getPlayerName('First');
  var secondP = getPlayerName('Second');
  return {
    'player1': {'name': firstP, 'avatar': getPlayerAvatar(firstP), 'winCount': 0},
    'player2': {'name': secondP, 'avatar': getPlayerAvatar(secondP), 'winCount': 0}, 
    'whoseTurn': ''
     };
 }
function getPlayerName(player) {
  return prompt('Who is the '+player+ ' Player?');
 }
 function getPlayerAvatar(player) {
  switch (prompt('Hi '+player+', who do you want to be?\n'+'(P)acman, (R)ed ghost, (Y)ellow ghost, or Pac(W)oman?').toLowerCase() ) {
    case 'p':
      $()
      return 'img/avatars/pacman.png';
      break;
    case 'r':
      return 'img/avatars/ghost_red.png';
      break;
    case 'y':
      return 'img/avatars/ghost_yellow.png';
      break;
    case 'w':
      return 'img/avatars/pacwoman.png';
      break;
    default:
      alert("Please enter a valid key. Let's try again");
      getPlayerAvatar(player);
  }
}
function updateRecapDivs(){
  $('#p1 .icon_avatar').css("background-image", "url("+player1.avatar+")");
  $('#p1 .wincount p:first-child').text(player1.name);
  $('#p1 .wincount p:last-child').text('Wins: '+player1.winCount);
  // now update player2
  $('#p2 .icon_avatar').css("background-image", "url("+player2.avatar+")");
  $('#p2 .wincount p:first-child').text(player2.name);
  $('#p2 .wincount p:last-child').text('Wins: '+player2.winCount);
}

// Record moves and check if winner or tie

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

  // test put background image in <li>
  // NEXT PLAY SOUND
  $item.css("background-image", "url("+player.avatar+")");

  // $item.append(player.avatar);

  if (isWinning(player, x, y)  ) {
    player.winCount++;
    alert(player.name + ' wins!');
    // !!! WHY: at this stage how can i FREEZE the board? ie no further clicks impact anything? can I mute the event listernes? don't wanna do a reset
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
function resetBattlefield() {;
  battlefield = battlefieldInitialise();
  usedFields = [];
  whoseTurn = player1.name;
  // or random, or whoever started
  $('.battlefield li').css("background-image", 'none');
}

// Reset players
  // $('#p1 .icon_avatar, #p2 .icon_avatar').css("background-image", 'none');



