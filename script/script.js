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
var player1 = 'Player1';
// NEXT var player1 = prompt('What is your name?'); 
var player2 = 'Player2';
var avatar1;
getPlayer_1_Avatar();
// NEXT: click on picture you want as avatar
var avatar2 = avatar1==='X' ? 'O' : 'X';
// NEXT: choose pic for player2
var whoseTurn = player1;
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
    // debugger;
    // only perform action if this area hasnt been clicked on before
    if ( usedFields.indexOf($(this).attr('id')) === -1 ) {
      if (whoseTurn === player1) {
        console.log('battlefield[x][y] is ', battlefield[x][y]);
        usedFields.push($(this).attr('id'));
        battlefield[x][y] = player1;
        $(this).append(avatar1);
        // this is pushing the whole <li> down !!!
        whoseTurn = player2;
        console.log('player is ', player1);
        console.log('usedFields are ', usedFields);
      } else {
        console.log('battlefield[x][y] is ', battlefield[x][y]);
        usedFields.push($(this).attr('id'));
        battlefield[x][y] = player2;
        $(this).append(avatar2);
        whoseTurn = player1;
        console.log('player is ', player2);
        console.log('usedFields are ', usedFields);        
      }
    } else {
     alert('Click an available zone')
   }     
  })

} // End Listerners

// THE FUNCTIONS
function getPlayer_1_Avatar() {
  avatar1 = prompt('Hey '+player1+ ', are you the X or the O type?');
}
function getPlayer_2_Avatar() {
  avatar2 = prompt('Hey '+player2+ ', are you the X or the O type?');
}
function getXAxis ($item) {
  // X axis in battlefield oject = id of the parent <ul>
  return $item.parent().attr('id');
}
function getYAxis ($item) {
  // Y axis is the Nth <li> of its siblings)
  return $item.index();
}




