import { memo } from "react";
import { MessageSquare } from "lucide-react";

interface DiscussionStatsProps {
  replies: number;
  likes?: number; // Optional metadata parameter slots prepared for production extensions
  views?: number;
}

export const DiscussionStats = ({
  replies,
  likes = 0,
  views = 0,
}: DiscussionStatsProps) => {
  likes = Math.max(0, likes); // Ensure non-negative values
  views = Math.max(0, views);
  replies = Math.max(0, replies);
  return (
    <div className="flex items-center gap-3.5 font-mono text-[11px] text-text-secondary opacity-60 select-none">
      {/* 
        --- OPTIONAL METRIC: LIKES/VOTES COUNTER ---
        Un-comment this block when linking the vote state values from your store layer
        
        <div className="flex items-center gap-1 hover:text-text-primary transition-colors">
          <ThumbsUp size={12} className="stroke-[2.2]" /> 
          <span>{likes}</span>
        </div> 
      */}

      {/* 
        --- OPTIONAL METRIC: IMPRESSION VIEWS COUNTER ---
        Un-comment this block when linking analytics telemetry pipelines
        
        <div className="flex items-center gap-1 hover:text-text-primary transition-colors">
          <Eye size={12} className="stroke-[2.2]" /> 
          <span>{views}</span>
        </div> 
      */}

      {/* --- PLATFORM CHAT REPLY ENGAGEMENT INDEX --- */}
      <div className="flex items-center gap-1.5 hover:text-text-primary transition-colors">
        <MessageSquare size={12} className="stroke-[2.2] opacity-80" />
        <span className="font-sans font-medium">
          {replies} {replies === 1 ? "reply" : "replies"}
        </span>
      </div>
    </div>
  );
};

export default memo(DiscussionStats);
