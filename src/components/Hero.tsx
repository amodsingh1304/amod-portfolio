'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [content, setContent] = useState({
    name: 'Amod Kumar Singh',
    title: 'Software Developer | Java Backend & AI/Cloud Integration',
    description: 'I build backend services and intelligent verification solutions using Java, Spring Boot, REST APIs, PostgreSQL, AWS, and Azure. Currently working on KYC and AI-powered verification platforms, with hands-on experience in backend development, cloud integration, face and voice verification, OCR, sentiment analysis, property inspection, and secure verification workflows.'
  });
  const [socialLinks, setSocialLinks] = useState({
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername'
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data.hero);
        setSocialLinks({
          github: data.contact.github,
          linkedin: data.contact.linkedin
        });
      })
      .catch(console.error);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 animate-gradient"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Greeting */}
          <div className={`mb-4 ${mounted ? 'animate-fade-in-down' : 'opacity-0'}`}>
            <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-blue-600 dark:text-blue-400 mb-6">
              👋 Welcome to my portfolio
            </span>
          </div>

          {/* Name */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Hi, I'm{' '}
            <span className="gradient-text">{content.name}</span>
          </h1>

          {/* Title */}
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            {content.title}
          </h2>

          {/* Description */}
          <p className={`text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            {content.description}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-premium px-8 py-4 rounded-xl font-semibold text-lg"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-lg hover-lift shadow-premium"
            >
              Download Resume
            </button>
          </div>

          {/* Social Links */}
          <div className={`flex justify-center space-x-6 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover-glow hover-scale transition-all duration-300"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover-glow hover-scale transition-all duration-300"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
