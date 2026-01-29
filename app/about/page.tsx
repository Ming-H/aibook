'use client';

/**
 * About Page - Personal credentials and portfolio
 * Showcasing the creator behind DevFox AI
 */

import { useState } from 'react';

interface Achievement {
  number: string;
  label: string;
  icon: string;
}

interface TechSkill {
  name: string;
  category: string;
}

interface Project {
  name: string;
  description: string;
  tech: string[];
  url: string;
  stars?: string;
}

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  const achievements: Achievement[] = [
    { number: '10+', label: 'Open Source Projects', icon: '🚀' },
    { number: '50+', label: 'Technical Articles', icon: '📝' },
    { number: '1.5K+', label: 'Social Followers', icon: '👥' },
    { number: '3+', label: 'AI Products Built', icon: '🤖' },
  ];

  const techStack: TechSkill[] = [
    { name: 'Python', category: 'Languages' },
    { name: 'TypeScript', category: 'Languages' },
    { name: 'Kotlin', category: 'Languages' },
    { name: 'Next.js', category: 'Frameworks' },
    { name: 'React', category: 'Frameworks' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'LLM/RAG', category: 'AI/ML' },
    { name: 'Vercel', category: 'Infrastructure' },
  ];

  const projects: Project[] = [
    {
      name: 'aibook',
      description: 'AI technology showcase platform with daily updates on LLM breakthroughs and industry insights',
      tech: ['Next.js', 'TypeScript', 'GitHub API'],
      url: 'https://github.com/devfoxaicn/aibook',
      stars: '2',
    },
    {
      name: 'content-forge-ai',
      description: 'AI content generation toolkit specializing in demos and practical utilities',
      tech: ['Python', 'Kotlin', 'TypeScript'],
      url: 'https://github.com/devfoxaicn/content-forge-ai',
      stars: '1',
    },
  ];

  const experiences = [
    {
      role: 'AI Engineer & Independent Developer',
      focus: 'Building AI-powered products and sharing technical insights',
      expertise: ['LLM Application Development', 'Full-Stack Web Development', 'Technical Writing'],
    },
    {
      role: 'Tech Blogger',
      focus: 'Creating accessible content on AI/ML topics',
      expertise: ['AI Technology Analysis', 'Tutorial Creation', 'Industry Insights'],
    },
  ];

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background-primary)]">
      {/* Hero Section with Climbing Photo */}
      <section className="relative px-6 py-16 md:py-24 bg-[var(--background-secondary)] overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo Section */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Main photo container */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-4 border-[var(--border-medium)] bg-[var(--background-tertiary)] group">
                  {/* Climbing photo */}
                  <img
                    src="https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/d18386b8-fa1d-418b-8078-2186a719c605/bc3cf29bc91cb9b2550d6edcc8508574.jpg?UCloudPublicKey=TOKEN_e15ba47a-d098-4fbd-9afc-a0dcf0e4e621&Expires=1769690990&Signature=MA5hlhZvYAsYqz0R5XWc/qh7/5k="
                    alt="Ming Hao - Climbing"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Hover overlay with social links */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                    <div className="flex gap-4">
                      <a
                        href="https://github.com/Ming-H"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                        aria-label="GitHub"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a
                        href="https://x.com/MingFire520"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                        aria-label="X (Twitter)"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Floating info card */}
                <div className="absolute -bottom-6 -right-6 card p-6 max-w-xs hidden lg:block">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-mono text-[var(--text-secondary)]">Available for work</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    Open to collaborations and freelance projects
                  </p>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="order-1 lg:order-2">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-mono text-sm font-bold mb-4">
                  About the Creator
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] mb-4 font-mono tracking-tight">
                  Ming Hao
                  <span className="block text-2xl md:text-3xl text-[var(--text-secondary)] mt-2">
                    极客狐 DevFox
                  </span>
                </h1>
                <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl">
                  AI Engineer, Independent Developer, and Tech Writer building intelligent tools and sharing knowledge with the community
                </p>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-sm font-mono text-[var(--text-secondary)] mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  <span>Master's, Beijing Univ. of Technology</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Beijing, China</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:1518246548@qq.com"
                  className="btn-primary px-8 py-4 inline-flex items-center gap-2 font-mono font-bold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Get in Touch</span>
                </a>
                <a
                  href="https://github.com/Ming-H"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-8 py-4 inline-flex items-center gap-2 font-mono font-bold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Stats */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="card p-8 text-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  <div className="text-4xl font-black text-[var(--text-primary)] mb-2 font-mono">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] font-mono">
                    {achievement.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      <section className="relative px-6 py-16 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-4 font-mono tracking-tight">
              Experience & Expertise
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Building at the intersection of AI engineering and full-stack development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((exp, index) => (
              <div key={index} className="card p-8">
                <h3 className="text-2xl font-black text-[var(--text-primary)] mb-3 font-mono">
                  {exp.role}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {exp.focus}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.expertise.map((skill, i) => (
                    <span key={i} className="tag font-mono text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-4 font-mono tracking-tight">
              Tech Stack
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Tools and technologies I use to bring ideas to life
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="card-interactive card px-6 py-4 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-125 transition-transform"></div>
                  <div>
                    <div className="text-[var(--text-primary)] font-mono font-bold">
                      {tech.name}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] font-mono">
                      {tech.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative px-6 py-16 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-2 font-mono tracking-tight">
                Open Source Projects
              </h2>
              <p className="text-[var(--text-secondary)]">
                Public repositories showcasing my work
              </p>
            </div>
            <a
              href="https://github.com/Ming-H?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-md font-mono text-[var(--text-primary)] border-2 border-[var(--border-subtle)] hover:bg-[var(--background-tertiary)] hover:border-[var(--border-default)] transition-all duration-200 font-bold"
            >
              <span>View All</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-interactive card p-8 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-[var(--text-primary)] mb-2 font-mono group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all">
                        {project.name}
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    {project.stars && (
                      <div className="flex items-center gap-1 text-[var(--text-muted)] ml-4">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="font-mono font-bold">{project.stars}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="tag font-mono text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="card p-12">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-4 font-mono tracking-tight">
              Let's Connect
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Interested in collaboration, freelance work, or just want to chat about AI and tech?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="mailto:1518246548@qq.com"
                className="btn-primary px-10 py-4 inline-flex items-center gap-3 font-mono font-bold text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>1518246548@qq.com</span>
              </a>
            </div>

            <div className="flex justify-center gap-4 text-sm font-mono text-[var(--text-muted)]">
              <a
                href="https://github.com/Ming-H"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
              <span>•</span>
              <a
                href="https://x.com/MingFire520"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
