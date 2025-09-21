import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';

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
  const [hasNotification, setHasNotification] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const navigate = useNavigate();

  const commands = {
    help: {
      description: 'Show available commands',
      action: () => [
        { type: 'output', content: 'Gabriel Smith Portfolio Terminal v1.0.0' },
        { type: 'output', content: 'Type any command below to get started.' },
        { type: 'output', content: '' },
        { type: 'output', content: 'Navigation Commands:' },
        { type: 'output', content: '  home     - Navigate to home page' },
        { type: 'output', content: '  timeline - Navigate to timeline page' },
        { type: 'output', content: '  projects - Navigate to projects page' },
        { type: 'output', content: '  resume   - Navigate to resume page' },
        { type: 'output', content: '  contact  - Navigate to contact page' },
        { type: 'output', content: '' },
        { type: 'output', content: 'Information Commands:' },
        { type: 'output', content: '  about    - Show information about Gabriel' },
        { type: 'output', content: '  skills   - Show technical skills' },
        { type: 'output', content: '  ls       - List available directories' },
        { type: 'output', content: '  pwd      - Show current directory' },
        { type: 'output', content: '' },
        { type: 'output', content: 'System Commands:' },
        { type: 'output', content: '  clear    - Clear terminal screen' },
        { type: 'output', content: '  exit     - Close terminal' }
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
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(' ');
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Add command to history
    const newHistory = [...history, { type: 'input', content: `gabriel@portfolio:~$ ${cmd}` }];
    
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

  const toggleTerminal = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    setIsMaximized(false);
    setHasNotification(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    setIsMaximized(false);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    setIsMinimized(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <button
            id="terminal-toggle"
            onClick={toggleTerminal}
            className="bg-terminal-header border border-terminal-green text-terminal-green p-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-terminal-green/25 flex items-center space-x-2"
          >
            <TerminalIcon size={20} />
            <span className="font-mono text-sm hidden sm:block">terminal</span>
            {hasNotification && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-terminal-green rounded-full animate-pulse"></div>
            )}
          </button>
        </div>
        <div className="mt-2 text-xs text-terminal-text font-mono text-center">
          <span className="prompt-text">gabriel@portfolio:~$ </span>
          <span className="command-text">./open_terminal.sh</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isMinimized ? 'bottom-0 right-6' : isMaximized ? 'inset-4' : 'bottom-6 right-6'
    } ${isMinimized ? 'w-64 h-12' : isMaximized ? 'w-auto h-auto' : 'w-96 h-80'}`}>
      <div className="bg-dark-surface/95 border border-terminal-green/30 rounded-lg shadow-2xl backdrop-blur-sm h-full flex flex-col">
        {/* Terminal Header */}
        <div className="bg-terminal-header border-b border-terminal-green/30 px-4 py-2 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center space-x-2">
            <TerminalIcon size={16} className="text-terminal-green" />
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
        <div className="flex-1 p-4 overflow-y-auto bg-dark-bg/50 text-terminal-text font-mono text-sm" ref={terminalRef}>
          {history.map((item, index) => (
            <div key={index} className="mb-1">
              {item.type === 'input' && (
                <div className="text-terminal-green">
                  {item.content}
                </div>
              )}
              {item.type === 'output' && (
                <div className="text-terminal-text">
                  {item.content}
                </div>
              )}
              {item.type === 'prompt' && (
                <div className="flex items-center">
                  <span className="text-terminal-green">gabriel@portfolio:~$ </span>
                  <input
                    ref={index === history.length - 1 ? inputRef : null}
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 bg-transparent text-terminal-green outline-none caret-terminal-green"
                    autoFocus={index === history.length - 1}
                  />
                  <span className="animate-terminal-blink text-terminal-green">█</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
