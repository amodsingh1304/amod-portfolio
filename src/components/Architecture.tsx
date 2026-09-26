'use client';

import { useState, useEffect } from 'react';

export default function Architecture() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const architectureSection = document.getElementById('architecture');
    if (architectureSection) observer.observe(architectureSection);

    return () => observer.disconnect();
  }, []);

  const architectureSteps = [
    { name: 'React Frontend', icon: '⚛️', color: 'from-blue-500 to-blue-600' },
    { name: 'Spring Boot REST API', icon: '☕', color: 'from-green-500 to-green-600' },
    { name: 'Service Layer', icon: '⚙️', color: 'from-purple-500 to-purple-600' },
    { name: 'PostgreSQL & Redis', icon: '🗄️', color: 'from-orange-500 to-red-500' },
    { name: 'AWS & Azure Services', icon: '☁️', color: 'from-yellow-500 to-cyan-500' },
    { name: 'AI Analysis', icon: '🤖', color: 'from-pink-500 to-purple-500' },
    { name: 'Verification Result', icon: '✅', color: 'from-teal-500 to-green-500' },
    { name: 'HTML Report Generation', icon: '📄', color: 'from-gray-600 to-gray-700' },
  ];

  return (
    <section id="architecture" className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-amber-600 dark:text-amber-400 mb-4">
            Technical Design
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            System <span className="gradient-text">Architecture</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            End-to-end architecture for KYC and AI verification platform
          </p>
        </div>

        <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <div className="gradient-border p-1 rounded-2xl">
            <div className="glass-strong rounded-2xl p-8">
              <div className="flex flex-col items-center space-y-3">
                {architectureSteps.map((step, index) => (
                  <div key={index} className="w-full max-w-2xl">
                    <div
                      className={`bg-gradient-to-r ${step.color} text-white rounded-xl p-4 text-center font-semibold shadow-lg hover-lift transition-all duration-300 cursor-default`}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-2xl">{step.icon}</span>
                        <span>{step.name}</span>
                      </div>
                    </div>
                    {index < architectureSteps.length - 1 && (
                      <div className="flex justify-center my-2">
                        <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-8 text-center">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  End-to-end architecture for KYC and AI verification platform showing the flow from frontend to AI-powered analysis and report generation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
