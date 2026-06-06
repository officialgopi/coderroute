// src/components/auth/LogoutConfirmationModal.tsx
import React from "react";
import { createPortal } from "react-dom";
import { LogOut, AlertTriangle } from "lucide-react";
import { CommandModal } from "../ui/CommandModal";

interface LogoutConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoggingOut?: boolean;
}

export const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
    open,
    onClose,
    onConfirm,
    isLoggingOut = false,
}) => {
    // Gracefully return null if the modal window is hidden to keep the DOM tree clean
    if (!open) return null;

    // Enforce standard client-side DOM container targeting strategy
    const portalRoot = document.getElementById("modal-root") || document.body;

    return createPortal(
        <CommandModal open={open} onClose={onClose}>
            <div className="w-full bg-bg-secondary text-text-primary overflow-hidden select-none">

                {/* VISUAL WARNING & HEADER AREA */}
                <div className="p-6 pb-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-crimson/5 border border-accent-crimson/10 flex items-center justify-center text-accent-crimson shrink-0 shadow-3xs">
                        <AlertTriangle size={18} />
                    </div>

                    <div className="space-y-1 mt-0.5">
                        <h1 className="text-base font-semibold tracking-tight text-text-primary">
                            Terminate Session?
                        </h1>
                        <p className="text-xs text-text-secondary leading-relaxed">
                            You are about to log out of your CoderRoute developer instance. Any unsaved compiler telemetry tracks or sandbox code state changes will be discarded.
                        </p>
                    </div>
                </div>

                {/* ACTIONS CONTROL FOOTER RIBBON */}
                <div className="h-14 px-6 bg-bg-primary border-t border-border-subtle flex items-center justify-end gap-2.5 font-mono text-[10px]">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoggingOut}
                        className="px-3.5 h-8 rounded-lg text-text-secondary hover:text-text-primary border border-transparent hover:border-border-subtle hover:bg-bg-secondary transition-all duration-150 cursor-pointer font-medium disabled:opacity-30"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoggingOut}
                        className="inline-flex items-center gap-1.5 h-8 px-4 bg-accent-crimson text-white font-bold rounded-lg uppercase tracking-wider hover:bg-opacity-90 active:scale-98 transition-all duration-150 cursor-pointer shadow-3xs disabled:opacity-40"
                    >
                        {isLoggingOut ? (
                            <span>Clearing Session...</span>
                        ) : (
                            <>
                                <LogOut size={11} className="stroke-[2.5]" />
                                <span>Confirm Logout</span>
                            </>
                        )}
                    </button>
                </div>

            </div>
        </CommandModal>,
        portalRoot
    );
};

export default React.memo(LogoutConfirmationModal);