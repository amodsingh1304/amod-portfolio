'use client';

import { useState, useEffect } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      title: "Customer Connect — KYC & AI Verification Platform",
      description: "Comprehensive KYC and AI-powered verification platform for customer onboarding and identity verification",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "AWS", "Azure", "React", "Redis", "Keycloak"],
      features: [
        "Spring Boot microservices architecture",
        "REST APIs for verification workflows",
        "Multi-tenant authentication with JWT/Keycloak",
        "Face verification with AWS Rekognition",
        "Voice verification with speaker identification",
        "OCR for document processing",
        "Sentiment analysis integration",
        "HTML report generation"
      ]
    },
    {
      title: "AI Property Inspection System",
      description: "Property analysis platform using AI for shop, factory, and billboard inspection with automated reporting",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "AWS AI Services", "React"],
      features: [
        "Shop analysis and classification",
        "Factory inspection workflows",
        "Billboard analysis and verification",
        "Evidence upload and management",
        "AI-powered property analysis",
        "Automated HTML report generation",
        "Property Inspection API development"
      ]
    },
    {
      title: "Face Verification & Consistency System",
      description: "Advanced face verification system ensuring identity consistency across verification processes",
      technologies: ["AWS Rekognition", "Java", "Spring Boot", "React", "AI/ML"],
      features: [
        "Reference image management",
        "Video and image verification",
        "Face detection and recognition",
        "Same-face consistency checking",
        "Background and object analysis",
        "Anti-spoofing measures",
        "Real-time verification processing"
      ]
    },
    {
      title: "Voice Verification System",
      description: "Speaker verification and identification system using advanced voice analysis",
      technologies: ["Python", "SpeechBrain", "ONNX Runtime", "Java", "Spring Boot"],
      features: [
        "Voice enrollment and registration",
        "Speaker verification workflows",
        "Speaker identification",
        "Anti-spoofing protection",
        "Voice biometric analysis",
        "ONNX Runtime for model deployment",
        "Integration with verification platform"
      ]
    }
  ]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setProjects(data.projects))
      .catch(console.error);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('projects');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const getProjectIcon = (title: string) => {
    if (title.includes('KYC') || title.includes('Customer')) return '🔐';
    if (title.includes('Property') || title.includes('Inspection')) return '🏢';
    if (title.includes('Face')) return '👤';
    if (title.includes('Voice')) return '🎤';
    return '💻';
  };

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-amber-600 dark:text-amber-400 mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Innovative solutions I've built to solve real-world problems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="gradient-border p-1 rounded-2xl h-full">
                <div className="glass-strong rounded-2xl p-6 h-full hover-lift transition-all duration-300">
                  {/* Project Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{getProjectIcon(project.title)}</span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                      Key Features
                    </h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="text-amber-600 dark:text-amber-400 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                      {project.features.length > 3 && (
                        <li className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                          +{project.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-800 dark:text-amber-200 rounded-full text-xs font-medium hover:scale-110 transition-transform cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
