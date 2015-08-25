// LOTS OF BUGS ON ROUD 3 !!!

$(document).ready(function(){
  eventListenersInitGame();
  animWelcomeScreen();
  soundManager.setup( {
    url: './audio/SM2/swf/',
    flashVersion:9,
    preferFlash: false,
  })
}) // END DOC READY

/********************************
 THE VARIABLES       
****************************/

var allAvatars = {
      'pacman': {'img': 'img/avatars/pacman.png', 'sound': 'pacman_eatfruit.wav'},
      'pacwoman': {'img': 'img/avatars/pacwoman.png', 'sound': 'pacman_chomp.wav'},
      'ghost_red': {'img': 'img/avatars/ghost_red.png', 'sound': 'pacman_eatghost.wav'},
      'ghost_yellow': {'img': 'img/avatars/ghost_yellow.png', 'sound': 'pacman_eatghost.wav'},
}
var battlefield = battlefieldInitialise();
var usedFields = [];
var allPlayers; 
var player1; 
var player2; 
var whoseTurn;

/*******************
THE EVENT LISTERNERS  
***********************/

function eventListenersInitGame() {

  //click play to show screen to enter player names
  $('#ready').on('click', function() {
    // make it a function
    $('.welcome>p:first-child').text("Player 1!");
    $('.welcome>p:nth-child(2)').text('Enter name & choose avatar!');
    $('.welcome p').css('font-size', '16px');

    // $('td:first-of-type').text('Name?');
    // $('td:nth-of-type(2)').text('|');
    // $('#rank1 :nth-child(1)').css('background-image', 'img/avatars/pacman.png');
    // $('#rank1 :nth-child(2)').css('background-image', 'img/avatars/pacwoman.png');
    // $('#rank1 :nth-child(3)').css('background-image', 'img/avatars/ghost_red.png');
    // $('#rank1 :nth-child(4)').css('background-image', 'img/avatars/ghost_yellow.png');
    // $('#rank2 *').text('');
    // $('#rank3 *').text('');


   // next, click on the avatar!


    allPlayers = allPlayersInitialise() ;
    player1 = allPlayers.player1;
    player2 = allPlayers.player2;
    whoseTurn = player1.name;
    /* NEXT RANDOM whoseTurn = Math.floor(Math.random()*10) % 2 ) ===0 ? player1 : player2; */
    animUpdateAvatars();
    animUpdateScoreboard();
    // See Anims page - remove ready_animation on click and prevent re-clickng + sound
    animInitGame();
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

/**********************
THE FUNCTIONS       
******************************/

/***** Functions to Initialise: create battlefield and get players' avatars *********/

function battlefieldInitialise (){
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
    'player2': {'name': secondP, 'avatar': secondExtras[0], 'sound': secondExtras[1], 'winCount': 0}
    // ,    'whoseTurn': ''
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
     // still BUG when typing wrong key on getExtras - > cannot read propoerty of undefined
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

  // play relevant sound:
  whoseTurn === player1.name ? playSound(player1.sound) : playSound(player2.sound);
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
    playSound('pacman_intermission.wav');
    player.winCount++;
    animUpdateScoreboard();
    updateLocalStorage(player);
    $('.battlefield li').off('click', computeAndCheckWinner);
    alert(player.name + ' wins!');
    // animation on Clear button to make it stand out, disappears on click

  } else if (usedFields.length === 9){
    playSound('pacman_death.wav');
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

function resetBattlefield() {
  battlefield = battlefieldInitialise();
  usedFields = [];
  whoseTurn = player1.name;
  // or random, or whoever started
  $('.battlefield li').css("background-image", 'none');
  // re-enable the listeners on the field and play buton
  // BUG BUG when playing mulitple times
  eventListenersPlayGame();
}

