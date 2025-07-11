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
  AudioLines,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import { Analytics } from "@vercel/analytics/react";
import axios from "axios";
import ShowSummary from "./showSummary";
import ShowTranscript from "./showTranscript";
import RevealScroll from "./reveal";
const Home = () => {
  // const API = "https://transcriptify-backend.onrender.com";
  const API = "http://localhost:5000";

  const [darkMode, setDarkMode] = useState(false);
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [b1, setb1] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [click, setClick] = useState(false);
  const [showPdfSummary, setShowPdfSummary] = useState(false);
  const [summary, setSummary] = useState([]);
  const [isExtractingTranscript, setIsExtractingTranscript] = useState(false);
  const [isDownloadingTranscript, setIsDownloadingTranscript] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const ref = useRef(null);
  const isView = useInView(ref, { once: true });

  const getData = async (videoId) => {
    try {
      const data = await axios.post(`${API}/getTranscript`, { videoId });
      setTranscript(data.data.transcript);
    } catch (error) {
      console.log("error on getData", error);
    }
  };
  const handleDownloadTranscript = () => {
    setIsDownloadingTranscript(true);
    setTimeout(() => {
      setShowPdf(true);
      setIsDownloadingTranscript(false);
    }, 1000);
  };

  useEffect(() => {
    localStorage.setItem("videoId", videoId);
  }, [videoId]);

  useEffect(() => {}, [transcript]);
  const features = [
    {
      icon: <Youtube className="w-6 h-6" />,
      title: "YouTube Integration",
      desc: "Seamlessly process any YouTube video",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Instant Processing",
      desc: "Get transcripts & summaries in seconds",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Dual Output",
      desc: "Full transcripts plus AI-powered summaries",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered",
      desc: "Smart summarization with key insights",
    },
  ];
  useEffect(() => {
    if (!url) return;

    try {
      const videoUri = new URL(url);
      const vidParam = videoUri.searchParams.get("v");

      if (vidParam) {
        setVideoId(vidParam);
      } else {
        const pathnameParts = videoUri.pathname.split("/");
        const fallbackId = pathnameParts[pathnameParts.length - 1];
        if (fallbackId) {
          setVideoId(fallbackId);
        }
      }
    } catch (err) {
      console.error("Invalid URL passed:", url);
    }
  }, [url]);

  const handleSubmit = async () => {
    try {
      setIsExtractingTranscript(true);
      await getData(videoId);
      setIsExtractingTranscript(false);
    } catch (error) {
      console.log("error on handleSubmit", error);
      setIsExtractingTranscript(false);
    }
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
  // if (showPdf) {
  //   return (
  //     <div className="w-full h-screen border">
  //       <Pdf transcript={transcript} />
  //     </div>
  //   );
  // }
  if (showPdf) {
    return (
      <div className="w-full h-screen border">
        <ShowTranscript transcript={transcript} />
      </div>
    );
  }
  const handleDownLoadSummary = async () => {
    try {
      setIsGeneratingSummary(true);
      const data = await axios.post(`${API}/getSummary`, { transcript });
      if (data) {
        setSummary(data.data.summary);
        setShowPdfSummary(true);
      }
      setIsGeneratingSummary(false);
    } catch (error) {
      console.log("error on handleDownloadSummary", error);
      setIsGeneratingSummary(false);
    }
  };

  if (showPdfSummary) {
    return (
      <div className="w-full h-screen border">
        <ShowSummary summary={summary} />
      </div>
    );
  }

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
                <AudioLines className="w-6 h-6" />
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
                href="#why"
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
                onClick={() => setDarkMode(!darkMode)}
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
          <RevealScroll delay={0.27}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Turn YouTube Videos Into
              </span>
              <br />
              <span className={darkMode ? "text-white" : "text-gray-800"}>
                Transcripts & Summaries
              </span>
            </h1>
          </RevealScroll>
          <RevealScroll delay={0.3}>
            <p
              className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Extract complete transcripts and generate AI-powered summaries
              from any YouTube video in seconds
            </p>
          </RevealScroll>
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
                <RevealScroll delay={0.27}>
                  <span className="text-sm font-medium">
                    AI-Powered Video Processing
                  </span>
                </RevealScroll>
              </div>
              <RevealScroll delay={0.29}>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Get Started Now
                </h2>
              </RevealScroll>
              <RevealScroll delay={0.32}>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Paste any YouTube URL to extract transcripts and generate
                  summaries
                </p>
              </RevealScroll>
            </div>

            <div className="space-y-6">
              <RevealScroll delay={0.33}>
                <div className="relative">
                  <Search
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className={`w-full pl-12 pr-4 py-4 text-lg rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${theme.input}`}
                  />
                  {url && (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </RevealScroll>
              <RevealScroll delay={0.35}>
                <button
                  onClick={handleSubmit}
                  disabled={!url || isExtractingTranscript}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform group ${
                    url && !isExtractingTranscript
                      ? `${theme.button} hover:scale-105`
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>
                      {isExtractingTranscript
                        ? "Processing..."
                        : "Extract Transcript"}
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </RevealScroll>
            </div>

            <RevealScroll delay={0.39}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {/* Download Transcript */}
                <button
                  onClick={handleDownloadTranscript}
                  disabled={!transcript || isDownloadingTranscript}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all group ${
                    transcript && !isDownloadingTranscript
                      ? theme.button
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  {isDownloadingTranscript
                    ? "Preparing..."
                    : "Download Transcript"}
                </button>

                {/* Download Summary */}
                <button
                  onClick={handleDownLoadSummary}
                  disabled={!transcript || isGeneratingSummary}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all group ${
                    transcript && !isGeneratingSummary
                      ? theme.button
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  {isGeneratingSummary ? "Generating..." : "Download Summary"}
                </button>
              </div>
            </RevealScroll>
          </div>
        </div>

        {/* Features */}
        <div id="why" className="mt-20">
          <h3
            className={`text-2xl sm:text-3xl font-bold text-center mb-12 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Why Choose Transcriptify?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index}>
                <RevealScroll delay={index / 8}>
                  <div
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:scale-105 ${theme.featureCard}`}
                  >
                    <div
                      className={`inline-flex p-3 rounded-xl mb-4 ${theme.button}`}
                    >
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h4>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {feature.desc}
                    </p>
                  </div>
                </RevealScroll>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div ref={ref} className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { value: "10M+", label: "Videos Processed" },
            { value: "99.9%", label: "Accuracy Rate" },
            { value: "50+", label: "Languages Supported" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <RevealScroll delay={i / 8}>
                <div
                  className={`text-4xl sm:text-5xl font-bold mb-2 ${theme.accent}`}
                >
                  {isView && (
                    <CountUp
                      end={parseFloat(stat.value.replace(/[^\d.]/g, ""))}
                      duration={4}
                      decimals={stat.value.includes(".") ? 1 : 0}
                      suffix={stat.value.replace(/[\d.]/g, "")}
                    />
                  )}
                </div>
                <div
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {stat.label}
                </div>
              </RevealScroll>
            </div>
          ))}
        </div>

        <div className="mt-24" id="pricing">
          <h3
            className={`text-2xl sm:text-3xl font-bold text-center mb-12 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Transparent Pricing for Every Need
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                features: [
                  "Basic Transcript Extraction",
                  "Limited Summary Length",
                  "Up to 5 videos/day",
                ],
                highlighted: false,
              },
              {
                name: "Pro",
                price: "$9.99/mo",
                features: [
                  "Unlimited Transcript Downloads",
                  "Full-Length AI Summaries",
                  "Priority Queue Processing",
                  "Downloadable PDFs",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  "Team Access",
                  "Dedicated Support",
                  "API Integration",
                  "Custom Limits",
                ],
                highlighted: false,
              },
            ].map((plan, index) => (
              <div key={index}>
                <RevealScroll delay={index / 8}>
                  <div
                    className={`p-6 rounded-3xl transition-all duration-300 hover:scale-105 text-center space-y-6 ${
                      plan.highlighted
                        ? darkMode
                          ? "border-2 border-purple-500 bg-black/30 shadow-xl"
                          : "border-2 border-indigo-500 bg-white/70 shadow-xl"
                        : theme.featureCard
                    }`}
                  >
                    <h4 className="text-2xl font-bold">{plan.name}</h4>
                    <div
                      className={`text-4xl font-bold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {plan.price}
                    </div>
                    <ul
                      className={`text-sm space-y-2 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {plan.features.map((feature, i) => (
                        <li key={i}>✓ {feature}</li>
                      ))}
                    </ul>
                    <button
                      className={`mt-4 px-5 py-2 rounded-xl font-medium transition-all ${theme.button}`}
                    >
                      {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                    </button>
                  </div>
                </RevealScroll>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer
        className={`mt-32 border-t pt-12 ${
          darkMode
            ? "bg-black/30 border-white/10 text-white"
            : "bg-white/50 border-white/30 text-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Logo & Tagline */}
            <RevealScroll delay={1 / 9}>
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-xl ${theme.button}`}>
                    <AudioLines className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Transcriptify
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  AI-powered tool to extract transcripts and generate smart
                  summaries from any YouTube video.
                </p>
              </div>
            </RevealScroll>
            {/* Navigation */}
            <RevealScroll delay={1 / 8}>
              <div>
                <h4 className="text-lg font-semibold mb-3">Explore</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#why" className="hover:text-indigo-500 transition">
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="hover:text-indigo-500 transition"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </RevealScroll>

            {/* Resources */}
            <RevealScroll delay={1 / 4}>
              <div>
                <h4 className="text-lg font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-500 transition">
                      API Access
                    </a>
                  </li>
                </ul>
              </div>
            </RevealScroll>

            {/* Newsletter / Social */}
            <RevealScroll delay={3 / 8}>
              <div>
                <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
                <p className="text-sm mb-4">
                  Get tips, updates, and early access.
                </p>
                <form className="flex items-center space-x-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className={`w-full px-4 py-2 text-sm rounded-lg border outline-none ${theme.input}`}
                  />
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${theme.button}`}
                  >
                    Join
                  </button>
                </form>
              </div>
            </RevealScroll>
          </div>

          {/* Bottom Note */}
          <div className="text-center text-xs pt-6 pb-10 border-t border-white/10">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-purple-500">Transcriptify</span>
            . Built with ❤ by Samar Abbas.
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
};

export default Home;
