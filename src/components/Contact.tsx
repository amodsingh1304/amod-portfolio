'use client';

import { useState, useEffect } from 'react';

export default function Contact() {
  const [contact, setContact] = useState({
    email: 'your.email@example.com',
    location: 'Noida, Uttar Pradesh',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername'
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContact(data.contact))
      .catch(console.error);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-amber-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-amber-600 dark:text-amber-400 mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or collaborations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            {/* Contact Info Card */}
            <div className="gradient-border p-1 rounded-2xl">
              <div className="glass-strong rounded-2xl p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {contact.email}
                      </p>
                    </div>
                  </a>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {contact.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="gradient-border p-1 rounded-2xl">
              <div className="glass-strong rounded-2xl p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Social Profiles
                </h3>
                
                <div className="space-y-4">
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">GitHub</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">View my projects</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">LinkedIn</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Professional network</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Message */}
          <div className={`mt-12 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <div className="inline-flex items-center space-x-2 glass px-6 py-3 rounded-full">
              <span className="text-gray-600 dark:text-gray-400">Ready to work together?</span>
              <a
                href={`mailto:${contact.email}`}
                className="btn-premium px-4 py-2 rounded-lg text-sm font-medium"
              >
                Send Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
