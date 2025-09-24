import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Cpu, Database, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TypingAnimation from '../components/TypingAnimation';

const Home = () => {
  const navigate = useNavigate();
  const [currentCommand, setCurrentCommand] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showAboutCommands, setShowAboutCommands] = useState(false);
  const [showSkillsCommands, setShowSkillsCommands] = useState(false);
  const [showProjectsCommands, setShowProjectsCommands] = useState(false);
  const [showCTACommands, setShowCTACommands] = useState(false);
  const [currentSection, setCurrentSection] = useState(0); // 0: hero, 1: about, 2: skills, 3: projects, 4: cta
  const [showSkillsContent, setShowSkillsContent] = useState(false);
  const [showProjectsContent, setShowProjectsContent] = useState(false);
  const [showCTAContent, setShowCTAContent] = useState(false);
  const [showSkillsComponents, setShowSkillsComponents] = useState(false);
  const [showProjectsComponents, setShowProjectsComponents] = useState(false);
  const [showCTAButtons, setShowCTAButtons] = useState(false);
  const [showCTAHeading, setShowCTAHeading] = useState(false);

  // Keep animations persistent - no reset on scroll


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
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-10 h-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border-r border-b border-terminal-green/20"
                  style={{ animationDelay: `${i * 0.05}s` }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Floating geometric shapes */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-terminal-green/10 to-accent-blue/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, 20, -10, 0],
              y: [0, -15, 10, 0],
              scale: [1, 1.1, 0.95, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-blue/10 to-terminal-green/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, -30, 15, 0],
              y: [0, 20, -25, 0],
              scale: [1, 0.9, 1.05, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          ></motion.div>
          
          {/* Additional Animated Lights */}
          <div className="absolute top-1/6 right-1/6 w-48 h-48 bg-gradient-to-r from-terminal-green/8 to-accent-blue/8 rounded-full blur-2xl animate-pulse delay-300"></div>
          <div className="absolute bottom-1/6 left-1/6 w-72 h-72 bg-gradient-to-r from-accent-blue/6 to-terminal-green/6 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 right-1/12 w-32 h-32 bg-gradient-to-r from-terminal-green/10 to-accent-blue/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/12 w-56 h-56 bg-gradient-to-r from-accent-blue/8 to-terminal-green/8 rounded-full blur-3xl animate-pulse delay-500"></div>
          
          {/* Animated code snippets */}
          <div className="absolute top-20 left-20 text-terminal-green/15 font-mono text-xs animate-pulse">
            <div className="animate-bounce" style={{ animationDuration: '2s' }}>$ git status</div>
            <div className="animate-bounce delay-400" style={{ animationDuration: '3s' }}>$ npm start</div>
            <div className="animate-bounce delay-800" style={{ animationDuration: '2.5s' }}>$ ls -la</div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-terminal-green/15 font-mono text-xs animate-pulse delay-1000">
            <div className="animate-bounce" style={{ animationDuration: '3.5s' }}>function deploy() {'{'}</div>
            <div className="animate-bounce delay-600" style={{ animationDuration: '2.2s' }}>  return success;</div>
            <div className="animate-bounce delay-1400" style={{ animationDuration: '2.8s' }}>{'}'}</div>
          </div>
          
          {/* Additional floating elements */}
          <div className="absolute top-20 right-20 text-accent-blue/10 font-mono text-sm animate-pulse">
            <div className="animate-ping">const portfolio = true;</div>
          </div>
          
          {/* Export statement - moved to avoid border interference */}
          <div className="absolute bottom-20 left-20 text-accent-blue/10 font-mono text-sm animate-pulse">
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
            <div className="bg-dark-surface/80 border-2 border-terminal-green/50 rounded-lg p-4 sm:p-6 backdrop-blur-sm shadow-lg shadow-terminal-green/20">
              {/* Command 1: whoami */}
              <div className="mb-4">
                <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                {currentCommand >= 0 && (
                   <TypingAnimation 
                     key="whoami"
                     text="whoami" 
                     speed={30}
                    className="command-text text-lg font-mono"
                    onComplete={() => {
                      setTimeout(() => setCurrentCommand(1), 500);
                    }}
                  />
                )}
                {/* Main heading appears after whoami */}
                {currentCommand > 0 && (
                  <motion.h1 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 font-mono mt-6 sm:mt-8"
                  >
                    <span className="gradient-text">Gabriel Smith</span>
                  </motion.h1>
                )}
              </div>

              {/* Command 2: cat title.txt */}
              {currentCommand >= 1 && (
                <div className="mb-4">
                  <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                  {currentCommand === 1 && (
                     <TypingAnimation 
                       key="cat-title"
                       text="cat title.txt" 
                       speed={30}
                      className="command-text text-lg font-mono"
                      onComplete={() => {
                        setTimeout(() => setCurrentCommand(2), 500);
                      }}
                    />
                  )}
                  {currentCommand > 1 && (
                    <>
                      <span className="command-text text-lg font-mono">cat title.txt</span>
                      <div className="text-terminal-text text-lg sm:text-xl md:text-2xl font-mono mt-2">
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
                       key="cat-about"
                       text="cat about.md" 
                       speed={30}
                      className="command-text text-lg font-mono"
                      onComplete={() => {
                        setTimeout(() => setCurrentCommand(3), 500);
                      }}
                    />
                  )}
                  {currentCommand > 2 && (
                    <>
                      <span className="command-text text-lg font-mono">cat about.md</span>
                      <div className="text-terminal-text text-sm sm:text-base md:text-lg font-mono mt-2 max-w-2xl mx-auto">
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

            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 sm:mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/projects')}
                className="unix-button px-6 sm:px-8 py-3 text-sm sm:text-base md:text-lg font-mono w-full sm:w-auto touch-manipulation"
              >
                <span className="command-text">./view_projects.sh</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="unix-button px-6 sm:px-8 py-3 text-sm sm:text-base md:text-lg font-mono w-full sm:w-auto touch-manipulation"
              >
                <span className="command-text">./contact.sh</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll to Explore */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-center">
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
        </div>
      </section>

        {/* About Section */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 h-[1200px] overflow-hidden">
          {/* Unique About Section Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-surface via-dark-bg to-dark-card"></div>
          <div className="absolute inset-0 h-[1200px]">
            {/* Hexagonal grid pattern */}
            <div className="absolute inset-0 opacity-3 h-[1200px]">
              <div className="grid grid-cols-8 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="border-r border-b border-accent-blue/15"
                    style={{ 
                      animationDelay: `${i * 0.05}s`,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Asymmetric geometric shapes - completely different layout */}
            <motion.div 
              className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-accent-blue/10 to-terminal-green/10 rounded-full blur-2xl"
              animate={{ 
                x: [0, 15, -8, 0],
                y: [0, -10, 12, 0],
                rotate: [0, 5, -3, 0]
              }}
              transition={{ 
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div 
              className="absolute top-1/4 right-1/4 w-56 h-56 bg-gradient-to-r from-accent-orange/8 to-accent-blue/8 rounded-full blur-3xl"
              animate={{ 
                x: [0, -20, 10, 0],
                y: [0, 15, -18, 0],
                scale: [1, 1.05, 0.98, 1]
              }}
              transition={{ 
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-terminal-green/6 to-accent-orange/6 rounded-full blur-2xl"
              animate={{ 
                x: [0, 12, -15, 0],
                y: [0, -8, 20, 0],
                rotate: [0, -4, 2, 0]
              }}
              transition={{ 
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 7
              }}
            ></motion.div>

            {/* Scattered data structures - dynamic positioning */}
            <div className="absolute top-40 left-16 text-accent-blue/12 font-mono text-sm animate-pulse">
              <div className="animate-bounce" style={{ animationDuration: '2.3s' }}>[Python, Java, C]</div>
            </div>
            <div className="absolute top-1/2 right-16 text-terminal-green/12 font-mono text-sm animate-pulse delay-500">
              <div className="animate-bounce" style={{ animationDuration: '3.2s' }}>{'{AI, ML, Data}'}</div>
            </div>
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-accent-orange/12 font-mono text-sm animate-pulse delay-1100">
              <div className="animate-bounce" style={{ animationDuration: '2.7s' }}>← Algorithms →</div>
            </div>
            <div className="absolute top-1/3 left-1/6 text-terminal-green/10 font-mono text-sm animate-pulse delay-200">
              <div className="animate-bounce" style={{ animationDuration: '2.9s' }}>class Developer {'{'}</div>
            </div>
            <div className="absolute bottom-1/3 right-1/5 text-accent-blue/10 font-mono text-sm animate-pulse delay-800">
              <div className="animate-bounce" style={{ animationDuration: '3.1s' }}>  skills: [...];</div>
            </div>

            {/* Mathematical symbols scattered around */}
            <div className="absolute top-24 right-1/5 text-accent-orange/8 font-mono text-lg animate-pulse">
              <div className="animate-ping">∑</div>
            </div>
            <div className="absolute bottom-1/3 left-1/4 text-accent-blue/8 font-mono text-lg animate-pulse delay-400">
              <div className="animate-ping">∫</div>
            </div>
            <div className="absolute top-1/2 right-1/3 text-terminal-green/8 font-mono text-lg animate-pulse delay-800">
              <div className="animate-ping">∇</div>
            </div>

            {/* Diagonal binary streams */}
            <div className="absolute top-0 right-0 text-terminal-green/6 font-mono text-xs animate-pulse transform rotate-45">
              <div className="animate-bounce delay-300">10101010</div>
              <div className="animate-bounce delay-1000">11001100</div>
            </div>
            <div className="absolute bottom-0 left-0 text-accent-blue/6 font-mono text-xs animate-pulse transform -rotate-45">
              <div className="animate-bounce delay-600">11110000</div>
              <div className="animate-bounce delay-1300">01010101</div>
            </div>

            {/* Corner accent elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-accent-blue/20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-terminal-green/20 animate-pulse delay-600"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent-orange/20 animate-pulse delay-300"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-accent-blue/20 animate-pulse delay-900"></div>

            {/* Additional Animated Lights */}
            <div className="absolute top-1/5 left-1/12 w-36 h-36 bg-gradient-to-r from-terminal-green/8 to-accent-blue/8 rounded-full blur-2xl animate-pulse delay-400"></div>
            <div className="absolute bottom-1/5 right-1/12 w-44 h-44 bg-gradient-to-r from-accent-orange/6 to-terminal-green/6 rounded-full blur-3xl animate-pulse delay-800"></div>
            <div className="absolute top-2/3 left-1/8 w-28 h-28 bg-gradient-to-r from-accent-blue/10 to-accent-orange/10 rounded-full blur-2xl animate-pulse delay-1200"></div>
            <div className="absolute bottom-1/6 right-1/8 w-52 h-52 bg-gradient-to-r from-terminal-green/7 to-accent-blue/7 rounded-full blur-3xl animate-pulse delay-600"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
             onViewportEnter={() => {
               if (currentSection === 0) {
                 setCurrentSection(1);
                 setTimeout(() => setShowAboutCommands(true), 500);
               }
             }}
          >
            {showAboutCommands && (
              <>
                <div className="mb-4 bg-dark-surface/80 border border-terminal-green/30 rounded-lg p-4 backdrop-blur-sm">
                  <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                  <TypingAnimation 
                    text="cat about.txt" 
                    speed={30}
                    className="command-text text-lg font-mono"
                    onComplete={() => {
                      setTimeout(() => {
                        setShowContent(true);
                      }, 500);
                    }}
                  />
                </div>
                {showContent && (
                  <>
                    {/* About Me Container - All in one bordered section */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="mt-6 bg-dark-surface/60 border border-accent-blue/20 rounded-lg p-6 backdrop-blur-sm"
                    >
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-mono text-center">
                        About <span className="gradient-text">Me</span>
                      </h2>
                      <div className="text-terminal-text text-sm sm:text-base md:text-lg font-mono">
                        I'm a Computer Science and Statistics student at University of Toronto with a strong foundation in programming, specifically data structures, algorithms, and artificial intelligence. Currently working as a Systems Developer at the Ministry of Public and Business Service Delivery.
                      </div>
                    </motion.div>
                    <div className="text-center mt-4">
                      <TypingAnimation 
                        text=""
                        speed={30}
                        delay={2000}
                        onComplete={() => {
                          setTimeout(() => {
                            setCurrentSection(2);
                            setShowSkillsCommands(true);
                          }, 1000);
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </motion.div>

          {/* Skills Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
             onViewportEnter={() => {
               if (currentSection === 2) {
                 // Skills commands already triggered by About section
               }
             }}
          >
            {showSkillsCommands && (
              <div>
                <div className="mb-4 bg-dark-surface/80 border border-terminal-green/30 rounded-lg p-4 backdrop-blur-sm">
                  <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                  <TypingAnimation 
                    text="cat skills.txt" 
                    speed={30}
                    className="command-text text-lg font-mono"
                    onComplete={() => {
                      setTimeout(() => {
                        setShowSkillsContent(true);
                      }, 500);
                    }}
                  />
                </div>
                {showSkillsContent && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="text-terminal-text text-lg font-mono mb-4 bg-dark-surface/60 border border-accent-blue/20 rounded-lg p-4 backdrop-blur-sm"
                    >
                      Programming Languages: Python, Java, C, C#, JavaScript, HTML, CSS<br/>
                      AI/ML & Data Science: Machine Learning, Algorithms, Data Structures, SQL, R<br/>
                      Development Tools: Postman, Swagger, REST APIs, Git, Assembly<br/>
                      Core Competencies: OOP, Algorithm Design, Statistics, Hypothesis Testing
                    </motion.div>
                    <div className="mb-4 bg-dark-surface/80 border border-terminal-green/30 rounded-lg p-4 backdrop-blur-sm">
                      <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="npm run generate-skills"
                        speed={30}
                        className="command-text text-lg font-mono"
                        onComplete={() => {
                          setTimeout(() => {
                            setShowSkillsComponents(true);
                          }, 500);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>

          {/* Skills and Stats Container - All in one bordered section */}
          {showSkillsComponents && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-dark-surface/60 border border-accent-blue/20 rounded-lg p-6 backdrop-blur-sm"
            >
              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="unix-card p-3 sm:p-4 h-full"
                  >
                    <skill.icon size={40} className="text-terminal-green mb-3 sm:mb-4 mx-auto sm:mx-0" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-terminal-text font-mono text-center sm:text-left">{skill.name}</h3>
                    <p className="text-terminal-text font-mono text-sm sm:text-base text-center sm:text-left">{skill.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: (index + 4) * 0.1 }}
                    className="text-center h-full"
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2 font-mono">{stat.number}</div>
                    <div className="text-terminal-text font-mono text-xs sm:text-sm md:text-base">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 h-[1200px] overflow-hidden">
        {/* Unique Projects Section Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-card via-dark-surface to-dark-bg"></div>
        <div className="absolute inset-0 h-[1200px]">
          {/* Circuit board pattern */}
          <div className="absolute inset-0 opacity-3">
            <div className="grid grid-cols-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div 
                  key={i} 
                  className="relative"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {/* Circuit nodes */}
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-terminal-green/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              ))}
            </div>
          </div>


        </div>

        <div className="max-w-6xl mx-auto relative z-10">
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
             <div className="min-h-[180px] mb-6">
               {showProjectsCommands && (
                 <div>
                   <div className="mb-4 bg-dark-surface/80 border border-terminal-green/30 rounded-lg p-4 backdrop-blur-sm">
                     <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                     <TypingAnimation 
                       text="cat projects.txt" 
                       speed={30}
                       className="command-text text-lg font-mono"
                       onComplete={() => {
                         setTimeout(() => {
                           setShowProjectsContent(true);
                         }, 500);
                       }}
                     />
                   </div>
                   {showProjectsContent && (
                     <>
                       <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.8 }}
                         className="text-terminal-text text-lg font-mono mb-4 bg-dark-surface/60 border border-accent-blue/20 rounded-lg p-4 backdrop-blur-sm"
                       >
                         Stroku - Cross-platform streaming solution connecting Android devices with Roku TVs<br/>
                         Battleship Solitaire AI - AI-powered puzzle solver using constraint satisfaction algorithms<br/>
                         Checkers AI - Advanced game AI with Minimax algorithm and alpha-beta pruning<br/>
                         Text Adventure Game - NLP-powered interactive story with voice recognition<br/>
                         Huffman Compression - Efficient data compression with 80%+ compression rate
                       </motion.div>
                       <div className="mb-4 bg-dark-surface/80 border border-terminal-green/30 rounded-lg p-4 backdrop-blur-sm">
                         <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                         <TypingAnimation 
                           text="npm run generate-projects"
                           speed={30}
                           className="command-text text-lg font-mono"
                           onComplete={() => {
                             setTimeout(() => {
                               setShowProjectsComponents(true);
                             }, 500);
                           }}
                         />
                       </div>
                     </>
                   )}
                 </div>
               )}
             </div>
          </motion.div>

          {/* Projects Container - All in one bordered section */}
          {showProjectsComponents && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-dark-surface/60 border border-accent-blue/20 rounded-lg p-6 backdrop-blur-sm"
            >
              {/* Featured Projects Heading */}
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-mono text-center"
              >
                Featured <span className="gradient-text">Projects</span>
              </motion.h2>

              {/* Projects List - Terminal Style */}
              <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-6">
                {/* Project 1 */}
                <div className="border-b border-dark-border pb-3 sm:pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                    <div className="flex-1">
                      <span className="text-terminal-green font-mono text-xs sm:text-sm">~/projects/stroku</span>
                      <h3 className="text-lg sm:text-xl font-bold text-terminal-text font-mono mt-1">Stroku</h3>
                    </div>
                    <span className="text-accent-green font-mono text-xs bg-accent-green/10 px-2 py-1 rounded self-start">ACTIVE</span>
                  </div>
                  <p className="text-terminal-text/80 font-mono text-xs sm:text-sm mb-3">
                    Cross-platform streaming solution connecting Android devices with Roku TVs
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <span className="px-2 py-1 bg-dark-border text-terminal-text font-mono text-xs rounded">React</span>
                    <span className="px-2 py-1 bg-dark-border text-terminal-text font-mono text-xs rounded">JavaScript</span>
                    <span className="px-2 py-1 bg-dark-border text-terminal-text font-mono text-xs rounded">Streaming</span>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="border-b border-dark-border pb-3 sm:pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                    <div className="flex-1">
                      <span className="text-terminal-green font-mono text-xs sm:text-sm">~/projects/battleship-ai</span>
                      <h3 className="text-lg sm:text-xl font-bold text-terminal-text font-mono mt-1">Battleship Solitaire AI</h3>
                    </div>
                    <span className="text-accent-blue font-mono text-xs bg-accent-blue/10 px-2 py-1 rounded self-start">COMPLETE</span>
                  </div>
                  <p className="text-terminal-text/80 font-mono text-xs sm:text-sm mb-3">
                    AI-powered puzzle solver using constraint satisfaction algorithms
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <span className="px-2 py-1 bg-dark-border text-terminal-text font-mono text-xs rounded">Python</span>
                    <span className="px-2 py-1 bg-dark-border text-terminal-text font-mono text-xs rounded">AI/ML</span>
                    <span className="px-2 py-1 bg-dark-border text-terminal-text font-mono text-xs rounded">Algorithms</span>
                  </div>
                </div>

                {/* Project 3 */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                    <div className="flex-1">
                      <span className="text-terminal-green font-mono text-xs sm:text-sm">~/projects/checkers-ai</span>
                      <h3 className="text-lg sm:text-xl font-bold text-terminal-text font-mono mt-1">Checkers AI</h3>
                    </div>
                    <span className="text-accent-blue font-mono text-xs bg-accent-blue/10 px-2 py-1 rounded self-start">COMPLETE</span>
                  </div>
                  <p className="text-terminal-text/80 font-mono text-xs sm:text-sm mb-3">
                    Advanced game AI with Minimax algorithm and alpha-beta pruning
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <span className="px-2 py-1 bg-dark-border text-terminal-text font-mono text-xs rounded">Python</span>
                    <span className="px-2 py-1 bg-dark-border text-terminal-text font-mono text-xs rounded">PyGame</span>
                    <span className="px-2 py-1 bg-dark-border text-terminal-text font-mono text-xs rounded">Minimax</span>
                  </div>
                </div>
              </div>

              {/* View All Projects Button */}
              <div className="text-center">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  onClick={() => navigate('/projects')}
                  className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300 text-sm"
                >
                  View All Projects
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 h-[600px] overflow-hidden">
        {/* Simple CTA Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-card via-dark-surface to-dark-bg"></div>
        <div className="absolute inset-0 h-[600px]">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-3">
            <div className="grid grid-cols-6 h-full">
              {Array.from({ length: 36 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border-r border-b border-terminal-green/15"
                  style={{ animationDelay: `${i * 0.1}s` }}
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
           onViewportEnter={() => {
             setTimeout(() => setShowCTACommands(true), 500);
           }}
         >
           <div className="min-h-[200px] mb-6">
             {showCTACommands && (
               <div>
                 <div className="mb-4 bg-dark-surface/80 border border-terminal-green/30 rounded-lg p-4 backdrop-blur-sm">
                   <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                   <TypingAnimation 
                     text="cat contact.md" 
                     speed={30}
                     className="command-text text-lg font-mono"
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
                       className="text-terminal-text text-lg font-mono mb-4 bg-dark-surface/60 border border-accent-blue/20 rounded-lg p-4 backdrop-blur-sm"
                     >
                       Email: gabrielsmith1874@gmail.com<br/>
                       Phone: +1 (289) 681-0442<br/>
                       Location: Mississauga, Ontario, Canada<br/>
                       LinkedIn: linkedin.com/in/gabriel-smith-b3b366253<br/>
                       GitHub: github.com/gabrielsmith1874<br/>
                     </motion.div>
                     <div className="mb-4 bg-dark-surface/80 border border-terminal-green/30 rounded-lg p-4 backdrop-blur-sm">
                       <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                       <TypingAnimation 
                         text="npm run generate-buttons"
                         speed={30}
                         className="command-text text-lg font-mono"
                         onComplete={() => {
                           setTimeout(() => {
                             setShowCTAHeading(true);
                             setShowCTAButtons(true);
                           }, 500);
                         }}
                       />
                     </div>
                   </>
                 )}
               </div>
             )}
           </div>
          {/* CTA Container - All in one bordered section */}
          {showCTAHeading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-dark-surface/60 border border-accent-blue/20 rounded-lg p-6 backdrop-blur-sm"
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-mono text-center"
              >
                Let's Build Something <span className="gradient-text">Amazing</span>
              </motion.h2>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                {showCTAButtons && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      onClick={() => navigate('/contact')}
                      className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300 text-sm sm:text-base touch-manipulation w-full sm:w-auto"
                    >
                      Get In Touch
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      onClick={() => navigate('/resume')}
                      className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 text-sm sm:text-base touch-manipulation w-full sm:w-auto"
                    >
                      Download Resume
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
