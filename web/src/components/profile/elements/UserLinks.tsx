import { memo } from "react";
import { Github, Linkedin, Globe, ArrowUpRight } from "lucide-react";

export const UserLinks = () => {
  // Navigation matrix configuration schema containing brand assets and verified route channels
  const channels = [
    { label: "GitHub", href: "https://github.com", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "Website", href: "https://google.com", icon: Globe },
  ];

  return (
    <div className="w-full flex flex-col gap-1 font-sans">
      {channels.map((link) => {
        const IconComponent = link.icon;

        return (
          <a
            key={`network-link-${link.label}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-8 px-2 rounded-lg border border-transparent hover:border-border-subtle/50 dark:hover:border-zinc-900 bg-transparent hover:bg-neutral-50 dark:hover:bg-zinc-900/30 flex items-center justify-between text-xs text-text-secondary hover:text-text-primary transition-all group outline-none"
          >
            {/* Left Hand: Descriptive Anchor Icon and Node Text */}
            <div className="flex items-center gap-2.5 min-w-0">
              <IconComponent
                size={13}
                className="text-text-secondary opacity-60 group-hover:opacity-100 transition-opacity shrink-0 stroke-[2.2]"
              />
              <span className="font-medium truncate">{link.label}</span>
            </div>

            {/* Right Hand: Context Direction Arrow Accent */}
            <ArrowUpRight
              size={11}
              className="text-text-secondary opacity-20 group-hover:opacity-60 group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-all shrink-0 stroke-[2.5]"
            />
          </a>
        );
      })}
    </div>
  );
};

export default memo(UserLinks);
