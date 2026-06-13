// src/components/layout/UserAvatarDropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { User, LogOut, ChevronDown } from "lucide-react";
import { LogoutConfirmationModal } from "../auth/LogoutConfirmationModal";
import { useAuthStore } from "@/store/auth.store";

interface UserAvatarDropdownProps {
  user: {
    username: string;
    avatar?: string;
  };
}

export const UserAvatarDropdown: React.FC<UserAvatarDropdownProps> = ({
  user,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/login");
      setIsLogoutModalOpen(false);
    } catch {
      console.error("Failed to terminate anchor routing hooks cleanly.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      {/* 1. INTERACTIVE DROP TRIGGER PROFILE AVATAR BUTTON */}
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex items-center gap-1.5 p-0.5 rounded-full hover:bg-bg-secondary/60 border border-transparent hover:border-border-subtle transition-all duration-150 cursor-pointer focus-visible:outline-hidden group"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="w-7 h-7 rounded-full object-cover border border-border-subtle"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold font-mono font-bold text-xs flex items-center justify-center">
            {user.username.slice(0, 2).toUpperCase()}
          </div>
        )}
        <ChevronDown
          size={12}
          className={`text-text-muted transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* 2. FLOATING SELECTION PANEL GRID INTERFACE */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.99 }}
            className="absolute right-0 top-9 w-48 bg-bg-canvas/80 backdrop-blur-3xl border border-border-subtle rounded-xl shadow-2xl p-1.5 text-text-primary z-50 overflow-hidden"
          >
            <Link
              to={`/${user.username}`}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 h-8.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-primary/40 transition-colors w-full"
            >
              <User size={13} className="text-text-muted" />
              <span>View Profile</span>
            </Link>

            <div className="h-px bg-border-subtle/50 my-1 w-full" />

            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsLogoutModalOpen(true);
              }}
              className="flex items-center gap-2 px-3 h-8.5 rounded-lg text-xs font-medium text-text-muted hover:text-accent-crimson hover:bg-accent-crimson/5 transition-colors w-full cursor-pointer text-left"
            >
              <LogOut size={13} className="opacity-70" />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CONFIRMATION PORTAL TRIGGER ROUTE */}
      <LogoutConfirmationModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
};

export default React.memo(UserAvatarDropdown);
