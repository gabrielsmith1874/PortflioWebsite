import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypingAnimation from '../components/TypingAnimation';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Send
} from 'lucide-react';

const Contact = () => {
  const [showCommands, setShowCommands] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowCommands(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showCommands) {
      const timer = setTimeout(() => setShowContactInfo(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [showCommands]);

  useEffect(() => {
    if (showContactInfo) {
      const timer = setTimeout(() => setShowForm(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [showContactInfo]);


  const contactInfo = {
    email: 'gabrielsmith1874@gmail.com',
    phone: '2896810442',
    location: 'Mississauga, Ontario, Canada',
    linkedin: 'linkedin.com/in/gabriel-smith-b3b366253',
    github: 'github.com/gabrielsmith1874',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Hidden form for Netlify form detection */}
      <form name="contact" netlify netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="subject" />
        <textarea name="message"></textarea>
      </form>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Terminal-style grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 h-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div 
                key={i} 
                className="border-r border-b border-cyan-400/20 animate-pulse"
                style={{ animationDelay: `${i * 0.01}s` }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-56 h-56 bg-gradient-to-r from-teal-400/8 to-cyan-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-cyan-400/6 to-teal-400/6 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Additional Unique Lights */}
        <div className="absolute top-1/20 left-1/20 w-36 h-36 bg-gradient-to-r from-teal-400/9 to-cyan-400/9 rounded-full blur-2xl animate-pulse delay-200"></div>
        <div className="absolute bottom-1/20 right-1/20 w-44 h-44 bg-gradient-to-r from-cyan-400/7 to-teal-400/7 rounded-full blur-3xl animate-pulse delay-900"></div>
        <div className="absolute top-12/13 right-1/21 w-28 h-28 bg-gradient-to-r from-teal-400/11 to-cyan-400/11 rounded-full blur-2xl animate-pulse delay-400"></div>
        <div className="absolute bottom-1/21 left-1/21 w-52 h-52 bg-gradient-to-r from-cyan-400/8 to-teal-400/8 rounded-full blur-3xl animate-pulse delay-1100"></div>
        <div className="absolute top-1/21 right-1/11 w-20 h-20 bg-gradient-to-r from-teal-400/13 to-cyan-400/13 rounded-full blur-2xl animate-pulse delay-600"></div>
        
        {/* Floating code snippets */}
        <div className="absolute top-40 left-16 text-cyan-400/12 font-mono text-sm animate-pulse">
          <div className="animate-bounce" style={{ animationDuration: '2.3s' }}>$ mail gabriel</div>
        </div>
        <div className="absolute top-1/2 right-16 text-teal-400/12 font-mono text-sm animate-pulse delay-500">
          <div className="animate-bounce" style={{ animationDuration: '3.2s' }}>{'{contact: true}'}</div>
        </div>
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-cyan-400/12 font-mono text-sm animate-pulse delay-1100">
          <div className="animate-bounce" style={{ animationDuration: '2.7s' }}>&larr; Let's Connect &rarr;</div>
        </div>
        <div className="absolute top-1/3 left-1/6 text-teal-400/10 font-mono text-sm animate-pulse delay-200">
          <div className="animate-bounce" style={{ animationDuration: '2.9s' }}>const message = {'{'}</div>
        </div>
        <div className="absolute bottom-1/3 right-1/5 text-cyan-400/10 font-mono text-sm animate-pulse delay-800">
          <div className="animate-bounce" style={{ animationDuration: '3.1s' }}>  send: true;</div>
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
              <span className="text-white">contact</span>
              <span className="text-cyan-400">.sh</span>
            </h1>
            <p className="text-xl text-gray-400 font-mono">
              $ ./contact.sh --help
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
              <div className="bg-black/80 border border-cyan-400/30 rounded-lg p-6 font-mono text-sm">
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-cyan-400">gabriel@portfolio:~$ </span>
                    <TypingAnimation 
                      text="cat contact.md"
                      speed={30}
                      className="text-white"
                      onComplete={() => setShowContactInfo(true)}
                    />
                  </div>
                  
                  {showContactInfo && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="ml-4 text-gray-300"
                    >
                      <div className="mb-4">
                        <div className="text-cyan-400 font-semibold">Contact Information</div>
                        <div className="text-sm mt-2">
                          <div>Email: gabrielsmith1874@gmail.com</div>
                          <div>Phone: 2896810442</div>
                          <div>Location: Mississauga, Ontario, Canada</div>
                          <div>LinkedIn: linkedin.com/in/gabriel-smith-b3b366253</div>
                          <div>GitHub: github.com/gabrielsmith1874</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {showContactInfo && (
                    <div className="flex items-center mt-4">
                      <span className="text-cyan-400">gabriel@portfolio:~$ </span>
                      <TypingAnimation 
                        text="npm run load-contact-app"
                        speed={30}
                        className="text-white"
                        onComplete={() => setShowForm(true)}
                      />
                    </div>
                  )}

                  {showForm && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="ml-4 text-gray-300"
                    >
                      <form name="contact" netlify netlify-honeypot="bot-field" action="/success.html" method="POST" className="space-y-4">
                        <div style={{ display: 'none' }}>
                          <label>
                            Don't fill this out if you're human: <input name="bot-field" />
                          </label>
                        </div>
                        <div>
                          <label className="block text-cyan-400 text-sm mb-1">Name:</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-black/50 border border-cyan-400/30 rounded px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-cyan-400 text-sm mb-1">Email:</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-black/50 border border-cyan-400/30 rounded px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-cyan-400 text-sm mb-1">Subject:</label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full bg-black/50 border border-cyan-400/30 rounded px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                            placeholder="Message subject"
                          />
                        </div>
                        <div>
                          <label className="block text-cyan-400 text-sm mb-1">Message:</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            className="w-full bg-black/50 border border-cyan-400/30 rounded px-3 py-2 text-white focus:border-cyan-400 focus:outline-none resize-none"
                            placeholder="Your message here..."
                          />
                        </div>
                        <div className="flex justify-center">
                          <button
                            type="submit"
                            className="bg-gradient-to-r from-cyan-400 to-teal-400 text-black px-6 py-2 rounded font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 flex items-center text-sm"
                          >
                            <Send size={16} className="mr-2" />
                            Send Message
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {showForm && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 2 }}
                      className="ml-4 mt-6"
                    >
                      <div className="border border-cyan-400/30 rounded p-4 bg-black/50">
                        <h3 className="text-lg font-bold mb-4 font-mono">
                          <span className="text-white">Alternative</span>
                          <span className="text-cyan-400"> Contact</span>
                        </h3>
                        <p className="text-gray-400 mb-4 font-mono text-sm">
                          Prefer other ways to reach out? Here are additional options.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <a 
                            href={`mailto:${contactInfo.email}`}
                            className="flex items-center justify-center p-3 border border-cyan-400/30 rounded hover:bg-cyan-400/10 transition-all duration-300"
                          >
                            <Mail size={16} className="mr-2 text-cyan-400" />
                            <span className="text-white text-sm">Direct Email</span>
                          </a>
                          <a 
                            href={`tel:${contactInfo.phone}`}
                            className="flex items-center justify-center p-3 border border-cyan-400/30 rounded hover:bg-cyan-400/10 transition-all duration-300"
                          >
                            <Phone size={16} className="mr-2 text-cyan-400" />
                            <span className="text-white text-sm">Phone Call</span>
                          </a>
                          <a 
                            href={`https://${contactInfo.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center p-3 border border-cyan-400/30 rounded hover:bg-cyan-400/10 transition-all duration-300"
                          >
                            <Linkedin size={16} className="mr-2 text-cyan-400" />
                            <span className="text-white text-sm">LinkedIn</span>
                          </a>
                          <a 
                            href={`https://${contactInfo.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center p-3 border border-cyan-400/30 rounded hover:bg-cyan-400/10 transition-all duration-300"
                          >
                            <Github size={16} className="mr-2 text-cyan-400" />
                            <span className="text-white text-sm">GitHub</span>
                          </a>
                        </div>
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

export default Contact;