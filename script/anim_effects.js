function animWelcomeScreen() {
  displayRankings();
  // animation on Play button to make it stand out, disappears on click
}

function animInitGame () {
  // ON : $('#ready').on('click', function() {
  // remove animation on click and prevent re-clickng + sound
  $('.welcome').css('display', 'none')
  $('#ready').off('click');
  playSound('pacman_beginning.wav');
}
function animUpdateAvatars(){
  $('#p1 .icon_avatar').css("background-image", "url("+player1.avatar+")");
  $('#p1 .wincount p:first-child').text(player1.name);
  $('#p2 .icon_avatar').css("background-image", "url("+player2.avatar+")");
  $('#p2 .wincount p:first-child').text(player2.name);
}
function animUpdateScoreboard() {
  $('#p1 .wincount p:last-child').text('Wins: '+player1.winCount);
  $('#p2 .wincount p:last-child').text('Wins: '+player2.winCount);
}

// upon winning or tie  
  // animation on Clear button to make it stand out, disappears on click


function playSound(file) {
  var file = soundManager.createSound({
    id: file,
    url: 'audio/' +file});
  file.play();
}

function displayRankings () {
  // build array of all names, avatars & wincounts - hoping if element has no wincount it will return null or undefined and the count will contnue as normal
  // index of the top 3 elements in winCounts -> if (1,2,3) I will get the (1,2,3)th objects in all keys of localStorage !
  var winCountsInOrder = [];
  var namesInOrder = [];
  var avatarsInOrder = [];
  for (var prop in localStorage) {
    winCountsInOrder.push( JSON.parse(localStorage[prop]).winCount );
    namesInOrder.push( JSON.parse(localStorage[prop]).name );
    avatarsInOrder.push( JSON.parse(localStorage[prop]).avatar );
  }
  // copy winCounts as it will be lost during the slice of the following function
  var topThreeIndex = winCountsInOrder.map(function(x) {return x } )
  getTopIndex_N(topThreeIndex, 3);
  // -> 1st ranking is topThreeIndex[0] !!

  for (var i=1; i<=3; i++) {
    $('#rank'+i+' :nth-child(2)').text(winCountsInOrder[i-1]);
    $('#rank'+i+' :nth-child(3)').text(namesInOrder[i-1]);
    $('#rank'+i+' :nth-child(4)').css('background-image', "url("+avatarsInOrder[i-1]+")");
  }
}
function getTopIndex_N(array, n) {
  // obviously cant do it more often than the length of the array
  var shadowArray = array.map(function(x) {return x } )
  var topIndex = [];
  for (var i=1; i <= Math.min(n, array.length) ; i++) {
    // get the position of the max element in the array, then store the position and remove the element
    // use index in shadowArray because this one is static while array is always reduced by the largest number
    var x = shadowArray.indexOf(Math.max.apply(null, array));
    topIndex.push(x);
    array.splice(x, 1);
  }
  return topIndex;
}