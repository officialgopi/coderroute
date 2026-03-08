import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    text: "CoderRoute completely changed how I practice coding. The structured sheets are amazing.",
  },
  {
    name: "Priya Patel",
    role: "Backend Developer",
    text: "The progress tracking and analytics helped me stay consistent with problem solving.",
  },
  {
    name: "Arjun Mehta",
    role: "CS Student",
    text: "Finally a platform where coding practice actually feels organized and motivating.",
  },
];

const Testimonials = () => {
  return (
    <section className="px-6 sm:px-10 lg:px-20 py-24" id="testimonials">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50 mb-14">
          What Developers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40 backdrop-blur-sm text-left"
            >
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                "{t.text}"
              </p>

              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-50">
                  {t.name}
                </p>
                <p className="text-sm text-neutral-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
