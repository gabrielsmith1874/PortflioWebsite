// Checkers AI Implementation in JavaScript
// Ported from Python backend

class CheckersState {
  constructor(board) {
    this.board = board;
    this.redPieces = {};
    this.blackPieces = {};
    this.pieces = {};
    this.width = 8;
    this.height = 8;
    this.getPieces();
  }

  getPieces() {
    this.redPieces = {};
    this.blackPieces = {};
    this.pieces = {};
    
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        const piece = this.board[i][j];
        if (piece === 'r' || piece === 'R') {
          this.redPieces[`${i},${j}`] = piece;
          this.pieces[`${i},${j}`] = piece;
        } else if (piece === 'b' || piece === 'B') {
          this.blackPieces[`${i},${j}`] = piece;
          this.pieces[`${i},${j}`] = piece;
        }
      }
    }
  }

  checkEnd() {
    if (Object.keys(this.redPieces).length === 0 || Object.keys(this.blackPieces).length === 0) {
      return true;
    }

    const opponentColor = this.redPieces.length > 0 ? 'b' : 'r';
    const opponentMoves = this.getPossibleMoves(opponentColor);
    if (opponentMoves.length === 0) {
      return true;
    }

    return false;
  }

  copyBoard() {
    return this.board.map(row => [...row]);
  }

  getPossibleMoves(player) {
    const jumpMoves = [];
    const regularMoves = [];
    const pieces = player === 'r' ? this.redPieces : this.blackPieces;

    // Check for jump moves first
    for (const [pos, piece] of Object.entries(pieces)) {
      const [i, j] = pos.split(',').map(Number);
      const jumps = this.checkJumps(this.board, this.pieces, piece, i, j, 0);
      jumpMoves.push(...jumps);
    }

    if (jumpMoves.length > 0) {
      return jumpMoves;
    }

    // Regular moves
    const directions = {
      'b': [[1, 1], [1, -1]],
      'r': [[-1, 1], [-1, -1]],
      'B': [[1, 1], [1, -1], [-1, 1], [-1, -1]],
      'R': [[1, 1], [1, -1], [-1, 1], [-1, -1]]
    };

    for (const [pos, piece] of Object.entries(pieces)) {
      const [i, j] = pos.split(',').map(Number);
      for (const [di, dj] of directions[piece]) {
        const newI = i + di;
        const newJ = j + dj;
        if (newI >= 0 && newI < 8 && newJ >= 0 && newJ < 8 && this.board[newI][newJ] === '.') {
          regularMoves.push(this.addMove(this.board, i, j, newI, newJ, piece));
        }
      }
    }

    return regularMoves;
  }

  checkJumps(board, pieces, player, a, b, chainNum) {
    const result = [];
    const directions = {
      'b': [[1, 1], [1, -1]],
      'r': [[-1, 1], [-1, -1]],
      'B': [[1, 1], [1, -1], [-1, 1], [-1, -1]],
      'R': [[1, 1], [1, -1], [-1, 1], [-1, -1]]
    };

    for (const [di, dj] of directions[player]) {
      const newI = a + 2 * di;
      const newJ = b + 2 * dj;
      const middleI = a + di;
      const middleJ = b + dj;
      const middlePos = `${middleI},${middleJ}`;

      if (newI >= 0 && newI < 8 && newJ >= 0 && newJ < 8 && 
          board[newI][newJ] === '.' && 
          middlePos in pieces && 
          this.checkOpponent(player, pieces[middlePos])) {
        
        const jumpResult = this.performJump(board, pieces, player, a, b, newI, newJ, chainNum);
        result.push(...jumpResult);
      }
    }

    if (result.length === 0 && chainNum >= 1) {
      result.push(new CheckersState(board));
    }

    return result;
  }

  performJump(board, pieces, player, a, b, newA, newB, chainNum) {
    const newBoard = this.copyBoard(board);
    const newPieces = { ...pieces };
    
    newBoard[a][b] = '.';
    newBoard[(a + newA) / 2][(b + newB) / 2] = '.';
    
    const promotedPiece = ((player === 'b' && newA === 7) || (player === 'r' && newA === 0)) 
      ? player.toUpperCase() 
      : player;
    newBoard[newA][newB] = promotedPiece;
    
    delete newPieces[`${a},${b}`];
    const middlePos = `${(a + newA) / 2},${(b + newB) / 2}`;
    if (middlePos in newPieces) {
      delete newPieces[middlePos];
    }
    newPieces[`${newA},${newB}`] = newBoard[newA][newB];
    
    const chainCheckedBoard = this.checkJumps(newBoard, newPieces, player, newA, newB, chainNum + 1);
    return chainCheckedBoard.length > 0 ? chainCheckedBoard : [new CheckersState(newBoard)];
  }

  addMove(curBoard, i, j, newI, newJ, player) {
    const sucBoard = this.copyBoard(curBoard);
    sucBoard[i][j] = '.';
    const promotedPiece = ((player === 'b' && newI === 7) || (player === 'r' && newI === 0)) 
      ? player.toUpperCase() 
      : player;
    sucBoard[newI][newJ] = promotedPiece;
    return new CheckersState(sucBoard);
  }

  checkOpponent(color, piece) {
    if (color.toLowerCase() === 'r' && (piece === 'b' || piece === 'B')) {
      return true;
    }
    if (color.toLowerCase() === 'b' && (piece === 'r' || piece === 'R')) {
      return true;
    }
    return false;
  }

  getOppChar(player) {
    return player === 'r' ? 'b' : 'r';
  }

  isPieceUnderThreat(x, y, player) {
    const opponent = player === 'r' ? 'b' : 'r';
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    
    for (const [dx, dy] of directions) {
      const newX = x + 2 * dx;
      const newY = y + 2 * dy;
      const middleX = x + dx;
      const middleY = y + dy;
      
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        const middlePiece = this.board[middleX][middleY];
        if ((middlePiece === opponent || middlePiece === opponent.toUpperCase()) && 
            this.board[newX][newY] === '.') {
          return true;
        }
      }
    }
    return false;
  }

  getValue(color, heuristic = false) {
    let result = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        const piece = this.board[i][j];
        if (piece.toLowerCase() === color) {
          let pieceValue = piece === piece.toLowerCase() ? 1 : 2; // Kings are worth more
          
          if (heuristic) {
            // Bonus for pieces on the edge
            if (i === 0 || i === 7 || j === 0 || j === 7) {
              pieceValue += 1;
            }
            // Penalty for pieces under threat
            if (this.isPieceUnderThreat(i, j, piece)) {
              pieceValue -= 1;
            }
          }
          result += pieceValue;
        }
      }
    }
    return result;
  }

  evaluateNode(color, depth, heuristic = false) {
    if (this.checkEnd()) {
      return 10000 - depth;
    }

    const userValue = this.getValue(color, heuristic);
    const opponentColor = this.getOppChar(color);
    const opponentValue = this.getValue(opponentColor, heuristic);
    return (userValue - opponentValue) - depth;
  }
}

