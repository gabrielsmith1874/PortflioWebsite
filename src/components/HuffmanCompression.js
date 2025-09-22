// Huffman Compression Implementation in JavaScript
// Ported from Python backend

class HuffmanTree {
  constructor(symbol = null, left = null, right = null) {
    this.symbol = symbol;
    this.left = left;
    this.right = right;
    this.number = null;
  }

  isLeaf() {
    return !this.left && !this.right;
  }

  numNodesToBytes() {
    return new Uint8Array([this.number + 1]);
  }

  equals(other) {
    return (other instanceof HuffmanTree &&
            this.symbol === other.symbol &&
            this.left === other.left &&
            this.right === other.right);
  }
}

class ReadNode {
  constructor(lType, lData, rType, rData) {
    this.lType = lType;
    this.lData = lData;
    this.rType = rType;
    this.rData = rData;
  }
}

class HuffmanCompression {
  constructor() {
    // Utility functions
    this.byteToBits = (byte) => {
      let bits = byte.toString(2);
      return bits.padStart(8, '0');
    };

    this.bitsToByte = (bits) => {
      return parseInt(bits.padEnd(8, '0'), 2);
    };

    this.bytesToInt = (buf) => {
      return new DataView(buf.buffer, buf.byteOffset, buf.byteLength).getUint32(0, true);
    };

    this.int32ToBytes = (num) => {
      const buf = new ArrayBuffer(4);
      new DataView(buf).setUint32(0, num, true);
      return new Uint8Array(buf);
    };

    this.bytesToNodes = (buf) => {
      const nodes = [];
      for (let i = 0; i < buf.length; i += 4) {
        const lType = buf[i];
        const lData = buf[i + 1];
        const rType = buf[i + 2];
        const rData = buf[i + 3];
        nodes.push(new ReadNode(lType, lData, rType, rData));
      }
      return nodes;
    };
  }

  buildFrequencyDict(data) {
    const freqDict = {};
    for (let i = 0; i < data.length; i++) {
      const byte = data[i];
      freqDict[byte] = (freqDict[byte] || 0) + 1;
    }
    return freqDict;
  }

  buildHuffmanTree(freqDict) {
    if (Object.keys(freqDict).length === 0) {
      return new HuffmanTree(null, new HuffmanTree(null), new HuffmanTree(null));
    }

    const freqList = Object.entries(freqDict)
      .map(([sym, freq]) => [freq, new HuffmanTree(parseInt(sym))])
      .sort((a, b) => a[0] - b[0]);

    if (freqList.length === 1) {
      const symbol = parseInt(Object.keys(freqDict)[0]);
      if (symbol === 255) {
        return new HuffmanTree(null, new HuffmanTree(symbol - 1), new HuffmanTree(symbol));
      } else {
        return new HuffmanTree(null, new HuffmanTree(symbol + 1), new HuffmanTree(symbol));
      }
    }

    while (freqList.length > 1) {
      const [tree1Freq, tree1] = freqList.shift();
      const [tree2Freq, tree2] = freqList.shift();

      const newTree = new HuffmanTree(null, tree1, tree2);
      freqList.push([tree1Freq + tree2Freq, newTree]);
      freqList.sort((a, b) => a[0] - b[0]);
    }

    return freqList.length > 0 ? freqList[0][1] : new HuffmanTree(null);
  }

  getCodes(tree) {
    const codes = {};
    const treeList = [{ node: tree, code: '' }];

    while (treeList.length > 0) {
      const curr = treeList.pop();
      const node = curr.node;
      const code = curr.code;

      if (node.isLeaf()) {
        codes[node.symbol] = code;
      }

      if (node.right !== null) {
        treeList.push({ node: node.right, code: code + '1' });
      }

      if (node.left !== null) {
        treeList.push({ node: node.left, code: code + '0' });
      }
    }
    return codes;
  }

  numberNodes(tree) {
    const numList = [tree];
    const visitedList = [false];
    let num = 0;

    while (numList.length > 0) {
      const node = numList.pop();
      const visited = visitedList.pop();

      if (visited) {
        if (!node.isLeaf()) {
          node.number = num;
          num++;
        }
      } else {
        numList.push(node);
        visitedList.push(true);
        if (node.right) {
          numList.push(node.right);
          visitedList.push(false);
        }
        if (node.left) {
          numList.push(node.left);
          visitedList.push(false);
        }
      }
    }
  }

  avgLength(tree, freqDict) {
    if (tree.isLeaf() || Object.keys(freqDict).length === 0) {
      return 0;
    }
    const dictCodes = this.getCodes(tree);
    let totFreq = 0;
    let totalSymbols = 0;
    
    for (const key in freqDict) {
      totFreq += dictCodes[key].length * freqDict[key];
      totalSymbols += freqDict[key];
    }
    return totFreq / totalSymbols;
  }

