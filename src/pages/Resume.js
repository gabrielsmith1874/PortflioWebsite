import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Download, 
  Eye, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  Code
} from 'lucide-react';

const Resume = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('preview'); // 'preview' or 'pdf'

  const personalInfo = {
    name: 'Gabriel Smith',
    title: 'Systems Developer & Computer Science Student',
    email: 'gabrielsmith1874@gmail.com',
    phone: '+1 (289) 681-0442',
    location: 'Mississauga, Ontario, Canada',
    linkedin: 'linkedin.com/in/gabriel-smith-b3b366253',
    github: 'github.com/gabrielsmith1874',
    website: 'gabrielsmith.site'
  };

  const skills = {
    programming: ['Python', 'Java', 'C', 'C#', 'JavaScript', 'HTML', 'CSS'],
    ai_ml: ['Machine Learning', 'Artificial Intelligence', 'Algorithms', 'Data Structures'],
    data_science: ['SQL', 'R', 'Statistics', 'Hypothesis Testing'],
    other: ['Object-Oriented Programming', 'Algorithm Design', 'Time/Correctness Analysis', 'Assembly']
  };

  const experience = [
    {
      title: 'Systems Developer & Tester',
      company: 'Ministry of Public and Business Service Delivery',
      period: 'February 2025 - Present',
      location: 'Toronto, Ontario, Canada',
      description: 'Automating regression testing processes and implementing Web API integrations for government procurement systems.',
      achievements: [
        'Automated regression testing processes for government procurement systems, contributing to more efficient software deployment cycles',
        'Implemented Web API integrations using Postman and Swagger over 12 months to enable real-time data exchange across three government platforms',
        'Supported and executed the migration from SFTP to REST services, delivering development and testing contributions to enhance TestApp functionality'
      ],
      technologies: ['Postman', 'Swagger', 'REST APIs', 'SFTP', 'Testing Automation']
    },
    {
      title: 'Customer Service Representative',
      company: 'Farm Boy Inc.',
      period: 'July 2024 - Present',
      location: 'Ontario, Canada',
      description: 'Providing exceptional customer service and maintaining efficient workflow in retail environment.',
      achievements: [
        'Provide exceptional customer service, addressing customer inquiries and resolving issues promptly and courteously',
        'Maintain a clean and organized work area, following health and safety regulations',
        'Assist with inventory management, including stocking supplies and monitoring product freshness',
        'Offered assistant manager and supervisor titles within a few weeks of employment due to work ethic and delegation skills'
      ],
      technologies: ['Customer Service', 'Inventory Management', 'Team Leadership']
    }
  ];

  const education = [
    {
      degree: 'Bachelor\'s degree in Computer Science and Statistics',
      institution: 'University of Toronto Mississauga',
      period: 'September 2022 - April 2027 (Expected)',
      location: 'Mississauga, Ontario',
      gpa: 'In Progress',
      relevantCoursework: [
        'Introduction to Machine Learning',
        'Introduction to Artificial Intelligence',
        'Introduction to Databases',
        'Software Tools and Systems Programming',
        'Data Structures and Analysis',
        'Software Design',
        'Computer Organization',
        'Programming on the Web',
        'Probability and Statistics'
      ]
    }
  ];

  const projects = [
    {
      name: 'Stroku',
      description: 'Cross-platform streaming solution connecting Android devices with Roku TVs',
      technologies: ['Android', 'Roku', 'Streaming', 'HDR 4K'],
      impact: 'Enables seamless transmission and playback of HDR 4K video URLs, bypassing traditional Miracast limitations',
      url: 'https://stroku.netlify.app/'
    },
    {
      name: 'Battleship Solitaire AI',
      description: 'AI-powered puzzle solver using constraint satisfaction algorithms',
      technologies: ['Python', 'AI/ML', 'Constraint Satisfaction', 'AC-3 Algorithm'],
      impact: 'Implemented forward checking and domain pruning using AC-3 algorithm, enhancing AI problem-solving capabilities',
      url: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/Battleship%20Solitaire'
    },
    {
      name: 'Checkers AI',
      description: 'Advanced Checkers AI with Minimax algorithm and alpha-beta pruning',
      technologies: ['Python', 'AI/ML', 'Minimax', 'Alpha-Beta Pruning', 'PyGame'],
      impact: 'Engineered an advanced Checkers AI with user-friendly interface using PyGame library',
      url: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/Checkers%20AI'
    },
    {
      name: 'Text Adventure Game',
      description: 'Text-based adventure game with natural language processing',
      technologies: ['Python', 'NLP', 'Google Cloud APIs', 'MaryTTS'],
      impact: 'Integrated voice recognition and multilingual support, broadening accessibility to visually impaired players',
      url: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/Adventure%20Game'
    },
    {
      name: 'Huffman Compression',
      description: 'Efficient compression and decompression algorithms',
      technologies: ['Python', 'Data Structures', 'Algorithms', 'Compression'],
      impact: 'Achieved over 80% compression rate with 100% accuracy in decompression, ensuring no data loss',
      url: 'https://github.com/gabrielsmith1874/My-Projects/tree/main/huffman'
    }
  ];

  const certifications = [
    // No certifications listed in resume
  ];

  const renderPreview = () => (
    <div className="bg-white text-black max-w-4xl mx-auto p-8 rounded-lg shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{personalInfo.name}</h1>
        <p className="text-xl text-gray-600 mb-4">{personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Mail size={16} className="mr-2" />
            {personalInfo.email}
          </div>
          <div className="flex items-center">
            <Phone size={16} className="mr-2" />
            {personalInfo.phone}
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="mr-2" />
            {personalInfo.location}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Code size={24} className="mr-2 text-blue-600" />
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Programming Languages</h3>
            <div className="flex flex-wrap gap-2">
              {skills.programming.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">AI/ML & Data Science</h3>
            <div className="flex flex-wrap gap-2">
              {skills.ai_ml.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Data Science</h3>
            <div className="flex flex-wrap gap-2">
              {skills.data_science.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Other Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.other.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Briefcase size={24} className="mr-2 text-blue-600" />
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((job, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-lg text-gray-600">{job.company}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{job.period}</p>
                  <p>{job.location}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{job.description}</p>
              <ul className="list-disc list-inside text-gray-600 mb-3">
                {job.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <GraduationCap size={24} className="mr-2 text-blue-600" />
          Education
        </h2>
        {education.map((edu, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-lg text-gray-600">{edu.institution}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{edu.period}</p>
                <p>GPA: {edu.gpa}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-2">{edu.location}</p>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Relevant Coursework:</h4>
              <div className="flex flex-wrap gap-2">
                {edu.relevantCoursework.map((course) => (
                  <span key={course} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Code size={24} className="mr-2 text-blue-600" />
          Key Projects
        </h2>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
              <p className="text-gray-600 mb-2">{project.description}</p>
              <p className="text-gray-500 text-sm mb-2">{project.impact}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Award size={24} className="mr-2 text-blue-600" />
          Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Award size={20} className="text-yellow-600 mr-3" />
              <span className="text-gray-700">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPDF = () => (
    <div className="bg-gray-100 p-8 rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <FileText size={64} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">PDF Resume</h3>
        <p className="text-gray-500 mb-6">
          Click the download button to get the full PDF version of my resume.
        </p>
        <button className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center mx-auto">
          <Download size={20} className="mr-2" />
          Download PDF
        </button>
      </div>
    </div>
  );

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
          <div className="animate-bounce">$ cat resume.pdf</div>
          <div className="animate-bounce delay-100">$ ls -la skills/</div>
          <div className="animate-bounce delay-200">$ grep experience</div>
        </div>
        <div className="absolute bottom-20 right-20 text-terminal-green/8 font-mono text-xs animate-pulse delay-1000">
          <div className="animate-bounce">const skills = {'{'}</div>
          <div className="animate-bounce delay-100">  languages: [...];</div>
          <div className="animate-bounce delay-200">{'}'}</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            My <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Download my resume or view it online. I'm always excited to discuss new opportunities 
            and collaborate on innovative projects.
          </p>
        </motion.div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-dark-surface border border-gray-700 rounded-lg p-1 flex">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 flex items-center ${
                viewMode === 'preview'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Eye size={20} className="mr-2" />
              Preview
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 flex items-center ${
                viewMode === 'pdf'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <FileText size={20} className="mr-2" />
              PDF Download
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {viewMode === 'preview' ? renderPreview() : renderPDF()}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300 flex items-center justify-center">
              <Download size={20} className="mr-2" />
              Download Resume
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <Mail size={20} className="mr-2" />
              Contact Me
            </button>
            <button 
              onClick={() => window.open(`https://${personalInfo.linkedin}`, '_blank')}
              className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <ExternalLink size={20} className="mr-2" />
              LinkedIn Profile
            </button>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-dark-surface border border-gray-700 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Mail size={32} className="text-accent-blue mb-3" />
              <h3 className="font-semibold text-white mb-1">Email</h3>
              <p className="text-gray-400">{personalInfo.email}</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone size={32} className="text-accent-blue mb-3" />
              <h3 className="font-semibold text-white mb-1">Phone</h3>
              <p className="text-gray-400">{personalInfo.phone}</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin size={32} className="text-accent-blue mb-3" />
              <h3 className="font-semibold text-white mb-1">Location</h3>
              <p className="text-gray-400">{personalInfo.location}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;
