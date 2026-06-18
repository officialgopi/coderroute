// src/components/shared/EditProfileModal.tsx
import React, { useState, useEffect, memo } from "react";
import ReactDOM from "react-dom";
import { X, Loader2, Sparkles, User, FileText, ArrowRight } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { profile, updateProfile, isMutating } = useUserStore();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  // Hydrate form inputs with pristine data out of the cache whenever the modal opens
  useEffect(() => {
    if (isOpen && profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
    }
  }, [isOpen, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim())
      return toast.error("Account display name cannot be blank.");

    try {
      const success = await updateProfile({
        name: name.trim(),
        bio: bio.trim(),
      });

      if (success) {
        toast.success("Developer credentials modified successfully.");
        onClose();
      } else {
        toast.error("Platform API rejected configuration payload.");
      }
    } catch {
      toast.error(
        "An unexpected workspace connection execution exception occurred.",
      );
    }
  };

  // 💎 REACT PORTAL CONTAINER SHEET TARGET DISPATCH
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 select-none">
          {/* --- ULTRA-SMOOTH FROSTED BACKDROP MASK MESH LAYER --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* --- THE TACTILE CONFIGURATION DIALOG CONSOLE --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
            className="w-full max-w-sm bg-bg-primary/95 backdrop-blur-2xl rounded-2xl font-sans text-xs border border-white/5 shadow-2xl relative overflow-visible p-6 space-y-5 z-10"
          >
            {/* Top Accent Gold Laser Trim */}
            <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />

            {/* Header Ribbon Track */}
            <div className="flex items-center justify-between border-b border-border-subtle/80 pb-3">
              <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase text-text-secondary">
                <Sparkles
                  size={11}
                  className="text-accent-gold animate-pulse"
                />
                <span>Modify Account Matrix</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer border-none bg-transparent outline-hidden"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>

            {/* Input Configuration Workspace */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field Row Alpha: User Profile Name */}
              <div className="space-y-1.5">
                <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] flex items-center gap-1">
                  <User size={10} className="text-accent-gold" />
                  <span>Display Profile Name</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isMutating}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Gopikanta Mondal"
                  className="w-full h-9.5 px-3 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 focus:border-text-primary/30 rounded-xl text-text-primary text-xs focus:outline-hidden transition-all shadow-inner font-sans font-medium disabled:opacity-40"
                />
              </div>

              {/* Field Row Beta: Developer Biography Headline */}
              <div className="space-y-1.5">
                <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] flex items-center gap-1">
                  <FileText size={10} className="text-text-muted/40" />
                  <span>Bio Headline Abstract</span>
                </label>
                <textarea
                  rows={3}
                  disabled={isMutating}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g., AI Full Stack Web Developer | System Architect"
                  className="w-full p-2.5 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 focus:border-text-primary/30 rounded-xl text-text-primary text-xs focus:outline-hidden transition-all shadow-inner font-sans font-medium resize-none leading-relaxed disabled:opacity-40"
                />
              </div>

              {/* Execution Submit Options Bar */}
              <div className="pt-2 flex gap-2 font-mono text-[10px] font-bold uppercase">
                <button
                  type="button"
                  disabled={isMutating}
                  onClick={onClose}
                  className="w-1/3 h-9.5 rounded-xl border border-border-subtle text-text-primary bg-bg-secondary hover:bg-bg-secondary/80 transition-all cursor-pointer active:scale-95 outline-hidden disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  disabled={isMutating}
                  type="submit"
                  className="flex-1 h-9.5 bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-700 disabled:text-neutral-400 rounded-xl font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all pt-0.5 cursor-pointer border-none outline-hidden"
                >
                  {isMutating ? (
                    <Loader2 size={12} className="animate-spin text-black" />
                  ) : (
                    <>
                      <span>Save Changes</span>
                      <ArrowRight size={11} strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default memo(EditProfileModal);
