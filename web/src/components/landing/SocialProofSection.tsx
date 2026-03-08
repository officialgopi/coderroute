import { motion } from "framer-motion";
import {
  FileCode,
  Braces,
  Coffee,
  Server,
  Atom,
  Container,
  Boxes,
  Cpu,
} from "lucide-react";

const techIcons = [
  { name: "JavaScript", icon: FileCode },
  { name: "Python", icon: Cpu },
  { name: "C++", icon: Braces },
  { name: "Java", icon: Coffee },
  { name: "Node.js", icon: Server },
  { name: "React", icon: Atom },
  { name: "Docker", icon: Container },
  { name: "Kubernetes", icon: Boxes },
];

const TechMarquee = ({ reverse = false }) => {
  const items = [...techIcons, ...techIcons];

  return (
    <motion.div
      className="flex gap-16"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "linear",
      }}
      id="social-proofs"
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="flex flex-col items-center justify-center min-w-[120px]"
          >
            <Icon className="w-8 h-8 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition" />
            <span className="text-xs mt-2 text-neutral-500">{item.name}</span>
          </div>
        );
      })}
    </motion.div>
  );
};

const SocialProof = () => {
  return (
    <section className="px-6 sm:px-10 lg:px-20 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Built with technologies developers love
        </p>
      </div>

      <div className="relative space-y-10 overflow-hidden">
        {/* gradient edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32  z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32  z-10" />

        <TechMarquee />
        <TechMarquee reverse />
      </div>
    </section>
  );
};

export default SocialProof;
