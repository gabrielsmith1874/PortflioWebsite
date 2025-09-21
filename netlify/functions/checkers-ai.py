import json
import sys
import os
import copy

# Simple checkers game logic without external dependencies
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
    return {
        'board': initialize_board(),
        'current_player': 'b',
        'game_over': False,
        'winner': None,
        'ai_thinking': False
    }

# Global game state
current_game_state = init_game_state()

def handler(event, context):
    """Main function handler for Netlify Functions."""
    
    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }
    
    # Handle preflight requests
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    # Parse the path
    path = event['path']
    method = event['httpMethod']
    
    try:
        if path == '/api/get-board' and method == 'GET':
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(current_game_state)
            }
        
        elif path == '/api/state' and method == 'GET':
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'board': current_game_state['board'],
                    'currentPlayer': current_game_state['current_player'],
                    'gameOver': current_game_state['game_over'],
                    'winner': current_game_state['winner'],
                    'validMoves': [],
                    'aiThinking': current_game_state['ai_thinking']
                })
            }
        
        elif path == '/api/new-game' and method == 'POST':
            current_game_state = init_game_state()
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(current_game_state)
            }
        
        elif path == '/api/move' and method == 'POST':
            body = json.loads(event['body'])
            from_row = body['from']['row']
            from_col = body['from']['col']
            to_row = body['to']['row']
            to_col = body['to']['col']
            
            # Basic move validation and execution
            if (current_game_state['current_player'] == 'b' and 
                current_game_state['board'][from_row][from_col] in ['b', 'B'] and
                current_game_state['board'][to_row][to_col] == '.'):
                
                # Make the move
                piece = current_game_state['board'][from_row][from_col]
                current_game_state['board'][from_row][from_col] = '.'
                current_game_state['board'][to_row][to_col] = piece
                
                # Check for king promotion
                if piece == 'b' and to_row == 0:
                    current_game_state['board'][to_row][to_col] = 'B'
                
                # Switch to AI turn
                current_game_state['current_player'] = 'r'
                current_game_state['ai_thinking'] = True
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'board': current_game_state['board'],
                        'current_player': 'r',
                        'game_over': False,
                        'winner': None,
                        'ai_thinking': True
                    })
                }
            else:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Invalid move'})
                }
        
        else:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Not found'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }