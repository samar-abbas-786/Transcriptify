import { useLocation } from "react-router-dom";
import { useState } from "react";
import TranscriptPDFViewer from "./pdf";

const ShowTranscript = () => {
  const { state } = useLocation();
  const transcript = state?.transcript || "";

  const [pdf, setPdf] = useState(false);

  if (pdf) {
    return (
      <div className="w-full h-screen border-2 border-gray-100 rounded-lg overflow-hidden shadow-lg">
        <TranscriptPDFViewer transcript={transcript} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl border border-gray-100">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Transcript</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
      </div>

      <div className="max-h-[500px] overflow-y-auto p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
        {transcript ? (
          <div className="prose prose-sm max-w-none">
            <pre className="font-sans text-gray-700 leading-relaxed whitespace-pre-wrap">
              {transcript}
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-400 italic text-lg">
              No transcript available
            </p>
          </div>
        )}
      </div>

      {transcript && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setPdf(true)}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="text-lg">Export as PDF</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowTranscript;
