import { getAllPrompts, getPromptCategories } from "@/lib/prompts-loader";
import { PromptsClient } from "@/components/PromptsClient";

export const dynamic = "force-static";

export const metadata = {
  title: "提示词库 — DevFox AI",
  description: "精选 AI Prompt 模板，涵盖图片生成、写作、编程、分析等场景。",
};

export default function PromptsPage() {
  const items = getAllPrompts();
  const categories = getPromptCategories();

  return (
    <div className="max-w-[720px] mx-auto px-5 sm:px-8 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-3">提示词库</h1>
        <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
          精选 AI Prompt 模板，可直接复制使用。
        </p>
      </header>

      <PromptsClient items={items} categories={categories} />
    </div>
  );
}
