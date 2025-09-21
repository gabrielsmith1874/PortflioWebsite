import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Code, Cpu, Database, Globe, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TypingAnimation from '../components/TypingAnimation';

const Home = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const [currentCommand, setCurrentCommand] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showAboutCommands, setShowAboutCommands] = useState(false);
  const [showSkillsCommands, setShowSkillsCommands] = useState(false);
  const [showProjectsCommands, setShowProjectsCommands] = useState(false);
  const [showCTACommands, setShowCTACommands] = useState(false);


  const skills = [
    { icon: Code, name: 'Programming', description: 'Python, Java, C, C#, JavaScript, HTML, CSS' },
    { icon: Cpu, name: 'AI/ML', description: 'Machine Learning, Artificial Intelligence, Algorithms' },
    { icon: Database, name: 'Data Science', description: 'SQL, R, Statistics, Hypothesis Testing' },
    { icon: Globe, name: 'Software Development', description: 'Object-Oriented Programming, Data Structures' },
  ];

  const stats = [
    { number: '4+', label: 'Years Programming' },
    { number: '5', label: 'Projects Built' },
    { number: '10+', label: 'Technologies Learned' },
    { number: '∞', label: 'Passion for Learning' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-card"></div>
        <div className="absolute inset-0">
          {/* Terminal-style grid with animation */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-20 h-full">
              {Array.from({ length: 400 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border-r border-b border-terminal-green/30 animate-pulse"
                  style={{ animationDelay: `${i * 0.01}s` }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-terminal-green/20 to-accent-blue/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-blue/20 to-terminal-green/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-accent-orange/15 to-terminal-green/15 rounded-full blur-2xl animate-pulse delay-500"></div>
          
          {/* Animated code snippets */}
          <div className="absolute top-20 left-20 text-terminal-green/15 font-mono text-xs animate-pulse">
            <div className="animate-bounce">$ git status</div>
            <div className="animate-bounce delay-100">$ npm start</div>
            <div className="animate-bounce delay-200">$ ls -la</div>
          </div>
          <div className="absolute bottom-20 right-20 text-terminal-green/15 font-mono text-xs animate-pulse delay-1000">
            <div className="animate-bounce">function deploy() {'{'}</div>
            <div className="animate-bounce delay-100">  return success;</div>
            <div className="animate-bounce delay-200">{'}'}</div>
          </div>
          
          {/* Additional floating elements */}
          <div className="absolute top-1/3 right-1/4 text-accent-blue/10 font-mono text-sm animate-pulse">
            <div className="animate-ping">const portfolio = true;</div>
            <div className="animate-ping delay-300">export default portfolio;</div>
          </div>
          
          {/* Matrix-style falling characters */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-terminal-green/5 font-mono text-xs animate-pulse">
            <div className="animate-bounce delay-700">01001000 01100101 01101100 01101100 01101111</div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Terminal-style container */}
            <div className="bg-dark-surface/50 border border-terminal-green/30 rounded-lg p-6 backdrop-blur-sm">
              {/* Command 1: whoami */}
              <div className="mb-4">
                <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                {currentCommand >= 0 && (
                  <TypingAnimation 
                    text="whoami" 
                    speed={100}
                    className="command-text text-lg font-mono"
                    onComplete={() => {
                      setTimeout(() => setCurrentCommand(1), 500);
                    }}
                  />
                )}
                {currentCommand > 0 && (
                  <div className="text-terminal-green text-lg font-mono mt-2">
                    Gabriel Smith
                  </div>
                )}
              </div>

              {/* Command 2: cat title.txt */}
              {currentCommand >= 1 && (
                <div className="mb-4">
                  <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                  {currentCommand === 1 && (
                    <TypingAnimation 
                      text="cat title.txt" 
                      speed={100}
                      className="command-text text-lg font-mono"
                      onComplete={() => {
                        setTimeout(() => setCurrentCommand(2), 500);
                      }}
                    />
                  )}
                  {currentCommand > 1 && (
                    <>
                      <span className="command-text text-lg font-mono">cat title.txt</span>
                      <div className="text-terminal-text text-xl sm:text-2xl font-mono mt-2">
                        Computer Science & Statistics Student
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Command 3: cat about.md */}
              {currentCommand >= 2 && (
                <div className="mb-4">
                  <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                  {currentCommand === 2 && (
                    <TypingAnimation 
                      text="cat about.md" 
                      speed={100}
                      className="command-text text-lg font-mono"
                      onComplete={() => {
                        setTimeout(() => setCurrentCommand(3), 500);
                      }}
                    />
                  )}
                  {currentCommand > 2 && (
                    <>
                      <span className="command-text text-lg font-mono">cat about.md</span>
                      <div className="text-terminal-text text-lg font-mono mt-2 max-w-2xl">
                        Passionate about technology and innovation, eager to learn new skills, 
                        and ready to apply them to real-world challenges in programming, AI, and software development.
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Final command prompt */}
              {currentCommand >= 3 && (
                <div className="mb-4">
                  <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                  <span className="animate-terminal-blink">█</span>
                </div>
              )}

              {/* Main heading */}
              {currentCommand >= 1 && (
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-mono"
                >
                  <span className="gradient-text">Gabriel Smith</span>
                </motion.h1>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/projects')}
                className="unix-button px-8 py-3 text-lg font-mono"
              >
                <span className="command-text">./view_projects.sh</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="unix-button px-8 py-3 text-lg font-mono"
              >
                <span className="command-text">./contact.sh</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll to Explore */}
        <motion.div
          style={{ opacity, y }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2"
        >
          <span className="text-terminal-text text-sm font-medium font-mono">
            <span className="prompt-text">gabriel@portfolio:~$ </span>
            <span className="command-text">scroll down</span>
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} className="text-terminal-green" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
            onViewportEnter={() => {
              setTimeout(() => setShowAboutCommands(true), 500);
            }}
          >
            <div className="bg-dark-surface/50 border border-terminal-green/30 rounded-lg p-6 backdrop-blur-sm mb-8">
              {showAboutCommands && (
                <>
                  <div className="mb-4">
                    <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                    <span className="command-text text-lg font-mono">cat about.txt</span>
                  </div>
                  <div className="text-terminal-text text-lg font-mono">
                    I'm a Computer Science and Statistics student at University of Toronto with a strong foundation in 
                    programming, specifically data structures, algorithms, and artificial intelligence. Currently working as 
                    a Systems Developer at the Ministry of Public and Business Service Delivery.
                  </div>
                </>
              )}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-mono">
              About <span className="gradient-text">Me</span>
            </h2>
          </motion.div>

          {/* Skills Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
            onViewportEnter={() => {
              setTimeout(() => setShowSkillsCommands(true), 500);
            }}
          >
            <div className="bg-dark-surface/50 border border-terminal-green/30 rounded-lg p-6 backdrop-blur-sm mb-8">
              {showSkillsCommands && (
                <>
                  <div className="mb-4">
                    <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                    <span className="command-text text-lg font-mono">cat skills.txt</span>
                  </div>
                  <div className="text-terminal-text text-lg font-mono">
                    Technical skills and expertise areas
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="unix-card p-6"
              >
                <skill.icon size={48} className="text-terminal-green mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-terminal-text font-mono">{skill.name}</h3>
                <p className="text-terminal-text font-mono">{skill.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2 font-mono">{stat.number}</div>
                <div className="text-terminal-text font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
            onViewportEnter={() => {
              setTimeout(() => setShowProjectsCommands(true), 500);
            }}
          >
            <div className="bg-dark-surface/50 border border-terminal-green/30 rounded-lg p-6 backdrop-blur-sm mb-8">
              {showProjectsCommands && (
                <>
                  <div className="mb-4">
                    <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                    <span className="command-text text-lg font-mono">ls -la projects/</span>
                  </div>
                  <div className="text-terminal-text text-lg font-mono">
                    Explore some of my most innovative projects, from AI-powered games to 
                    full-stack web applications.
                  </div>
                </>
              )}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-mono">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-hover bg-dark-card p-8 rounded-xl border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <Sparkles size={32} className="text-accent-purple mr-3" />
                <h3 className="text-2xl font-bold">Stroku</h3>
              </div>
              <p className="text-gray-300 mb-4">
                An innovative project that showcases my creativity and technical skills. 
                Built with modern web technologies and designed for optimal user experience.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-accent-purple/20 text-accent-purple rounded-full text-sm">JavaScript</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Innovation</span>
              </div>
              <button className="text-accent-blue hover:text-accent-purple transition-colors">
                Learn More →
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-hover bg-dark-card p-8 rounded-xl border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <Cpu size={32} className="text-accent-blue mr-3" />
                <h3 className="text-2xl font-bold">Battleship Solitaire AI</h3>
              </div>
              <p className="text-gray-300 mb-4">
                An intelligent AI system that solves Battleship Solitaire puzzles using 
                advanced algorithms and machine learning techniques.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-accent-purple/20 text-accent-purple rounded-full text-sm">AI/ML</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Algorithms</span>
              </div>
              <button className="text-accent-blue hover:text-accent-purple transition-colors">
                Learn More →
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300">
              View All Projects
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onViewportEnter={() => {
            setTimeout(() => setShowCTACommands(true), 500);
          }}
        >
          <div className="bg-dark-surface/50 border border-terminal-green/30 rounded-lg p-6 backdrop-blur-sm mb-8">
            {showCTACommands && (
              <>
                <div className="mb-4">
                  <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                  <span className="command-text text-lg font-mono">cat contact.md</span>
                </div>
                <div className="text-terminal-text text-lg font-mono">
                  Ready to collaborate on your next project? Let's discuss how we can bring 
                  your ideas to life with cutting-edge technology.
                </div>
              </>
            )}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-mono">
            Let's Build Something <span className="gradient-text">Amazing</span>
          </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
              >
                Get In Touch
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300"
              >
                Download Resume
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
