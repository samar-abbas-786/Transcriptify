import { useLocation } from "react-router-dom";
import { useState } from "react";
import SummaryPdf from "./summaryPdf";

const ShowSummary = () => {
  const { state } = useLocation();
  const summary = state?.summary || [];

  const [pdf, setPdf] = useState(false);

  if (pdf) {
    return (
      <div className="w-full h-screen border-2 border-gray-200 rounded-lg overflow-hidden">
        <SummaryPdf summary={summary} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6 mb-8">
        {summary.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No summary data available.
          </p>
        ) : (
          summary.map((data, i) => (
            <div
              key={i}
              className="border border-gray-100 p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h1 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 border-gray-100">
                {data.heading}
              </h1>
              <ul className="space-y-2 pl-5">
                {data.points.map((point, j) => (
                  <li
                    key={j}
                    className="relative pl-5 text-gray-600 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {summary.length > 0 && (
        <button
          onClick={() => setPdf(true)}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download PDF
        </button>
      )}
    </div>
  );
};

export default ShowSummary;
