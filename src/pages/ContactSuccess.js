import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContactSuccess = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        
        {/* Floating code snippets */}
        <div className="absolute top-40 left-16 text-cyan-400/12 font-mono text-sm animate-pulse">
          <div className="animate-bounce" style={{ animationDuration: '2.3s' }}>$ message sent ✓</div>
        </div>
        <div className="absolute top-1/2 right-16 text-teal-400/12 font-mono text-sm animate-pulse delay-500">
          <div className="animate-bounce" style={{ animationDuration: '3.2s' }}>{'{success: true}'}</div>
        </div>
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-cyan-400/12 font-mono text-sm animate-pulse delay-1100">
          <div className="animate-bounce" style={{ animationDuration: '2.7s' }}>&larr; Thank You &rarr;</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl sm:text-5xl font-bold mb-6 font-mono"
            >
              <span className="text-white">Message</span>
              <span className="text-cyan-400"> Sent!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-gray-400 font-mono mb-8"
            >
              Thank you for reaching out. I'll get back to you soon.
            </motion.p>

            {/* Return Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-cyan-400 to-teal-400 text-black px-8 py-3 rounded font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 font-mono"
              >
                Return to Portfolio
              </Link>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-12 p-6 border border-cyan-400/30 rounded-lg bg-black/50"
            >
              <h3 className="text-lg font-bold mb-4 font-mono">
                <span className="text-white">What's</span>
                <span className="text-cyan-400"> Next?</span>
              </h3>
              <div className="text-sm text-gray-400 font-mono space-y-2">
                <div>• I'll review your message within 24 hours</div>
                <div>• Expect a response via email</div>
                <div>• Feel free to connect on LinkedIn or GitHub</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSuccess;
