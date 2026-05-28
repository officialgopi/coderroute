// src/features/discussions/pages/CreateDiscussionPage.tsx
import React, { lazy, Suspense } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

// Lazy-loaded sub-modules
const DiscussionForm = lazy(
  () =>
    import("./../../components/discussions/create-discussion/DiscussionForm"),
);

export const CreateDiscussionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-gold/20 flex flex-col items-center px-4 py-12 md:py-20 antialiased">
      <div className="w-full max-w-2xl relative z-10">
        {/* SNAP-TRANSITION HEADER BOX BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1.5 mb-8 text-left"
        >
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-text-primary">
            Start a New Thread
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed tracking-tight">
            Propose structural questions, document runtime errors, or open
            algorithmic optimization tracks with the community.
          </p>
        </motion.div>

        {/* COMPONENT MOUNT HOUSING MODULE */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="w-full rounded-xl border border-border-subtle bg-bg-secondary/40 backdrop-blur-xs p-5 md:p-8 shadow-xs"
        >
          {/* Strict Height Preserving Hydration Boundary Box */}
          <Suspense fallback={<FormHydrationSkeleton />}>
            <DiscussionForm />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
};

// High-Fidelity Custom Skeleton to Eliminate Cumulative Layout Shift (CLS)
const FormHydrationSkeleton = () => (
  <div className="w-full min-h-[320px] flex flex-col justify-between animate-pulse space-y-6 py-2">
    <div className="space-y-2.5">
      <div className="h-3.5 bg-bg-surface/60 rounded-md w-1/4" />
      <div className="h-10 bg-bg-surface/40 rounded-lg w-full" />
    </div>
    <div className="space-y-2.5 flex-1 pt-2">
      <div className="h-3.5 bg-bg-surface/60 rounded-md w-1/5" />
      <div className="h-32 bg-bg-surface/40 rounded-lg w-full" />
    </div>
    <div className="h-9 bg-bg-surface/50 rounded-md w-28 ml-auto mt-4 flex items-center justify-center">
      <Loader2 size={14} className="animate-spin text-text-muted/40" />
    </div>
  </div>
);

// Lock default configuration pointer for matching lazy module hooks natively
export default CreateDiscussionPage;
