import { useState } from "react";
import SummaryPdf from "./summaryPdf";

const ShowSummary = ({ summary }) => {
  const [pdf, setPdf] = useState(false);
  if (pdf) {
    return (
      <div className="w-full h-screen border">
        <SummaryPdf summary={summary} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {summary &&
        summary.map((data, i) => (
          <div key={i} className="border p-4 rounded-md bg-white shadow-md">
            <h1 className="text-lg font-semibold mb-2">{data.heading}</h1>
            <ul className="list-disc list-inside space-y-1">
              {data.points.map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      <button
        onClick={() => setPdf(true)}
        className="px-5 py-1 bg-blue-950 text-gray-100 rounded-sm"
      >
        Download
      </button>
    </div>
  );
};

export default ShowSummary;
