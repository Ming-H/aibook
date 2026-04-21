import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { Services } from '@/components/home/Services';
import { Cases } from '@/components/home/Cases';
import { Process } from '@/components/home/Process';
import { CTA } from '@/components/home/CTA';
import { ScrollAnimator } from '@/components/ScrollAnimator';

export const dynamic = 'force-static';

export const metadata = {
  title: 'DevFox AI — 用 AI 重新定义业务效率',
  description:
    '专注 AI 落地应用和 Agent 系统开发。帮助企业设计、开发和部署 AI 应用，从战略规划到落地交付，端到端的 AI 解决方案。',
  openGraph: {
    title: 'DevFox AI — 用 AI 重新定义业务效率',
    description:
      '专注 AI 落地应用和 Agent 系统开发。帮助企业设计、开发和部署 AI 应用与 Agent 系统。',
  },
};

export default function HomePage() {
  return (
    <ScrollAnimator>
      <Hero />
      <Stats />
      <Services />
      <Cases />
      <Process />
      <CTA />
    </ScrollAnimator>
  );
}
