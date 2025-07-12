import {
  Moon,
  Sun,
  Play,
  Download,
  Search,
  Youtube,
  Clock,
  FileText,
  Zap,
  AudioLines,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";
import { Analytics } from "@vercel/analytics/react";
import axios from "axios";
import RevealScroll from "./reveal";
import { useNavigate } from "react-router-dom";
import PricingSection from "./Pricing";
import FeaturesSection from "./Feature";

const Home = () => {
  // const API = "https://transcriptify-backend.onrender.com";

  const API = "http://localhost:5000";
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState("");
  const [click, setClick] = useState(false);
  const [isExtractingTranscript, setIsExtractingTranscript] = useState(false);
  const [isDownloadingTranscript, setIsDownloadingTranscript] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const ref = useRef(null);
  const isView = useInView(ref, { once: true });

  const theme = darkMode
    ? {
        background:
          "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800",
        nav: "bg-black/20 backdrop-blur-xl border-white/10 text-white",
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
        const pathParts = videoUri.pathname.split("/");
        const fallbackId = pathParts[pathParts.length - 1];
        if (fallbackId) setVideoId(fallbackId);
      }
    } catch (err) {
      console.error("Invalid URL:", url);
    }
  }, [url]);

  const getData = async (videoId) => {
    try {
      const res = await axios.post(`${API}/getTranscript`, { videoId });
      setTranscript(res.data.transcript);
    } catch (err) {
      console.error("Error fetching transcript", err);
    }
  };

  const handleSubmit = async () => {
    if (!videoId) return;
    setIsExtractingTranscript(true);
    await getData(videoId);
    setIsExtractingTranscript(false);
  };

  const handleDownloadTranscript = () => {
    setIsDownloadingTranscript(true);
    setTimeout(() => {
      navigate("/transcript", { state: { transcript } });
      setIsDownloadingTranscript(false);
    }, 1000);
  };

  const handleDownloadSummary = async () => {
    try {
      setIsGeneratingSummary(true);
      const res = await axios.post(`${API}/getSummary`, { transcript });
      navigate("/summary", { state: { summary: res.data.summary } });
    } catch (err) {
      console.error("Summary generation failed", err);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme.background}`}>
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 ${theme.nav} border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-xl ${theme.button}`}>
              <AudioLines className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Transcriptify
            </span>
          </div>
          <div className="md:flex hidden items-center gap-6">
            <a href="#" className={`hover:${theme.accent}`}>
              Home
            </a>
            <a href="#why" className={`hover:${theme.accent}`}>
              Features
            </a>
            <a href="#pricing" className={`hover:${theme.accent}`}>
              Pricing
            </a>
            <a href="/search" className={`hover:${theme.accent}`}>
              Search
            </a>
          </div>
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
              className={`p-2 rounded-xl ${theme.buttonSecondary}`}
            >
              {click ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <RevealScroll delay={0.2}>
          <h1 className="text-4xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
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
            className={`mt-4 text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Paste any YouTube URL to extract transcripts and generate summaries
          </p>
        </RevealScroll>

        {/* Input + Video */}
        <div className="mt-8">
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="https://youtube.com/watch?v=..."
              onChange={(e) => setUrl(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme.input}`}
            />
          </div>

          {videoId && (
            <div className={`mt-6 p-4 rounded-xl ${theme.card}`}>
              <iframe
                className="w-full h-[40vh] rounded-lg"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSubmit}
              disabled={!videoId || isExtractingTranscript}
              className={`flex-1 py-3 rounded-xl font-medium ${
                videoId && !isExtractingTranscript
                  ? theme.button
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isExtractingTranscript ? "Processing..." : "Extract Transcript"}
            </button>

            <button
              onClick={handleDownloadTranscript}
              disabled={!transcript || isDownloadingTranscript}
              className={`flex-1 py-3 rounded-xl font-medium ${
                transcript && !isDownloadingTranscript
                  ? theme.button
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isDownloadingTranscript ? "Preparing..." : "Download Transcript"}
            </button>

            <button
              onClick={handleDownloadSummary}
              disabled={!transcript || isGeneratingSummary}
              className={`flex-1 py-3 rounded-xl font-medium ${
                transcript && !isGeneratingSummary
                  ? theme.button
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isGeneratingSummary ? "Generating..." : "Download Summary"}
            </button>
          </div>
        </div>
      </div>
      <FeaturesSection darkMode={darkMode} />
      <PricingSection darkMode={darkMode} />
      {/* Stats */}
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 py-20 text-center"
      >
        {[
          { value: "10M+", label: "Videos Processed" },
          { value: "99.9%", label: "Accuracy Rate" },
          { value: "50+", label: "Languages Supported" },
        ].map((stat, i) => (
          <div key={i}>
            <RevealScroll delay={i / 6}>
              <h3 className={`text-4xl font-bold ${theme.accent}`}>
                {isView && (
                  <CountUp
                    end={parseFloat(stat.value.replace(/[^\d.]/g, ""))}
                    duration={3}
                    decimals={stat.value.includes(".") ? 1 : 0}
                    suffix={stat.value.replace(/[\d.]/g, "")}
                  />
                )}
              </h3>
              <p
                className={`mt-2 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {stat.label}
              </p>
            </RevealScroll>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer
        className={`mt-20 py-10 text-center ${
          darkMode ? "text-white bg-black/30" : "text-gray-800 bg-white/70"
        }`}
      >
        &copy; {new Date().getFullYear()}{" "}
        <strong className="text-purple-500">Transcriptify</strong> by Samar
        Abbas
      </footer>
      <Analytics />
    </div>
  );
};

export default Home;
