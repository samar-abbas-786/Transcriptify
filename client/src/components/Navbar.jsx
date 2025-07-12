// components/Navbar.jsx
import { Moon, Sun, AudioLines } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav
      className={`backdrop-blur-xl border-b transition-all duration-500 border-gray-500 sticky top-0 z-50 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800  text-gray-50"
          : "bg-white/40 border-white/20 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div
              className={`p-2 rounded-xl ${
                darkMode
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              }`}
            >
              <AudioLines className="w-6 h-6" />
            </div>
            <a
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Transcriptify
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Features", "Pricing", "Search"].map((item) => (
              <a
                key={item}
                href={
                  item === "Features"
                    ? "#why"
                    : item === "Pricing"
                    ? "/#pricing"
                    : item === "Home"
                    ? "/"
                    : "/search"
                }
                className={`transition-colors font-medium hover:${
                  darkMode ? "text-purple-400" : "text-indigo-600"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? "bg-white/10 text-white border border-white/20"
                  : "bg-white/60 text-gray-800 border border-white/30"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              className={`hidden sm:block px-4 py-2 rounded-xl font-medium transition-all ${
                darkMode
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              }`}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
