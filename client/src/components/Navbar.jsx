// components/Navbar.jsx
import { Moon, Sun, AudioLines, Menu, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { useBg } from "../Context/background";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [path, setPath] = useState();
  const { darkMode, setDarkMode } = useBg();
  const location = useLocation();
  useEffect(() => {
    console.log(location);
    setPath(location.pathname);
  }, [location]);

  const theme = darkMode
    ? {
        background:
          "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800",
        nav: "bg-black/10 backdrop-blur-xl border-none text-white",
        card: "bg-black/20 backdrop-blur-xl border-white/10 text-white",
        input: "bg-white/10 text-white border-white/20 placeholder-gray-300",
        button: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
        buttonSecondary:
          "bg-white/10 text-white hover:bg-white/20 border border-white/20",
        featureCard: "bg-white/5 text-white border-white/10",
        accent: "text-purple-400",
        glow: "shadow-2xl shadow-purple-500/20",
      }
    : {
        background: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
        nav: "bg-white/40 backdrop-blur-xl border-white/20 text-gray-800",
        card: "bg-white/40 backdrop-blur-xl border-white/20 text-gray-800",
        input: "bg-white/60 text-gray-800 border-white/30 placeholder-gray-500",
        button: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
        buttonSecondary:
          "bg-white/60 text-gray-800 hover:bg-white/80 border border-white/30",
        featureCard: "bg-white/30 text-gray-800 border-white/20",
        accent: "text-indigo-600",
        glow: "shadow-2xl shadow-indigo-500/20",
      };
  return (
    <div className={`${theme.background}`}>
      <nav className={`sticky top-0 z-50 ${theme.nav} border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className={`p-2 rounded-xl ${theme.button}`}>
              <AudioLines className="w-6 h-6" />
            </div>
            <span
              className={`text-2xl sm:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent 
    ${
      darkMode
        ? "bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500"
        : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
    }`}
            >
              Transcriptify
            </span>
          </a>
          <div className="md:flex hidden items-center gap-6">
            <a href="/" className={`hover:${theme.accent}`}>
              Home
            </a>

            <a
              href="#why"
              className={`hover:${theme.accent} ${
                path == "/search" ? "hidden" : ""
              }`}
            >
              Features
            </a>

            <a
              href="#pricing"
              className={`hover:${theme.accent} ${
                path == "/search" ? "hidden" : ""
              }`}
            >
              Pricing
            </a>

            <a
              href="/search"
              className={`flex gap-1 hover:${theme.accent} ${
                path == "/search" ? "hidden" : ""
              }`}
            >
              Search
              <span className="text-red-500 animate-bounce duration-75">
                <Youtube />
              </span>
            </a>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl ${theme.buttonSecondary}`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setClick(!click)}
                className={`p-2 md:hidden rounded-xl ${theme.buttonSecondary}`}
              >
                {click ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
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
        {click && (
          <div className="md:hidden flex flex-col gap-2 p-4">
            <a href="#" onClick={() => setClick(false)}>
              Home
            </a>
            <a href="#why" onClick={() => setClick(false)}>
              Features
            </a>
            <a href="#pricing" onClick={() => setClick(false)}>
              Pricing
            </a>
            <a href="/search" onClick={() => setClick(false)}>
              Search
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
