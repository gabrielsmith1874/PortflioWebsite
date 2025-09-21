# Huffman Compression Demo

A live web demonstration of the Huffman compression algorithm with a modern terminal-style interface.

## Features

- **Text Compression**: Compress any text input and see the Huffman codes
- **File Compression**: Upload and compress any file type
- **Real-time Statistics**: View compression ratios, space saved, and algorithm efficiency
- **Terminal Aesthetic**: Modern dark theme with monospace fonts
- **Interactive Demo**: See the compression process in action

## Quick Start

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the Server**:
   ```bash
   python start_server.py
   ```

3. **Open Demo**: Navigate to `http://localhost:5000`

## Manual Setup

If you prefer to run manually:

```bash
python app.py
```

## API Endpoints

- `POST /compress_text` - Compress text input
- `POST /compress_file` - Compress uploaded file
- `GET /` - Web interface

## How It Works

1. **Frequency Analysis**: Analyzes character frequency in the input
2. **Tree Construction**: Builds optimal Huffman tree
3. **Code Generation**: Assigns shorter codes to frequent characters
4. **Compression**: Encodes data using generated codes
5. **Statistics**: Calculates compression efficiency

## Technical Details

- Built with Flask and Python
- Uses the original Huffman implementation from `compress2.py`
- Supports any file type (binary and text)
- Real-time compression statistics
- Cross-platform compatibility

## Example Usage

### Text Compression
Input: "Hello World!"
Output: Compressed with Huffman codes showing character frequency optimization

### File Compression
Upload any file and see:
- Original file size
- Compressed file size
- Compression ratio percentage
- Bytes saved
- Average bits per symbol

## Files Structure

```
huffman-backend/
├── app.py              # Flask web application
├── compress2.py        # Core Huffman algorithm
├── huffman.py          # HuffmanTree class
├── utils.py            # Utility functions
├── requirements.txt    # Python dependencies
├── start_server.py     # Server startup script
└── README.md          # This file
```

## Algorithm Efficiency

The demo shows real compression statistics:
- **Text files**: Typically 20-40% compression
- **Binary files**: Varies based on data patterns
- **Efficiency**: Measured in bits per symbol

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

**Port 5000 in use**: Change the port in `app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Use different port
```

**Dependencies issues**: Ensure Python 3.7+ and pip are installed.
