import { useState } from "react";
import TranscriptPDFViewer from "./pdf";

const ShowTranscript = ({ transcript }) => {
  const [pdf, setPdf] = useState(false);

  if (pdf) {
    return (
      <div className="w-full h-screen border">
        <TranscriptPDFViewer transcript={transcript} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Transcript</h2>

      <div className="max-h-[400px] overflow-y-auto p-4 bg-gray-50 rounded-md border border-gray-300 shadow-inner">
        {transcript ? (
          <p className="text-gray-800 leading-relaxed whitespace-pre-line font-medium">
            {transcript}
          </p>
        ) : (
          <p className="text-gray-400 italic">No transcript available.</p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setPdf(true)}
          className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
            />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ShowTranscript;
