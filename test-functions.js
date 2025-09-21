// Test script to verify Netlify Functions work locally
// Run this after starting netlify dev

async function testFunctions() {
    console.log('🧪 Testing Netlify Functions...\n');
    
    // Test Checkers AI function
    try {
        console.log('1. Testing Checkers AI function...');
        const checkersResponse = await fetch('http://localhost:8888/.netlify/functions/checkers-ai/api/new-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (checkersResponse.ok) {
            const data = await checkersResponse.json();
            console.log('✅ Checkers AI function working!');
            console.log('   Board initialized:', data.board ? 'Yes' : 'No');
            console.log('   Current player:', data.current_player);
        } else {
            console.log('❌ Checkers AI function failed:', checkersResponse.status);
        }
    } catch (error) {
        console.log('❌ Checkers AI function error:', error.message);
    }
    
    console.log('\n2. Testing Huffman function...');
    // Test Huffman function (requires file upload)
    try {
        // Create a simple test file
        const testFile = new File(['Hello World'], 'test.txt', { type: 'text/plain' });
        const formData = new FormData();
        formData.append('file', testFile);
        
        const huffmanResponse = await fetch('http://localhost:8888/.netlify/functions/huffman-compress/compress', {
            method: 'POST',
            body: formData,
        });
        
        if (huffmanResponse.ok) {
            const data = await huffmanResponse.json();
            console.log('✅ Huffman function working!');
            console.log('   Compression successful:', data.success);
            console.log('   Original size:', data.original_size);
            console.log('   Compressed size:', data.compressed_size);
        } else {
            console.log('❌ Huffman function failed:', huffmanResponse.status);
        }
    } catch (error) {
        console.log('❌ Huffman function error:', error.message);
    }
    
    console.log('\n🎯 Function testing complete!');
    console.log('\n📋 Next steps:');
    console.log('1. If tests pass, your functions are ready for deployment');
    console.log('2. Push to GitHub and connect to Netlify');
    console.log('3. Deploy and test on production');
}

// Run tests if this script is executed directly
if (typeof window === 'undefined') {
    // Node.js environment
    const fetch = require('node-fetch');
    testFunctions();
} else {
    // Browser environment
    testFunctions();
}
