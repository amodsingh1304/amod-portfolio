'use client';

import { useState, useEffect } from 'react';

export default function Experience() {
  const [experience, setExperience] = useState({
    company: "Qualtech Edge Pvt. Ltd.",
    position: "Software Developer",
    project: "Customer Connect — KYC & AI Verification Platform",
    description: [
      "Developed Spring Boot microservices for scalable backend architecture",
      "Built comprehensive KYC APIs for customer verification workflows",
      "Created Property Inspection API for shop, factory, and billboard analysis",
      "Implemented self, field, and agent verification systems",
      "Developed HTML verification reports with dynamic content generation",
      "Integrated face verification using AWS Rekognition and custom AI models",
      "Built voice verification system with speaker identification and anti-spoofing",
      "Implemented sentiment analysis for customer interaction insights",
      "Integrated AWS and Azure services for cloud-based AI processing",
      "Set up Twilio integration for communication services",
      "Implemented JWT and Keycloak for secure authentication and multi-tenancy"
    ],
    technologies: ["Java", "Spring Boot", "PostgreSQL", "AWS", "Azure", "React", "Redis", "Keycloak"]
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setExperience(data.experience))
      .catch(console.error);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('experience');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-amber-600 dark:text-amber-400 mb-4">
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and key achievements
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

            {/* Experience Card */}
            <div className={`relative pl-0 md:pl-20 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-8 top-8 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 hidden md:block"></div>

              <div className="gradient-border p-1 rounded-2xl">
                <div className="glass-strong rounded-2xl p-8">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center mb-2">
                        <span className="text-3xl mr-3">💼</span>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {experience.position}
                        </h3>
                      </div>
                      <p className="text-xl text-amber-600 dark:text-amber-400 font-semibold">
                        {experience.company}
                      </p>
                    </div>
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium animate-pulse-glow">
                      Current Role
                    </span>
                  </div>

                  {/* Project */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <span className="text-2xl mr-2">🚀</span>
                      {experience.project}
                    </h4>
                  </div>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                      Key Achievements
                    </h5>
                    <ul className="space-y-3">
                      {experience.description.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-700 dark:text-gray-300"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                      Technologies Used
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium hover:scale-110 transition-transform cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
