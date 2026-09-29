// Portfolio content structure
export interface PortfolioContent {
  hero: {
    name: string;
    title: string;
    headline?: string;
    description: string;
    logo?: string;
  };
  about: {
    content: string;
    statistics: {
      years: string;
      projects: string;
      technologies: string;
      satisfaction: string;
    };
  };
  skills: {
    categories: Array<{
      title: string;
      skills: string[];
    }>;
  };
  experience: Array<{
    company: string;
    position: string;
    project: string;
    period?: string;
    description: string[];
    technologies: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    features: string[];
  }>;
  contact: {
    email: string;
    location: string;
    github: string;
    linkedin: string;
  };
  settings?: {
    showHero?: boolean;
    showSkills?: boolean;
    showExperience?: boolean;
    showProjects?: boolean;
    showContact?: boolean;
    hero?: {
      showName?: boolean;
      showHeadline?: boolean;
      showTitle?: boolean;
      showContent?: boolean;
      showStatistics?: boolean;
      showLogo?: boolean;
      showButtons?: boolean;
    };
    skills?: {
      showCategories?: boolean[];
    };
    experience?: {
      showItems?: boolean[];
    };
    projects?: {
      showItems?: boolean[];
    };
    contact?: {
      showEmail?: boolean;
      showLocation?: boolean;
      showGithub?: boolean;
      showLinkedin?: boolean;
    };
  };
}

export const defaultContent: PortfolioContent = {
  hero: {
    name: "Amod Kumar Singh",
    title: "Software Developer | Java Backend & AI/Cloud Integration",
    headline: "Building verification systems that people can actually trust.",
    description: "I build backend services and intelligent verification solutions using Java, Spring Boot, REST APIs, PostgreSQL, AWS, and Azure. Currently working on KYC and AI-powered verification platforms, with hands-on experience in backend development, cloud integration, face and voice verification, OCR, sentiment analysis, property inspection, and secure verification workflows."
  },
  about: {
    content: "I'm a Software Developer with a B.Tech in Computer Science Engineering (2021–2025). Currently working at Qualtech Edge Pvt. Ltd., I specialize in Java backend development and AI/cloud integration.\n\nMy expertise lies in building scalable backend services using Spring Boot, REST APIs, and microservices architecture. I've developed comprehensive KYC and AI verification platforms that integrate with AWS and Azure services for face verification, voice verification, OCR, and sentiment analysis.\n\nI'm passionate about creating secure, efficient systems that solve real-world problems. My work focuses on backend development, cloud integration, and implementing AI-powered verification solutions for enterprise applications.",
    statistics: {
      years: "1+",
      projects: "4+",
      technologies: "15+",
      satisfaction: "100%"
    }
  },
  skills: {
    categories: [
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
    ]
  },
  experience: [
    {
      company: "Qualtech Edge Pvt. Ltd.",
      position: "Software Developer",
      project: "Customer Connect — KYC & AI Verification Platform",
      period: "2024 — Present",
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
        "Implemented JWT and Keycloak for secure authentication and multi-tenancy"
      ],
      technologies: ["Java", "Spring Boot", "PostgreSQL", "AWS", "Azure", "React", "Redis", "Keycloak"]
    }
  ],
  projects: [
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
  ],
  contact: {
    email: "your.email@example.com",
    location: "Noida, Uttar Pradesh",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername"
  },
  settings: {
    showHero: true,
    showSkills: true,
    showExperience: true,
    showProjects: true,
    showContact: true,
    hero: {
      showName: true,
      showHeadline: true,
      showTitle: true,
      showContent: true,
      showStatistics: true,
      showLogo: true,
      showButtons: true
    },
    skills: {
      showCategories: [true, true, true, true, true, true]
    },
    experience: {
      showItems: [true]
    },
    projects: {
      showItems: [true, true, true, true]
    },
    contact: {
      showEmail: true,
      showLocation: true,
      showGithub: true,
      showLinkedin: true
    }
  }
};

export function normalizeContent(input: any): PortfolioContent {
  const data = input || {};
  const hero = data.hero || {};
  const about = data.about || {};

  // Support both old (hero + about) and new merged (about with name/title/etc.) structures
  const name = hero.name ?? about.name ?? '';
  const title = hero.title ?? about.title ?? '';
  const headline = hero.headline ?? about.headline ?? '';
  const logo = hero.logo ?? about.logo ?? '';
  const description = hero.description ?? about.content ?? '';
  const content = about.content ?? hero.description ?? '';
  const statistics = about.statistics ?? hero.statistics ?? {};

  return {
    hero: {
      name,
      title,
      headline,
      description,
      logo,
    },
    about: {
      content,
      statistics: {
        years: statistics.years ?? '',
        projects: statistics.projects ?? '',
        technologies: statistics.technologies ?? '',
        satisfaction: statistics.satisfaction ?? '',
      },
    },
    skills: {
      categories: Array.isArray(data.skills?.categories) ? data.skills.categories : [],
    },
    experience: Array.isArray(data.experience) ? data.experience : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    contact: {
      email: data.contact?.email ?? '',
      location: data.contact?.location ?? '',
      github: data.contact?.github ?? '',
      linkedin: data.contact?.linkedin ?? '',
    },
    settings: {
      showHero: data.settings?.showHero ?? data.settings?.showAbout ?? true,
      showSkills: data.settings?.showSkills ?? true,
      showExperience: data.settings?.showExperience ?? true,
      showProjects: data.settings?.showProjects ?? true,
      showContact: data.settings?.showContact ?? true,
      hero: {
        showName: data.settings?.hero?.showName ?? data.settings?.about?.showName ?? true,
        showHeadline: data.settings?.hero?.showHeadline ?? data.settings?.about?.showHeadline ?? true,
        showTitle: data.settings?.hero?.showTitle ?? data.settings?.about?.showTitle ?? true,
        showContent: data.settings?.hero?.showContent ?? data.settings?.about?.showContent ?? true,
        showStatistics: data.settings?.hero?.showStatistics ?? data.settings?.about?.showStatistics ?? true,
        showLogo: data.settings?.hero?.showLogo ?? data.settings?.about?.showLogo ?? true,
        showButtons: data.settings?.hero?.showButtons ?? data.settings?.about?.showButtons ?? true,
      },
      skills: {
        showCategories: Array.isArray(data.settings?.skills?.showCategories)
          ? data.settings.skills.showCategories
          : [],
      },
      experience: {
        showItems: Array.isArray(data.settings?.experience?.showItems)
          ? data.settings.experience.showItems
          : [],
      },
      projects: {
        showItems: Array.isArray(data.settings?.projects?.showItems)
          ? data.settings.projects.showItems
          : [],
      },
      contact: {
        showEmail: data.settings?.contact?.showEmail ?? true,
        showLocation: data.settings?.contact?.showLocation ?? true,
        showGithub: data.settings?.contact?.showGithub ?? true,
        showLinkedin: data.settings?.contact?.showLinkedin ?? true,
      },
    },
  };
}
