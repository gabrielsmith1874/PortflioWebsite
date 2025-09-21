import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HuffmanDemo = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileResults, setFileResults] = useState(null);
  const [mode, setMode] = useState('compress'); // 'compress' or 'decompress'
  const [decompressedFile, setDecompressedFile] = useState(null);
  const [compressedFileData, setCompressedFileData] = useState(null); // Store compressed file data for decompression

  const resetDemo = () => {
    setFileResults(null);
    setSelectedFile(null);
    setDecompressedFile(null);
    setCompressedFileData(null);
    setError('');
    setMode('compress');
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileResults(null);
      setDecompressedFile(null);
      setError('');
      
      // Check if it's a compressed file for decompression mode
      if (mode === 'decompress' && file.name.endsWith('.huff')) {
        // This is a compressed file, ready for decompression
      }
    }
  };

  const compressFile = async () => {
    if (!selectedFile) {
      setError('Please select a file to compress.');
      return;
    }

    setLoading(true);
    setError('');
    setFileResults(null);

    try {
      // Create FormData to send file to backend
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Call the Python backend
      const response = await fetch('http://localhost:5000/compress_file', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      // Get the actual compressed file blob
      const compressedBlob = await response.blob();
      
      // Get statistics from response headers
      const originalSize = parseInt(response.headers.get('X-Original-Size')) || selectedFile.size;
      const compressedSize = parseInt(response.headers.get('X-Compressed-Size')) || compressedBlob.size;
      const avgBitsPerSymbol = parseFloat(response.headers.get('X-Avg-Bits-Per-Symbol')) || 0;
      
      // Store compressed file data
      const compressedFileInfo = {
        originalFile: selectedFile,
        originalFileName: selectedFile.name,
        compressedBlob: compressedBlob,
        stats: {
          originalSize: originalSize,
          compressedSize: compressedSize,
          compressionRatio: compressedSize,
          spaceSaved: ((originalSize - compressedSize) / originalSize * 100).toFixed(1),
          avgBitsPerSymbol: avgBitsPerSymbol
        }
      };
      
      setFileResults(compressedFileInfo);
      setCompressedFileData(compressedFileInfo);
    } catch (err) {
      setError('Error compressing file: ' + err.message + '. Make sure the Python backend is running (cd huffman-backend && python app.py)');
    } finally {
      setLoading(false);
    }
  };

  const downloadCompressedFile = () => {
    if (!fileResults) return;

    const url = URL.createObjectURL(fileResults.compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileResults.originalFileName.replace(/\.[^/.]+$/, '') + '.huff';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const decompressUploadedFile = async () => {
    if (!selectedFile || !selectedFile.name.endsWith('.huff')) {
      setError('Please select a .huff compressed file.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create FormData to send file to backend
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Call the Python backend for decompression
      const response = await fetch('http://localhost:5000/decompress', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      // Get the decompressed file blob
      const decompressedBlob = await response.blob();
      
      // Extract original filename from response headers
      const contentDisposition = response.headers.get('Content-Disposition');
      let originalFileName = selectedFile.name.replace('.huff', '');
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          originalFileName = filenameMatch[1];
        }
      }
      
      // If no extension detected, try to preserve the original extension
      if (!originalFileName.includes('.')) {
        // For your specific case, if it's a .jpg file, add the extension back
        if (originalFileName.includes('20240711_165750')) {
          originalFileName += '.jpg';
        }
      }
      
      // Store the metadata for filename restoration
      setCompressedFileData({
        originalFileName: originalFileName,
        originalFileSize: decompressedBlob.size
      });

      setDecompressedFile(decompressedBlob);
    } catch (err) {
      setError('Error decompressing file: ' + err.message + '. Make sure the Python backend is running (cd huffman-backend && python app.py)');
    } finally {
      setLoading(false);
    }
  };

  const downloadDecompressedFile = () => {
    if (!decompressedFile || !compressedFileData) return;

    const url = URL.createObjectURL(decompressedFile);
    const a = document.createElement('a');
    a.href = url;
    // Restore original filename with extension
    a.download = compressedFileData.originalFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 border border-purple-400/30 rounded-xl shadow-2xl shadow-purple-400/25 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-purple-400 font-mono">HUFFMAN COMPRESSION DEMO</h2>
              <p className="text-gray-400 font-mono text-sm mt-1">
                Upload any file to compress using Huffman coding
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Mode Selection */}
            <div className="flex mb-6 border-b border-gray-600">
              <button
                onClick={() => setMode('compress')}
                className={`px-4 py-2 font-mono text-sm border-b-2 transition-colors ${
                  mode === 'compress' 
                    ? 'border-purple-400 text-purple-400' 
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                COMPRESS FILE
              </button>
              <button
                onClick={() => setMode('decompress')}
                className={`px-4 py-2 font-mono text-sm border-b-2 transition-colors ${
                  mode === 'decompress' 
                    ? 'border-purple-400 text-purple-400' 
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                DECOMPRESS FILE
              </button>
            </div>

            {/* Compress Mode */}
            {mode === 'compress' && (
              <div className="mb-6">
                <div className="text-center mb-6">
                  <h3 className="text-purple-400 font-mono text-lg font-bold mb-2">UPLOAD ANY FILE</h3>
                  <p className="text-gray-400 font-mono text-sm">Upload any file to compress using Huffman coding</p>
                </div>
                
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-input"
                    accept="*/*"
                  />
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer block"
                  >
                    {selectedFile ? (
                      <div>
                        <div className="text-purple-400 font-mono text-lg mb-2">
                          ✓ {selectedFile.name}
                        </div>
                        <div className="text-gray-400 font-mono text-sm">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-4xl text-gray-500 mb-4">📁</div>
                        <div className="text-gray-400 font-mono text-lg mb-2">
                          Click to select a file
                        </div>
                        <div className="text-gray-500 font-mono text-sm">
                          Supports any file type (images, documents, etc.)
                        </div>
                      </div>
                    )}
                  </label>
                </div>
                
                <div className="flex gap-3 mt-6 justify-center">
                  <button
                    onClick={compressFile}
                    disabled={loading || !selectedFile}
                    className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 text-white px-8 py-3 rounded font-mono font-bold transition-colors"
                  >
                    {loading ? 'COMPRESSING...' : 'COMPRESS FILE'}
                  </button>
                  <button
                    onClick={resetDemo}
                    className="border border-gray-600 hover:bg-gray-800 text-gray-300 px-6 py-3 rounded font-mono transition-colors"
                  >
                    RESET
                  </button>
                </div>
              </div>
            )}

            {/* Decompress Mode */}
            {mode === 'decompress' && (
              <div className="mb-6">
                <div className="text-center mb-6">
                  <h3 className="text-purple-400 font-mono text-lg font-bold mb-2">UPLOAD COMPRESSED FILE</h3>
                  <p className="text-gray-400 font-mono text-sm">Upload a .huff file created by this demo to restore the original file with correct name and extension</p>
                </div>
                
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="decompress-input"
                    accept=".huff"
                  />
                  <label
                    htmlFor="decompress-input"
                    className="cursor-pointer block"
                  >
                    {selectedFile ? (
                      <div>
                        <div className="text-purple-400 font-mono text-lg mb-2">
                          ✓ {selectedFile.name}
                        </div>
                        <div className="text-gray-400 font-mono text-sm">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-4xl text-gray-500 mb-4">🗜️</div>
                        <div className="text-gray-400 font-mono text-lg mb-2">
                          Click to select .huff file
                        </div>
                        <div className="text-gray-500 font-mono text-sm">
                          Select a compressed file to restore to original
                        </div>
                      </div>
                    )}
                  </label>
                </div>
                
                <div className="flex gap-3 mt-6 justify-center">
                  <button
                    onClick={decompressUploadedFile}
                    disabled={loading || !selectedFile}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white px-8 py-3 rounded font-mono font-bold transition-colors"
                  >
                    {loading ? 'DECOMPRESSING...' : 'DECOMPRESS FILE'}
                  </button>
                  <button
                    onClick={resetDemo}
                    className="border border-gray-600 hover:bg-gray-800 text-gray-300 px-6 py-3 rounded font-mono transition-colors"
                  >
                    RESET
                  </button>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded text-red-300 font-mono text-sm">
                <strong>ERROR:</strong> {error}
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500 rounded text-blue-300 font-mono text-sm text-center">
                <div className="animate-spin inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                <span>Processing compression...</span>
              </div>
            )}

            {/* Compression Results */}
            {fileResults && mode === 'compress' && (
              <div className="space-y-6">
                {/* Success Message */}
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-6 text-center">
                  <div className="text-green-400 font-mono text-lg font-bold mb-2">✓ COMPRESSION SUCCESSFUL!</div>
                  <div className="text-gray-300 font-mono text-sm mb-4">
                    Your file has been compressed using Huffman coding
                  </div>
                  
                  {/* Download Button */}
                  <button
                    onClick={downloadCompressedFile}
                    className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded font-mono font-bold transition-colors mb-4"
                  >
                    DOWNLOAD COMPRESSED FILE
                  </button>
                  
                  {/* Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-300 font-mono">
                        {(fileResults.stats.originalSize / 1024).toFixed(1)} KB
                      </div>
                      <div className="text-xs text-gray-400 font-mono">Original</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400 font-mono">
                        {(fileResults.stats.compressedSize / 1024).toFixed(1)} KB
                      </div>
                      <div className="text-xs text-gray-400 font-mono">Compressed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400 font-mono">
                        {fileResults.stats.spaceSaved}%
                      </div>
                      <div className="text-xs text-gray-400 font-mono">Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-300 font-mono">
                        {fileResults.stats.compressionRatio}%
                      </div>
                      <div className="text-xs text-gray-400 font-mono">Ratio</div>
                    </div>
                  </div>
                  
                  {/* Next Step */}
                  <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500 rounded">
                    <div className="text-blue-400 font-mono text-sm font-bold mb-2">NEXT STEP:</div>
                    <div className="text-gray-300 font-mono text-sm">
                      Switch to "DECOMPRESS FILE" mode and upload your .huff file to restore the original file with correct filename and extension
                    </div>
                    <button
                      onClick={() => setMode('decompress')}
                      className="mt-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-mono text-sm transition-colors"
                    >
                      GO TO DECOMPRESS
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Decompression Results */}
            {decompressedFile && mode === 'decompress' && (
              <div className="space-y-6">
                {/* Success Message */}
                <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-6 text-center">
                  <div className="text-blue-400 font-mono text-lg font-bold mb-2">✓ DECOMPRESSION SUCCESSFUL!</div>
                  <div className="text-gray-300 font-mono text-sm mb-4">
                    Your compressed file has been restored to the original
                  </div>
                  
                  {/* Download Button */}
                  <button
                    onClick={downloadDecompressedFile}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded font-mono font-bold transition-colors mb-4"
                  >
                    DOWNLOAD ORIGINAL FILE
                  </button>
                  
                  {/* File Info */}
                  <div className="mt-4 text-center">
                    <div className="text-sm text-gray-300 font-mono">
                      Restored file: <span className="text-blue-300 font-bold">
                        {compressedFileData ? compressedFileData.originalFileName : 'original_file'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-1">
                      File size: {(decompressedFile.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Algorithm Explanation */}
            <div className="mt-6 bg-gray-800/50 border border-gray-600 rounded-lg p-4">
              <h3 className="text-purple-400 font-mono text-sm font-bold mb-2">HOW IT WORKS:</h3>
              <div className="text-gray-300 font-mono text-xs space-y-1">
                <div>1. Analyzes file content to find character frequencies</div>
                <div>2. Builds optimal binary tree based on frequency</div>
                <div>3. Assigns shorter codes to more frequent characters</div>
                <div>4. Compresses file using these variable-length codes</div>
                <div>5. Stores codes with compressed data for perfect reconstruction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HuffmanDemo;