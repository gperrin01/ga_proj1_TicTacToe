var battlefield = {
  'row1': [1,2,3],
  'row2': [4,5,6],
  'row3': [7,8,9] 
}

$(document).ready(function(){
  setUpEventListeners();
})

var setUpEventListeners = function() {
  $('.battlefield li').on('click', function(){
    // get coord of where i clicked
    var x = getXAxis($(this));
    var y = getYAxis($(this));
    battlefield[x][y];
  })
}

var getXAxis = function($item) {
  // X axis in battlefield oject = id of the parent <ul>
  return $item.parent().attr('id');
}
var getYAxis = function($item) {
  // Y axis is the Nth <li> of its siblings)
  return $item.index();
}



// PAST WAY
//   $('#1_1').on('click', function(){
//     var x = getXAxis($(this).attr('id'));
//     var y = getYAxis($(this).attr('id'));
//     debugger;
//     console.log(battlefield[x][y] );
//   })
// }

// var getXAxis = function(string) {
//   var coord = string.split('');
//   // generic way of taking coords if double-digits, eg 12_14
//   return coord.slice(0,coord.indexOf('_')).join('');
// }
// var getYAxis = function(string) {
//   return string.split('').slice(string.indexOf('_')+1).join('');