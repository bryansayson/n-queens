// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var allRows = this.rows();     // if there is anything else in that row, return true;
      //else return false;
      var count = 0;
      var searchThisRow = allRows[rowIndex];
        for ( var i = 0; i < searchThisRow.length; i++ ) {
          if ( searchThisRow[i] === 1 ) {
            count++;
          }
        }
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var allRows = this.rows();
      var conflict = false;
      for (var i = 0; i < allRows.length; i++) {
        if ( this.hasRowConflictAt(i) ) {
          conflict = true;
        }
      }
      return conflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var columns = this.rows();
      var count = 0;
      for ( var i = 0; i < columns.length; i++ ) {
        if ( columns[i][colIndex] === 1 ) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var conflict = false;
      var column = this.rows();
      for (var x =0; x < column.length; x++){
        if ( this.hasColConflictAt(x) ) {
          conflict = true;
        }
      }
      return conflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      n = majorDiagonalColumnIndexAtFirstRow;
      // var columns = this.rows();
      // var count = 0;
      var rows = this.rows();
      var count =0;
      for ( var i=1; i< n.length; i++ ) {
        var start = n[0];
        var other = n[1];
        if (rows[start][other] === 1){
            count++;
        }
        start++;
        other++;
      }
      return count > 1; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      var conflict = false;
      var startPoints = [];
      var n = rows.length-1;

      for ( var i = 0; i < n; i++ ) {
        var tupal = [i, 0];
        startPoints.push(tupal);
      }
      for ( var i = 0; i < n; i++ ) {
        var tupal = [0, i];
        startPoints.push(tupal);
      }
      console.log(startPoints);
        for ( var j = 0; j < array.length; j++ ) {
            if ( this.hasMajorDiagonalConflictAt(startPoints[j]) ){
                conflict = true;
            }
          }
        return conflict; // fixme
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      n = minorDiagonalColumnIndexAtFirstRow;
      // var columns = this.rows();
      // var count = 0;
      var rows = this.rows();
      var count =0;
      for ( var i=1; i< n.length; i++ ) {
        var start = n[0];
        var other = n[1];
        if (rows[start][other] === 1){
            count++;
        }
        start--;
        other--;
      }
      return count > 1; 
      // [3,3]
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      var conflict = false;
      var startPoints = [];
      var n = rows.length-1;

      for ( var i = 0; i < n; i++ ) {
        var tupal = [n, i];
        startPoints.push(tupal);
      }
      for ( var i = 0; i < n; i++ ) {
        var tupal = [i, n];
        startPoints.push(tupal);
      }
      console.log(startPoints);
        for ( var j = 0; j < array.length; j++ ) {
            if ( this.hasMajorDiagonalConflictAt(startPoints[j]) ){
                conflict = true;
            }
          }
        return conflict; // fixme
    }, // fixme


    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());


      // [0, 1, 0, 0],
      // [0, 0, 1, 0],
      // [0, 0, 0, 0],
      // [0, 0, 0, 0]

// [

// [0,0,0,0]
// [1,0,0,0]
// [0,1,0,0]
// [0,0,1,0]

// ]

// var searchColumn = [];
      // var count = 0;
      // var allRows = this.rows();
      // var index = colIndex;
     
      // console.log(allRows);
      // console.log(allRows[0]);
      // console.log(allRows[1]);
      // console.log(allRows[1][3]);
      // for (var i =0; i < allRows.length;i++){
      //       searchColumn.push(allRows[i][index]);
      //     }
      // console.log(searchColumn);
      // for (var j=0; j < searchColumn.length; j++){    
      //       if (searchColumn[j] === 1){
      //         count++;
      //       }
      // }
      // return count > 1; // fixme

      // var numColumns = this.rows();
      // var conf = this.hasColConflictAt();
      // var conflict = false;
      // for (var i; i < numColumns.length;i++){
      //   if (conf[i]){
      //     conflict = true;
      //   }
      // }
      // return conflict; // fixme