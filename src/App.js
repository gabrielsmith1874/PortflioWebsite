import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Terminal from './components/Terminal';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Success from './pages/Success';
import ContactSuccess from './pages/ContactSuccess';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success" element={<Success />} />
          <Route path="/contact-success" element={<ContactSuccess />} />
        </Routes>
        <Terminal />
      </div>
    </Router>
  );
}

export default App;
