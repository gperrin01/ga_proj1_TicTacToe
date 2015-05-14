$(document).ready(function(){
  eventListenersInitGame();
}) // END DOC READY

/********************************
 THE VARIABLES        ****************************/

var allAvatars = {
      'pacman': {'img': 'img/avatars/pacman.png', 'sound': '#'},
      'pacwoman': {'img': 'img/avatars/pacwoman.png', 'sound': '#'},
      'ghost_red': {'img': 'img/avatars/ghost_red.png', 'sound': '#'},
      'ghost_yellow': {'img': 'img/avatars/ghost_yellow.png', 'sound': '#'},
}
var battlefield = battlefieldInitialise();
var usedFields = [];
var allPlayers; 
var player1; 
var player2; 
var whoseTurn;
// animation on Play button to make it stand out, disappears on click

/*end Steps

THE EVENT LISTERNERS  ***********************/

function eventListenersInitGame() {
  // Click play to start the game, only after that the other buttons can respond
  $('#ready').on('click', function() {
    // remove animation on click and prevent re-clickng
    $('#ready').off('click');
    allPlayers = allPlayersInitialise() ;
    player1 = allPlayers.player1;
    player2 = allPlayers.player2;
    updateAvatars();
    updateScoreboard();
    whoseTurn = allPlayers.whoseTurn;
    whoseTurn = player1.name;
    /* NEXT RANDOM whoseTurn = Math.floor(Math.random()*10) % 2 ) ===0 ? player1 : player2;
// alert('Let us play! \n'+ whoseTurn+' will start! Click to choose your first move!'); */
    
    // now enable the clicks on the field
    eventListenersPlayGame();
  })
}
function eventListenersPlayGame() {
  // Upon click, store the move and check if winner
  $('.battlefield li').on('click', computeAndCheckWinner);
  // clear the field but keep the players and the count
  $('#clear').on('click', resetBattlefield)
} 
/*********** End Listerners

**********************************
THE FUNCTIONS       
******************************/

/***** Functions to Initialise: create battlefield and get players' avatars *********/

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
  var firstExtras = getPlayerExtras(firstP);
  var secondP = getPlayerName('Second');
  var secondExtras = getPlayerExtras(secondP);
  return {
    'player1': {'name': firstP, 'avatar': firstExtras[0], 'sound': firstExtras[1], 'winCount': 0},
    'player2': {'name': secondP, 'avatar': secondExtras[0], 'sound': secondExtras[1], 'winCount': 0}, 
    'whoseTurn': ''
     };
}
function getPlayerName(player) {
  return prompt('Who is the '+player+ ' Player?');
}
 function getPlayerExtras(player) {
  switch (prompt('Hi '+player+', who do you want to be?\n'+'(P)acman, (R)ed ghost, (Y)ellow ghost, or Pac(W)oman?').toLowerCase() ) {
    case 'p':
      return [allAvatars.pacman.img, allAvatars.pacman.sound];
      break;
    case 'r':
      return [allAvatars.ghost_red.img, allAvatars.ghost_red.sound];
      break;
    case 'y':
      return [allAvatars.ghost_yellow.img, allAvatars.ghost_yellow.sound];
      break;
    case 'w':
      return [allAvatars.pacwoman.img, allAvatars.pacwoman.sound];
      break;
    default:
      alert("Please enter a valid key. Let's try again");
      getPlayerExtras(player);
  }
}
function updateAvatars(){
  $('#p1 .icon_avatar').css("background-image", "url("+player1.avatar+")");
  $('#p1 .wincount p:first-child').text(player1.name);
  $('#p2 .icon_avatar').css("background-image", "url("+player2.avatar+")");
  $('#p2 .wincount p:first-child').text(player2.name);
}
function updateScoreboard() {
  $('#p1 .wincount p:last-child').text('Wins: '+player1.winCount);
  $('#p2 .wincount p:last-child').text('Wins: '+player2.winCount);
}

/***** Functions to Compute Moves **********/

