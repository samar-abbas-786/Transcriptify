import {
  Moon,
  Sun,
  Play,
  Download,
  Search,
  Sparkles,
  ArrowRight,
  Youtube,
  Clock,
  FileText,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

import axios from "axios";

const App = () => {
  const API = "http://localhost:5000";
  const darkMode = false;
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [b1, setb1] = useState(false);

  const getData = async (videoId) => {
    const data = await axios.post(`${API}/getTranscript`, { videoId });
    setTranscript(data.data.transcript);
    console.log(data.data.transcript);
  };
  useEffect(() => {
    localStorage.setItem("videoId", videoId);
  }, [videoId]);
  useEffect(() => {
    // console.log("transcript", transcript);
  }, [transcript]);
  const features = [
    {
      icon: <Youtube className="w-6 h-6" />,
      title: "YouTube Integration",
      desc: "Direct video processing",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Instant Results",
      desc: "Get transcripts in seconds",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Multiple Formats",
      desc: "Export as text, SRT, or JSON",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Enhanced",
      desc: "Smart formatting & timestamps",
    },
  ];
  const handleSubmit = async () => {
    const videoUri = new URL(url);
    let Vid = videoUri.searchParams.get("v");
    if (Vid != null || Vid != undefined) {
      // console.log(Vid);
      setVideoId(Vid);
      setb1(!b1);
    } else {
      Vid = url.substring(17, 28);
      // console.log(Vid);
      setVideoId(url.substring(17, 28));
      setb1(!b1);
    }
    await getData(Vid);
  };

  const theme = darkMode
    ? {
        background:
          "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800",
        nav: "bg-black/20 backdrop-blur-xl border-white/10 text-white",
        card: "bg-black/20 backdrop-blur-xl border-white/10 text-white",
        input:
          "bg-white/10 backdrop-blur-sm text-white border-white/20 placeholder-gray-300 focus:border-purple-400 focus:bg-white/15",
        button:
          "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25",
        buttonSecondary:
          "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20",
        featureCard:
          "bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 text-white",
        accent: "text-purple-400",
        glow: "shadow-2xl shadow-purple-500/20",
      }
    : {
        background: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
        nav: "bg-white/40 backdrop-blur-xl border-white/20 text-gray-800",
        card: "bg-white/40 backdrop-blur-xl border-white/20 text-gray-800",
        input:
          "bg-white/60 backdrop-blur-sm text-gray-800 border-white/30 placeholder-gray-500 focus:border-indigo-400 focus:bg-white/80",
        button:
          "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25",
        buttonSecondary:
          "bg-white/60 backdrop-blur-sm hover:bg-white/80 text-gray-800 border border-white/30",
        featureCard:
          "bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40 text-gray-800",
        accent: "text-indigo-600",
        glow: "shadow-2xl shadow-indigo-500/20",
      };

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${theme.background}`}
    >
      {/* Background Circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-72 h-72 rounded-full ${
            darkMode ? "bg-purple-600/10" : "bg-indigo-300/20"
          } blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full ${
            darkMode ? "bg-pink-600/10" : "bg-purple-300/20"
          } blur-3xl animate-pulse`}
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Navbar */}
      <nav
        className={`backdrop-blur-xl border-b transition-all duration-500 ${theme.nav} sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-xl ${theme.button}`}>
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Transcriptify
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className={`hover:${theme.accent} transition-colors font-medium`}
              >
                Home
              </a>
              <a
                href="#"
                className={`hover:${theme.accent} transition-colors font-medium`}
              >
                Features
              </a>
              <a
                href="#"
                className={`hover:${theme.accent} transition-colors font-medium`}
              >
                Pricing
              </a>
              <a
                href="#"
                className={`hover:${theme.accent} transition-colors font-medium`}
              >
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${theme.buttonSecondary}`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                className={`hidden sm:block px-4 py-2 rounded-xl font-medium transition-all ${theme.button}`}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Transform YouTube Videos
            </span>
            <br />
            <span className={darkMode ? "text-white" : "text-gray-800"}>
              Into Perfect Transcripts
            </span>
          </h1>
          <p
            className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Harness the power of AI to instantly convert any YouTube video into
            accurate, timestamped transcripts
          </p>
        </div>

        {/* Main Card */}
        <div className="flex justify-center">
          <div
            className={`w-full max-w-2xl p-8 sm:p-10 rounded-3xl border transition-all duration-500 ${theme.card} ${theme.glow}`}
          >
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${theme.buttonSecondary} mb-4`}
              >
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">
                  AI-Powered Transcription
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Get Your Transcript
              </h2>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Paste any YouTube URL or video ID below
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or video ID"
                  className={`w-full pl-12 pr-4 py-4 text-lg rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${theme.input}`}
                />
              </div>

              <button
                onClick={handleSubmit}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${theme.button} group`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>Generate Transcript</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${theme.buttonSecondary} group`}
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download Transcript
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${theme.buttonSecondary} group`}
              >
                <Play className="w-4 h-4 inline mr-2" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <h3
            className={`text-2xl sm:text-3xl font-bold text-center mb-12 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Why Choose Transcriptify?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:scale-105 ${theme.featureCard}`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 ${theme.button}`}
                >
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { value: "10M+", label: "Videos Processed" },
            { value: "99.9%", label: "Accuracy Rate" },
            { value: "50+", label: "Languages Supported" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className={`text-4xl sm:text-5xl font-bold mb-2 ${theme.accent}`}
              >
                {stat.value}
              </div>
              <div
                className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {stat.label}
              </div>
            </div>
          ))}
          {/* {transcript && <>{transcript}</>} */}
        </div>
      </div>
    </div>
  );
};

export default App;
