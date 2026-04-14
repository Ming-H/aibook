import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";

export const dynamic = "force-static";

export const metadata = {
  title: "关于 — 极客狐 DevFox",
  description: "极客狐 DevFox，独立开发者，专注于 AI 技术与投资研究。",
};

const interests = [
  { icon: "🤖", label: "大语言模型" },
  { icon: "🔧", label: "开发者工具" },
  { icon: "📊", label: "价值投资" },
  { icon: "📝", label: "技术写作" },
  { icon: "🧪", label: "AI 应用开发" },
  { icon: "📈", label: "数据分析" },
];

export default function AboutPage() {
  return (
    <div className="max-w-[700px] mx-auto px-4 md:px-6 py-12">
      {/* Avatar & Name */}
      <div className="text-center mb-10">
        <div className="w-28 h-28 rounded-full bg-[var(--background-secondary)] border border-[var(--border-color)] mx-auto mb-5 overflow-hidden">
          <Image src="/avatar.png" alt="极客狐 DevFox" width={112} height={112} className="rounded-full" />
        </div>
        <h1 className="text-3xl font-bold mb-2">极客狐 DevFox</h1>
        <p className="text-[var(--text-secondary)]">独立开发者 · AI 技术探索者 · 投资爱好者</p>
      </div>

      {/* Bio */}
      <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed mb-10">
        <p>
          你好，我是极客狐，一个专注于 AI 技术的独立开发者。
        </p>
        <p>
          在 AI 算法领域深耕多年，经历过从传统机器学习到大语言模型的技术演进。我相信技术的价值在于解决真实问题，所以一直在探索 AI 技术的落地应用。
        </p>
        <p>
          这个网站是我记录和分享的空间。你会在这里找到 AI 技术的深度文章、我开发的开源工具、每日 AI 行业动态，以及一些投资理财方面的思考。
        </p>
      </div>

      {/* Social Links */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">社交媒体</h2>
        <SocialLinks />
      </section>

      {/* Interests */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">关注领域</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {interests.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 p-3 rounded-lg border border-[var(--border-color)] text-sm"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-lg font-semibold mb-4">联系方式</h2>
        <p className="text-[var(--text-secondary)]">
          欢迎通过以下方式联系我：Twitter/X、微信公众号（极客狐DevFox）、小红书（极客狐DevFox）。
        </p>
      </section>
    </div>
  );
}
