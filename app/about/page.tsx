import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";

export const dynamic = "force-static";

export const metadata = {
  title: "关于 — DevFox AI",
  description: "DevFox AI，独立开发者，专注于 AI 技术与投资研究。",
};

const interests = [
  "大语言模型",
  "开发者工具",
  "价值投资",
  "技术写作",
  "AI 应用",
  "数据分析",
];

export default function AboutPage() {
  return (
    <div className="max-w-[680px] mx-auto px-5 sm:px-8 py-16">
      {/* Avatar & Name */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-full bg-[var(--background-secondary)] border border-[var(--border-default)] mx-auto mb-5 overflow-hidden">
          <Image src="/avatar.png" alt="DevFox AI" width={80} height={80} className="rounded-full" />
        </div>
        <h1 className="text-xl font-semibold mb-2 tracking-tight">DevFox AI</h1>
        <p className="text-xs text-[var(--text-tertiary)] tracking-wide">独立开发者 · AI 技术 · 投资</p>
      </div>

      {/* Bio */}
      <div className="space-y-4 text-sm text-[var(--text-tertiary)] leading-relaxed mb-12">
        <p>
          一个专注于 AI 技术的独立开发者。
        </p>
        <p>
          在 AI 算法领域深耕多年，经历过从传统机器学习到大语言模型的技术演进。相信技术的价值在于解决真实问题，所以一直在探索 AI 技术的落地应用。
        </p>
        <p>
          这个网站是记录和分享的空间。你会在这里找到 AI 技术的深度文章、开发的开源工具、每日 AI 行业动态，以及投资理财方面的思考。
        </p>
      </div>

      {/* Social */}
      <section className="mb-12">
        <h2 className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-4">社交媒体</h2>
        <SocialLinks />
      </section>

      {/* Interests */}
      <section className="mb-12">
        <h2 className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-4">关注领域</h2>
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <span key={item} className="tag">{item}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
