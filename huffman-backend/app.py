from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import tempfile
import os
from compress2 import compress_file, decompress_file, build_frequency_dict, build_huffman_tree, get_codes, avg_length, number_nodes
from huffman import HuffmanTree
import struct

def compress_bytes(data_bytes, codes):
    """Compress bytes using Huffman codes"""
    compressed_bits = []
    for byte in data_bytes:
        if byte in codes:
            compressed_bits.append(codes[byte])
        else:
            # If byte not in codes, use the byte itself as 8-bit representation
            compressed_bits.append(format(byte, '08b'))
    
    # Join all bits and pad to make it byte-aligned
    bit_string = ''.join(compressed_bits)
    
    # Pad with zeros to make it byte-aligned
    while len(bit_string) % 8 != 0:
        bit_string += '0'
    
    # Convert bit string back to bytes
    compressed_bytes = bytearray()
    for i in range(0, len(bit_string), 8):
        byte_bits = bit_string[i:i+8]
        compressed_bytes.append(int(byte_bits, 2))
    
    return bytes(compressed_bytes)

def compress_file_with_filename(in_file: str, out_file: str, original_filename: str) -> None:
    """Compress file and embed original filename in the .huff file"""
    with open(in_file, "rb") as f1:
        text = f1.read()
    
    freq = build_frequency_dict(text)
    tree = build_huffman_tree(freq)
    codes = get_codes(tree)
    number_nodes(tree)
    
    # Create the compressed data using the existing compress_file logic
    from compress2 import tree_to_bytes, int32_to_bytes
    compressed_data = (tree.num_nodes_to_bytes() + tree_to_bytes(tree)
                      + int32_to_bytes(len(text)))
    compressed_data += compress_bytes(text, codes)
    
    # Create the final file with embedded filename
    # Format: [filename_length:4][filename:filename_length][compressed_data]
    filename_bytes = original_filename.encode('utf-8')
    filename_length = len(filename_bytes)
    
    with open(out_file, "wb") as f2:
        # Write filename length (4 bytes)
        f2.write(struct.pack('<I', filename_length))
        # Write filename
        f2.write(filename_bytes)
        # Write compressed data
        f2.write(compressed_data)
    
    print(f"DEBUG: Embedded filename '{original_filename}' in compressed file")

