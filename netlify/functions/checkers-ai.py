import json
from http.server import BaseHTTPRequestHandler
import sys
import os
import copy

# Add the Checkers AI directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), './checkers-ai-backend'))

# Import your existing Checkers AI logic
try:
    from state import State, get_possible_moves, get_opp_char, minimax_search
except ImportError:
    # Fallback if imports fail
    print("Warning: Could not import Checkers AI modules")

# Global game state (in production, use a database)
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

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/get-board':
            self.handle_get_board()
        elif self.path == '/api/state':
            self.handle_get_state()
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        if self.path == '/api/new-game':
            self.handle_new_game()
        elif self.path == '/api/move':
            self.handle_move()
        else:
            self.send_response(404)
            self.end_headers()
    
    def handle_get_board(self):
        global current_game_state
        if current_game_state is None:
            current_game_state = init_game_state()
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = {
            'board': current_game_state['board'],
            'current_player': current_game_state['current_player'],
            'game_over': current_game_state['game_over'],
            'winner': current_game_state['winner'],
            'ai_thinking': current_game_state['ai_thinking']
        }
        self.wfile.write(json.dumps(response).encode())
    
    def handle_get_state(self):
        global current_game_state
        if current_game_state is None:
            current_game_state = init_game_state()

        game_state = current_game_state
        
        # Get valid moves for current player
        valid_moves = []
        if game_state['current_player'] == 'b' and not game_state['game_over']:
            try:
                state = State(game_state['board'])
                possible_moves = get_possible_moves(state, 'b')
                valid_moves = [{'from': find_move_source(state.board, move.board),
                                'to': find_move_destination(state.board, move.board)}
                               for move in possible_moves]
            except:
                valid_moves = []

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = {
            'board': game_state['board'],
            'currentPlayer': game_state['current_player'],
            'gameOver': game_state['game_over'],
            'winner': game_state['winner'],
            'validMoves': valid_moves,
            'aiThinking': game_state['ai_thinking']
        }
        self.wfile.write(json.dumps(response).encode())
    
    def handle_new_game(self):
        global current_game_state
        current_game_state = init_game_state()
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = {
            'board': current_game_state['board'],
            'current_player': 'b',
            'game_over': False,
            'winner': None,
            'ai_thinking': False
        }
        self.wfile.write(json.dumps(response).encode())
    
    def handle_move(self):
        global current_game_state
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            move_data = json.loads(post_data.decode())
            
            from_row = move_data['from']['row']
            from_col = move_data['from']['col']
            to_row = move_data['to']['row']
            to_col = move_data['to']['col']
            
            # Validate the move
            if current_game_state is None or current_game_state['game_over']:
                raise ValueError("No active game")
            
            if current_game_state['current_player'] != 'b':
                raise ValueError("Not player's turn")
            
            # Create a copy of the board for move validation
            new_board = copy.deepcopy(current_game_state['board'])
            
            # Basic move validation
            if new_board[from_row][from_col] not in ['b', 'B']:
                raise ValueError("Invalid piece")
            
            if new_board[to_row][to_col] != '.':
                raise ValueError("Destination not empty")
            
            # Check if it's a diagonal move
            row_diff = abs(to_row - from_row)
            col_diff = abs(to_col - from_col)
            
            if row_diff != col_diff or row_diff == 0:
                raise ValueError("Must move diagonally")
            
            if row_diff > 2:
                raise ValueError("Cannot move more than 2 squares")
            
            # Make the move
            piece = new_board[from_row][from_col]
            new_board[from_row][from_col] = '.'
            new_board[to_row][to_col] = piece
            
            # Check for king promotion
            if piece == 'b' and to_row == 0:
                new_board[to_row][to_col] = 'B'
            
            # Update game state
            current_game_state['board'] = new_board
            current_game_state['current_player'] = 'r'  # AI's turn
            current_game_state['ai_thinking'] = True
            
            # AI move logic would go here
            # For now, just switch back to player after a delay
            # In a real implementation, you'd call minimax_search here
            
            response = {
                'success': True,
                'board': new_board,
                'current_player': 'r',
                'game_over': False,
                'winner': None,
                'ai_thinking': True
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
