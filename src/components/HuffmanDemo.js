import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HuffmanCompression from './HuffmanCompression';

const HuffmanDemo = ({ isOpen, onClose }) => {
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileResults, setFileResults] = useState(null);
  const [decompressedFile, setDecompressedFile] = useState(null);
  const [compressedFileData, setCompressedFileData] = useState(null); // Store compressed file data for decompression
  const [isProcessing, setIsProcessing] = useState(false);
  const [huffmanCompression] = useState(new HuffmanCompression());

  const resetDemo = () => {
    setFileResults(null);
    setSelectedFile(null);
    setDecompressedFile(null);
    setCompressedFileData(null);
    setError('');
    setIsProcessing(false);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      resetDemo();
      setSelectedFile(file);
    }
  };

  const compressFile = async () => {
    if (!selectedFile) {
      setError('Please select a file to compress.');
      return;
    }

    if (selectedFile.name.endsWith('.huff')) {
      setError('Cannot compress a .huff file. Use decompress instead.');
      return;
    }

    setIsProcessing(true);
    setError('');
    setFileResults(null);

    try {
      // Read file as ArrayBuffer
      const arrayBuffer = await selectedFile.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      
      // Compress using local JavaScript implementation
      const result = huffmanCompression.compress(data, selectedFile.name);
      
      // Create blob from compressed data
      const compressedBlob = huffmanCompression.createBlob(result.compressedData, 'application/octet-stream');
      
      const compressedFileInfo = {
        originalFile: selectedFile,
        originalFileName: result.originalFilename,
        compressedBlob: compressedBlob,
        stats: {
          originalSize: result.originalSize,
          compressedSize: result.compressedSize,
          spaceSaved: ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1),
          avgBitsPerSymbol: result.avgBitsPerSymbol.toFixed(2)
        },
        codes: result.codes
      };
      
      setFileResults(compressedFileInfo);
      setCompressedFileData(compressedFileInfo);
      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
      setError('Error compressing file: ' + err.message);
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

  const decompressFile = async () => {
    if (!selectedFile || !selectedFile.name.endsWith('.huff')) {
      setError('Please select a .huff compressed file.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Read file as ArrayBuffer
      const arrayBuffer = await selectedFile.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      
      // Decompress using local JavaScript implementation
      const result = huffmanCompression.decompress(data, selectedFile.name.replace('.huff', ''));
      
      // Create blob from decompressed data
      const decompressedBlob = huffmanCompression.createBlob(result.decompressedData);
      
      setCompressedFileData({
        originalFileName: result.originalFilename,
        originalFileSize: result.originalSize
      });

      setDecompressedFile(decompressedBlob);
      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
      setError('Error decompressing file: ' + err.message);
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
          className="bg-dark-surface border border-purple-400/30 rounded-none shadow-2xl shadow-purple-400/25 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-purple-400/30 bg-terminal-header">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <h2 className="text-purple-400 font-mono text-lg font-bold">gabriel@portfolio:~$ huffman_demo --help</h2>
              <p className="text-terminal-text font-mono text-sm mt-1">
                Usage: upload file → compress → download .huff → decompress → original file
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-purple-400 hover:text-white transition-colors p-2 hover:bg-dark-surface rounded font-mono text-sm"
            >
              [X]
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Mode Selection */}

            {/* File Upload */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Huffman File Compression</h3>
                <p className="text-gray-400">Upload any file to compress or a .huff file to decompress</p>
              </div>
              
              <div className="border-2 border-dashed border-purple-400/30 rounded-lg p-8 text-center hover:border-purple-400/50 transition-colors">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept="*/*"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {selectedFile ? (
                    <div>
                      <div className="text-purple-400 text-lg font-semibold mb-2">📁 {selectedFile.name}</div>
                      <div className="text-gray-400 text-sm">Size: {(selectedFile.size / 1024).toFixed(2)} KB</div>
                      <div className="text-purple-400 text-sm mt-1">
                        {selectedFile.name.endsWith('.huff') ? 'Ready for decompression' : 'Ready for compression'}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-purple-400 text-4xl mb-4">📂</div>
                      <div className="text-white text-lg mb-2">Click to select file</div>
                      <div className="text-gray-400 text-sm">Supports any file type</div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            {selectedFile && (
              <div className="flex gap-4 justify-center mb-8">
                {!selectedFile.name.endsWith('.huff') ? (
                  <button
                    onClick={compressFile}
                    disabled={isProcessing}
                    className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {isProcessing ? 'Compressing...' : 'Compress File'}
                  </button>
                ) : (
                  <button
                    onClick={decompressFile}
                    disabled={isProcessing}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {isProcessing ? 'Decompressing...' : 'Decompress File'}
                  </button>
                )}
                <button
                  onClick={resetDemo}
                  className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Results */}
            {fileResults && (
              <div className="bg-dark-surface border border-purple-400/20 rounded-lg p-6 mb-6">
                <div className="text-green-400 text-lg font-bold mb-4">✓ Compression Successful!</div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-gray-400 text-sm">Original Size</div>
                    <div className="text-white">{(fileResults.stats.originalSize / 1024).toFixed(2)} KB</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Compressed Size</div>
                    <div className="text-white">{(fileResults.stats.compressedSize / 1024).toFixed(2)} KB</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Space Saved</div>
                    <div className="text-green-400">{fileResults.stats.spaceSaved}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Compression Ratio</div>
                    <div className="text-purple-400">{((fileResults.stats.compressedSize / fileResults.stats.originalSize) * 100).toFixed(1)}%</div>
                  </div>
                </div>
                <button
                  onClick={downloadCompressedFile}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Download Compressed File
                </button>
              </div>
            )}

            {decompressedFile && (
              <div className="bg-dark-surface border border-blue-400/20 rounded-lg p-6 mb-6">
                <div className="text-green-400 text-lg font-bold mb-4">✓ Decompression Successful!</div>
                <div className="mb-4">
                  <div className="text-gray-400 text-sm">Original File</div>
                  <div className="text-white">{compressedFileData?.originalFileName}</div>
                </div>
                <div className="mb-4">
                  <div className="text-gray-400 text-sm">File Size</div>
                  <div className="text-white">{(decompressedFile.size / 1024).toFixed(2)} KB</div>
                </div>
                <button
                  onClick={downloadDecompressedFile}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Download Original File
                </button>
              </div>
            )}

          </div>

          {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-none text-red-300 font-mono text-sm">
                <div className="text-terminal-green font-mono text-sm mb-1">gabriel@portfolio:~$</div>
                <strong>ERROR:</strong> {error}
              </div>
            )}




        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HuffmanDemo;