def decompress_file_with_filename(in_file: str, out_file: str) -> str:
    """Decompress file and extract original filename from .huff file"""
    with open(in_file, "rb") as f1:
        # Read filename length (4 bytes)
        filename_length = struct.unpack('<I', f1.read(4))[0]
        # Read filename
        original_filename = f1.read(filename_length).decode('utf-8')
        # Read remaining data (compressed content)
        remaining_data = f1.read()
    
    # Write remaining data to temporary file for decompression
    temp_file = tempfile.mktemp()
    with open(temp_file, "wb") as temp_f:
        temp_f.write(remaining_data)
    
    # Decompress using existing function
    decompress_file(temp_file, out_file)
    
    # Clean up temp file
    os.unlink(temp_file)
    
    return original_filename

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template_string('''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Huffman Compression Demo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: #e0e0e0;
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: rgba(0, 0, 0, 0.7);
            border: 2px solid #4a4a4a;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        h1 {
            text-align: center;
            color: #00ff88;
            margin-bottom: 30px;
            text-shadow: 0 0 10px #00ff88;
        }
        
        .demo-section {
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid #333;
            border-radius: 5px;
        }
        
        .input-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            color: #00ff88;
            font-weight: bold;
        }
        
        textarea, input[type="file"] {
            width: 100%;
            padding: 10px;
            background: #2a2a2a;
            border: 1px solid #555;
            border-radius: 5px;
            color: #e0e0e0;
            font-family: 'Courier New', monospace;
            font-size: 14px;
        }
        
        textarea {
            min-height: 120px;
            resize: vertical;
        }
        
        button {
            background: linear-gradient(45deg, #00ff88, #00cc66);
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            color: #000;
            font-weight: bold;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        button:hover {
            background: linear-gradient(45deg, #00cc66, #00ff88);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
        }
        
        button:disabled {
            background: #666;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .results {
            margin-top: 20px;
            padding: 15px;
            background: rgba(0, 255, 136, 0.1);
            border: 1px solid #00ff88;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
        }
        
        .error {
            background: rgba(255, 0, 0, 0.1);
            border-color: #ff4444;
            color: #ff6666;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .stat-item {
            background: rgba(255, 255, 255, 0.05);
            padding: 10px;
            border-radius: 5px;
            text-align: center;
        }
        
        .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #00ff88;
        }
        
        .stat-label {
            font-size: 12px;
            color: #aaa;
            margin-top: 5px;
        }
        
        .loading {
            display: none;
            text-align: center;
            color: #00ff88;
            margin: 20px 0;
        }
        
        .loading.show {
            display: block;
        }
        
        .spinner {
            border: 2px solid #333;
            border-top: 2px solid #00ff88;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-right: 10px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>HUFFMAN COMPRESSION DEMO</h1>
        
        <div class="demo-section">
            <h2 style="color: #00ff88; margin-bottom: 15px;">Text Compression</h2>
            <div class="input-group">
                <label for="textInput">Enter text to compress:</label>
                <textarea id="textInput" placeholder="Type or paste your text here...">Hello World! This is a demonstration of the Huffman compression algorithm. The algorithm works by assigning shorter codes to more frequent characters, resulting in efficient compression.</textarea>
            </div>
            <button onclick="compressText()">COMPRESS TEXT</button>
            <div id="textResults" class="results" style="display: none;"></div>
        </div>
        
        <div class="demo-section">
            <h2 style="color: #00ff88; margin-bottom: 15px;">File Compression</h2>
            <div class="input-group">
                <label for="fileInput">Select a file to compress:</label>
                <input type="file" id="fileInput" accept="*/*">
            </div>
            <button onclick="compressFile()">COMPRESS FILE</button>
            <div id="fileResults" class="results" style="display: none;"></div>
        </div>
        
        <div class="loading" id="loading">
            <div class="spinner"></div>Processing...
        </div>
    </div>

    <script>
        async function compressText() {
            const text = document.getElementById('textInput').value;
            const resultsDiv = document.getElementById('textResults');
            const loadingDiv = document.getElementById('loading');
            
            if (!text.trim()) {
                showError(resultsDiv, 'Please enter some text to compress.');
                return;
            }
            
            loadingDiv.classList.add('show');
            resultsDiv.style.display = 'none';
            
            try {
                const response = await fetch('/compress_text', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: text })
                });
                
                const data = await response.json();
                
                if (data.error) {
                    showError(resultsDiv, data.error);
                } else {
                    showTextResults(resultsDiv, data);
                }
            } catch (error) {
                showError(resultsDiv, 'Error: ' + error.message);
            } finally {
                loadingDiv.classList.remove('show');
            }
        }
        
        async function compressFile() {
            const fileInput = document.getElementById('fileInput');
            const resultsDiv = document.getElementById('fileResults');
            const loadingDiv = document.getElementById('loading');
            
            if (!fileInput.files[0]) {
                showError(resultsDiv, 'Please select a file to compress.');
                return;
            }
            
            loadingDiv.classList.add('show');
            resultsDiv.style.display = 'none';
            
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            
            try {
                const response = await fetch('/compress_file', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.error) {
                    showError(resultsDiv, data.error);
                } else {
                    showFileResults(resultsDiv, data);
                }
            } catch (error) {
                showError(resultsDiv, 'Error: ' + error.message);
            } finally {
                loadingDiv.classList.remove('show');
            }
        }
        
        function showError(resultsDiv, message) {
            resultsDiv.innerHTML = '<strong>ERROR:</strong> ' + message;
            resultsDiv.className = 'results error';
            resultsDiv.style.display = 'block';
        }
        
        function showTextResults(resultsDiv, data) {
            const compressionRatio = ((data.original_size - data.compressed_size) / data.original_size * 100).toFixed(2);
            const spaceSaved = data.original_size - data.compressed_size;
            
            resultsDiv.innerHTML = `
                <h3 style="color: #00ff88; margin-bottom: 15px;">COMPRESSION SUCCESSFUL!</h3>
                <div class="stats">
                    <div class="stat-item">
                        <div class="stat-value">${data.original_size}</div>
                        <div class="stat-label">Original Size (bytes)</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${data.compressed_size}</div>
                        <div class="stat-label">Compressed Size (bytes)</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${compressionRatio}%</div>
                        <div class="stat-label">Compression Ratio</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${spaceSaved}</div>
                        <div class="stat-label">Bytes Saved</div>
                    </div>
                </div>
                <div style="margin-top: 15px;">
                    <strong>Huffman Codes:</strong><br>
                    <pre style="margin-top: 10px; color: #ccc;">${data.codes_display}</pre>
                </div>
                <div style="margin-top: 15px;">
                    <strong>Compressed Data (hex):</strong><br>
                    <code style="word-break: break-all; color: #ccc;">${data.compressed_hex}</code>
                </div>
            `;
            resultsDiv.className = 'results';
            resultsDiv.style.display = 'block';
        }
        
        function showFileResults(resultsDiv, data) {
            const compressionRatio = ((data.original_size - data.compressed_size) / data.original_size * 100).toFixed(2);
            const spaceSaved = data.original_size - data.compressed_size;
            
            resultsDiv.innerHTML = `
                <h3 style="color: #00ff88; margin-bottom: 15px;">FILE COMPRESSION SUCCESSFUL!</h3>
                <div class="stats">
                    <div class="stat-item">
                        <div class="stat-value">${data.original_size}</div>
                        <div class="stat-label">Original Size (bytes)</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${data.compressed_size}</div>
                        <div class="stat-label">Compressed Size (bytes)</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${compressionRatio}%</div>
                        <div class="stat-label">Compression Ratio</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${spaceSaved}</div>
                        <div class="stat-label">Bytes Saved</div>
                    </div>
                </div>
                <div style="margin-top: 15px;">
                    <strong>Compressed file saved as:</strong> ${data.compressed_filename}<br>
                    <strong>Average bits per symbol:</strong> ${data.avg_bits_per_symbol.toFixed(2)}
                </div>
            `;
            resultsDiv.className = 'results';
            resultsDiv.style.display = 'block';
        }
    </script>
</body>
</html>
    ''')

