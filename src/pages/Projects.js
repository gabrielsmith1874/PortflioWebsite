import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TypingAnimation from '../components/TypingAnimation';
import HuffmanDemo from '../components/HuffmanDemo';
import CheckersDemo from '../components/CheckersDemo';

const Projects = () => {
  const navigate = useNavigate();
  const [showCommands, setShowCommands] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showCTACommands, setShowCTACommands] = useState(false);
  const [showCTAContent, setShowCTAContent] = useState(false);
  const [showCTAButtons, setShowCTAButtons] = useState(false);
  const [showHuffmanDemo, setShowHuffmanDemo] = useState(false);
  const [showCheckersDemo, setShowCheckersDemo] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowCommands(true), 500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (showProjects) {
      const timer = setTimeout(() => setShowCTACommands(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [showProjects]);

  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Stroku',
      path: '~/projects/stroku',
      description: 'Cross-platform streaming solution connecting Android devices with Roku TVs',
      technologies: ['Android', 'Roku', 'Streaming', 'HDR 4K'],
      status: 'IN_PROGRESS',
      githubUrl: '#',
      liveUrl: 'https://stroku.netlify.app/'
    },
    {
      id: 2,
      title: 'Battleship Solitaire AI',
      path: '~/projects/battleship-ai',
      description: 'AI-powered puzzle solver using constraint satisfaction algorithms',
      technologies: ['Python', 'AI/ML', 'Algorithms', 'Data Science'],
      status: 'COMPLETE',
      githubUrl: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/Battleship%20Solitaire',
      liveUrl: '#'
    },
    {
      id: 3,
      title: 'Checkers AI',
      path: '~/projects/checkers-ai',
      description: 'Advanced game AI with Minimax algorithm and alpha-beta pruning',
      technologies: ['Python', 'PyGame', 'Minimax', 'Game AI'],
      status: 'COMPLETE',
      githubUrl: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/Checkers%20AI',
      liveUrl: '#'
    },
    {
      id: 4,
      title: 'Text Adventure Game',
      path: '~/projects/adventure-game',
      description: 'Interactive text-based game with multiple storylines and inventory management',
      technologies: ['Java', 'OOP', 'Game Design', 'Data Structures'],
      status: 'COMPLETE',
      githubUrl: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/Adventure%20Game',
      liveUrl: '#'
    },
    {
      id: 5,
      title: 'Huffman Compression',
      path: '~/projects/huffman',
      description: 'Data compression algorithm implementation with file I/O operations',
      technologies: ['Python', 'Data Structures', 'Algorithms', 'File I/O'],
      status: 'COMPLETE',
      githubUrl: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/huffman',
      liveUrl: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section with Terminal Commands */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-black"></div>
        <div className="absolute inset-0">
          {/* Hexagonal Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border-r border-b border-purple-400/15"
                  style={{ 
                    animationDelay: `${i * 0.05}s`,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-56 h-56 bg-gradient-to-r from-pink-400/8 to-purple-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-2xl animate-pulse delay-500"></div>
          
          {/* Floating Code Snippets */}
          <div className="absolute top-40 left-16 text-purple-400/12 font-mono text-sm animate-pulse">
            <div className="animate-bounce" style={{ animationDuration: '2.3s' }}>[React, Python, AI]</div>
          </div>
          <div className="absolute top-1/2 right-16 text-pink-400/12 font-mono text-sm animate-pulse delay-500">
            <div className="animate-bounce" style={{ animationDuration: '3.2s' }}>{'{Projects, Code}'}</div>
          </div>
          <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-purple-400/12 font-mono text-sm animate-pulse delay-1100">
            <div className="animate-bounce" style={{ animationDuration: '2.7s' }}>&larr; Innovation &rarr;</div>
          </div>
          <div className="absolute top-1/3 left-1/6 text-pink-400/10 font-mono text-sm animate-pulse delay-200">
            <div className="animate-bounce" style={{ animationDuration: '2.9s' }}>class Developer {'{'}</div>
          </div>
          <div className="absolute bottom-1/3 right-1/5 text-purple-400/10 font-mono text-sm animate-pulse delay-800">
            <div className="animate-bounce" style={{ animationDuration: '3.1s' }}>  projects: [...];</div>
          </div>
          
          {/* Mathematical Symbols */}
          <div className="absolute top-24 right-1/5 text-pink-400/8 font-mono text-lg animate-pulse">
            <div className="animate-ping">∑</div>
          </div>
          <div className="absolute bottom-1/3 left-1/4 text-purple-400/8 font-mono text-lg animate-pulse delay-400">
            <div className="animate-ping">∫</div>
          </div>
          <div className="absolute top-1/2 right-1/3 text-pink-400/8 font-mono text-lg animate-pulse delay-800">
            <div className="animate-ping">∇</div>
          </div>
          
          {/* Binary Rain */}
          <div className="absolute top-0 right-0 text-purple-400/6 font-mono text-xs animate-pulse transform rotate-45">
            <div className="animate-bounce delay-300">10101010</div>
            <div className="animate-bounce delay-1000">11001100</div>
          </div>
          <div className="absolute bottom-0 left-0 text-pink-400/6 font-mono text-xs animate-pulse transform -rotate-45">
            <div className="animate-bounce delay-600">11110000</div>
            <div className="animate-bounce delay-1300">01010101</div>
          </div>
          
          {/* Corner Borders */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-purple-400/20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-pink-400/20 animate-pulse delay-600"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-400/20 animate-pulse delay-300"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-pink-400/20 animate-pulse delay-900"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-16">
              <h1 className="text-5xl sm:text-6xl font-bold mb-4 font-mono">
                <span className="text-white">My</span> <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Projects</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded"></div>
            </div>

            {showCommands && (
              <>
                <div className="mb-4 bg-gray-800/80 border border-green-400/30 rounded-lg p-4 backdrop-blur-sm inline-block">
                  <span className="text-purple-400 text-lg font-mono">gabriel@portfolio:~$ </span>
                  <TypingAnimation 
                    text="cat projects-intro.md" 
                    speed={30}
                    className="text-purple-400 text-lg font-mono"
                    onComplete={() => {
                      setTimeout(() => {
                        setShowContent(true);
                      }, 500);
                    }}
                  />
                </div>
                {showContent && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="text-gray-300 text-lg font-mono mb-4 bg-gray-800/60 border border-purple-400/20 rounded-lg p-4 backdrop-blur-sm inline-block"
                    >
                      Welcome to my Projects Showcase!<br/><br/>
                      Here you'll find a collection of innovative solutions<br/>
                      spanning AI/ML algorithms, cross-platform development,<br/>
                      and creative problem-solving projects.<br/><br/>
                      Each project demonstrates technical expertise,<br/>
                      attention to detail, and a passion for building<br/>
                      solutions that make a real impact.<br/><br/>
                      Explore the projects below to see the code,<br/>
                      technologies, and methodologies behind each creation.
                    </motion.div>
                    <div className="mb-4 bg-gray-800/80 border border-green-400/30 rounded-lg p-4 backdrop-blur-sm inline-block">
                      <span className="text-purple-400 text-lg font-mono">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="npm run generate-projects"
                        speed={30}
                        className="text-purple-400 text-lg font-mono"
                        onComplete={() => {
                          setTimeout(() => {
                            setShowProjects(true);
                          }, 500);
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {/* Projects Content */}
            {showProjects && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-800/60 border border-purple-400/20 rounded-xl p-8 backdrop-blur-sm"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold font-mono text-white mb-2">Featured Projects</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded"></div>
                </div>

                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-gray-900/95 border-l-4 border-purple-400 p-4 font-mono"
                      style={{ borderStyle: 'solid' }}
                    >
                      {/* Project Header - UNIX style */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400">$</span>
                          <span className="text-purple-400 text-sm">{project.path}</span>
                          <span className="text-gray-500">{'>'}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-mono border ${
                          project.status === 'COMPLETE' 
                            ? 'bg-green-900 text-green-400 border-green-600' 
                            : 'bg-yellow-900 text-yellow-400 border-yellow-600'
                        }`}>
                          [{project.status}]
                        </span>
                      </div>

                      {/* Project Title - Bold and blocky */}
                      <div className="mb-3">
                        <span className="text-white font-bold text-lg">PROJECT:</span>
                        <span className="text-purple-300 ml-2 text-lg">{project.title}</span>
                      </div>

                      {/* Description - Terminal output style */}
                      <div className="mb-3 text-gray-300 text-sm leading-relaxed">
                        <span className="text-gray-500">DESC:</span>
                        <span className="ml-2">{project.description}</span>
                      </div>

                      {/* Technologies - Tag style */}
                      <div className="mb-4">
                        <span className="text-gray-500 text-sm">TECH:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={tech} className="px-2 py-1 bg-gray-800 text-purple-300 text-xs border border-gray-600">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons - Terminal style */}
                      <div className="flex gap-2">
                        {project.id !== 1 && (
                          <button 
                            onClick={() => window.open(project.githubUrl, '_blank')}
                            className="bg-purple-600 text-white px-4 py-2 border border-purple-500 hover:bg-purple-500 transition-colors font-mono text-sm"
                          >
                            [VIEW CODE]
                          </button>
                        )}
                        {project.liveUrl !== '#' && (
                          <button 
                            onClick={() => window.open(project.liveUrl, '_blank')}
                            className={`px-4 py-2 border transition-colors font-mono text-sm ${
                              project.id === 1 
                                ? 'bg-green-600 text-white border-green-500 hover:bg-green-500' 
                                : 'bg-gray-800 text-purple-300 border-gray-600 hover:bg-gray-700 hover:text-white'
                            }`}
                          >
                            {project.id === 1 ? '[LAUNCH APP]' : '[LIVE DEMO]'}
                          </button>
                        )}
                        {project.id === 3 && (
                          <button 
                            onClick={() => setShowCheckersDemo(true)}
                            className="bg-gray-800 text-purple-300 px-4 py-2 border border-gray-600 hover:bg-gray-700 hover:text-white transition-colors font-mono text-sm"
                          >
                            [LIVE DEMO]
                          </button>
                        )}
                        {project.id === 5 && (
                          <button 
                            onClick={() => setShowHuffmanDemo(true)}
                            className="bg-gray-800 text-purple-300 px-4 py-2 border border-gray-600 hover:bg-gray-700 hover:text-white transition-colors font-mono text-sm"
                          >
                            [LIVE DEMO]
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 min-h-[500px] overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/10 to-black"></div>
        <div className="absolute inset-0">
          {/* Floating Orbs */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-2xl animate-pulse delay-500"></div>
          
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-3">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border-r border-b border-purple-400/10"
                  style={{ animationDelay: `${i * 0.02}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {showCTACommands && (
              <>
                <div className="mb-4 bg-gray-800/80 border border-green-400/30 rounded-lg p-4 backdrop-blur-sm inline-block">
                  <span className="text-purple-400 text-lg font-mono">gabriel@portfolio:~$ </span>
                  <TypingAnimation 
                    text="cat collaboration.md" 
                    speed={30}
                    className="text-purple-400 text-lg font-mono"
                    onComplete={() => {
                      setTimeout(() => {
                        setShowCTAContent(true);
                      }, 500);
                    }}
                  />
                </div>
                {showCTAContent && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="text-gray-300 text-lg font-mono mb-4 bg-gray-800/60 border border-purple-400/20 rounded-lg p-4 backdrop-blur-sm inline-block"
                    >
                      Interested in Collaborating?<br/>
                      I'm always excited to work on new projects and explore innovative solutions.<br/>
                      Let's discuss how we can bring your ideas to life.
                    </motion.div>
                    <div className="mb-4 bg-gray-800/80 border border-green-400/30 rounded-lg p-4 backdrop-blur-sm inline-block">
                      <span className="text-purple-400 text-lg font-mono">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="npm run generate-buttons"
                        speed={30}
                        className="text-purple-400 text-lg font-mono"
                        onComplete={() => {
                          setTimeout(() => {
                            setShowCTAButtons(true);
                          }, 500);
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {showCTAButtons && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-800/60 border border-purple-400/20 rounded-lg p-6 backdrop-blur-sm"
              >
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={() => navigate('/contact')}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 font-mono"
                  >
                    Start a Project
                  </button>
                  <button 
                    onClick={() => navigate('/resume')}
                    className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 font-mono"
                  >
                    View Resume
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Huffman Demo Modal */}
      <HuffmanDemo 
        isOpen={showHuffmanDemo} 
        onClose={() => setShowHuffmanDemo(false)} 
      />

      {/* Checkers Demo Modal */}
      <CheckersDemo 
        isOpen={showCheckersDemo} 
        onClose={() => setShowCheckersDemo(false)} 
      />
    </div>
  );
};

export default Projects;