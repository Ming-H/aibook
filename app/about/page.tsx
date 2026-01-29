'use client';

/**
 * About Page - GitHub Profile Style
 * Clean, minimal layout with tech badges and stats
*/

interface TechBadge {
  name: string;
  color: string;
}

export default function AboutPage() {
  const techStack: TechBadge[] = [
    { name: 'Python', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    { name: 'TypeScript', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    { name: 'Kotlin', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
    { name: 'Next.js', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300' },
    { name: 'React', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300' },
    { name: 'PostgreSQL', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    { name: 'LLM/RAG', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  ];

  const experiences = [
    {
      role: 'AI 工程师 & 独立开发者',
      focus: '构建 AI 驱动的产品并分享技术见解',
      expertise: ['LLM 应用开发', '全栈 Web 开发', '技术写作'],
    },
    {
      role: '技术博主',
      focus: '创作 AI/ML 领域的优质内容',
      expertise: ['AI 技术分析', '教程创作', '行业洞察'],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background-primary)]">
      {/* GitHub-style Profile Header */}
      <section className="px-6 py-8 md:py-12 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-[var(--background-secondary)] border-4 border-[var(--border-subtle)]">
                <img
                  src="/登山照.jpg"
                  alt="Ming Hao"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2 font-mono">
                Ming Hao
              </h1>
              <p className="text-xl text-[var(--text-secondary)] mb-4">
                DevFox AI
              </p>

              {/* Bio */}
              <p className="text-[var(--text-secondary)] leading-relaxed mb-5 max-w-2xl">
                构建智能工具并与社区分享知识。专注于 AI 技术的实际应用，从 LLM 应用开发到全栈 Web 开发，致力于让 AI 技术更容易被理解和使用。
              </p>

              {/* Follow Button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText('1518246548@qq.com');
                  alert('邮箱已复制！');
                }}
                className="btn-primary px-6 py-2 text-sm font-mono"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  复制邮箱
                </span>
              </button>

              {/* Info List */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>北京，中国</span>
                </div>
                <a
                  href="https://github.com/Ming-H"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span>Ming-H</span>
                </a>
                <a
                  href="https://x.com/MingFire520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>@MingFire520</span>
                </a>
                <a
                  href="https://dinq.me/devfoxai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>My DINQ</span>
                </a>
              </div>

              {/* Achievements */}
              <div className="flex flex-wrap gap-6 mt-5 pt-5 border-t border-[var(--border-subtle)] text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="text-[var(--text-primary)] font-semibold">10+</span>
                  <span className="text-[var(--text-secondary)]">开源项目</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-[var(--text-primary)] font-semibold">50+</span>
                  <span className="text-[var(--text-secondary)]">技术文章</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-[var(--text-primary)] font-semibold">1.5K+</span>
                  <span className="text-[var(--text-secondary)]">社交关注</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack - Badge Style */}
      <section className="px-6 py-8 md:py-10 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 font-mono">
            技术栈
          </h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${tech.color}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 font-mono">
            经验与专长
          </h2>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-[var(--border-subtle)] pl-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {exp.role}
                </h3>
                <p className="text-[var(--text-secondary)] mb-3">
                  {exp.focus}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.expertise.map((skill, i) => (
                    <span key={i} className="tag text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
