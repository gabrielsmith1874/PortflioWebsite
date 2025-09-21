import json
import base64
from http.server import BaseHTTPRequestHandler
import sys
import os

# Add the huffman-backend directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), './huffman-backend'))

# Import your existing compression functions
from compress2 import compress_file, decompress_file
import tempfile
import struct

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/compress':
            self.handle_compress()
        elif self.path == '/decompress':
            self.handle_decompress()
        else:
            self.send_response(404)
            self.end_headers()
    
    def handle_compress(self):
        try:
            # Get the uploaded file from request
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Parse multipart form data
            boundary = self.headers['Content-Type'].split('boundary=')[1]
            parts = post_data.split(f'--{boundary}'.encode())
            
            file_data = None
            filename = None
            
            for part in parts:
                if b'Content-Disposition: form-data' in part:
                    if b'filename=' in part:
                        # Extract filename
                        filename_line = part.split(b'\r\n')[0].decode()
                        filename = filename_line.split('filename="')[1].split('"')[0]
                        
                        # Extract file data
                        file_data = part.split(b'\r\n\r\n')[1].split(b'\r\n')[0]
                        break
            
            if not file_data:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'No file uploaded'}).encode())
                return
            
            # Create temporary files
            with tempfile.NamedTemporaryFile(delete=False) as input_file:
                input_file.write(file_data)
                input_path = input_file.name
            
            with tempfile.NamedTemporaryFile(delete=False, suffix='.huff') as output_file:
                output_path = output_file.name
            
            # Compress the file using your existing function
            compress_file(input_path, output_path)
            
            # Read the compressed file
            with open(output_path, 'rb') as f:
                compressed_data = f.read()
            
            # Create response
            response = {
                'success': True,
                'compressed_size': len(compressed_data),
                'original_size': len(file_data),
                'compression_ratio': f"{(1 - len(compressed_data) / len(file_data)) * 100:.1f}%",
                'compressed_data': base64.b64encode(compressed_data).decode()
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
            # Cleanup
            os.unlink(input_path)
            os.unlink(output_path)
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
    
    def handle_decompress(self):
        try:
            # Similar implementation for decompression
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Parse multipart form data for .huff file
            boundary = self.headers['Content-Type'].split('boundary=')[1]
            parts = post_data.split(f'--{boundary}'.encode())
            
            file_data = None
            
            for part in parts:
                if b'Content-Disposition: form-data' in part and b'.huff' in part:
                    file_data = part.split(b'\r\n\r\n')[1].split(b'\r\n')[0]
                    break
            
            if not file_data:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'No .huff file uploaded'}).encode())
                return
            
            # Create temporary files
            with tempfile.NamedTemporaryFile(delete=False, suffix='.huff') as input_file:
                input_file.write(file_data)
                input_path = input_file.name
            
            with tempfile.NamedTemporaryFile(delete=False) as output_file:
                output_path = output_file.name
            
            # Decompress the file
            decompress_file(input_path, output_path)
            
            # Read the decompressed file
            with open(output_path, 'rb') as f:
                decompressed_data = f.read()
            
            response = {
                'success': True,
                'decompressed_data': base64.b64encode(decompressed_data).decode(),
                'size': len(decompressed_data)
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
            # Cleanup
            os.unlink(input_path)
            os.unlink(output_path)
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
