import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CheckersDemo = ({ isOpen, onClose }) => {
  const [board, setBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('b');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [error, setError] = useState('');
  const [capturedPiece, setCapturedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  const BACKEND_URL = 'http://localhost:5000'; // Same port as Checkers AI backend
  
  // Debug: Log the current origin
  console.log('Frontend origin:', window.location.origin);

  const updateGameState = (data) => {
    console.log('Game state data:', data); // Debug log
    
    // Handle both possible response formats
    const board = data.board || data.game_board;
    const currentPlayer = data.current_player || data.currentPlayer;
    const gameOver = data.game_over || data.gameOver;
    const winner = data.winner;
    const aiThinking = data.ai_thinking || data.aiThinking;
    
    console.log('Parsed game state:', { board, currentPlayer, gameOver, winner, aiThinking });
    
    if (board) {
      setBoard(board);
    }
    
    if (currentPlayer !== undefined) {
      setCurrentPlayer(currentPlayer);
    }
    
    if (gameOver !== undefined) {
      setGameOver(gameOver);
    }
    
    if (winner !== undefined) {
      setWinner(winner);
    }
    
    if (aiThinking !== undefined) {
      setAiThinking(aiThinking);
    }
  };

  const initializeGame = React.useCallback(async () => {
    try {
      setError('');
      // First try to get the current board state
      let response = await fetch(`${BACKEND_URL}/api/get-board`);
      
      if (!response.ok) {
        throw new Error('Failed to get board state');
      }
      
      let data = await response.json();
      console.log('Initial board state:', data);
      
      // If we don't have a proper game state, start a new game
      if (!data.current_player && !data.currentPlayer) {
        response = await fetch(`${BACKEND_URL}/api/new-game`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to initialize new game');
        }
        
        data = await response.json();
        console.log('New game state:', data);
      }
      
      updateGameState(data);
    } catch (err) {
      setError('Failed to connect to Checkers AI backend. Make sure to run: cd "Checkers AI" && python app.py (CORS enabled)');
    }
  }, []);


  const handleCellClick = async (row, col) => {
    console.log('Cell clicked:', { row, col, piece: board[row][col], gameOver, aiThinking, currentPlayer });
    
    if (gameOver || aiThinking || currentPlayer !== 'b') {
      console.log('Move blocked:', { gameOver, aiThinking, currentPlayer });
      return;
    }

    const piece = board[row][col];
    
    if (selectedCell === null) {
      // First click - select piece (only black pieces for human player)
      if (piece === 'b' || piece === 'B') {
        console.log('Piece selected:', { row, col, piece });
        setSelectedCell({ row, col });
        const moves = calculateValidMoves(row, col);
        setValidMoves(moves);
        console.log('Valid moves:', moves);
      } else {
        console.log('Invalid piece selection:', { row, col, piece });
      }
    } else {
      // Second click - make move
      console.log('Making move from', selectedCell, 'to', { row, col });
      
      // Check if this is a valid move from our calculated valid moves
      const isValidMove = validMoves.some(move => move.row === row && move.col === col);
      
      if (!isValidMove) {
        console.log('Invalid move: not in valid moves list');
        setError('Invalid move - must move diagonally');
        setSelectedCell(null);
        setValidMoves([]);
        return;
      }
      
      // All validation passed - make the move
      await makeMove(selectedCell, { row, col });
      setSelectedCell(null);
      setValidMoves([]);
    }
  };

  const makeMove = async (from, to) => {
    try {
      setError('');
      
      const moveData = {
        from: [from.row, from.col],
        to: [to.row, to.col]
      };
      
      console.log('Attempting move:', moveData);
      
      // First, update the board visually with the player's move
      const newBoard = [...board];
      const piece = newBoard[from.row][from.col];
      newBoard[from.row][from.col] = '.';
      newBoard[to.row][to.col] = piece;
      
      // Handle visual capture for jump moves (2 squares diagonally)
      const rowDiff = Math.abs(to.row - from.row);
      const colDiff = Math.abs(to.col - from.col);
      
      if (rowDiff === 2 && colDiff === 2) {
        // This is a jump move - remove the captured piece visually
        const capturedRow = (from.row + to.row) / 2;
        const capturedCol = (from.col + to.col) / 2;
        
        console.log('Visual capture at:', capturedRow, capturedCol);
        
        // Store the captured piece for visual feedback
        const capturedPieceType = newBoard[capturedRow][capturedCol];
        setCapturedPiece({ row: capturedRow, col: capturedCol, piece: capturedPieceType });
        
        // Remove the captured piece from the board
        newBoard[capturedRow][capturedCol] = '.';
        
        // Clear the captured piece feedback after a short delay
        setTimeout(() => setCapturedPiece(null), 300);
      }
      
      setBoard(newBoard);
      
      // Set AI thinking state
      setAiThinking(true);
      setCurrentPlayer('r'); // AI's turn
      
      // Small delay to show the visual move before processing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await fetch(`${BACKEND_URL}/api/move`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moveData),
      });

      const data = await response.json();
      console.log('Move response:', data);

      if (data.error) {
        console.log('Move error:', data.error);
        setError(data.error);
        setAiThinking(false);
        setCurrentPlayer('b'); // Back to player's turn
        return;
      }

      // Update with the server's response (includes any captures)
      updateGameState(data);
      
      // Get updated game state after AI move
      setTimeout(async () => {
        try {
          const stateResponse = await fetch(`${BACKEND_URL}/api/state`);
          const stateData = await stateResponse.json();
          console.log('Updated game state after AI move:', stateData);
          updateGameState(stateData);
        } catch (err) {
          setError('Failed to get updated game state');
          setAiThinking(false);
        }
      }, 1000);

    } catch (err) {
      console.log('Move request failed:', err);
      setError('Failed to make move. Check backend connection and CORS settings.');
      setAiThinking(false);
      setCurrentPlayer('b'); // Back to player's turn
    }
  };

  const resetGame = async () => {
    try {
      setError('');
      setSelectedCell(null);
      setAiThinking(false);
      
      // Call the new game endpoint to reset the backend
      const response = await fetch(`${BACKEND_URL}/api/new-game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to start new game');
      }
      
      const data = await response.json();
      console.log('New game started:', data);
      
      // Update the game state with the fresh board
      updateGameState(data);
      
    } catch (err) {
      setError('Failed to start new game. Check backend connection.');
    }
  };

  useEffect(() => {
    if (isOpen) {
      initializeGame();
    }
  }, [isOpen, initializeGame]);


  const isKing = (piece) => {
    return piece === piece.toUpperCase() && piece !== '.';
  };

  const getCellClass = (row, col, piece) => {
    const baseClass = (row + col) % 2 === 0 ? 'light' : 'dark';
    const selectedClass = selectedCell?.row === row && selectedCell?.col === col ? 'selected' : '';
    return `${baseClass} ${selectedClass}`;
  };

  const calculateValidMoves = (row, col) => {
    const moves = [];
    const piece = board[row][col];
    
    if (piece !== 'b' && piece !== 'B') return moves;
    
    // Check all 8 diagonal directions
    const directions = [
      [-1, -1], [-1, 1], [1, -1], [1, 1]  // All 4 diagonal directions
    ];
    
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      
      // Check bounds
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        // Check if destination is empty
        if (board[newRow][newCol] === '.') {
          // For regular pieces, only allow forward moves
          if (piece === 'b' && newRow <= row) continue;
          moves.push({ row: newRow, col: newCol });
        }
        
        // Check for jump moves (2 squares away)
        const jumpRow = row + dr * 2;
        const jumpCol = col + dc * 2;
        
        if (jumpRow >= 0 && jumpRow < 8 && jumpCol >= 0 && jumpCol < 8) {
          if (board[jumpRow][jumpCol] === '.' && 
              (board[newRow][newCol] === 'r' || board[newRow][newCol] === 'R')) {
            // For regular pieces, only allow forward jumps
            if (piece === 'b' && jumpRow <= row) continue;
            moves.push({ row: jumpRow, col: jumpCol });
          }
        }
      }
    }
    
    return moves;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 border border-purple-400/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-400/30">
            <h2 className="text-2xl font-bold text-white">Checkers AI Challenge</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={resetGame}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                New Game
              </button>
              <button
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          {/* Game Status */}
          <div className="p-4 border-b border-purple-400/30">
            <div className="flex items-center justify-between">
              <div className="text-white">
                {gameOver ? (
                  <span className="text-lg font-bold">
                    Game Over! Winner: {winner === 'black' ? 'You' : winner === 'red' ? 'AI' : 'Tie'}
                  </span>
                ) : (
                  <span className="text-lg">
                    {aiThinking ? 'AI is thinking...' : currentPlayer === 'b' ? 'Your turn (Black)' : currentPlayer === 'r' ? 'AI turn (Red)' : 'Waiting...'}
                  </span>
                )}
              </div>
              {aiThinking && (
                <div className="flex items-center gap-2 text-purple-400">
                  <div className="animate-spin w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full"></div>
                  <span>AI analyzing...</span>
                </div>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-900/50 border-l-4 border-red-500">
              <div className="text-red-400">
                <strong>Error:</strong> {error}
              </div>
            </div>
          )}

          {/* Game Board */}
          <div className="p-6 flex justify-center">
            <div className="grid grid-cols-8 gap-0 bg-gray-800 p-2 rounded-lg border-2 border-purple-400/30">
              {board.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                  // Flip the board so black pieces are at the bottom (row 0 is now at bottom)
                  const displayRowIndex = rowIndex;
                  const displayColIndex = colIndex;
                  
                  return (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (rowIndex * 8 + colIndex) * 0.01 }}
                      className={`
                        w-16 h-16 flex items-center justify-center cursor-pointer transition-all duration-300 border border-gray-600
                        ${getCellClass(displayRowIndex, displayColIndex, piece)}
                        ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'ring-4 ring-yellow-400 shadow-lg shadow-yellow-400/50' : ''}
                        ${validMoves.some(move => move.row === rowIndex && move.col === colIndex) ? 'ring-2 ring-green-400 shadow-lg shadow-green-400/50 bg-green-400/20' : ''}
                        ${piece !== '.' && piece.toLowerCase() === 'b' ? 'hover:ring-2 hover:ring-blue-400 hover:shadow-lg hover:shadow-blue-400/30' : ''}
                      `}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                    {piece !== '.' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`
                          w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300
                          ${piece.toLowerCase() === 'r' ? 'bg-red-600 border-red-800' : 'bg-black border-gray-700'}
                          ${capturedPiece?.row === rowIndex && capturedPiece?.col === colIndex ? 'opacity-0 scale-0' : ''}
                        `}
                      >
                        {isKing(piece) && (
                          <span className="text-yellow-400 text-xl">♔</span>
                        )}
                      </motion.div>
                    )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          {/* Game Info */}
          <div className="p-4 border-t border-purple-400/30">
            <div className="text-gray-300 text-sm">
              <p><strong>How to play:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>You play as <span className="text-gray-400">Black pieces</span></li>
                <li>AI plays as <span className="text-red-400">Red pieces</span></li>
                <li>Click on your piece, then click where you want to move</li>
                <li>Kings (♔) can move in all directions</li>
                <li>Jump over opponent pieces to capture them</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckersDemo;
