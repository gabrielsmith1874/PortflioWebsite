import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Terminal as TerminalIcon, X, Maximize2 } from 'lucide-react';
import HuffmanDemo from './HuffmanDemo';
import CheckersDemo from './CheckersDemo';

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Gabriel Smith\'s Portfolio Terminal' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'prompt', content: '' }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHuffmanDemo, setShowHuffmanDemo] = useState(false);
  const [showCheckersDemo, setShowCheckersDemo] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check which page we're on to use appropriate theme colors
  const isTimelinePage = location.pathname === '/timeline';
  const isProjectsPage = location.pathname === '/projects';
  const isResumePage = location.pathname === '/resume';
  const isContactPage = location.pathname === '/contact';

  const commands = {
    help: {
      description: 'Show available commands',
      action: () => [
        { type: 'output', content: 'Gabriel Smith Portfolio Terminal v2.0.0' },
        { type: 'output', content: 'Type any command below to get started.' },
        { type: 'output', content: '' },
        { type: 'output', content: '📁 Navigation Commands:' },
        { type: 'output', content: '  home     - Navigate to home page' },
        { type: 'output', content: '  timeline - Navigate to timeline page' },
        { type: 'output', content: '  projects - Navigate to projects page' },
        { type: 'output', content: '  resume   - Navigate to resume page' },
        { type: 'output', content: '  contact  - Navigate to contact page' },
        { type: 'output', content: '' },
        { type: 'output', content: '📄 Information Commands:' },
        { type: 'output', content: '  about    - Show information about Gabriel' },
        { type: 'output', content: '  skills   - Show technical skills' },
        { type: 'output', content: '  ls       - List available directories' },
        { type: 'output', content: '  pwd      - Show current directory' },
        { type: 'output', content: '  cat      - Display file contents' },
        { type: 'output', content: '' },
        { type: 'output', content: '🎮 Live Demo Commands:' },
        { type: 'output', content: '  checkers - Launch Checkers AI demo' },
        { type: 'output', content: '  huffman  - Launch Huffman compression demo' },
        { type: 'output', content: '  demos    - List all available demos' },
        { type: 'output', content: '' },
        { type: 'output', content: '📧 Communication Commands:' },
        { type: 'output', content: '  email    - Send email to Gabriel' },
        { type: 'output', content: '  mail     - Alternative email command' },
        { type: 'output', content: '  github   - Open GitHub profile' },
        { type: 'output', content: '  linkedin - Open LinkedIn profile' },
        { type: 'output', content: '' },
        { type: 'output', content: '📥 Download Commands:' },
        { type: 'output', content: '  download     - Download resume PDF' },
        { type: 'output', content: '  resume       - Navigate to resume page' },
        { type: 'output', content: '  project-info - Show detailed project information' },
        { type: 'output', content: '' },
        { type: 'output', content: '🔧 System Commands:' },
        { type: 'output', content: '  clear    - Clear terminal screen' },
        { type: 'output', content: '  exit     - Close terminal' },
        { type: 'output', content: '  version  - Show terminal version' },
        { type: 'output', content: '  status   - Show portfolio status' },
        { type: 'output', content: '  info     - Show detailed information' }
      ]
    },
    ls: {
      description: 'List directory contents',
      action: () => [
        { type: 'output', content: 'total 8' },
        { type: 'output', content: 'drwxr-xr-x  2 gabriel gabriel 4096 Jan 15 10:30 ./' },
        { type: 'output', content: 'drwxr-xr-x  3 gabriel gabriel 4096 Jan 15 10:30 ../' },
        { type: 'output', content: '-rw-r--r--  1 gabriel gabriel 1024 Jan 15 10:30 about.txt' },
        { type: 'output', content: '-rw-r--r--  1 gabriel gabriel 2048 Jan 15 10:30 projects/' },
        { type: 'output', content: '-rw-r--r--  1 gabriel gabriel 1536 Jan 15 10:30 resume.pdf' },
        { type: 'output', content: '-rw-r--r--  1 gabriel gabriel  512 Jan 15 10:30 contact.sh' }
      ]
    },
    pwd: {
      description: 'Print working directory',
      action: () => [
        { type: 'output', content: '/home/gabriel/portfolio' }
      ]
    },
    whoami: {
      description: 'Display current user',
      action: () => [
        { type: 'output', content: 'gabriel' }
      ]
    },
    cat: {
      description: 'Display file contents',
      action: (args) => {
        const files = {
          'about.txt': [
            { type: 'output', content: 'Gabriel Smith' },
            { type: 'output', content: 'Systems Developer & Computer Science Student' },
            { type: 'output', content: 'Ministry of Public and Business Service Delivery' },
            { type: 'output', content: 'University of Toronto Mississauga' },
            { type: 'output', content: '' },
            { type: 'output', content: 'Passionate about AI, machine learning, and software development.' }
          ],
          'skills.txt': [
            { type: 'output', content: 'Programming Languages:' },
            { type: 'output', content: '  Python, Java, C, C#, JavaScript, HTML, CSS' },
            { type: 'output', content: '' },
            { type: 'output', content: 'AI/ML & Data Science:' },
            { type: 'output', content: '  Machine Learning, AI, Algorithms, Data Structures, SQL, R' },
            { type: 'output', content: '' },
            { type: 'output', content: 'Tools:' },
            { type: 'output', content: '  Postman, Swagger, REST APIs, Git, Assembly' }
          ]
        };
        
        const filename = args[0];
        if (files[filename]) {
          return files[filename];
        } else {
          return [{ type: 'output', content: `cat: ${filename}: No such file or directory` }];
        }
      }
    },
    clear: {
      description: 'Clear terminal screen',
      action: () => [{ type: 'clear' }]
    },
    home: {
      description: 'Navigate to home page',
      action: () => {
        navigate('/');
        return [{ type: 'output', content: 'Navigating to home page...' }];
      }
    },
    timeline: {
      description: 'Navigate to timeline page',
      action: () => {
        navigate('/timeline');
        return [{ type: 'output', content: 'Navigating to timeline page...' }];
      }
    },
    projects: {
      description: 'Navigate to projects page',
      action: () => {
        navigate('/projects');
        return [{ type: 'output', content: 'Navigating to projects page...' }];
      }
    },
    resume: {
      description: 'Navigate to resume page',
      action: () => {
        navigate('/resume');
        return [{ type: 'output', content: 'Navigating to resume page...' }];
      }
    },
    contact: {
      description: 'Navigate to contact page',
      action: () => {
        navigate('/contact');
        return [{ type: 'output', content: 'Navigating to contact page...' }];
      }
    },
    about: {
      description: 'Show information about Gabriel',
      action: () => [
        { type: 'output', content: 'Gabriel Smith - Systems Developer' },
        { type: 'output', content: 'Computer Science and Statistics student at University of Toronto Mississauga' },
        { type: 'output', content: 'Passionate about AI, machine learning, and software development' },
        { type: 'output', content: 'Experience with Python, Java, C, JavaScript, and various frameworks' },
        { type: 'output', content: 'Creator of innovative projects like Stroku and Battleship Solitaire AI' }
      ]
    },
    skills: {
      description: 'Show technical skills',
      action: () => [
        { type: 'output', content: 'Programming Languages:' },
        { type: 'output', content: '  • Python, Java, C, C#, JavaScript, HTML, CSS' },
        { type: 'output', content: 'AI/ML & Data Science:' },
        { type: 'output', content: '  • Machine Learning, AI, Algorithms, Data Structures, SQL, R' },
        { type: 'output', content: 'Tools & Technologies:' },
        { type: 'output', content: '  • Postman, Swagger, REST APIs, Git, Assembly' },
        { type: 'output', content: 'Other Skills:' },
        { type: 'output', content: '  • Object-Oriented Programming, Algorithm Design, Statistics' }
      ]
    },
    exit: {
      description: 'Close terminal',
      action: () => {
        setIsOpen(false);
        return [{ type: 'output', content: 'Terminal closed.' }];
      }
    },
    // Live Demo Commands
    checkers: {
      description: 'Launch Checkers AI demo',
      action: () => {
        setShowCheckersDemo(true);
        return [
          { type: 'output', content: '🎮 Launching Checkers AI Demo...' },
          { type: 'output', content: 'Opening interactive Checkers game!' },
          { type: 'output', content: 'Play against AI opponent using minimax algorithm!' }
        ];
      }
    },
    huffman: {
      description: 'Launch Huffman compression demo',
      action: () => {
        setShowHuffmanDemo(true);
        return [
          { type: 'output', content: '🗜️ Launching Huffman Compression Demo...' },
          { type: 'output', content: 'Opening file compression tool!' },
          { type: 'output', content: 'Upload files to compress and decompress using Huffman coding!' }
        ];
      }
    },
    demos: {
      description: 'List all available demos',
      action: () => [
        { type: 'output', content: '🎮 Available Live Demos:' },
        { type: 'output', content: '' },
        { type: 'output', content: '1. Checkers AI' },
        { type: 'output', content: '   - Play against an AI opponent' },
        { type: 'output', content: '   - Uses minimax algorithm with alpha-beta pruning' },
        { type: 'output', content: '   - Command: checkers' },
        { type: 'output', content: '' },
        { type: 'output', content: '2. Huffman Compression' },
        { type: 'output', content: '   - Compress and decompress files' },
        { type: 'output', content: '   - Lossless compression algorithm' },
        { type: 'output', content: '   - Command: huffman' },
        { type: 'output', content: '' },
        { type: 'output', content: '💡 Tip: Use "checkers" or "huffman" commands to launch demos!' }
      ]
    },
    // Communication Commands
    email: {
      description: 'Send email to Gabriel',
      action: () => {
        window.open('mailto:gabrielsmith1874@gmail.com?subject=Portfolio Contact&body=Hello Gabriel,');
        return [
          { type: 'output', content: '📧 Opening email client...' },
          { type: 'output', content: 'Email: gabrielsmith1874@gmail.com' },
          { type: 'output', content: 'Subject: Portfolio Contact' },
          { type: 'output', content: 'Ready to send!' }
        ];
      }
    },
    mail: {
      description: 'Alternative email command',
      action: () => {
        window.open('mailto:gabrielsmith1874@gmail.com');
        return [
          { type: 'output', content: '📬 Opening email client...' },
          { type: 'output', content: 'Compose email to gabrielsmith1874@gmail.com' }
        ];
      }
    },
    github: {
      description: 'Open GitHub profile',
      action: () => {
        window.open('https://github.com/gabrielsmith1874', '_blank');
        return [
          { type: 'output', content: '🐙 Opening GitHub profile...' },
          { type: 'output', content: 'https://github.com/gabrielsmith1874' }
        ];
      }
    },
    linkedin: {
      description: 'Open LinkedIn profile',
      action: () => {
        window.open('https://linkedin.com/in/gabriel-smith-b3b366253', '_blank');
        return [
          { type: 'output', content: '💼 Opening LinkedIn profile...' },
          { type: 'output', content: 'https://linkedin.com/in/gabriel-smith-b3b366253' }
        ];
      }
    },
    // Download Commands
    download: {
      description: 'Download resume PDF',
      action: () => {
        const link = document.createElement('a');
        link.href = '/Gabriel_Smith_Resume.pdf';
        link.download = 'Gabriel_Smith_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return [
          { type: 'output', content: '📥 Downloading resume...' },
          { type: 'output', content: 'File: Gabriel_Smith_Resume.pdf' },
          { type: 'output', content: 'Download started!' }
        ];
      }
    },
    // System Commands
    version: {
      description: 'Show terminal version',
      action: () => [
        { type: 'output', content: 'Gabriel Smith Portfolio Terminal v2.0.0' },
        { type: 'output', content: 'Built with React & Tailwind CSS' },
        { type: 'output', content: 'Last updated: January 2025' },
        { type: 'output', content: 'Features: Navigation, Live Demos, Communication, Downloads' }
      ]
    },
    // Additional utility commands
    status: {
      description: 'Show portfolio status',
      action: () => [
        { type: 'output', content: '📊 Portfolio Status:' },
        { type: 'output', content: '' },
        { type: 'output', content: '✅ Home Page: Active' },
        { type: 'output', content: '✅ Timeline: Active' },
        { type: 'output', content: '✅ Projects: Active (2 live demos)' },
        { type: 'output', content: '✅ Resume: Active (PDF download available)' },
        { type: 'output', content: '✅ Contact: Active (Email integration)' },
        { type: 'output', content: '' },
        { type: 'output', content: '🎯 All systems operational!' }
      ]
    },
    info: {
      description: 'Show detailed information',
      action: () => [
        { type: 'output', content: '👨‍💻 Gabriel Smith' },
        { type: 'output', content: '📍 Location: Mississauga, Ontario, Canada' },
        { type: 'output', content: '🎓 Education: Computer Science & Statistics, UTM' },
        { type: 'output', content: '💼 Work: Systems Developer & Tester' },
        { type: 'output', content: '📧 Email: gabrielsmith1874@gmail.com' },
        { type: 'output', content: '📱 Phone: 289-681-0442' },
        { type: 'output', content: '' },
        { type: 'output', content: '🔗 Links:' },
        { type: 'output', content: '  • GitHub: github.com/gabrielsmith1874' },
        { type: 'output', content: '  • LinkedIn: linkedin.com/in/gabriel-smith-b3b366253' }
      ]
    },
    'project-info': {
      description: 'Show project information',
      action: () => [
        { type: 'output', content: '🚀 Featured Projects:' },
        { type: 'output', content: '' },
        { type: 'output', content: '1. Stroku - Word Puzzle Game' },
        { type: 'output', content: '   • Technology: Python, Pygame' },
        { type: 'output', content: '   • Status: Completed commercial product' },
        { type: 'output', content: '' },
        { type: 'output', content: '2. Checkers AI' },
        { type: 'output', content: '   • Technology: JavaScript, Minimax Algorithm' },
        { type: 'output', content: '   • Status: Live demo available' },
        { type: 'output', content: '   • Command: checkers' },
        { type: 'output', content: '' },
        { type: 'output', content: '3. Huffman Compression' },
        { type: 'output', content: '   • Technology: JavaScript, File API' },
        { type: 'output', content: '   • Status: Live demo available' },
        { type: 'output', content: '   • Command: huffman' },
        { type: 'output', content: '' },
        { type: 'output', content: '4. Battleship Solitaire AI' },
        { type: 'output', content: '   • Technology: Python, AI algorithms' },
        { type: 'output', content: '   • Status: Completed' },
        { type: 'output', content: '' },
        { type: 'output', content: '5. Text Adventure Game' },
        { type: 'output', content: '   • Technology: Java, OOP' },
        { type: 'output', content: '   • Status: Completed' }
      ]
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(' ');
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Remove the current prompt from history and add the command
    const historyWithoutCurrentPrompt = history.slice(0, -1);
    const newHistory = [...historyWithoutCurrentPrompt, { type: 'input', content: cmd }];
    
    if (commands[commandName]) {
      const result = commands[commandName].action(args);
      if (result[0]?.type === 'clear') {
        setHistory([{ type: 'output', content: 'Terminal cleared.' }, { type: 'prompt', content: '' }]);
      } else {
        setHistory([...newHistory, ...result, { type: 'prompt', content: '' }]);
      }
    } else {
      setHistory([...newHistory, { type: 'output', content: `bash: ${commandName}: command not found. Type "help" for available commands.` }, { type: 'prompt', content: '' }]);
    }
    
    setCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (command.trim()) {
        executeCommand(command);
      } else {
        setHistory([...history, { type: 'prompt', content: '' }]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        const prevCommand = history[history.length - 1 - newIndex]?.content?.replace('gabriel@portfolio:~$ ', '') || '';
        setCommand(prevCommand);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const prevCommand = history[history.length - 1 - newIndex]?.content?.replace('gabriel@portfolio:~$ ', '') || '';
        setCommand(prevCommand);
      } else {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const focusInput = () => {
    // Find the last input field (current prompt) and focus it
    const lastInput = terminalRef.current?.querySelector('input[type="text"]');
    if (lastInput) {
      lastInput.focus();
      // Ensure the input is visible and focused
      lastInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (inputRef.current) {
      // Fallback to the ref
      inputRef.current.focus();
    }
  };

  const toggleTerminal = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    setIsMaximized(false);
    // Focus input after a short delay to ensure the terminal is rendered
    if (!isOpen) {
      setTimeout(focusInput, 100);
    }
  };


  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    setIsMinimized(false);
    // Focus input after maximizing
    setTimeout(focusInput, 100);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <button
            id="terminal-toggle"
            onClick={toggleTerminal}
            className={`bg-terminal-header border p-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 flex items-center space-x-2 ${
              isTimelinePage 
                ? 'border-blue-400 text-blue-400 hover:shadow-blue-400/25' 
                : isProjectsPage
                ? 'border-purple-400 text-purple-400 hover:shadow-purple-400/25'
                : isResumePage
                ? 'border-orange-400 text-orange-400 hover:shadow-orange-400/25'
                : isContactPage
                ? 'border-cyan-400 text-cyan-400 hover:shadow-cyan-400/25'
                : 'border-terminal-green text-terminal-green hover:shadow-terminal-green/25'
            }`}
          >
            <TerminalIcon size={20} />
            <span className="font-mono text-sm hidden sm:block">terminal</span>
          </button>
        </div>
        <div className="mt-2 text-xs text-terminal-text font-mono text-center">
          <span className={
            isTimelinePage ? 'text-blue-400' : 
            isProjectsPage ? 'text-purple-400' : 
            isResumePage ? 'text-orange-400' :
            isContactPage ? 'text-cyan-400' :
            'text-terminal-green'
          }>gabriel@portfolio:~$ </span>
          <span className={
            isTimelinePage ? 'text-blue-400' : 
            isProjectsPage ? 'text-purple-400' : 
            isResumePage ? 'text-orange-400' :
            isContactPage ? 'text-cyan-400' :
            'text-terminal-green'
          }>./open_terminal.sh</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isMinimized ? 'bottom-0 right-6' : isMaximized ? 'inset-4' : 'bottom-6 right-6'
    } ${isMinimized ? 'w-64 h-12' : isMaximized ? 'w-auto h-auto' : 'w-96 h-80'}`}>
      <div 
        className={`bg-dark-surface/95 border rounded-lg shadow-2xl backdrop-blur-sm h-full flex flex-col ${
          isTimelinePage ? 'border-blue-400/30' : 
          isProjectsPage ? 'border-purple-400/30' : 
          isResumePage ? 'border-orange-400/30' :
          isContactPage ? 'border-cyan-400/30' :
          'border-terminal-green/30'
        }`}
        onClick={(e) => {
          // Only focus if clicking on the terminal window itself, not on buttons
          if (e.target === e.currentTarget || e.target.closest('.terminal-content')) {
            e.preventDefault();
            focusInput();
          }
        }}
      >
        {/* Terminal Header */}
        <div 
          className={`bg-terminal-header border-b px-4 py-2 flex items-center justify-between rounded-t-lg cursor-pointer ${
            isTimelinePage ? 'border-blue-400/30' : 
            isProjectsPage ? 'border-purple-400/30' : 
            isResumePage ? 'border-orange-400/30' :
            isContactPage ? 'border-cyan-400/30' :
            'border-terminal-green/30'
          }`}
          onClick={(e) => {
            // Only focus if clicking on the header text area, not on buttons
            if (!e.target.closest('button')) {
              e.stopPropagation();
              focusInput();
            }
          }}
        >
          <div className="flex items-center space-x-2">
            <TerminalIcon size={16} className={
              isTimelinePage ? 'text-blue-400' : 
              isProjectsPage ? 'text-purple-400' : 
              isResumePage ? 'text-orange-400' :
              isContactPage ? 'text-cyan-400' :
              'text-terminal-green'
            } />
            <span className="text-sm text-terminal-text font-mono">gabriel@portfolio:~$</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMaximize}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
              title="Maximize"
            >
              <Maximize2 size={8} className="m-auto text-black" />
            </button>
            <button
              onClick={toggleTerminal}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
              title="Close"
            >
              <X size={8} className="m-auto text-black" />
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          className="terminal-content flex-1 p-4 overflow-y-auto bg-dark-bg/50 text-terminal-text font-mono text-sm cursor-text" 
          ref={terminalRef}
          onClick={(e) => {
            e.stopPropagation();
            focusInput();
          }}
        >
          {history.map((item, index) => (
            <div key={index} className="mb-1">
              {item.type === 'input' && (
                <div className={
                  isTimelinePage ? 'text-blue-400' : 
                  isProjectsPage ? 'text-purple-400' : 
                  isResumePage ? 'text-orange-400' :
                  isContactPage ? 'text-cyan-400' :
                  'text-terminal-green'
                }>
                  gabriel@portfolio:~$ {item.content}
                </div>
              )}
              {item.type === 'output' && (
                <div className="text-terminal-text">
                  {item.content}
                </div>
              )}
              {item.type === 'prompt' && (
                <div className="flex items-center min-h-[24px]">
                  <span className={
                    isTimelinePage ? 'text-blue-400' : 
                    isProjectsPage ? 'text-purple-400' : 
                    isResumePage ? 'text-orange-400' :
                    isContactPage ? 'text-cyan-400' :
                    'text-terminal-green'
                  }>gabriel@portfolio:~$ </span>
                  {index === history.length - 1 ? (
                    <>
                      <input
                        ref={inputRef}
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className={`flex-1 bg-transparent outline-none ${
                          isTimelinePage ? 'text-blue-400 caret-blue-400' : 
                          isProjectsPage ? 'text-purple-400 caret-purple-400' : 
                          isResumePage ? 'text-orange-400 caret-orange-400' :
                          isContactPage ? 'text-cyan-400 caret-cyan-400' :
                          'text-terminal-green caret-terminal-green'
                        }`}
                        autoFocus
                        placeholder=""
                      />
                      {command.length === 0 && (
                        <span className={`animate-terminal-blink ml-1 ${
                          isTimelinePage ? 'text-blue-400' : 
                          isProjectsPage ? 'text-purple-400' : 
                          isResumePage ? 'text-orange-400' :
                          isContactPage ? 'text-cyan-400' :
                          'text-terminal-green'
                        }`}>█</span>
                      )}
                    </>
                  ) : (
                    <div className="flex-1"></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Demo Modals */}
      <HuffmanDemo 
        isOpen={showHuffmanDemo} 
        onClose={() => setShowHuffmanDemo(false)} 
      />
      
      <CheckersDemo 
        isOpen={showCheckersDemo} 
        onClose={() => setShowCheckersDemo(false)} 
      />
    </div>
  );
};

export default Terminal;
