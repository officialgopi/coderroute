import { ThumbsUp, Eye, MessageSquare } from "lucide-react";

interface Props {
  likes: number;
  views: number;
  comments: number;
}

export const DiscussionStats = ({ likes, views, comments }: Props) => (
  <div className="flex items-center gap-4 text-neutral-400 text-sm">
    <div className="flex items-center gap-1">
      <ThumbsUp size={14} /> {likes}
    </div>
    <div className="flex items-center gap-1">
      <Eye size={14} /> {views}
    </div>
    <div className="flex items-center gap-1">
      <MessageSquare size={14} /> {comments}
    </div>
  </div>
);
