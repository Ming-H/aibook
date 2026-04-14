import Link from "next/link";

const socials = [
  {
    name: "Twitter/X",
    url: "https://twitter.com/MingFire520",
    icon: "𝕏",
  },
  {
    name: "GitHub",
    url: "https://github.com/Ming-H",
    icon: "GH",
  },
  {
    name: "公众号",
    url: "#",
    icon: "公",
    label: "极客狐DevFox",
  },
  {
    name: "小红书",
    url: "#",
    icon: "书",
    label: "极客狐DevFox",
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {socials.map((s) => (
        <Link
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors"
          title={s.label || s.name}
        >
          <span className="w-7 h-7 rounded-full border border-[var(--border-color)] flex items-center justify-center text-xs font-medium">
            {s.icon}
          </span>
          <span>{s.name}</span>
        </Link>
      ))}
    </div>
  );
}
