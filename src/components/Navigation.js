import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Check if we're on the timeline page to use blue theme
  const isTimelinePage = location.pathname === '/timeline';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];


  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-effect' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-terminal-header border border-dark-border rounded flex items-center justify-center">
              <span className={`font-bold text-sm font-mono ${isTimelinePage ? 'text-blue-400' : 'text-terminal-green'}`}>GS</span>
            </div>
            <span className="text-terminal-text font-semibold text-lg font-mono">
              <span className={isTimelinePage ? 'text-blue-400' : 'text-terminal-green'}>gabriel@portfolio:</span>
              <span className="directory-text">~</span>
              <span className={isTimelinePage ? 'text-blue-400' : 'text-terminal-green'}>$</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded text-sm font-medium font-mono transition-colors duration-200 ${
                    location.pathname === item.path
                      ? `${isTimelinePage ? 'text-blue-400' : 'text-terminal-green'} bg-dark-surface border border-dark-border`
                      : `text-terminal-text hover:${isTimelinePage ? 'text-blue-400' : 'text-terminal-green'} hover:bg-dark-surface hover:border hover:border-dark-border`
                  }`}
                >
                  {item.name.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Current Page Indicator */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded text-sm font-mono text-terminal-text bg-dark-surface border border-dark-border">
              <span className={isTimelinePage ? 'text-blue-400' : 'text-terminal-green'}>●</span>
              <span>current: {location.pathname === '/' ? 'home' : location.pathname.slice(1)}</span>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-surface border-t border-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-accent-blue bg-dark-card'
                    : 'text-gray-300 hover:text-white hover:bg-dark-card'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
