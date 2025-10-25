import { env } from "@/env";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl shadow-lg dark:shadow-black/40 p-8 sm:p-10 flex flex-col items-center gap-6"
      >
        {/* Logo + App Name */}
        <div className="flex flex-col items-center gap-2 text-center">
          <img
            src="/coderroute.png" // replace with your logo path
            alt="CoderRoute Logo"
            className="w-20 h-20 sm:w-24 sm:h-24"
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 font-poppins">
            Coder
            <span className="text-neutral-500 dark:text-neutral-400">
              Route
            </span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 text-center max-w-xs">
            Sign in with Google to continue your coding journey and track your
            progress.
          </p>
        </div>

        {/* Google OAuth Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 font-medium rounded-lg shadow-md dark:shadow-black/40 hover:shadow-[0_0_20px_rgba(100,100,255,0.2)] transition-all"
          onClick={() => {
            window.location.href = `${env.VITE_API_BASE_URL}/api/auth/google`;
          }}
        >
          <FcGoogle className="w-6 h-6" />
          Continue with Google
        </motion.button>

        {/* Optional Footer Text */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4 text-center">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="underline hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            Terms & Conditions
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
