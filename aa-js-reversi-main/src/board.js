// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE


/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4].
 */
function _makeGrid() {
  const arr = []
  for (let i = 0; i < 8; i++) {
    const innerArr = Array.from(Array(8))
    arr.push(innerArr)
  }
  arr[3][4] = new Piece("black")
  arr[4][3] = new Piece("black")
  arr[3][3] = new Piece("white")
  arr[4][4] = new Piece("white")
  return arr
}


/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let [x, y] = pos;
  if (x < 0 || y < 0 || x > 7 || y > 7) return false
  return true
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)) throw new Error('Not valid pos!')
  let [x, y] = pos
  return this.grid[x][y]
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let [x, y] = pos
  let piece = this.grid[x][y]
  return piece && piece.color == color
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  let [x, y] = pos
  let piece = this.grid[x][y]
  return !!piece
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding
 * another piece of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function (pos, color, dir, piecesToFlip) {
  // returns empty array when pos not on board
  if (!this.isValidPos(pos)) return []
  let [x, y] = pos
  // returns empty array when there is a blank space one position away
  let newDir = [dir[0] + x, dir[1] + y]
  if (!this.isValidPos(newDir))  return []
  if (!this.isOccupied(newDir)) return []
  //returns arry if no piece of opposite color is found
  if (this.getPiece(newDir) && this.isMine(newDir, color)) return []
  // returns emtpy arr if no piece of same color
  let arr = []
  while (this.isOccupied(newDir)){
    if (this.isMine(newDir, color)) break
    arr.push([newDir[0], newDir[1]])
    newDir[0] += dir[0]
    newDir[1] += dir[1]
  }
  if (!this.isMine(newDir, color)) return []
  return arr
}


/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  let valid = false
  Board.DIRS.forEach(el => {
    let arr = this._positionsToFlip(pos, color, el)
    if (arr.length > 0) valid = true
  })
  return valid
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)) throw new Error("Invalid move!")
  let arr = []
  Board.DIRS.forEach(el => {
    arr = arr.concat(this._positionsToFlip(pos, color, el))
  })
  arr.forEach(pos => {
    console.log(this.grid[pos[0]][pos[1]])
    this.grid[pos[0]][pos[1]].flip()
  })
  this.grid[pos[0]][pos[1]] = new Piece(`${color}`)
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let arr = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (this.validMove(this[i][j])) {
        arr.push(this[i][j])
      }
    }
  }
  return arr
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  return []
};

testBoardLongHorzDiagonal = new Board();

testBoardLongHorzDiagonal.grid[1][1] = new Piece("black")
testBoardLongHorzDiagonal.grid[1][3] = new Piece("black")
testBoardLongHorzDiagonal.grid[1][4] = new Piece("white")
testBoardLongHorzDiagonal.grid[1][6] = new Piece("white")
testBoardLongHorzDiagonal.grid[1][7] = new Piece("white")

testBoardLongHorzDiagonal.grid[2][0] = new Piece("black")
testBoardLongHorzDiagonal.grid[2][2] = new Piece("white")
testBoardLongHorzDiagonal.grid[2][3] = new Piece("white")
testBoardLongHorzDiagonal.grid[2][4] = new Piece("black")
testBoardLongHorzDiagonal.grid[2][5] = new Piece("black")
testBoardLongHorzDiagonal.grid[2][7] = new Piece("black")

testBoardLongHorzDiagonal.grid[3][0] = new Piece("black")
testBoardLongHorzDiagonal.grid[3][2] = new Piece("white")
testBoardLongHorzDiagonal.grid[3][3] = new Piece("white")
testBoardLongHorzDiagonal.grid[3][4] = new Piece("black")
testBoardLongHorzDiagonal.grid[3][5] = new Piece("black")
testBoardLongHorzDiagonal.grid[3][7] = new Piece("black")

testBoardLongHorzDiagonal.grid[4][0] = new Piece("black")
testBoardLongHorzDiagonal.grid[4][1] = new Piece("black")
testBoardLongHorzDiagonal.grid[4][3] = new Piece("black")
testBoardLongHorzDiagonal.grid[4][4] = new Piece("white")
testBoardLongHorzDiagonal.grid[4][6] = new Piece("white")
testBoardLongHorzDiagonal.grid[4][7] = new Piece("black")

testBoardLongHorzDiagonal.grid[5][0] = new Piece("white")

testBoardLongHorzDiagonal.grid[6][2] = new Piece("white")
testBoardLongHorzDiagonal.grid[6][3] = new Piece("white")
testBoardLongHorzDiagonal.grid[6][4] = new Piece("white")
testBoardLongHorzDiagonal.grid[6][5] = new Piece("white")
testBoardLongHorzDiagonal.grid[6][6] = new Piece("black")

testBoardLongHorzDiagonal.grid[7][1] = new Piece("black")
testBoardLongHorzDiagonal.grid[7][2] = new Piece("white")
testBoardLongHorzDiagonal.grid[7][3] = new Piece("white")
testBoardLongHorzDiagonal.grid[7][4] = new Piece("white")
testBoardLongHorzDiagonal.grid[7][5] = new Piece("white")

// console.log(testBoardLongHorzDiagonal.grid)
// console.log(testBoardLongHorzDiagonal.print)
// console.log(testBoardLongHorzDiagonal._positionsToFlip([1, 0], "white", [1, 0]))
// console.log(testBoardLongHorzDiagonal._positionsToFlip([5, 7], "white", [-1, 0]))
// testBoard = new Board
// console.log(testBoard.validMove([2, 3], "black"))
// //[2, 0], [3, 0], [4, 0]
let testBoard = new Board
console.log(testBoard.placePiece([2, 3], "black"))

// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE
