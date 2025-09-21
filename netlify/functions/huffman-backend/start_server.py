#!/usr/bin/env python3
"""
Huffman Compression Demo Server
Start this script to run the Flask web server for the Huffman compression demo.
"""

import os
import sys
import subprocess

def check_dependencies():
    """Check if required dependencies are installed."""
    try:
        import flask
        import flask_cors
        print("✓ Dependencies found")
        return True
    except ImportError:
        print("✗ Missing dependencies")
        return False

def install_dependencies():
    """Install required dependencies."""
    print("Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✓ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError:
        print("✗ Failed to install dependencies")
        return False

def start_server():
    """Start the Flask server."""
    print("Starting Huffman Compression Demo Server...")
    print("Server will be available at: http://localhost:5000")
    print("Press Ctrl+C to stop the server")
    
    try:
        from app import app
        app.run(debug=True, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\n✓ Server stopped")
    except Exception as e:
        print(f"✗ Error starting server: {e}")

if __name__ == "__main__":
    print("=== Huffman Compression Demo Server ===")
    
    if not check_dependencies():
        if not install_dependencies():
            sys.exit(1)
    
    start_server()
