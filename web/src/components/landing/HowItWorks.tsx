import { motion } from "framer-motion";
import { Code2, Brain, BarChart3 } from "lucide-react";

const steps = [
  {
    title: "Choose a Coding Sheet",
    desc: "Pick curated coding sheets designed for interview preparation.",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    title: "Solve Problems",
    desc: "Use our advanced coding workspace to solve problems efficiently.",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    title: "Track Progress",
    desc: "Visualize your performance with detailed analytics dashboards.",
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="px-6 sm:px-10 lg:px-20 py-24" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40 backdrop-blur-sm"
            >
              <div className="mb-4 text-neutral-600 dark:text-neutral-400">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-50">
                {step.title}
              </h3>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
