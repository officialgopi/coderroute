import {
  Heart,
  Laugh,
  PartyPopper,
  HandMetal,
  HeartHandshake,
  Play,
} from "lucide-react";
import { motion } from "motion/react";

const icons = [Heart, Laugh, PartyPopper, HandMetal, HeartHandshake];

const SheetsCard = () => {
  const Icon = icons[Math.floor(Math.random() * icons.length)];
  return (
    <motion.div className="border relative h-[300px] w-[250px]  rounded-sm flex flex-col overflow-hidden">
      <div className="p-2 flex relative h-1/2 border-b overflow-hidden bg-gradient-to-r from-transparent to-green-200 dark:to-purple-900/20">
        <Icon className="absolute top-[50%] translate-y-[-50%] left-0 w-[140px] h-[140px] opacity-50 translate-x-[-30%] rotate-[40deg] " />{" "}
      </div>
      <button className="absolute rounded-[100%] z-10 border  top-1/2 translate-y-[-50%] right-[20px] p-3 dark:bg-neutral-950 bg-neutral-100 hover:dark:bg-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer">
        <motion.div
          initial={{ color: "#ff0000" }}
          animate={{
            color: [
              "#ff0000", // red
              "#ffa500", // orange
              "#ffff00", // yellow
              "#00ff00", // green
              "#00ffff", // cyan
              "#ff0000", // back to red to loop smoothly
            ],
          }}
          transition={{
            duration: 5, // total cycle duration
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Play className="w-10 h-10 " />
        </motion.div>
      </button>
      <div className="p-2"></div>
    </motion.div>
  );
};

export default SheetsCard;
