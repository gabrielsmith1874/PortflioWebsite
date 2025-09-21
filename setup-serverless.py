#!/usr/bin/env python3
"""
Setup script to prepare your portfolio for serverless deployment.
This script copies your Python backend files to the Netlify functions directory.
"""

import os
import shutil
import sys

def copy_directory(src, dst):
    """Copy directory contents to destination."""
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    print(f"✅ Copied {src} to {dst}")

def copy_file(src, dst):
    """Copy file to destination."""
    shutil.copy2(src, dst)
    print(f"✅ Copied {src} to {dst}")

def main():
    print("🚀 Setting up serverless deployment...")
    
    # Create netlify/functions directory if it doesn't exist
    functions_dir = "netlify/functions"
    if not os.path.exists(functions_dir):
        os.makedirs(functions_dir)
        print(f"✅ Created {functions_dir}")
    
    # Copy Huffman backend files
    huffman_src = "huffman-backend"
    huffman_dst = "netlify/functions/huffman-backend"
    
    if os.path.exists(huffman_src):
        copy_directory(huffman_src, huffman_dst)
    else:
        print(f"⚠️  Warning: {huffman_src} not found")
    
    # Copy Checkers AI files
    checkers_src = "Checkers AI"
    checkers_dst = "netlify/functions/checkers-ai-backend"
    
    if os.path.exists(checkers_src):
        copy_directory(checkers_src, checkers_dst)
    else:
        print(f"⚠️  Warning: {checkers_src} not found")
    
    # Update the Netlify function imports
    print("\n🔧 Updating function imports...")
    
    # Update huffman-compress.py
    huffman_function = "netlify/functions/huffman-compress.py"
    if os.path.exists(huffman_function):
        with open(huffman_function, 'r') as f:
            content = f.read()
        
        # Update the import path
        content = content.replace(
            "sys.path.append(os.path.join(os.path.dirname(__file__), '../../huffman-backend'))",
            "sys.path.append(os.path.join(os.path.dirname(__file__), './huffman-backend'))"
        )
        
        with open(huffman_function, 'w') as f:
            f.write(content)
        print("✅ Updated huffman-compress.py imports")
    
    # Update checkers-ai.py
    checkers_function = "netlify/functions/checkers-ai.py"
    if os.path.exists(checkers_function):
        with open(checkers_function, 'r') as f:
            content = f.read()
        
        # Update the import path
        content = content.replace(
            "sys.path.append(os.path.join(os.path.dirname(__file__), '../../Checkers AI'))",
            "sys.path.append(os.path.join(os.path.dirname(__file__), './checkers-ai-backend'))"
        )
        
        with open(checkers_function, 'w') as f:
            f.write(content)
        print("✅ Updated checkers-ai.py imports")
    
    print("\n🎉 Setup complete!")
    print("\n📋 Next steps:")
    print("1. Push your code to GitHub")
    print("2. Connect your repository to Netlify")
    print("3. Deploy!")
    print("\n🔗 Your demos will work at:")
    print("   - Huffman: https://your-site.netlify.app")
    print("   - Checkers: https://your-site.netlify.app")

if __name__ == "__main__":
    main()
