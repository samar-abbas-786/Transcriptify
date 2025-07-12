import { motion } from "framer-motion";
import { Youtube, Clock, FileText, Zap } from "lucide-react";

const features = [
  {
    icon: (
      <Youtube className="w-10 h-10 text-indigo-600 dark:text-purple-400" />
    ),
    title: "YouTube Integration",
    desc: "Seamlessly process any YouTube video",
  },
  {
    icon: <Clock className="w-10 h-10 text-indigo-600 dark:text-purple-400" />,
    title: "Instant Processing",
    desc: "Get transcripts & summaries in seconds",
  },
  {
    icon: (
      <FileText className="w-10 h-10 text-indigo-600 dark:text-purple-400" />
    ),
    title: "Dual Output",
    desc: "Full transcripts plus AI-powered summaries",
  },
  {
    icon: <Zap className="w-10 h-10 text-indigo-600 dark:text-purple-400" />,
    title: "AI-Powered",
    desc: "Smart summarization with key insights",
  },
];

const FeaturesSection = ({ darkMode }) => {
  const bgClass = darkMode
    ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"
    : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";

  return (
    <section id="why" className={`py-20 px-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12"
        >
          Why Choose Transcriptify?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`p-6 rounded-xl border backdrop-blur-xl transition transform hover:scale-105 
                ${
                  darkMode
                    ? "bg-black/20 border-white/10"
                    : "bg-white/40 border-white/20"
                }`}
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