class CheckersAI {
  constructor() {
    this.cache = {};
  }

  minimaxSearch(currentState, playerColor, alpha, beta, depthLimit, isMaximizingPlayer, currentDepth = 0, useCaching = 0, useOrdering = 0, movePath = []) {
    let bestMoveState = null;
    let bestUtility = isMaximizingPlayer ? -Infinity : Infinity;
    let bestMovePath = movePath;
    const possibleMoves = currentState.getPossibleMoves(playerColor);

    if (useCaching && this.cache[`${currentState.board},${playerColor}`]) {
      const cachedValue = this.cache[`${currentState.board},${playerColor}`];
      if (cachedValue.depth >= depthLimit && alpha < cachedValue.value && cachedValue.value < beta) {
        return [cachedValue.value, currentState, movePath];
      }
    }

    if (possibleMoves.length === 0 || currentState.checkEnd() || depthLimit === 0) {
      const evaluation = currentState.evaluateNode(
        isMaximizingPlayer ? playerColor : currentState.getOppChar(playerColor), 
        currentDepth, 
        useOrdering
      );
      return [evaluation, currentState, movePath];
    }

    if (useOrdering) {
      possibleMoves.sort((a, b) => {
        const evalA = a.evaluateNode(playerColor, currentDepth, true);
        const evalB = b.evaluateNode(playerColor, currentDepth, true);
        return isMaximizingPlayer ? evalB - evalA : evalA - evalB;
      });
    }

    for (const nextState of possibleMoves) {
      const currentMovePath = [...movePath, nextState.board];
      const [nextUtility, , finalMovePath] = this.minimaxSearch(
        nextState, 
        currentState.getOppChar(playerColor), 
        alpha, 
        beta, 
        depthLimit - 1, 
        !isMaximizingPlayer, 
        currentDepth + 1, 
        useCaching, 
        useOrdering, 
        currentMovePath
      );

      if (isMaximizingPlayer) {
        if (nextUtility > bestUtility) {
          bestMoveState = nextState;
          bestUtility = nextUtility;
          bestMovePath = finalMovePath;
        }
        alpha = Math.max(alpha, nextUtility);
      } else {
        if (nextUtility < bestUtility) {
          bestMoveState = nextState;
          bestUtility = nextUtility;
          bestMovePath = finalMovePath;
        }
        beta = Math.min(beta, nextUtility);
      }

      if (beta <= alpha) {
        break;
      }
    }

    if (useCaching) {
      this.cache[`${currentState.board},${playerColor}`] = {
        value: bestUtility,
        depth: depthLimit
      };
    }

    return [bestUtility, bestMoveState, bestMovePath];
  }

  getBestMove(board, playerColor, depth = 4) {
    const state = new CheckersState(board);
    const [, bestMove] = this.minimaxSearch(
      state, 
      playerColor, 
      -Infinity, 
      Infinity, 
      depth, 
      true, 
      0, 
      0, // no caching for simplicity
      1  // use ordering
    );
    
    return bestMove ? bestMove.board : board;
  }

  determineWinner(board) {
    let redPieces = 0;
    let blackPieces = 0;
    
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        const piece = board[i][j];
        if (piece === 'r' || piece === 'R') {
          redPieces++;
        } else if (piece === 'b' || piece === 'B') {
          blackPieces++;
        }
      }
    }

    if (redPieces > blackPieces) {
      return 'red';
    } else if (blackPieces > redPieces) {
      return 'black';
    } else {
      return 'tie';
    }
  }

  initializeBoard() {
    return [
      ['.', 'r', '.', 'r', '.', 'r', '.', 'r'],
      ['r', '.', 'r', '.', 'r', '.', 'r', '.'],
      ['.', 'r', '.', 'r', '.', 'r', '.', 'r'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['b', '.', 'b', '.', 'b', '.', 'b', '.'],
      ['.', 'b', '.', 'b', '.', 'b', '.', 'b'],
      ['b', '.', 'b', '.', 'b', '.', 'b', '.']
    ];
  }
}

export { CheckersState };
export default CheckersAI;
