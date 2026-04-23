import { Hero } from '@/components/home/Hero';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { CTA } from '@/components/home/CTA';

export const dynamic = 'force-static';

export const metadata = {
  title: 'DevFox AI — AI Agent 与 AI 应用落地交付',
  description:
    '面向企业与个人提供 AI Agent、自动化工作流、知识检索和智能应用的落地交付服务。',
  openGraph: {
    title: 'DevFox AI — AI Agent 与 AI 应用落地交付',
    description:
      '面向企业与个人提供 AI Agent、自动化工作流、知识检索和智能应用的落地交付服务。',
  },
};

export default function HomePage() {
  return (
    <div className="page-shell">
      <Hero />
      <ProductShowcase />
      <CTA />
    </div>
  );
}
