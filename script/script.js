$(document).ready(function(){
  setUpEventListeners();
})

// THE CODE 
var battlefield = {
  'row1': [1,2,3],
  'row2': [4,5,6],
  'row3': [7,8,9] 
}
var player1; var player2;
var avatar1 = getPlayer_1_Avatar();
// NEXT: click on picture you want as avatar
var avatar2 = avatar1==='X' ? 'O' : 'X';
// NEXT: choose pic for the computer

// NEXT: randomize who starts: equal chances = pure random
var starter = Math.floor(Math.random()*10) % 2 ) ===0 ? player1 : player2;
alert('Let us play! \n'+ starter+' will start! Click to choose your first move!');


getPlayer_1_Move();

// var player2 = getPlayer_2_Avatar()
// random while this is computer

// END OF CODE

// THE FUNCTIONS
var setUpEventListeners = function() {
  $('.battlefield li').on('click', function(){
    // get coord of where i clicked
    var x = getXAxis($(this));
    var y = getYAxis($(this));
    battlefield[x][y];
    console.log(battlefield[x][y]);
  })
}

function getXAxis ($item) {
  // X axis in battlefield oject = id of the parent <ul>
  return $item.parent().attr('id');
}
function getYAxis ($item) {
  // Y axis is the Nth <li> of its siblings)
  return $item.index();
}
function getPlayer_1_Avatar() {
  prompt('Are you the X or the O type?');
  // Add random to see who starts

}
function getPlayer_1_Move() {
  alert('CLick')
}