  compressBytes(data, codes) {
    let bits = '';
    for (let i = 0; i < data.length; i++) {
      bits += codes[data[i]];
    }

    // Pad with 0s to make it a multiple of 8
    while (bits.length % 8 !== 0) {
      bits += '0';
    }

    const compressed = new Uint8Array(bits.length / 8);
    for (let i = 0; i < bits.length; i += 8) {
      compressed[i / 8] = parseInt(bits.substr(i, 8), 2);
    }
    return compressed;
  }

  treeToBytes(tree) {
    if (tree.isLeaf() || !tree) {
      return new Uint8Array(0);
    }

    const listOfBytes = [];

    const postOrderTraversal = (node) => {
      if (node.isLeaf()) {
        return;
      }

      postOrderTraversal(node.left);
      postOrderTraversal(node.right);

      if (node.left.isLeaf()) {
        listOfBytes.push(0, node.left.symbol);
      } else {
        listOfBytes.push(1, node.left.number);
      }

      if (node.right.isLeaf()) {
        listOfBytes.push(0, node.right.symbol);
      } else {
        listOfBytes.push(1, node.right.number);
      }
    };

    postOrderTraversal(tree);
    return new Uint8Array(listOfBytes);
  }

  generateTreeGeneral(tList, rootIndex) {
    const lType = tList[rootIndex].lType;
    const rType = tList[rootIndex].rType;

    const leftNode = lType === 0 
      ? new HuffmanTree(tList[rootIndex].lData)
      : this.generateTreeGeneral(tList, tList[rootIndex].lData);
    
    const rightNode = rType === 0 
      ? new HuffmanTree(tList[rootIndex].rData)
      : this.generateTreeGeneral(tList, tList[rootIndex].rData);

    const node = new HuffmanTree(null, leftNode, rightNode);
    node.number = rootIndex;
    return node;
  }

  decompressBytes(tree, data, size) {
    let bitStr = '';
    for (let i = 0; i < data.length; i++) {
      bitStr += this.byteToBits(data[i]);
    }

    const listOfBytes = [];
    let currentNode = tree;

    for (let i = 0; i < bitStr.length; i++) {
      if (currentNode.symbol !== null) {
        listOfBytes.push(currentNode.symbol);
        currentNode = tree;
        if (listOfBytes.length === size) {
          break;
        }
      }
      
      if (bitStr[i] === '0') {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (currentNode.symbol !== null && listOfBytes.length < size) {
      listOfBytes.push(currentNode.symbol);
    }

    return new Uint8Array(listOfBytes);
  }

  compress(data, originalFilename = 'file') {
    try {
      const freq = this.buildFrequencyDict(data);
      const tree = this.buildHuffmanTree(freq);
      const codes = this.getCodes(tree);
      this.numberNodes(tree);

      const avgBitsPerSymbol = this.avgLength(tree, freq);
      
      // Create compressed data
      const compressedData = this.compressBytes(data, codes);
      const treeBytes = this.treeToBytes(tree);
      const numNodesBytes = tree.numNodesToBytes();
      const sizeBytes = this.int32ToBytes(data.length);

      // Combine all parts
      const result = new Uint8Array(
        numNodesBytes.length + 
        treeBytes.length + 
        sizeBytes.length + 
        compressedData.length
      );

      let offset = 0;
      result.set(numNodesBytes, offset);
      offset += numNodesBytes.length;
      
      result.set(treeBytes, offset);
      offset += treeBytes.length;
      
      result.set(sizeBytes, offset);
      offset += sizeBytes.length;
      
      result.set(compressedData, offset);

      return {
        compressedData: result,
        originalSize: data.length,
        compressedSize: result.length,
        avgBitsPerSymbol: avgBitsPerSymbol,
        codes: codes,
        originalFilename: originalFilename
      };
    } catch (error) {
      throw new Error(`Compression failed: ${error.message}`);
    }
  }

  decompress(compressedData, originalFilename = 'file') {
    try {
      let offset = 0;
      
      // Read number of nodes
      const numNodes = compressedData[offset];
      offset += 1;
      
      // Read node data
      const nodeData = compressedData.slice(offset, offset + numNodes * 4);
      offset += numNodes * 4;
      
      const nodeList = this.bytesToNodes(nodeData);
      const tree = this.generateTreeGeneral(nodeList, numNodes - 1);
      
      // Read original size
      const sizeBytes = compressedData.slice(offset, offset + 4);
      offset += 4;
      const originalSize = this.bytesToInt(sizeBytes);
      
      // Read compressed data
      const compressedBytes = compressedData.slice(offset);
      
      // Decompress
      const decompressedData = this.decompressBytes(tree, compressedBytes, originalSize);
      
      return {
        decompressedData: decompressedData,
        originalSize: originalSize,
        compressedSize: compressedData.length,
        originalFilename: originalFilename
      };
    } catch (error) {
      throw new Error(`Decompression failed: ${error.message}`);
    }
  }

  // Helper method to create a blob from Uint8Array
  createBlob(data, mimeType = 'application/octet-stream') {
    return new Blob([data], { type: mimeType });
  }

  // Helper method to download a file
  downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export default HuffmanCompression;
