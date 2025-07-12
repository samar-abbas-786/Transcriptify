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
import Footer from "./Footer";
import FAQs from "./FAQ";

const Home = () => {
  const API = "https://transcriptify-backend.onrender.com";
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
      <nav className={`sticky top-0 z-50 ${theme.nav} border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
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
              className={`p-2 md:hidden rounded-xl ${theme.buttonSecondary}`}
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

      <div className="max-w-4xl mx-auto px-6 py-16 text-center ">
        <RevealScroll delay={0.2}>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Turn YouTube Videos Into
            </span>
            <br />
            <span className={darkMode ? "text-white" : "text-gray-900"}>
              Transcripts & Summaries
            </span>
          </h1>
        </RevealScroll>

        <RevealScroll delay={0.3}>
          <p
            className={`mt-4 text-lg sm:text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Paste any YouTube URL below to instantly extract a transcript or
            generate an AI summary.
          </p>
        </RevealScroll>

        {/* Input */}
        <div className="mt-10 relative shadow-lg rounded-xl">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="https://youtube.com/watch?v=..."
            onChange={(e) => setUrl(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-1 focus:ring-purple-500 focus:outline-none ${
              darkMode
                ? "bg-white/10 text-white placeholder-gray-300 border-white/20"
                : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
            }`}
          />
        </div>

        {/* Video Preview */}
        {videoId && (
          <RevealScroll delay={0.4}>
            <div
              className={`mt-8 overflow-hidden rounded-2xl shadow-2xl ${
                darkMode ? "bg-black/20" : "bg-white"
              }`}
            >
              <iframe
                className="w-full h-[300px] sm:h-[400px]"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </RevealScroll>
        )}

        {/* Buttons */}
        <RevealScroll delay={0.45}>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={handleSubmit}
              disabled={!videoId || isExtractingTranscript}
              className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 text-sm tracking-wide ${
                videoId && !isExtractingTranscript
                  ? darkMode
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110 shadow-lg hover:shadow-pink-500/30"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:brightness-110 shadow-lg hover:shadow-purple-400/30"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isExtractingTranscript ? "Processing..." : "Extract Transcript"}
            </button>

            <button
              onClick={handleDownloadTranscript}
              disabled={!transcript || isDownloadingTranscript}
              className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 text-sm tracking-wide ${
                transcript && !isDownloadingTranscript
                  ? darkMode
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110 shadow-lg hover:shadow-pink-500/30"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:brightness-110 shadow-lg hover:shadow-purple-400/30"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isDownloadingTranscript ? "Preparing..." : "Download Transcript"}
            </button>

            <button
              onClick={handleDownloadSummary}
              disabled={!transcript || isGeneratingSummary}
              className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 text-sm tracking-wide ${
                transcript && !isGeneratingSummary
                  ? darkMode
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110 shadow-lg hover:shadow-pink-500/30"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:brightness-110 shadow-lg hover:shadow-purple-400/30"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isGeneratingSummary ? "Generating..." : "Download Summary"}
            </button>
          </div>
        </RevealScroll>
      </div>

      <FeaturesSection darkMode={darkMode} />
      <PricingSection darkMode={darkMode} />

      <div className="px-6 py-20 text-center">
        {/* Headline */}
        <div className="mb-12">
          <h2
            className={`text-4xl font-extrabold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span
              className={` ${
                darkMode
                  ? "text-white"
                  : "bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent"
              } `}
            >
              Trusted by Thousands
            </span>
          </h2>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Transforming videos into knowledge, one transcript at a time
          </p>
        </div>

        {/* Stats */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            { value: "10M+", label: "Videos Processed" },
            { value: "99.9%", label: "Accuracy Rate" },
            { value: "50+", label: "Languages Supported" },
          ].map((stat, i) => (
            <RevealScroll delay={i / 6} key={i}>
              <div
                className={`rounded-2xl p-6 shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  darkMode
                    ? "bg-white/5 text-white border border-white/10"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <h3
                  className={`text-4xl font-bold mb-2 ${
                    darkMode ? "text-pink-500" : "text-purple-600"
                  }`}
                >
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
                  className={`text-lg ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            </RevealScroll>
          ))}
        </div>
      </div>
      <FAQs darkMode={darkMode} />
      <Footer darkMode={darkMode} />
      <Analytics />
    </div>
  );
};

export default Home;
