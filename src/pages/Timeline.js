import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TypingAnimation from '../components/TypingAnimation';
import { 
  Briefcase, 
  Terminal,
  Database,
  Cpu
} from 'lucide-react';

const Timeline = () => {
  const navigate = useNavigate();
  const [showCommands, setShowCommands] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showCTACommands, setShowCTACommands] = useState(false);
  const [showCTAContent, setShowCTAContent] = useState(false);
  const [showCTAButtons, setShowCTAButtons] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowCommands(true), 500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (showTimeline) {
      const timer = setTimeout(() => setShowCTACommands(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [showTimeline]);

  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timelineData = [
    {
      id: 0,
      title: 'Systems Developer & Tester',
      company: 'Ministry of Public and Business Service Delivery and Procurement',
      period: 'February 2025 - Present',
      location: 'Toronto, Ontario, Canada',
      description: 'Working as a Systems Developer and Tester, developing and maintaining critical government systems with focus on quality assurance and system reliability.',
      achievements: [
        'Automated regression testing processes for government procurement systems, contributing to more efficient software deployment cycles',
        'Implemented Web API integrations using Postman and Swagger over 12 months to enable real-time data exchange across three government platforms',
        'Supported and executed the migration from SFTP to REST services, delivering development and testing contributions to enhance TestApp functionality'
      ],
      skills: ['Web API', 'Postman', 'Swagger', 'REST Services', 'SFTP Migration', 'Regression Testing'],
      icon: Database,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 1,
      title: 'Customer Service Representative',
      company: 'Farm Boy Inc.',
      period: 'July 2024 - January 2025',
      location: 'Ontario, Canada',
      description: 'Provided exceptional customer service, addressing customer inquiries and resolving issues promptly and courteously.',
      achievements: [
        'Provided exceptional customer service, addressing customer inquiries and resolving issues promptly and courteously',
        'Maintained clean and organized work areas, following health and safety regulations',
        'Assisted with inventory management, including stocking supplies and monitoring product freshness',
        'Collaborated with team members to ensure efficient workflow and positive shopping experience',
        'Offered assistant manager and supervisor titles within a few weeks of employment due to work ethic and delegation skills'
      ],
      skills: ['Customer Service', 'Inventory Management', 'Team Collaboration', 'Leadership', 'Workflow Optimization'],
      icon: Briefcase,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: 'HMR Clerk',
      company: 'Loblaws',
      period: 'September 2023 - Present',
      location: 'Mississauga, Ontario, Canada',
      description: 'As an HMR Clerk at Loblaws Supermarket, excelling in customer engagement and guiding patrons to select quality meal options.',
      achievements: [
        'Provide exceptional customer engagement, guiding patrons to select quality meal options',
        'Conduct meticulous food preparation, ensuring adherence to safety standards',
        'Effectively manage inventory, optimizing stock levels and minimizing waste',
        'Maintain clean and organized work areas following health and safety regulations'
      ],
      skills: ['Customer Service', 'Food Preparation', 'Inventory Management', 'Safety Standards', 'Quality Control'],
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      title: 'Assembler',
      company: 'Dana Incorporated',
      period: 'August 2021 - September 2021',
      location: 'Oakville, Ontario, Canada',
      description: 'Assembled mechanical and electronic components for automotive products, meeting daily production targets efficiently and achieving minimal production errors.',
      achievements: [
        'Assembled mechanical and electronic components for automotive products, meeting daily production targets efficiently',
        'Achieved minimal production errors and maintained high quality standards',
        'Conducted quality checks regularly, achieving high accuracy rate with zero-defects',
        'Maintained high quality standards for products through systematic quality control processes'
      ],
      skills: ['Assembly', 'Quality Control', 'Mechanical Components', 'Electronic Components', 'Production Targets'],
      icon: Terminal,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 4,
      title: 'Order Picker',
      company: 'Wallace & Carey',
      period: 'July 2021 - August 2021',
      location: 'Oakville, Ontario',
      description: 'Executed daily order fulfillment duties utilizing a warehouse management system, picked and packed products and maintained high accuracy on order shipments.',
      achievements: [
        'Executed daily order fulfillment duties utilizing a warehouse management system',
        'Picked and packed products and maintained high accuracy on order shipments',
        'Assisted in the packaging of over hundreds of products per week',
        'Operated machinery such as pallet jacks, safely transporting materials around the warehouse',
        'Collaborated with team members to meet tight deadlines, consistently completing projects ahead of schedule'
      ],
      skills: ['Warehouse Management', 'Order Fulfillment', 'Machinery Operation', 'Team Collaboration', 'Deadline Management'],
      icon: Cpu,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section with Different Background Pattern */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 min-h-[700px] overflow-hidden">
        {/* Hexagonal Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>
        <div className="absolute inset-0">
          {/* Hexagonal Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-16 h-full">
              {Array.from({ length: 256 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border-r border-b border-cyan-400/20"
                  style={{ 
                    animationDelay: `${i * 0.015}s`,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Floating Code Elements */}
          <div className="absolute top-16 left-16 text-blue-400/20 font-mono text-sm animate-pulse">
            <div className="animate-bounce" style={{ animationDuration: '3s' }}>./configure --prefix=/usr</div>
            <div className="animate-bounce delay-300" style={{ animationDuration: '2.5s' }}>make && make install</div>
            <div className="animate-bounce delay-600" style={{ animationDuration: '4s' }}>sudo systemctl start</div>
          </div>
          <div className="absolute top-1/3 right-16 text-blue-400/15 font-mono text-sm animate-pulse delay-1000">
            <div className="animate-bounce" style={{ animationDuration: '3.5s' }}>const experience = [</div>
            <div className="animate-bounce delay-400" style={{ animationDuration: '2.8s' }}>  'professional',</div>
            <div className="animate-bounce delay-800" style={{ animationDuration: '3.2s' }}>  'growth'</div>
            <div className="animate-bounce delay-1200" style={{ animationDuration: '2.7s' }}>];</div>
          </div>
          <div className="absolute bottom-16 left-1/3 text-blue-400/15 font-mono text-sm animate-pulse delay-500">
            <div className="animate-bounce" style={{ animationDuration: '2.9s' }}>export TIMELINE=true</div>
          </div>

          {/* Animated Lights */}
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-56 h-56 bg-gradient-to-r from-cyan-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-blue-400/6 to-cyan-400/6 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/6 w-24 h-24 bg-gradient-to-r from-cyan-400/12 to-blue-400/12 rounded-full blur-2xl animate-pulse delay-300"></div>
          <div className="absolute bottom-1/3 right-1/6 w-48 h-48 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-pulse delay-700"></div>
          
          {/* Additional Unique Lights */}
          <div className="absolute top-1/12 left-1/12 w-36 h-36 bg-gradient-to-r from-cyan-400/9 to-blue-400/9 rounded-full blur-2xl animate-pulse delay-200"></div>
          <div className="absolute bottom-1/12 right-1/12 w-44 h-44 bg-gradient-to-r from-blue-400/7 to-cyan-400/7 rounded-full blur-3xl animate-pulse delay-900"></div>
          <div className="absolute top-7/8 right-1/15 w-28 h-28 bg-gradient-to-r from-cyan-400/11 to-blue-400/11 rounded-full blur-2xl animate-pulse delay-400"></div>
          <div className="absolute bottom-1/15 left-1/15 w-52 h-52 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-pulse delay-1100"></div>
          <div className="absolute top-1/15 right-1/8 w-20 h-20 bg-gradient-to-r from-cyan-400/13 to-blue-400/13 rounded-full blur-2xl animate-pulse delay-600"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {showCommands && (
              <>
                <div className="mb-4 bg-gray-800/80 border border-green-400/30 rounded-lg p-3 sm:p-4 backdrop-blur-sm inline-block max-w-full">
                  <span className="text-blue-400 text-sm sm:text-lg font-mono">gabriel@portfolio:~$ </span>
                  <TypingAnimation 
                    text="cat experience.log" 
                    speed={30}
                    className="text-blue-400 text-sm sm:text-lg font-mono"
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
                      className="text-gray-300 text-sm sm:text-base md:text-lg font-mono mb-4 bg-gray-800/60 border border-blue-400/20 rounded-lg p-3 sm:p-4 backdrop-blur-sm inline-block max-w-full"
                    >
                      Professional journey spanning government systems development, retail excellence, 
                      and manufacturing precision. Here's the complete timeline of my career progression.
                    </motion.div>
                    <div className="mb-4 bg-gray-800/80 border border-green-400/30 rounded-lg p-3 sm:p-4 backdrop-blur-sm inline-block max-w-full">
                      <span className="text-blue-400 text-sm sm:text-lg font-mono">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="./build-timeline.sh"
                        speed={30}
                        className="text-blue-400 text-sm sm:text-lg font-mono"
                        onComplete={() => {
                          setTimeout(() => {
                            setShowTimeline(true);
                          }, 500);
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {/* Timeline Content Integrated into Hero Section */}
            {showTimeline && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mt-6 bg-gray-800/60 border border-blue-400/20 rounded-lg p-3 sm:p-4 backdrop-blur-sm"
              >
                {/* Enhanced Timeline Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-400/40 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-blue-400 font-mono text-base sm:text-lg font-semibold">Career Timeline</span>
                      </div>
                      <div className="text-green-400 font-mono text-xs sm:text-sm">
                        {new Date().toISOString().split('T')[0]}
                      </div>
                    </div>
                    <div className="text-cyan-300 font-mono text-xs sm:text-sm">
                      ~/portfolio/career.log | Gabriel Smith's Professional Journey
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Timeline Entries */}
                <div className="space-y-4 sm:space-y-6">
                  {timelineData.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 + (index * 0.2) }}
                      className="group relative"
                    >
                      {/* Timeline Connector */}
                      {index < timelineData.length - 1 && (
                        <div className="absolute left-4 sm:left-6 top-12 sm:top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-transparent opacity-30"></div>
                      )}
                      
                      {/* Entry Card */}
                      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 border border-blue-400/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-400/10">
                        {/* Entry Number Badge */}
                        <div className="absolute -left-1 sm:-left-2 top-4 sm:top-6 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg border-2 sm:border-4 border-gray-900">
                          <span className="text-white font-mono font-bold text-sm sm:text-lg">{index + 1}</span>
                        </div>

                        {/* Header Section */}
                        <div className="ml-6 sm:ml-8 mb-4 sm:mb-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                            <div className="flex-1">
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-mono mb-2 group-hover:text-blue-300 transition-colors">
                                {item.title}
                              </h3>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-cyan-400 font-mono gap-2">
                                <span className="bg-blue-900/30 px-2 sm:px-3 py-1 rounded-lg border border-blue-400/30 text-xs sm:text-sm">
                                  {item.company}
                                </span>
                                <span className="text-green-400 font-semibold text-xs sm:text-sm">
                                  {item.period}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-center text-gray-300 mb-3 sm:mb-4">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 sm:mr-3"></div>
                            <span className="font-mono text-xs sm:text-sm">{item.location}</span>
                          </div>

                          {/* Description */}
                          <div className="bg-gray-800/40 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-700">
                            <div className="flex items-center mb-2">
                              <span className="text-yellow-400 font-mono text-xs sm:text-sm font-semibold mr-2">→</span>
                              <span className="text-yellow-400 font-mono text-xs sm:text-sm">Role Overview</span>
                            </div>
                            <p className="text-gray-300 font-mono text-xs sm:text-sm leading-relaxed ml-3 sm:ml-4">
                              {item.description}
                            </p>
                          </div>

                          {/* Achievements */}
                          <div className="mb-4 sm:mb-6">
                            <div className="flex items-center mb-3">
                              <span className="text-yellow-400 font-mono text-xs sm:text-sm font-semibold mr-2">⚡</span>
                              <span className="text-yellow-400 font-mono text-xs sm:text-sm">Key Achievements</span>
                            </div>
                            <div className="grid gap-2 sm:gap-3">
                              {item.achievements.map((achievement, achievementIndex) => (
                                <div key={achievementIndex} className="flex items-start bg-gray-800/30 rounded-lg p-2 sm:p-3 border border-gray-700 hover:border-blue-400/30 transition-colors">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                                  <span className="text-gray-300 font-mono text-xs sm:text-sm leading-relaxed">
                                    {achievement}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Skills */}
                          <div>
                            <div className="flex items-center mb-3">
                              <span className="text-yellow-400 font-mono text-xs sm:text-sm font-semibold mr-2">🛠️</span>
                              <span className="text-yellow-400 font-mono text-xs sm:text-sm">Technologies & Skills</span>
                            </div>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {item.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 text-cyan-300 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-blue-400/30 text-xs sm:text-sm font-mono hover:bg-gradient-to-r hover:from-blue-900/60 hover:to-cyan-900/60 transition-all duration-200"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="mt-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-400/30 rounded-xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-mono text-sm">Timeline Status</span>
                    </div>
                    <div className="text-cyan-300 font-mono text-sm">
                      {timelineData.length} entries loaded | Last updated: {new Date().toISOString().split('T')[0]}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>


      {/* CTA Section with Different Pattern */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 min-h-[500px] overflow-hidden">
        {/* Circuit Board Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>
        <div className="absolute inset-0">
          {/* Circuit Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-16 h-full">
              {Array.from({ length: 256 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border-r border-b border-emerald-400/20"
                  style={{ animationDelay: `${i * 0.01}s` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Animated Lights */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-2xl animate-pulse delay-500"></div>
          
          {/* Additional Unique Lights */}
          <div className="absolute top-1/11 left-1/11 w-40 h-40 bg-gradient-to-r from-cyan-400/6 to-blue-400/6 rounded-full blur-2xl animate-pulse delay-300"></div>
          <div className="absolute bottom-1/11 right-1/11 w-48 h-48 bg-gradient-to-r from-blue-400/7 to-cyan-400/7 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-8/9 right-1/16 w-24 h-24 bg-gradient-to-r from-cyan-400/9 to-blue-400/9 rounded-full blur-2xl animate-pulse delay-800"></div>
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
                  <span className="text-blue-400 text-lg font-mono">gabriel@portfolio:~$ </span>
                  <TypingAnimation 
                    text="cat cta.md" 
                    speed={30}
                    className="text-blue-400 text-lg font-mono"
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
                      className="text-gray-300 text-lg font-mono mb-4 bg-gray-800/60 border border-blue-400/20 rounded-lg p-4 backdrop-blur-sm inline-block"
                    >
                      Ready to Build Something Amazing?<br/>
                      Let's connect and discuss how we can work together to create innovative solutions.
                    </motion.div>
                    <div className="mb-4 bg-gray-800/80 border border-green-400/30 rounded-lg p-4 backdrop-blur-sm inline-block">
                      <span className="text-blue-400 text-lg font-mono">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="npm run generate-buttons"
                        speed={30}
                        className="text-blue-400 text-lg font-mono"
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
                className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-4 backdrop-blur-sm max-w-md mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button 
                    onClick={() => navigate('/projects')}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-mono text-sm sm:text-base touch-manipulation w-full sm:w-auto"
                  >
                    View Projects
                  </button>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 font-mono text-sm sm:text-base touch-manipulation w-full sm:w-auto"
                  >
                    Get In Touch
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Timeline;