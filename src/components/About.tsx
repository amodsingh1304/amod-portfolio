'use client';

import { useState, useEffect } from 'react';

export default function About() {
  const [content, setContent] = useState('');
  const [statistics, setStatistics] = useState({
    years: '1+',
    projects: '4+',
    technologies: '15+',
    satisfaction: '100%'
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data.about.content);
        if (data.about.statistics) {
          setStatistics(data.about.statistics);
        }
      })
      .catch(console.error);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const paragraphs = content.split('\n\n').filter(p => p.trim());

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-amber-600 dark:text-amber-400 mb-4">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get to Know <span className="gradient-text">Me Better</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate about building innovative solutions that make a difference
          </p>
        </div>

        <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <div className="gradient-border p-1 rounded-2xl">
            <div className="glass-strong rounded-2xl p-8 md:p-12">
              <div className="space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:gradient-text first-letter:float-left first-letter:mr-3 first-letter:mt-1"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Stats/Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">{statistics.years}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">{statistics.projects}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">{statistics.technologies}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">{statistics.satisfaction}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
