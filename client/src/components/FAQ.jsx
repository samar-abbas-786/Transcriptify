import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock RevealScroll component
const RevealScroll = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const faqs = [
  {
    question: "What does Transcriptify do?",
    answer:
      "Transcriptify extracts full transcripts from any YouTube video and generates AI-powered summaries instantly.",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    question: "Is there a limit on video length?",
    answer:
      "Currently, Transcriptify supports videos up to 2 hours in length for optimal performance.",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    question: "Do I need to sign in to use it?",
    answer:
      "No sign-in is required! Just paste a YouTube URL and get started instantly.",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    question: "How accurate are the transcripts?",
    answer:
      "We use advanced AI models to ensure a high transcript accuracy of over 99%.",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    question: "Can I download the summary and transcript?",
    answer: "Yes! You can download both in one click after processing.",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

const FAQs = ({ darkMode = true }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const theme = darkMode
    ? {
        background:
          "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800",
        headingText: "text-white",
        question: "text-white",
        answer: "text-gray-200",
        border: "border border-purple-500/20",
        icon: "text-purple-400",
        card: "bg-gray-900/80 backdrop-blur-sm",
        shadow: "shadow-2xl shadow-purple-500/20",
        hover:
          "hover:border-purple-400/50 hover:shadow-purple-500/30 hover:bg-gray-900/90",
        glow: "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-purple-500/20 before:to-pink-500/20 before:blur-xl before:-z-10",
        questionIcon: "text-purple-300",
        expandIcon: "text-purple-400",
        expandIconHover: "group-hover:text-purple-300",
        badgeText: "text-purple-400",
        badgeBg: "bg-purple-500/10 border-purple-500/20",
        badgeIcon: "text-purple-400",
        descText: "text-gray-300",
        questionIconBg: "bg-purple-500/20",
        expandIconBg: "bg-purple-500/10",
        dividerBg:
          "bg-gradient-to-r from-transparent via-purple-500/30 to-transparent",
        ctaButton:
          "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25",
      }
    : {
        background: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
        headingText:
          "bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent",
        question: "text-gray-700",
        answer: "text-gray-600",
        border: "border border-purple-200/50",
        icon: "text-purple-600",
        card: "bg-white/80 backdrop-blur-sm",
        shadow: "shadow-lg shadow-purple-200/30",
        hover:
          "hover:border-purple-300/70 hover:shadow-purple-200/50 hover:bg-white/90",
        glow: "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-purple-200/30 before:to-pink-200/30 before:blur-xl before:-z-10",
        questionIcon: "text-purple-500",
        expandIcon: "text-purple-600",
        expandIconHover: "group-hover:text-purple-500",
      };

  return (
    <section
      className={`py-24 px-6 ${theme.background} relative overflow-hidden`}
      id="faqs"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 ${
            darkMode ? "bg-purple-500/10" : "bg-purple-500/10"
          } rounded-full blur-3xl`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 ${
            darkMode ? "bg-pink-500/10" : "bg-pink-500/10"
          } rounded-full blur-3xl`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${
            darkMode ? "bg-indigo-500/5" : "bg-indigo-500/5"
          } rounded-full blur-3xl`}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <RevealScroll>
          <div className="text-center mb-16">
            <motion.div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                darkMode
                  ? theme.badgeBg
                  : "bg-purple-500/10 border border-purple-500/20"
              } mb-6`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles
                className={`w-4 h-4 ${
                  darkMode ? theme.badgeIcon : "text-purple-400"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  darkMode ? theme.badgeText : "text-purple-400"
                }`}
              >
                Got Questions?
              </span>
            </motion.div>
            <h2 className={`text-5xl font-bold mb-4 ${theme.headingText}`}>
              Frequently Asked Questions
            </h2>
            <p
              className={`text-lg ${
                darkMode ? theme.descText : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Find answers to common questions about Transcriptify and how it
              works
            </p>
          </div>
        </RevealScroll>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <RevealScroll key={index} delay={index * 0.1}>
              <motion.div
                className={`rounded-2xl transition-all duration-500 relative group ${theme.border} ${theme.card} ${theme.shadow} ${theme.hover} ${theme.glow}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <button
                  className="w-full flex justify-between items-center p-8 group"
                  onClick={() => handleToggle(index)}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`p-2 rounded-lg ${
                        darkMode ? theme.questionIconBg : "bg-purple-100"
                      } ${theme.questionIcon}`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {faq.icon}
                    </motion.div>
                    <span
                      className={`text-xl font-semibold text-left ${theme.question}`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className={`p-2 rounded-lg ${
                      darkMode ? theme.expandIconBg : "bg-purple-50"
                    } ${theme.expandIcon} ${
                      theme.expandIconHover
                    } transition-colors duration-300`}
                  >
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
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
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8">
                        <motion.div
                          className={`w-full h-px ${
                            darkMode
                              ? theme.dividerBg
                              : "bg-gradient-to-r from-transparent via-purple-300/50 to-transparent"
                          } mb-6`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                        <motion.p
                          className={`text-lg leading-relaxed ${theme.answer}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </RevealScroll>
          ))}
        </div>

        {/* Bottom CTA */}
        <RevealScroll delay={0.6}>
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className={`text-lg mb-6 ${
                darkMode ? theme.descText : "text-gray-600"
              }`}
            >
              Still have questions?
            </p>
            <motion.button
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                darkMode
                  ? theme.ctaButton
                  : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </RevealScroll>
      </div>
    </section>
  );
};

export default FAQs;
