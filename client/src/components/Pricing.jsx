import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const pricingPlans = [
  {
    title: "Basic",
    price: "Free",
    description: "Perfect for individuals trying it out.",
    features: ["1 Device Testing", "Limited Test Suite", "Community Support"],
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
  },
];

const PricingSection = ({ darkMode }) => {
  const background = darkMode
    ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"
    : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";

  const card = darkMode
    ? "bg-black/20 text-white border-white/10 backdrop-blur-xl"
    : "bg-white/50 text-gray-800 border-white/30 backdrop-blur-xl";

  const button =
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:brightness-110";
  const buttonSecondary = darkMode
    ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
    : "bg-white/70 text-gray-800 border border-white/30 hover:bg-white";

  return (
    <section id="pricing" className={`py-20 ${background}`}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-4xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Pricing Plans
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`mb-12 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Choose a plan that fits your needs. Start for free, scale when you're
          ready.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`p-8 rounded-2xl shadow-xl border transition-all duration-300 hover:scale-105 ${card}`}
            >
              <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
              <p className="text-3xl font-bold text-yellow-400 mb-4">
                {plan.price}
              </p>
              <p
                className={`${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } mb-6`}
              >
                {plan.description}
              </p>
              <ul className="text-left space-y-3">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-2 text-sm ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 px-6 py-2 rounded-full font-semibold ${
                  plan.title === "Enterprise" ? buttonSecondary : button
                }`}
              >
                {plan.title === "Enterprise" ? "Contact Sales" : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
