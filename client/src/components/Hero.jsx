import RevealScroll from "./reveal";
import Search from "lucide-react";
const HeroSection = ({ darkMode }) => {
  return (
    <div>
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
    </div>
  );
};

export default HeroSection;
