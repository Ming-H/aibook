import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { Services } from '@/components/home/Services';
import { Cases } from '@/components/home/Cases';
import { Process } from '@/components/home/Process';
import { CTA } from '@/components/home/CTA';
import { ScrollAnimator } from '@/components/ScrollAnimator';

export const dynamic = 'force-static';

export const metadata = {
  title: 'DevFox AI — AI Agent 产品与自动化系统工作室',
  description:
    '为外部团队打造专业的 AI Agent 产品官网、自动化系统与可落地的智能工作流，兼顾产品体验与工程质量。',
  openGraph: {
    title: 'DevFox AI — AI Agent 产品与自动化系统工作室',
    description:
      '为外部团队打造专业的 AI Agent 产品官网、自动化系统与可落地的智能工作流。',
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