function getXAxis ($item) {
  // X axis in battlefield oject = id of the parent <ul>
  return $item.parent().attr('id');
}
function getYAxis ($item) {
  // Y axis is the Nth <li> of its siblings)
  return $item.index();
}
function computeAndCheckWinner() {
  //ensure zone won't respond any more
  $(this).off('click', computeAndCheckWinner);
  // get coordinates of where i clicked
  var x = getXAxis($(this));
  var y = getYAxis($(this));
  // only perform action if this area hasn't been clicked on before
  // Record(which player, which move, which area), then switch turn
  // if ( usedFields.indexOf($(this).attr('id')) === -1 ) {
    if (whoseTurn === player1.name) {
      computeMove(player1, x, y, $(this) );
      checkWinner(player1,x,y);
      whoseTurn = player2.name;
      } 
    else {
      computeMove(player2, x, y, $(this) );
      checkWinner(player2,x,y);
      whoseTurn = player1.name;       
      }
}
  // else { 
  //   // alert('Click on an available zone')
  // }     

function computeMove(player, x, y, $item) {
  // update usedFields with my move, and battlefield array with player.name
  usedFields.push($item.attr('id'));
  battlefield[x][y] = player.name;
  $item.css("background-image", "url("+player.avatar+")");
 // NEXT PLAY SOUND
}

/***** Functions to Check Winner **********/

function checkWinner(player, x, y) {
  if (isWinning(player, x, y)  ) {
    player.winCount++;
    updateScoreboard();
    updateLocalStorage(player);
    $('.battlefield li').off('click', computeAndCheckWinner);
    alert(player.name + ' wins!');
    // animation on Clear button to make it stand out, disappears on click
  } else if (usedFields.length === 9){
    return alert('Tie game!');
    $('.battlefield li').off('click', computeAndCheckWinner);
    // animation on Clear button to make it stand out
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

function updateLocalStorage(player) {
  // if player doesnt exist in Storage, create it. If already exists, grab his winCount from local storage and one to it 
  if ( localStorage.getItem(player.name) === null) {
    var stringPlayer = JSON.stringify(player);
    localStorage.setItem(player.name, stringPlayer );
  } else {
    // de-stringify the object 'player.name' which is in storage; 
    var stringPlayer = localStorage.getItem(player.name);
    var parsePlayer = JSON.parse(stringPlayer);
    // add 1 to the winCount and update local storage with new value
    parsePlayer.winCount++;
    stringPlayer = JSON.stringify(parsePlayer)
    localStorage.setItem(player.name, stringPlayer);
  }
}

/************ Reset Functions  *******/

function resetBattlefield() {;
  battlefield = battlefieldInitialise();
  usedFields = [];
  whoseTurn = player1.name;
  // or random, or whoever started
  $('.battlefield li').css("background-image", 'none');
  // re-enable the listeners on the field and play buton
  // BUG BUG when playing mulitple times
  eventListenersPlayGame();
}



// function allPlayersInitialise() {
//   var firstP = getPlayerName('First');
//   var secondP = getPlayerName('Second');
//   return {
//     'player1': {'name': firstP, 'avatar': getPlayerAvatar(firstP), 'sound': getPlayerSound('player1'), 'winCount': 0},
//     'player2': {'name': secondP, 'avatar': getPlayerAvatar(secondP), 'sound': getPlayerSound('player2'), 'winCount': 0}, 
//     'whoseTurn': ''
//      };
// }
// function getPlayerName(player) {
//   return prompt('Who is the '+player+ ' Player?');
// }
//  function getPlayerAvatar(player) {
//   switch (prompt('Hi '+player+', who do you want to be?\n'+'(P)acman, (R)ed ghost, (Y)ellow ghost, or Pac(W)oman?').toLowerCase() ) {
//     case 'p':
//       $()
//       return 'img/avatars/pacman.png';
//       break;
//     case 'r':
//       return 'img/avatars/ghost_red.png';
//       break;
//     case 'y':
//       return 'img/avatars/ghost_yellow.png';
//       break;
//     case 'w':
//       return 'img/avatars/pacwoman.png';
//       break;
//     default:
//       alert("Please enter a valid key. Let's try again");
//       getPlayerAvatar(player);
//   }
// }