@app.route('/compress_text', methods=['POST'])
def compress_text():
    try:
        data = request.json
        text = data['text']
        
        # Convert text to bytes
        text_bytes = text.encode('utf-8')
        
        # Build frequency dictionary and Huffman tree
        freq_dict = build_frequency_dict(text_bytes)
        tree = build_huffman_tree(freq_dict)
        codes = get_codes(tree)
        
        # Compress the text
        compressed_bytes = compress_bytes(text_bytes, codes)
        
        # Calculate statistics
        original_size = len(text_bytes)
        compressed_size = len(compressed_bytes)
        
        # Format codes for display
        codes_display = ""
        for char, code in sorted(codes.items()):
            char_display = chr(char) if 32 <= char <= 126 else f"\\{char:03d}"
            codes_display += f"'{char_display}': {code}\n"
        
        return jsonify({
            'original_size': original_size,
            'compressed_size': compressed_size,
            'codes_display': codes_display,
            'compressed_hex': compressed_bytes.hex(),
            'avg_bits_per_symbol': avg_length(tree, freq_dict)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/compress_file', methods=['POST'])
def compress_file_api():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Create temporary files
        with tempfile.NamedTemporaryFile(delete=False, suffix=f"_{file.filename}") as temp_input:
            file.save(temp_input.name)
            input_file = temp_input.name
        
        output_file = tempfile.mktemp(suffix='.huff')
        
        # Get original file size
        original_size = os.path.getsize(input_file)
        
        # Compress the file with original filename embedded
        compress_file_with_filename(input_file, output_file, file.filename)
        
        # Get compressed file size
        compressed_size = os.path.getsize(output_file)
        
        # Calculate frequency and tree for statistics
        with open(input_file, 'rb') as f:
            text_bytes = f.read()
        freq_dict = build_frequency_dict(text_bytes)
        tree = build_huffman_tree(freq_dict)
        
        # Read the compressed file
        with open(output_file, 'rb') as f:
            compressed_data = f.read()
        
        # Get statistics before cleanup
        avg_bits = avg_length(tree, freq_dict)
        
        # Clean up temporary files
        os.unlink(input_file)
        os.unlink(output_file)
        
        # Return the compressed file directly
        from flask import Response
        return Response(
            compressed_data,
            mimetype='application/octet-stream',
            headers={
                'Content-Disposition': f'attachment; filename="{file.filename.replace(os.path.splitext(file.filename)[1], ".huff")}"',
                'X-Original-Size': str(original_size),
                'X-Compressed-Size': str(compressed_size),
                'X-Avg-Bits-Per-Symbol': str(avg_bits),
                'X-Original-Filename': file.filename
            }
        )
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/decompress', methods=['POST'])
def decompress_file_api():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Create temporary files
        with tempfile.NamedTemporaryFile(delete=False, suffix='.huff') as temp_input:
            file.save(temp_input.name)
            input_file = temp_input.name
        
        output_file = tempfile.mktemp()
        
        # Decompress the file and extract original filename
        original_filename = decompress_file_with_filename(input_file, output_file)
        print(f"DEBUG: Extracted original filename: {original_filename}")
        
        # Read the decompressed file
        with open(output_file, 'rb') as f:
            decompressed_data = f.read()
        
        # Clean up temporary files
        os.unlink(input_file)
        os.unlink(output_file)
        
        # The original filename is now extracted from the .huff file header
        # No need for file type detection - we have the exact original filename
        
        # Return the decompressed file
        from flask import Response
        return Response(
            decompressed_data,
            mimetype='application/octet-stream',
            headers={
                'Content-Disposition': f'attachment; filename="{original_filename}"',
                'X-Original-Filename': original_filename,
                'X-Original-Size': str(len(decompressed_data))
            }
        )
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
