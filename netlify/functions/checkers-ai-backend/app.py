from flask import Flask, render_template, jsonify, request, session
from flask_cors import CORS
from state import State, get_possible_moves, get_opp_char, minimax_search
import secrets
import copy

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'], supports_credentials=True)

# Simple in-memory game state (since sessions might not work with CORS)
current_game_state = None


def initialize_board():
    """Initialize a new checkers board."""
    return [
        ['.', 'b', '.', 'b', '.', 'b', '.', 'b'],
        ['b', '.', 'b', '.', 'b', '.', 'b', '.'],
        ['.', 'b', '.', 'b', '.', 'b', '.', 'b'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['r', '.', 'r', '.', 'r', '.', 'r', '.'],
        ['.', 'r', '.', 'r', '.', 'r', '.', 'r'],
        ['r', '.', 'r', '.', 'r', '.', 'r', '.']
    ]


def init_game_state():
    """Initialize a new game state."""
    game_state = {
        'board': initialize_board(),
        'current_player': 'b',  # b for black (human player)
        'game_over': False,
        'winner': None,
        'ai_thinking': False
    }
    return game_state

@app.route('/api/get-board', methods=['GET'])
def get_board():
    """API endpoint to get the current board state."""
    global current_game_state
    if current_game_state is None:
        current_game_state = init_game_state()
    return jsonify(current_game_state)


@app.route('/')
def home():
    """Render the main game page."""
    if 'game_state' not in session:
        session['game_state'] = init_game_state()
    return render_template('checkers.html')


@app.route('/api/state')
def get_game_state():
    """Get the current game state."""
    global current_game_state
    if current_game_state is None:
        current_game_state = init_game_state()

    game_state = current_game_state
    state = State(game_state['board'])

    # Get valid moves for current player
    valid_moves = []
    if game_state['current_player'] == 'b' and not game_state['game_over']:
        possible_moves = get_possible_moves(state, 'b')
        valid_moves = [{'from': find_move_source(state.board, move.board),
                        'to': find_move_destination(state.board, move.board)}
                       for move in possible_moves]

    return jsonify({
        'board': game_state['board'],
        'currentPlayer': game_state['current_player'],
        'gameOver': game_state['game_over'],
        'winner': game_state['winner'],
        'validMoves': valid_moves,
        'aiThinking': game_state['ai_thinking']
    })

def find_move_source(old_board, new_board):
    """Find the source position of a move."""
    for i in range(8):
        for j in range(8):
            if old_board[i][j] in ['b', 'B'] and new_board[i][j] == '.':
                return [i, j]
    return None


def find_move_destination(old_board, new_board):
    """Find the destination position of a move."""
    for i in range(8):
        for j in range(8):
            if old_board[i][j] == '.' and new_board[i][j] in ['b', 'B']:
                return [i, j]
    return None


@app.route('/api/move', methods=['POST'])
def make_move():
    """Handle a player's move."""
    global current_game_state
    if current_game_state is None:
        current_game_state = init_game_state()

    game_state = current_game_state
    if game_state['game_over']:
        return jsonify({'error': 'Game is already over'}), 400

    data = request.json
    from_pos = data.get('from')
    to_pos = data.get('to')

    if not from_pos or not to_pos:
        return jsonify({'error': 'Invalid move format'}), 400

    # Basic move validation
    if (from_pos[0] < 0 or from_pos[0] > 7 or from_pos[1] < 0 or from_pos[1] > 7 or
        to_pos[0] < 0 or to_pos[0] > 7 or to_pos[1] < 0 or to_pos[1] > 7):
        return jsonify({'error': 'Move out of bounds'}), 400
    
    # Check if source has a black piece and destination is empty
    if game_state['board'][from_pos[0]][from_pos[1]] not in ['b', 'B']:
        return jsonify({'error': 'No piece at source position'}), 400
    
    if game_state['board'][to_pos[0]][to_pos[1]] != '.':
        return jsonify({'error': 'Destination is not empty'}), 400
    
    # Simple diagonal move validation (basic checkers rules)
    row_diff = abs(to_pos[0] - from_pos[0])
    col_diff = abs(to_pos[1] - from_pos[1])
    
    print(f"DEBUG: Move from {from_pos} to {to_pos}, row_diff={row_diff}, col_diff={col_diff}")
    
    if row_diff != col_diff or row_diff == 0:
        print(f"DEBUG: Invalid diagonal move")
        return jsonify({'error': 'Must move diagonally'}), 400
    
    if row_diff > 2:
        print(f"DEBUG: Move too far")
        return jsonify({'error': 'Cannot move more than 2 squares diagonally'}), 400
    
    # Check direction for regular pieces (black pieces can only move "down" the board)
    if game_state['board'][from_pos[0]][from_pos[1]] == 'b' and to_pos[0] <= from_pos[0]:
        print(f"DEBUG: Black piece cannot move backwards")
        return jsonify({'error': 'Black pieces can only move forward'}), 400
    
    # Make the move
    new_board = [row[:] for row in game_state['board']]
    piece = new_board[from_pos[0]][from_pos[1]]
    new_board[from_pos[0]][from_pos[1]] = '.'
    new_board[to_pos[0]][to_pos[1]] = piece
    
    # Handle piece capturing (jump moves)
    if row_diff == 2:  # This is a jump move
        # Calculate the position of the captured piece (middle of the jump)
        captured_row = (from_pos[0] + to_pos[0]) // 2
        captured_col = (from_pos[1] + to_pos[1]) // 2
        
        print(f"DEBUG: Capturing piece at [{captured_row}, {captured_col}]")
        
        # Check if there's actually an opponent piece to capture
        captured_piece = new_board[captured_row][captured_col]
        if captured_piece in ['r', 'R']:  # Capturing a red piece
            new_board[captured_row][captured_col] = '.'
            print(f"DEBUG: Captured red piece at [{captured_row}, {captured_col}]")
        else:
            print(f"DEBUG: No opponent piece to capture at [{captured_row}, {captured_col}]")
    
    # Check for king promotion
    if piece == 'b' and to_pos[0] == 7:
        new_board[to_pos[0]][to_pos[1]] = 'B'
        print(f"DEBUG: Promoted piece to king at [{to_pos[0]}, {to_pos[1]}]")

    # Update game state with human move
    current_game_state['board'] = new_board
    current_game_state['current_player'] = 'r'
    current_game_state['ai_thinking'] = True

    # Make AI move
    state = State(current_game_state['board'])
    if not state.check_end():
        _, ai_move, _ = minimax_search(
            state, 'r', float("-inf"), float("inf"),
            4, True, 0, use_caching=0, use_ordering=1
        )

        if ai_move:
            current_game_state['board'] = ai_move.board

        # Check for game end
        state = State(current_game_state['board'])
        if state.check_end():
            current_game_state['game_over'] = True
            current_game_state['winner'] = determine_winner(current_game_state['board'])
    else:
        current_game_state['game_over'] = True
        current_game_state['winner'] = determine_winner(current_game_state['board'])

    current_game_state['current_player'] = 'b'
    current_game_state['ai_thinking'] = False

    return jsonify({'success': True, 'board': current_game_state['board'], 'gameOver': current_game_state['game_over']})


def determine_winner(board):
    """Determine the winner based on piece count."""
    red_pieces = sum(row.count('r') + row.count('R') for row in board)
    black_pieces = sum(row.count('b') + row.count('B') for row in board)

    if red_pieces > black_pieces:
        return 'red'
    elif black_pieces > red_pieces:
        return 'black'
    else:
        return 'tie'


@app.route('/api/new-game', methods=['POST'])
def new_game():
    """Start a new game."""
    global current_game_state, cache  # Ensure you are using the global cache
    cache = {}  # Clear the cache

    current_game_state = init_game_state()
    game_state = current_game_state
    
    print(f"DEBUG: New game started - current_player: {game_state['current_player']}, board initialized")

    # If AI is supposed to play first, make the AI move
    if game_state['current_player'] == 'r':
        state = State(game_state['board'])
        _, ai_move, _ = minimax_search(
            state, 'r', float("-inf"), float("inf"),
            4, True, 0, use_caching=0, use_ordering=1
        )

        if ai_move:
            current_game_state['board'] = ai_move.board

        # Check for game end
        state = State(current_game_state['board'])
        if state.check_end():
            current_game_state['game_over'] = True
            current_game_state['winner'] = determine_winner(current_game_state['board'])
        else:
            current_game_state['current_player'] = 'b'

    return jsonify({
        'success': True, 
        'board': current_game_state['board'], 
        'gameOver': current_game_state['game_over'],
        'currentPlayer': current_game_state['current_player'],
        'aiThinking': current_game_state['ai_thinking'],
        'winner': current_game_state['winner']
    })

def validate_move(from_pos, to_pos, board):
    """Validate if a move is legal."""
    # Check if positions are within bounds
    if not all(0 <= pos[i] < 8 for pos in [from_pos, to_pos] for i in range(2)):
        return False

    # Check if source has a player's piece and destination is empty
    if board[from_pos[0]][from_pos[1]] not in ['b', 'B']:
        return False
    if board[to_pos[0]][to_pos[1]] != '.':
        return False

    return True


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)