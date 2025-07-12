import { motion } from "framer-motion";
import { Youtube, Clock, FileText, Zap } from "lucide-react";
import RevealScroll from "./reveal";

const features = [
  {
    icon: <Youtube className="w-8 h-8 text-white" />,
    title: "YouTube Integration",
    desc: "Seamlessly process any YouTube video",
  },
  {
    icon: <Clock className="w-8 h-8 text-white" />,
    title: "Instant Processing",
    desc: "Get transcripts & summaries in seconds",
  },
  {
    icon: <FileText className="w-8 h-8 text-white" />,
    title: "Dual Output",
    desc: "Full transcripts plus AI-powered summaries",
  },
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: "AI-Powered",
    desc: "Smart summarization with key insights",
  },
];

const FeaturesSection = ({ darkMode }) => {
  const bgClass = darkMode
    ? "bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 "
    : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";

  const cardBase =
    "p-6 rounded-2xl border transition transform hover:scale-105 shadow-xl";
  const cardDark = "bg-black/20 border-white/10 text-white";
  const cardLight = "bg-white/40 border-white/30 text-gray-800";

  const iconBg = darkMode ? "bg-pink-500" : "bg-purple-400";

  return (
    <section id="why" className={`py-20 px-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-4xl font-extrabold mb-12 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Why Choose Transcriptify?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-8">
          {features.map((f, index) => (
            <RevealScroll delay={index / 7} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`${cardBase} ${
                  darkMode ? cardDark : cardLight
                } backdrop-blur-xl flex flex-col  items-center`}
              >
                <div
                  className={`w-14 h-14 mb-4 rounded-full  flex items-center justify-center ${iconBg}`}
                >
                  {f.icon}
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  {f.title}
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {f.desc}
                </p>
              </motion.div>
            </RevealScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
