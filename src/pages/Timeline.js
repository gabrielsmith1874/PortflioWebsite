import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TypingAnimation from '../components/TypingAnimation';
import { 
  GraduationCap, 
  Briefcase, 
  Code, 
  Award, 
  Calendar,
  MapPin,
  ChevronRight
} from 'lucide-react';

const Timeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [showCommands, setShowCommands] = useState(false);
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true });

  React.useEffect(() => {
    if (isInView) {
      setTimeout(() => setShowCommands(true), 500);
    }
  }, [isInView]);

  const timelineData = [
    {
      id: 0,
      type: 'education',
      title: 'University of Toronto',
      subtitle: 'Computer Science Student',
      period: '2021 - Present',
      location: 'Toronto, ON',
      description: 'Pursuing a Bachelor of Science in Computer Science with focus on Artificial Intelligence and Software Engineering.',
      achievements: [
        'Maintaining strong academic performance',
        'Active in computer science clubs and organizations',
        'Completed coursework in Data Structures, Algorithms, and AI',
        'Participating in hackathons and coding competitions'
      ],
      skills: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms'],
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 1,
      type: 'project',
      title: 'Stroku',
      subtitle: 'Innovative Web Application',
      period: '2023 - Present',
      location: 'Personal Project',
      description: 'Developed a cutting-edge web application showcasing modern development practices and user experience design.',
      achievements: [
        'Built with React and modern JavaScript frameworks',
        'Implemented responsive design principles',
        'Optimized for performance and accessibility',
        'Deployed using modern CI/CD practices'
      ],
      skills: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Git'],
      icon: Code,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 2,
      type: 'project',
      title: 'Battleship Solitaire AI',
      subtitle: 'AI-Powered Puzzle Solver',
      period: '2023',
      location: 'Personal Project',
      description: 'Created an intelligent AI system that solves Battleship Solitaire puzzles using advanced algorithms and machine learning techniques.',
      achievements: [
        'Implemented constraint satisfaction algorithms',
        'Developed heuristic search strategies',
        'Achieved high success rate in puzzle solving',
        'Optimized for computational efficiency'
      ],
      skills: ['Python', 'AI/ML', 'Algorithms', 'Data Science', 'Optimization'],
      icon: Award,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      type: 'experience',
      title: 'Software Development Projects',
      subtitle: 'Full-Stack Development',
      period: '2022 - Present',
      location: 'Various Projects',
      description: 'Developed multiple full-stack applications demonstrating proficiency in modern web technologies and best practices.',
      achievements: [
        'Built responsive web applications',
        'Implemented RESTful APIs',
        'Integrated database systems',
        'Applied software engineering principles'
      ],
      skills: ['Full-Stack', 'React', 'Node.js', 'Databases', 'APIs'],
      icon: Briefcase,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="bg-dark-surface/50 border border-terminal-green/30 rounded-lg p-6 backdrop-blur-sm mb-8">
              {showCommands && (
                <>
                  <div className="mb-4">
                    <span className="prompt-text text-lg font-mono">gabriel@portfolio:~$ </span>
                    <span className="command-text text-lg font-mono">cat timeline.md</span>
                  </div>
                  <div className="text-terminal-text text-lg font-mono">
                    From university studies to innovative projects, here's a timeline of my 
                    experience and growth as a software engineer.
                  </div>
                </>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-mono">
              My <span className="gradient-text">Journey</span>
            </h1>
          </motion.div>

        {/* Timeline Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {timelineData.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeItem === index
                    ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white'
                    : 'bg-dark-surface text-gray-300 hover:bg-dark-card'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline Visualization */}
          <motion.div
            ref={timelineRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-purple to-accent-blue"></div>

            {/* Timeline Items */}
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`relative flex items-start mb-8 ${
                  index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}>
                  <item.icon size={24} className="text-white" />
                </div>

                {/* Timeline Content Card */}
                <div className={`ml-6 lg:ml-0 ${index % 2 === 0 ? 'lg:mr-6' : 'lg:ml-6'}`}>
                  <div className="bg-dark-surface border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <span className="text-sm text-gray-400">{item.period}</span>
                    </div>
                    <p className="text-accent-blue font-medium mb-2">{item.subtitle}</p>
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <MapPin size={16} className="mr-1" />
                      {item.location}
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-dark-card text-gray-300 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                      {item.skills.length > 3 && (
                        <span className="px-3 py-1 bg-dark-card text-gray-400 rounded-full text-xs">
                          +{item.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed View */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <motion.div
              key={activeItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-dark-surface border border-gray-700 rounded-xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${timelineData[activeItem].color} flex items-center justify-center mr-4`}>
                  {React.createElement(timelineData[activeItem].icon, { size: 24, className: "text-white" })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{timelineData[activeItem].title}</h2>
                  <p className="text-accent-blue">{timelineData[activeItem].subtitle}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-400">
                  <Calendar size={16} className="mr-2" />
                  <span>{timelineData[activeItem].period}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin size={16} className="mr-2" />
                  <span>{timelineData[activeItem].location}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{timelineData[activeItem].description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Key Achievements</h3>
                <ul className="space-y-2">
                  {timelineData[activeItem].achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight size={16} className="text-accent-blue mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {timelineData[activeItem].skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-accent-blue rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your <span className="gradient-text">Journey</span>?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can work together to build something amazing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300">
              View My Projects
            </button>
            <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300">
              Get In Touch
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;
