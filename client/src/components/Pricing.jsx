import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import RevealScroll from "./reveal";

const pricingPlans = [
  {
    title: "Basic",
    price: "Free",
    description: "Perfect for individuals trying it out.",
    features: ["1 Device Testing", "Limited Test Suite", "Community Support"],
    popular: false,
  },
  {
    title: "Pro",
    price: "$19/mo",
    description: "Ideal for startups and teams.",
    features: [
      "Up to 10 Devices",
      "Unlimited Test Cases",
      "Email Support",
      "Reports & Analytics",
    ],
    popular: true,
  },
  {
    title: "Enterprise",
    price: "Contact Us",
    description: "Best for large-scale deployment.",
    features: [
      "Unlimited Devices",
      "Custom Test Suite Integration",
      "Priority Support",
      "Dedicated Engineer",
    ],
    popular: false,
  },
];

const PricingSection = ({ darkMode }) => {
  const background = darkMode
    ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"
    : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";

  const card = darkMode
    ? "bg-black/30 text-white border-white/10 backdrop-blur-xl"
    : "bg-white/70 text-gray-900 border-white/30 backdrop-blur-xl";

  const button = darkMode
    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110 shadow-lg hover:shadow-pink-500/40 transition duration-300"
    : "bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:brightness-110 shadow-lg hover:shadow-pink-500/40 transition duration-300";

  const buttonSecondary = darkMode
    ? "bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
    : "bg-white/80 text-gray-800 border border-white/30 hover:bg-white transition";

  return (
    <section id="pricing" className={`py-24 ${background}`}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-4xl font-extrabold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Pricing Plans
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`mb-12 text-lg ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Choose a plan that fits your needs. Start for free, scale when you're
          ready.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10">
          {pricingPlans.map((plan, i) => (
            <RevealScroll key={i} delay={i / 7}>
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className={`relative p-8 pt-12 rounded-3xl border shadow-2xl hover:shadow-purple-600/30 transition-all duration-300 ${card}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-yellow-400 text-black px-4 py-1 text-xs font-semibold rounded-full shadow-md">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
                <p
                  className={`text-3xl font-extrabold mb-3 ${
                    darkMode ? "text-yellow-500" : "text-yellow-500"
                  }`}
                >
                  {plan.price}
                </p>
                <p
                  className={`mb-6 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {plan.description}
                </p>
                <ul className="text-left space-y-3">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-center gap-2 text-base ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full px-6 py-3 rounded-full font-semibold text-sm tracking-wide ${
                    plan.title === "Enterprise" ? button : button
                  }`}
                >
                  {plan.title === "Enterprise"
                    ? "Contact Sales"
                    : "Get Started"}
                </button>
              </motion.div>
            </RevealScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
