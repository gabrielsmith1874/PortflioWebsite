import json
import base64
import sys
import os

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
        if path == '/compress' and method == 'POST':
            # For now, return a mock response
            # In production, you'd integrate with your actual compression logic
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'compressed_size': 100,
                    'original_size': 200,
                    'compression_ratio': '50.0%',
                    'compressed_data': base64.b64encode(b'mock_compressed_data').decode()
                })
            }
        
        elif path == '/decompress' and method == 'POST':
            # For now, return a mock response
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'decompressed_data': base64.b64encode(b'mock_decompressed_data').decode(),
                    'size': 200
                })
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