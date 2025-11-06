// components/UserLinks.tsx
import {
  Link as LinkIcon,
  Github,
  Globe,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

export function UserLinks({ links }: { links: { [key: string]: string } }) {
  const colors = [
    "text-blue-400 hover:text-blue-300",
    "text-green-400 hover:text-green-300",
    "text-yellow-400 hover:text-yellow-300",
    "text-pink-400 hover:text-pink-300",
    "text-purple-400 hover:text-purple-300",
  ];

  const iconMap: Record<string, React.ElementType> = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    website: Globe,
    portfolio: Globe,
    email: Mail,
  };

  return (
    <div className="flex gap-3 flex-wrap text-sm mt-3">
      {Object.entries(links).map(([key, value], idx) => {
        const Icon = iconMap[key.toLowerCase()] || LinkIcon;

        return (
          <a
            key={key}
            href={value}
            className={`${
              colors[idx % colors.length]
            } font-medium transition-colors capitalize flex items-center gap-1`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="w-4 h-4" />
            {key}
          </a>
        );
      })}
    </div>
  );
}
