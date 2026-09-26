'use client';

import { useState, useEffect } from 'react';

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState([
    {
      title: "Backend Development",
      skills: ["Java", "Spring Boot", "REST APIs", "Microservices", "JPA/Hibernate"]
    },
    {
      title: "Frontend Development",
      skills: ["React", "JavaScript", "HTML", "CSS"]
    },
    {
      title: "Database",
      skills: ["PostgreSQL", "MySQL", "Redis"]
    },
    {
      title: "Cloud & AI",
      skills: ["AWS", "Azure", "AWS Rekognition", "Gemini", "ONNX Runtime"]
    },
    {
      title: "Security",
      skills: ["JWT", "Keycloak"]
    },
    {
      title: "Tools & DevOps",
      skills: ["Git", "Maven", "Docker", "Postman", "Nginx"]
    }
  ]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setSkillCategories(data.skills.categories))
      .catch(console.error);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('skills');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const getIconForCategory = (title: string) => {
    const icons: { [key: string]: string } = {
      'Backend Development': '⚙️',
      'Frontend Development': '🎨',
      'Database': '🗄️',
      'Cloud & AI': '☁️',
      'Security': '🔒',
      'Tools & DevOps': '🛠️'
    };
    return icons[title] || '📚';
  };

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-amber-600 dark:text-amber-400 mb-4">
            My Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`card-premium p-6 hover-lift ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{getIconForCategory(category.title)}</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium hover:scale-110 transition-transform cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center space-x-4 glass px-6 py-3 rounded-full">
            <span className="text-gray-600 dark:text-gray-400">Proficient in</span>
            <span className="text-2xl font-bold gradient-text">20+</span>
            <span className="text-gray-600 dark:text-gray-400">technologies across</span>
            <span className="text-2xl font-bold gradient-text">6</span>
            <span className="text-gray-600 dark:text-gray-400">domains</span>
          </div>
        </div>
      </div>
    </section>
  );
}
