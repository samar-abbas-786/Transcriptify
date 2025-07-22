import RevealScroll from "./Reveal";
import { Search } from "lucide-react";

const HeroSection = ({
  darkMode,
  videoId,
  setUrl,
  handleSubmit,
  handleDownloadTranscript,
  handleDownloadSummary,
  isExtractingTranscript,
  isDownloadingTranscript,
  isGeneratingSummary,
  transcript,
  theme,
}) => {
  return (
    <section className="bg-transparent py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <RevealScroll delay={0.2}>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Turn YouTube Videos Into
            </span>
            <br />
            <span className={darkMode ? "text-white" : "text-gray-900"}>
              Transcripts & Summaries
            </span>
          </h1>
        </RevealScroll>

        {/* Subtitle */}
        <RevealScroll delay={0.3}>
          <p
            className={`mt-4 text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Paste any YouTube URL to extract transcripts and generate summaries
          </p>
        </RevealScroll>

        {/* Input Box */}
        <div className="mt-10">
          <div className="relative w-full max-w-xl mx-auto">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="https://youtube.com/watch?v=..."
              onChange={(e) => setUrl(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm sm:text-base transition-all duration-200 ${theme.input}`}
            />
          </div>

          {/* Video Preview */}
          {videoId && (
            <div className={`mt-6 p-4 rounded-xl shadow-md ${theme.card}`}>
              <iframe
                className="w-full h-[40vh] rounded-lg"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSubmit}
              disabled={!videoId || isExtractingTranscript}
              className={`flex-1 min-w-[180px] py-3 rounded-xl font-semibold transition duration-200 ${
                videoId && !isExtractingTranscript
                  ? theme.button + " hover:brightness-110"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isExtractingTranscript ? "Processing..." : "Extract Transcript"}
            </button>

            <button
              onClick={handleDownloadTranscript}
              disabled={!transcript || isDownloadingTranscript}
              className={`flex-1 min-w-[180px] py-3 rounded-xl font-semibold transition duration-200 ${
                transcript && !isDownloadingTranscript
                  ? theme.button + " hover:brightness-110"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isDownloadingTranscript ? "Preparing..." : "Download Transcript"}
            </button>

            <button
              onClick={handleDownloadSummary}
              disabled={!transcript || isGeneratingSummary}
              className={`flex-1 min-w-[180px] py-3 rounded-xl font-semibold transition duration-200 ${
                transcript && !isGeneratingSummary
                  ? theme.button + " hover:brightness-110"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isGeneratingSummary ? "Generating..." : "Download Summary"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
