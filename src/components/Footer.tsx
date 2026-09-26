export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo and Tagline */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-2">Amod Kumar Singh</h3>
            <p className="text-gray-400">Building innovative solutions with Java, Spring Boot, and AI</p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

          {/* Copyright and Tech Stack */}
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Amod Kumar Singh. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span>Built with</span>
              <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">Next.js</span>
              <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">React</span>
              <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">Tailwind CSS</span>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
