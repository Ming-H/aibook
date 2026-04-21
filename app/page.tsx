import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { Services } from '@/components/home/Services';
import { Cases } from '@/components/home/Cases';
import { Process } from '@/components/home/Process';
import { CTA } from '@/components/home/CTA';
import { ScrollAnimator } from '@/components/ScrollAnimator';

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
      <ScrollAnimator>
        <Hero />
        <Stats />
        <Services />
        <Cases />
        <Process />
        <CTA />
      </ScrollAnimator>
    </div>
  );
}
