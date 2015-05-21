/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var holder = n;
  var board = new Board({n:holder}); //fixme
  var solutionRows = board.rows();
  console.log(solutionRows);
  for ( var i = 0; i < solutionRows.length; i++ ) {
    for (var x = 0; x < solutionRows[i].length; x++) {
      board.togglePiece(i, x);
      if ( board.hasRowConflictAt(i) || board.hasColConflictAt(x) ) {
         board.togglePiece(i, x);
        }
      }
    }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return solutionRows;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = n; //fixme
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutioncount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
