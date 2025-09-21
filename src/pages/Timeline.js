import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TypingAnimation from '../components/TypingAnimation';
import { 
  Briefcase, 
  MapPin,
  ChevronRight,
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
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border-r border-b border-cyan-400/20"
                  style={{ 
                    animationDelay: `${i * 0.02}s`,
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
                <div className="mb-4 bg-gray-800/80 border border-green-400/30 rounded-lg p-4 backdrop-blur-sm inline-block">
                  <span className="text-blue-400 text-lg font-mono">gabriel@portfolio:~$ </span>
                  <TypingAnimation 
                    text="cat experience.log" 
                    speed={30}
                    className="text-blue-400 text-lg font-mono"
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
                      className="text-gray-300 text-lg font-mono mb-4 bg-gray-800/60 border border-blue-400/20 rounded-lg p-4 backdrop-blur-sm inline-block"
                    >
                      Professional journey spanning government systems development, retail excellence, 
                      and manufacturing precision. Here's the complete timeline of my career progression.
                    </motion.div>
                    <div className="mb-4 bg-gray-800/80 border border-green-400/30 rounded-lg p-4 backdrop-blur-sm inline-block">
                      <span className="text-blue-400 text-lg font-mono">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="./build-timeline.sh"
                        speed={30}
                        className="text-blue-400 text-lg font-mono"
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
                className="mt-6 bg-gray-800/60 border border-blue-400/20 rounded-xl p-8 backdrop-blur-sm"
              >
                {/* Timeline Heading */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center mb-12"
                >
                  <h1 className="text-5xl sm:text-6xl font-bold mb-4 font-mono">
                    <span className="text-white">Career</span>{' '}
                    <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                      Timeline
                    </span>
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-500 mx-auto rounded"></div>
                </motion.div>

                {/* Vertical Timeline */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"></div>

                  {/* Timeline Items */}
                  <div className="space-y-12">
                    {timelineData.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 + (index * 0.2) }}
                        className="relative flex items-start"
                      >
                        {/* Timeline Dot */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg border-4 border-gray-800`}>
                            <item.icon size={24} className="text-white" />
                          </div>
                        </div>

                        {/* Content Card */}
                        <div className="ml-8 flex-1">
                          <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-2xl font-bold text-white font-mono mb-1">{item.title}</h3>
                                <p className="text-cyan-400 font-mono text-lg mb-2">{item.company}</p>
                              </div>
                              <span className="text-gray-400 font-mono text-sm bg-gray-800 px-3 py-1 rounded">
                                {item.period}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-gray-400 mb-4">
                              <MapPin size={16} className="mr-2" />
                              <span className="font-mono text-sm">{item.location}</span>
                            </div>

                            <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">{item.description}</p>

                            {/* Achievements */}
                            <div className="mb-4">
                              <h4 className="text-cyan-400 font-mono text-sm font-semibold mb-3">Key Achievements:</h4>
                              <ul className="space-y-2">
                                {item.achievements.map((achievement, idx) => (
                                  <li key={idx} className="flex items-start text-gray-300 font-mono text-sm">
                                    <ChevronRight size={14} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-gray-800 text-cyan-400 font-mono text-xs rounded border border-gray-700">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
                className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 backdrop-blur-sm"
              >
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={() => navigate('/projects')}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-mono"
                  >
                    View Projects
                  </button>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 font-mono"
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