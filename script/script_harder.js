var board = [ [1,2,3], [4,5,6] [7,8,9] ];

$(document).ready(function(){
  setUpEventListeners();
})

var setUpEventListeners = function() {
  $('#1_1').on('click', function(){
    var x = getXAxis($(this).attr('id'));
    var y = getYAxis($(this).attr('id'));
    // debugger;
    console.log(board[x][y] );
  })
}

var getXAxis = function(string) {
  var coord = string.split('');
  // I know id looks like N1_N2 so I want the numbers 'N1' before the '_'
  return coord.slice(0,coord.indexOf('_')).join('');
}
var getYAxis = function(string) {
  return string.split('').slice(string.indexOf('_')+1).join('');
}
