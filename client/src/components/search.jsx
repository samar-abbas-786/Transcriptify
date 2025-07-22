import axios from "axios";
import { useState, useEffect } from "react";
import { Search as SearchIcon, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import RevealScroll from "./reveal";
import { useBg } from "../Context/background";
import { ToastContainer, toast } from "react-toastify";

const Search = () => {
  const API = "https://transcriptify-backend.onrender.com";

  // const API = "http://localhost:5000";
  const navigate = useNavigate();
  const [prevQuery, setPrevQuery] = useState(
    localStorage.getItem("query") || null
  );
  const [maxResults, setMaxResults] = useState(10);
  const [query, setQuery] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExtractingTranscript, setIsExtractingTranscript] = useState(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(null);
  const { darkMode, setDarkMode } = useBg();

  const theme = darkMode
    ? {
        background:
          "bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800",
        card: "bg-black/20 backdrop-blur-xl border-white/10 text-white",
        input: "bg-white/10 text-white placeholder-gray-300 border-white/20",
        button: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
        accent: "text-purple-400",
      }
    : {
        background: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
        card: "bg-white/40 backdrop-blur-xl border-white/20 text-gray-800",
        input: "bg-white/60 text-gray-800 placeholder-gray-500 border-white/30",
        button: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
        accent: "text-indigo-600",
      };

  const getSearchResult = async () => {
    try {
      if (prevQuery === query) {
        toast.warn("Please enter a different query.");
        return;
      }
      setIsLoading(true);
      const response = await axios.get(`${API}/search`, {
        params: { q: query, maxResults },
      });
      setData(response.data.items || []);

      localStorage.setItem("query", query);
      setPrevQuery(query);
    } catch (error) {
      console.error("Search failed", error);
      toast.warning("Token expired");

      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranscriptDownload = async (videoId) => {
    try {
      setIsExtractingTranscript(videoId);
      const res = await axios.post(`${API}/getTranscript`, { videoId });
      navigate("/transcript", { state: { transcript: res.data.transcript } });
    } catch (error) {
      console.error("Error getting transcript", error);
      toast.error("Failed to retrieve the transcript");
    } finally {
      setIsExtractingTranscript(false);
    }
  };

  const handleSummaryDownload = async (videoId) => {
    try {
      setIsGeneratingSummary(videoId);
      const res = await axios.post(`${API}/getTranscript`, { videoId });
      const summaryRes = await axios.post(`${API}/getSummary`, {
        transcript: res.data.transcript,
      });
      navigate("/summary", { state: { summary: summaryRes.data.summary } });
    } catch (error) {
      console.error("Error generating summary", error);
      toast.success("Error generating summary");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="font-sans">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <RevealScroll delay={0.3}>
        <div className={`min-h-screen ${theme.background} px-4 sm:px-8 py-10`}>
          <div className="text-center mb-8">
            <h1
              className={`text-2xl sm:text-3xl font-semibold ${
                darkMode
                  ? "text-white"
                  : "bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent"
              }`}
            >
              Search Inside YouTube Videos
            </h1>

            <p
              className={`mt-2 text-sm sm:text-base ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Search YouTube videos and download transcripts or summaries
            </p>
          </div>

          <div
            className={`max-w-2xl mx-auto p-4 rounded-xl shadow-md ${theme.card}`}
          >
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <input
                type="text"
                placeholder="Search videos..."
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-purple-500 ${theme.input}`}
              />
              <button
                onClick={() => {
                  setMaxResults(10);
                  getSearchResult();
                }}
                disabled={!query}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  theme.button
                } ${!query && "opacity-50 cursor-not-allowed"}`}
              >
                <SearchIcon className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          <div className="text-center mt-8 mb-4">
            <h2 className={`text-sm sm:text-base font-medium ${theme.accent}`}>
              {isLoading ? "Loading..." : `Results: ${data.length}`}
            </h2>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0">
            {data.map((item, index) => (
              <div
                className={`rounded-2xl p-4 shadow-lg transition hover:shadow-xl ${theme.card}`}
              >
                <h3 className="text-base font-medium mb-2 line-clamp-2 leading-snug">
                  {item.snippet.title}
                </h3>
                <iframe
                  className="w-full h-[200px] rounded-lg"
                  src={`https://www.youtube.com/embed/${item.id.videoId}`}
                  title="YouTube Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => handleTranscriptDownload(item.id.videoId)}
                    className="flex-1 py-2 px-4 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow"
                    disabled={isExtractingTranscript}
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    {isExtractingTranscript == item.id.videoId
                      ? "Extracting..."
                      : "Transcript"}
                  </button>
                  <button
                    onClick={() => handleSummaryDownload(item.id.videoId)}
                    className="flex-1 py-2 px-4 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow"
                    disabled={isGeneratingSummary}
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    {isGeneratingSummary == item.id.videoId
                      ? "Summarizing..."
                      : "Summary"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => setMaxResults((prev) => prev + 10)}
              disabled={isLoading}
              className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "More"}
            </button>
          </div>
        </div>
        <ToastContainer />
      </RevealScroll>
    </div>
  );
};

export default Search;
