import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TypingAnimation from '../components/TypingAnimation';
import { 
  Download, 
  Mail
} from 'lucide-react';

const Resume = () => {
  const navigate = useNavigate();
  const [showCommands, setShowCommands] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowCommands(true), 500);
    return () => clearTimeout(timer);
  }, []);



  const skills = {
    programming: ['Python', 'Java', 'C', 'C#', 'JavaScript', 'HTML', 'CSS', 'Assembly'],
    ai_ml: ['Machine Learning', 'Artificial Intelligence', 'Algorithms', 'Data Structures'],
    data_science: ['SQL', 'R', 'Statistics', 'Hypothesis Testing'],
    other: ['Object-Oriented Programming', 'Algorithm Design', 'Time/Correctness Analysis', 'Software Design']
  };

  const projects = [
    {
      name: 'Stroku',
      description: 'Cross-platform streaming solution connecting Android devices with Roku TVs',
      technologies: ['Android', 'Roku', 'Streaming', 'HDR 4K']
    },
    {
      name: 'Battleship Solitaire AI',
      description: 'AI-powered puzzle solver using constraint satisfaction algorithms',
      technologies: ['Python', 'AI/ML', 'Constraint Satisfaction', 'AC-3 Algorithm']
    },
    {
      name: 'Checkers AI',
      description: 'Advanced Checkers AI with Minimax algorithm and alpha-beta pruning',
      technologies: ['Python', 'AI/ML', 'Minimax', 'Alpha-Beta Pruning', 'PyGame']
    },
    {
      name: 'Text Adventure Game',
      description: 'Text-based adventure game with natural language processing',
      technologies: ['Java', 'NLP', 'Google Cloud APIs', 'MaryTTS']
    },
    {
      name: 'Huffman Compression',
      description: 'Efficient compression and decompression algorithms',
      technologies: ['Python', 'Data Structures', 'Algorithms', 'Compression']
    }
  ];

  const education = [
    {
      degree: "Bachelor's degree in Computer Science and Statistics",
      school: 'University of Toronto Mississauga',
      period: '09/2022 - 04/2027',
      location: 'Mississauga, Ontario, Canada',
      relevant_courses: [
        'Data Structures and Algorithms',
        'Software Engineering',
        'Machine Learning',
        'Database Systems',
        'Computer Networks',
        'Operating Systems'
      ]
    }
  ];

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Gabriel_Smith_Resume.pdf';
    link.download = 'Gabriel_Smith_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Terminal-style grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 h-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div 
                key={i} 
                className="border-r border-b border-orange-400/20 animate-pulse"
                style={{ animationDelay: `${i * 0.01}s` }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-56 h-56 bg-gradient-to-r from-red-400/8 to-orange-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-orange-400/6 to-red-400/6 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Additional Unique Lights */}
        <div className="absolute top-1/18 left-1/18 w-36 h-36 bg-gradient-to-r from-red-400/9 to-orange-400/9 rounded-full blur-2xl animate-pulse delay-200"></div>
        <div className="absolute bottom-1/18 right-1/18 w-44 h-44 bg-gradient-to-r from-orange-400/7 to-red-400/7 rounded-full blur-3xl animate-pulse delay-900"></div>
        <div className="absolute top-11/12 right-1/19 w-28 h-28 bg-gradient-to-r from-red-400/11 to-orange-400/11 rounded-full blur-2xl animate-pulse delay-400"></div>
        <div className="absolute bottom-1/19 left-1/19 w-52 h-52 bg-gradient-to-r from-orange-400/8 to-red-400/8 rounded-full blur-3xl animate-pulse delay-1100"></div>
        <div className="absolute top-1/19 right-1/10 w-20 h-20 bg-gradient-to-r from-red-400/13 to-orange-400/13 rounded-full blur-2xl animate-pulse delay-600"></div>
        
        {/* Floating code snippets */}
        <div className="absolute top-40 left-16 text-orange-400/12 font-mono text-sm animate-pulse">
          <div className="animate-bounce" style={{ animationDuration: '2.3s' }}>[Python, Java, C]</div>
        </div>
        <div className="absolute top-1/2 right-16 text-red-400/12 font-mono text-sm animate-pulse delay-500">
          <div className="animate-bounce" style={{ animationDuration: '3.2s' }}>{'{AI, ML, Data}'}</div>
        </div>
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-orange-400/12 font-mono text-sm animate-pulse delay-1100">
          <div className="animate-bounce" style={{ animationDuration: '2.7s' }}>&larr; Experience &rarr;</div>
        </div>
        <div className="absolute top-1/3 left-1/6 text-red-400/10 font-mono text-sm animate-pulse delay-200">
          <div className="animate-bounce" style={{ animationDuration: '2.9s' }}>class Developer {'{'}</div>
        </div>
        <div className="absolute bottom-1/3 right-1/5 text-orange-400/10 font-mono text-sm animate-pulse delay-800">
          <div className="animate-bounce" style={{ animationDuration: '3.1s' }}>  skills: [...];</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 font-mono">
              <span className="text-white">resume</span>
              <span className="text-orange-400">.pdf</span>
            </h1>
            <p className="text-xl text-gray-400 font-mono">
              $ cat resume.txt | grep -E "(experience|skills|projects)"
            </p>
          </motion.div>

          {/* Terminal Commands */}
          {showCommands && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto mb-8"
            >
              <div className="bg-black/80 border border-orange-400/30 rounded-lg p-6 font-mono text-sm">
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-orange-400">gabriel@portfolio:~$ </span>
                    <TypingAnimation 
                      text="whoami"
                      speed={30}
                      className="text-white"
                      onComplete={() => setShowPersonalInfo(true)}
                    />
                  </div>
                  
                  {showPersonalInfo && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="ml-4 text-gray-300"
                    >
                      <div>Name: Gabriel Smith</div>
                      <div>Title: Computer Science Student & Systems Developer</div>
                      <div>Location: Mississauga, Ontario, Canada</div>
                      <div>Email: gabrielsmith1874@gmail.com</div>
                      <div>Phone: 2896810442</div>
                      <div>LinkedIn: linkedin.com/in/gabriel-smith-b3b366253</div>
                      <div>Website: gabrielsmith.site</div>
                    </motion.div>
                  )}

                  {showPersonalInfo && (
                    <div className="flex items-center mt-4">
                      <span className="text-orange-400">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="cat experience.md"
                        speed={30}
                        className="text-white"
                        onComplete={() => setShowExperience(true)}
                      />
                    </div>
                  )}

                  {showExperience && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="ml-4 text-gray-300"
                    >
                      <div className="mb-4">
                        <div className="text-orange-400 font-semibold">Systems Developer & Tester</div>
                        <div className="text-red-400">Ministry of Public and Business Service Delivery and Procurement</div>
                        <div className="text-gray-400">February 2025 - Present | Toronto, ON</div>
                        <div className="text-sm mt-2">• Automated regression testing processes for government procurement systems</div>
                        <div className="text-sm">• Implemented Web API integrations using Postman and Swagger</div>
                        <div className="text-sm">• Supported migration from SFTP to REST services</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-orange-400 font-semibold">Customer Service Representative</div>
                        <div className="text-red-400">Farm Boy Inc.</div>
                        <div className="text-gray-400">July 2024 - January 2025 | Ontario, Canada</div>
                        <div className="text-sm mt-2">• Provided exceptional customer service and resolved issues promptly</div>
                        <div className="text-sm">• Maintained clean work areas following health and safety regulations</div>
                        <div className="text-sm">• Assisted with inventory management and product freshness monitoring</div>
                        <div className="text-sm">• Offered assistant manager and supervisor titles due to work ethic</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-orange-400 font-semibold">HMR Clerk</div>
                        <div className="text-red-400">Loblaws</div>
                        <div className="text-gray-400">September 2023 - Present | Mississauga, ON</div>
                        <div className="text-sm mt-2">• Provided exceptional customer engagement and meal guidance</div>
                        <div className="text-sm">• Conducted meticulous food preparation with safety standards</div>
                        <div className="text-sm">• Managed inventory optimization and waste minimization</div>
                      </div>
                      <div>
                        <div className="text-orange-400 font-semibold">Assembler</div>
                        <div className="text-red-400">Dana Incorporated</div>
                        <div className="text-gray-400">August 2021 - September 2021 | Oakville, ON</div>
                        <div className="text-sm mt-2">• Assembled mechanical and electronic components for automotive products</div>
                        <div className="text-sm">• Met daily production targets efficiently with minimal errors</div>
                        <div className="text-sm">• Maintained high quality standards with zero-defects</div>
                      </div>
                    </motion.div>
                  )}

                  {showExperience && (
                    <div className="flex items-center mt-4">
                      <span className="text-orange-400">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="ls projects/"
                        speed={30}
                        className="text-white"
                        onComplete={() => setShowProjects(true)}
                      />
                    </div>
                  )}

                  {showProjects && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="ml-4 text-gray-300"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.slice(0, 4).map((project, index) => (
                          <div key={index} className="border border-orange-400/30 rounded p-3">
                            <div className="text-orange-400 font-semibold">{project.name}</div>
                            <div className="text-sm text-gray-400">{project.description}</div>
                            <div className="text-xs text-red-400 mt-1">
                              {project.technologies?.slice(0, 3).join(', ') || 'N/A'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {showProjects && (
                    <div className="flex items-center mt-4">
                      <span className="text-orange-400">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="cat skills.txt"
                        speed={30}
                        className="text-white"
                        onComplete={() => setShowSkills(true)}
                      />
                    </div>
                  )}

                  {showSkills && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="ml-4 text-gray-300"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-orange-400 font-semibold">Programming Languages</div>
                          <div className="text-sm">{skills.programming?.join(', ') || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-orange-400 font-semibold">AI/ML</div>
                          <div className="text-sm">{skills.ai_ml?.join(', ') || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-orange-400 font-semibold">Data Science</div>
                          <div className="text-sm">{skills.data_science?.join(', ') || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-orange-400 font-semibold">Other Skills</div>
                          <div className="text-sm">{skills.other?.join(', ') || 'N/A'}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {showSkills && (
                    <div className="flex items-center mt-4">
                      <span className="text-orange-400">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="cat education.md"
                        speed={30}
                        className="text-white"
                        onComplete={() => setShowEducation(true)}
                      />
                    </div>
                  )}

                  {showEducation && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="ml-4 text-gray-300"
                    >
                      <div>
                        <div className="text-orange-400 font-semibold">Bachelor's degree in Computer Science and Statistics</div>
                        <div className="text-red-400">University of Toronto Mississauga</div>
                        <div className="text-gray-400">09/2022 - 04/2027 | Mississauga, ON</div>
                        <div className="text-sm mt-2">
                          Relevant Courses: {education[0]?.relevant_courses?.join(', ') || 'N/A'}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {showEducation && (
                    <div className="flex items-center mt-4">
                      <span className="text-orange-400">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="npm run download-resume"
                        speed={30}
                        className="text-white"
                        onComplete={() => setShowCTA(true)}
                      />
                    </div>
                  )}

                  {showCTA && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="ml-4 text-gray-300"
                    >
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={downloadResume}
                          className="bg-gradient-to-r from-orange-400 to-red-400 text-black px-6 py-2 rounded font-semibold hover:shadow-lg hover:shadow-orange-400/25 transition-all duration-300 flex items-center justify-center text-sm"
                        >
                          <Download size={16} className="mr-2" />
                          Download PDF
                        </button>
                        <button 
                          onClick={() => navigate('/contact')}
                          className="border border-orange-400 text-orange-400 px-6 py-2 rounded font-semibold hover:bg-orange-400 hover:text-black transition-all duration-300 flex items-center justify-center text-sm"
                        >
                          <Mail size={16} className="mr-2" />
                          Get In Touch
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Resume;