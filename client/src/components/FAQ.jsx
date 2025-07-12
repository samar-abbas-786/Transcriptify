import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What does Transcriptify do?",
    answer:
      "Transcriptify extracts full transcripts from any YouTube video and generates AI-powered summaries instantly.",
  },
  {
    question: "Is there a limit on video length?",
    answer:
      "Currently, Transcriptify supports videos up to 2 hours in length for optimal performance.",
  },
  {
    question: "Do I need to sign in to use it?",
    answer:
      "No sign-in is required! Just paste a YouTube URL and get started instantly.",
  },
  {
    question: "How accurate are the transcripts?",
    answer:
      "We use advanced AI models to ensure a high transcript accuracy of over 99%.",
  },
  {
    question: "Can I download the summary and transcript?",
    answer: "Yes! You can download both in one click after processing.",
  },
];

const FAQs = ({ darkMode }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const theme = darkMode
    ? {
        background:
          "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800",
        headingText: "text-white",
        question:
          "bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent",
        answer: "text-gray-400",
        border: "border-none",
        icon: "text-purple-400",
        card: "bg-white/5",
        shadow: "shadow-lg shadow-purple-500/10",
        hover: "hover:border-purple-500/30",
      }
    : {
        background: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
        headingText:
          "bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent",
        question: "text-gray-500",
        answer: "text-gray-700",
        border: "border-none",
        icon: "text-purple-600",
        card: "bg-white",
        shadow: "shadow-md shadow-purple-200/20",
        hover: "hover:border-purple-400/40",
      };

  return (
    <section className={`py-20 px-6 ${theme.background}`} id="faqs">
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-4xl font-extrabold text-center mb-10 ${theme.headingText}`}
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl border p-6 transition-all duration-300 ${theme.border} ${theme.card} ${theme.shadow} ${theme.hover}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full flex justify-between items-center"
                onClick={() => handleToggle(index)}
              >
                <span
                  className={`text-lg font-semibold text-left ${theme.question}`}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? (
                    <ChevronUp className={`w-5 h-5 ${theme.icon}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${theme.icon}`} />
                  )}
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      className={`mt-4 text-sm leading-relaxed ${theme.answer}`}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
