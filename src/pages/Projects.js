import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ExternalLink, 
  Github, 
  Play, 
  Database, 
  Cpu, 
  Globe,
  Sparkles,
  Zap,
  Shield,
  Users,
  Star,
  X
} from 'lucide-react';

const Projects = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Stroku',
      subtitle: 'Cross-Platform Streaming Solution',
      category: 'Software Development',
      description: 'Engineered a cross-platform streaming solution connecting Android devices with Roku TVs, enabling seamless transmission and playback of HDR 4K video URLs.',
      longDescription: 'Stroku is a sophisticated streaming solution that bypasses traditional Miracast limitations. The project integrates advanced content delivery protocols to optimize streaming performance, ensuring low-latency HDR 4K playback between disparate platforms and enhancing user accessibility beyond conventional standards.',
      image: '/api/placeholder/600/400',
      technologies: ['Android', 'Roku', 'Streaming', 'HDR 4K', 'Cross-Platform', 'Content Delivery'],
      features: [
        'HDR 4K Video Streaming',
        'Cross-Platform Compatibility',
        'Low-Latency Playback',
        'Bypass Miracast Limitations',
        'Advanced Content Delivery',
        'Real-time Transmission'
      ],
      githubUrl: '#',
      liveUrl: 'https://stroku.netlify.app/',
      status: 'In Progress',
      icon: Sparkles,
      color: 'from-purple-500 to-purple-600',
      stats: {
        complexity: 95,
        innovation: 95,
        impact: 90
      }
    },
    {
      id: 2,
      title: 'Battleship Solitaire AI',
      subtitle: 'AI-Powered Puzzle Solver',
      category: 'Artificial Intelligence',
      description: 'An intelligent AI system that solves Battleship Solitaire puzzles using advanced algorithms, constraint satisfaction, and heuristic search strategies.',
      longDescription: 'This project represents a sophisticated approach to puzzle-solving using artificial intelligence. The system employs constraint satisfaction algorithms, backtracking, and heuristic search to efficiently solve complex Battleship Solitaire puzzles. The AI demonstrates advanced pattern recognition and logical deduction capabilities.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'AI/ML', 'Algorithms', 'Data Science', 'Optimization', 'Constraint Satisfaction'],
      features: [
        'Constraint Satisfaction Solving',
        'Heuristic Search Algorithms',
        'Pattern Recognition',
        'Logical Deduction Engine',
        'Performance Optimization',
        'High Success Rate'
      ],
      githubUrl: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/Battleship%20Solitaire',
      liveUrl: '#',
      status: 'Completed',
      icon: Cpu,
      color: 'from-green-500 to-green-600',
      stats: {
        complexity: 95,
        innovation: 95,
        impact: 85
      }
    },
    {
      id: 3,
      title: 'Checkers AI',
      subtitle: 'Intelligent Game AI',
      category: 'Artificial Intelligence',
      description: 'An advanced Checkers game with AI opponent featuring strategic decision-making and game tree analysis.',
      longDescription: 'This project showcases game AI development using minimax algorithm with alpha-beta pruning. The AI can play at multiple difficulty levels and demonstrates strategic thinking in board games.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'AI/ML', 'Game Development', 'Minimax Algorithm', 'Alpha-Beta Pruning'],
      features: [
        'Minimax Algorithm Implementation',
        'Alpha-Beta Pruning Optimization',
        'Multiple Difficulty Levels',
        'Strategic Decision Making',
        'Game Tree Analysis',
        'Interactive Gameplay'
      ],
      githubUrl: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/Checkers%20AI',
      liveUrl: '#',
      status: 'Completed',
      icon: Cpu,
      color: 'from-blue-500 to-blue-600',
      stats: {
        complexity: 90,
        innovation: 85,
        impact: 80
      }
    },
    {
      id: 4,
      title: 'Adventure Game',
      subtitle: 'Interactive Text-Based Game',
      category: 'Game Development',
      description: 'A comprehensive text-based adventure game featuring multiple storylines, inventory management, and interactive gameplay.',
      longDescription: 'This project demonstrates object-oriented programming principles and game design patterns. Features include character progression, multiple endings, and complex decision trees.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'Object-Oriented Programming', 'Game Design', 'Data Structures'],
      features: [
        'Multiple Storylines',
        'Inventory Management',
        'Character Progression',
        'Interactive Decision Trees',
        'Multiple Endings',
        'Save/Load System'
      ],
      githubUrl: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/Adventure%20Game',
      liveUrl: '#',
      status: 'Completed',
      icon: Globe,
      color: 'from-purple-500 to-purple-600',
      stats: {
        complexity: 75,
        innovation: 80,
        impact: 70
      }
    },
    {
      id: 5,
      title: 'Huffman Compression',
      subtitle: 'Data Compression Algorithm',
      category: 'Data Structures',
      description: 'Implementation of Huffman coding algorithm for efficient data compression and decompression.',
      longDescription: 'This project demonstrates understanding of data structures, algorithms, and information theory. Features include file compression, decompression, and compression ratio analysis.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'Data Structures', 'Algorithms', 'Information Theory', 'File I/O'],
      features: [
        'Huffman Tree Construction',
        'File Compression',
        'File Decompression',
        'Compression Ratio Analysis',
        'Binary Encoding',
        'Efficient Storage'
      ],
      githubUrl: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/huffman',
      liveUrl: '#',
      status: 'Completed',
      icon: Database,
      color: 'from-orange-500 to-orange-600',
      stats: {
        complexity: 85,
        innovation: 75,
        impact: 80
      }
    },
  ];


  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'In Development': return 'bg-yellow-500/20 text-yellow-400';
      case 'Planned': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg py-20 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-card"></div>
      <div className="absolute inset-0">
        {/* Terminal-style grid with animation */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 h-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div 
                key={i} 
                className="border-r border-b border-terminal-green/20 animate-pulse"
                style={{ animationDelay: `${i * 0.01}s` }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-terminal-green/10 to-accent-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-blue/10 to-terminal-green/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-accent-orange/8 to-terminal-green/8 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Animated code snippets */}
        <div className="absolute top-20 left-20 text-terminal-green/8 font-mono text-xs animate-pulse">
          <div className="animate-bounce">$ git clone</div>
          <div className="animate-bounce delay-100">$ npm install</div>
          <div className="animate-bounce delay-200">$ npm start</div>
        </div>
        <div className="absolute bottom-20 right-20 text-terminal-green/8 font-mono text-xs animate-pulse delay-1000">
          <div className="animate-bounce">const project = {'{'}</div>
          <div className="animate-bounce delay-100">  status: 'live';</div>
          <div className="animate-bounce delay-200">{'}'}</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="mb-6">
              <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
              <span className="command-text text-lg font-mono">ls -la projects/</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-mono">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-terminal-text max-w-3xl mx-auto font-mono">
              Explore a collection of innovative projects that showcase my skills in 
              software development, artificial intelligence, and modern web technologies.
            </p>
          </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="unix-card overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-dark-card to-dark-surface">
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-20`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <project.icon size={64} className="text-white opacity-50" />
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center mr-3`}>
                    <project.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-gray-400 text-sm">{project.category}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

                {/* Stats */}
                <div className="flex justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Star size={12} className="mr-1" />
                    Complexity: {project.stats.complexity}%
                  </div>
                  <div className="flex items-center">
                    <Sparkles size={12} className="mr-1" />
                    Innovation: {project.stats.innovation}%
                  </div>
                  <div className="flex items-center">
                    <Users size={12} className="mr-1" />
                    Impact: {project.stats.impact}%
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-dark-card text-gray-300 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-dark-card text-gray-400 rounded text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 bg-gradient-to-r from-accent-blue to-accent-purple text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    className="p-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </button>
                  <button 
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    className="p-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Github size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-dark-surface border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${selectedProject.color} flex items-center justify-center mr-4`}>
                        <selectedProject.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                        <p className="text-accent-blue">{selectedProject.subtitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Project Overview</h3>
                        <p className="text-gray-300">{selectedProject.longDescription}</p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-300">
                              <div className="w-2 h-2 bg-accent-blue rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-accent-blue rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      <div className="bg-dark-card rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Project Stats</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">Complexity</span>
                              <span className="text-gray-400">{selectedProject.stats.complexity}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-accent-blue to-accent-purple h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${selectedProject.stats.complexity}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">Innovation</span>
                              <span className="text-gray-400">{selectedProject.stats.innovation}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-accent-purple to-accent-blue h-2 rounded-full transition-all duration-1000 delay-200"
                                style={{ width: `${selectedProject.stats.innovation}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">Impact</span>
                              <span className="text-gray-400">{selectedProject.stats.impact}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-accent-blue h-2 rounded-full transition-all duration-1000 delay-400"
                                style={{ width: `${selectedProject.stats.impact}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button 
                          onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                          className="flex-1 bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                        >
                          <Play size={16} className="mr-2" />
                          Live Demo
                        </button>
                        <button 
                          onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                          className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                        >
                          <Github size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Interested in <span className="gradient-text">Collaborating</span>?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always excited to work on new projects and explore innovative solutions. 
            Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
            >
              Start a Project
            </button>
            <button 
              onClick={() => navigate('/resume')}
              className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              View Resume
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
