/**
 * 试卷预览页面
 * 显示生成的试卷并支持下载
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Quiz } from '@/lib/glm-api';
import { exportQuiz } from '@/lib/glm-api';

// HTML 转义辅助函数
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export default function QuizPreviewPage() {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloadFormat, setDownloadFormat] = useState<'docx' | 'image' | 'json' | 'text' | 'markdown'>('docx');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // 从 sessionStorage 读取试卷数据
    const quizData = sessionStorage.getItem('generatedQuiz');
    if (!quizData) {
      router.push('/quiz-generator/create');
      return;
    }

    try {
      setQuiz(JSON.parse(quizData));
    } catch (error) {
      console.error('Failed to parse quiz data:', error);
      router.push('/quiz-generator/create');
    } finally {
      setLoading(false);
    }
  }, [router]);

  // 下载试卷
  const handleDownload = async () => {
    if (!quiz) return;

    setIsDownloading(true);

    try {
      const fileName = `${quiz.title}`;

      switch (downloadFormat) {
        case 'docx': {
          const docxModule = await import('docx');
          const { Document, Packer, Paragraph, AlignmentType, HeadingLevel } = docxModule;

          const doc = new Document({
            sections: [{
              properties: {},
              children: [
                new Paragraph({
                  text: quiz.title,
                  heading: HeadingLevel.HEADING_1,
                  alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                  text: `学科：${quiz.subject}  年级：${quiz.grade}  难度：${
                    quiz.difficulty === 'easy' ? '简单' : quiz.difficulty === 'medium' ? '中等' : '困难'
                  }  总分：${quiz.totalPoints}分`,
                  alignment: AlignmentType.CENTER,
                }),
                ...quiz.questions.flatMap((question, index) => [
                  new Paragraph({
                    text: `${index + 1}. ${question.content}  (${question.points}分)`,
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...(question.type === 'choice' && question.options
                    ? question.options.map((option, i) => new Paragraph({
                        text: `${String.fromCharCode(65 + i)}. ${option}`,
                        bullet: {
                          level: 0,
                        },
                      }))
                    : []
                  ),
                  new Paragraph(''),
                ]),
              ],
            }],
          });

          const blob = await Packer.toBlob(doc);

          // 使用原生下载方式
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${fileName}.docx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          break;
        }

        case 'image': {
          const { default: html2canvas } = await import('html2canvas');

          // 创建一个临时的 DOM 元素来渲染试卷
          const element = document.createElement('div');
          element.style.position = 'absolute';
          element.style.left = '-9999px';
          element.style.width = '800px';
          element.style.padding = '40px';
          element.style.background = 'white';
          element.style.fontFamily = 'Arial, sans-serif';

          element.innerHTML = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h1 style="text-align: center; color: #333;">${quiz.title}</h1>
              <div style="text-align: center; color: #666; margin-bottom: 20px;">
                学科：${quiz.subject} | 年级：${quiz.grade} | 难度：${
                  quiz.difficulty === 'easy' ? '简单' : quiz.difficulty === 'medium' ? '中等' : '困难'
                } | 总分：${quiz.totalPoints}分
              </div>
              <hr style="border: 1px solid #ddd; margin: 20px 0;" />
              ${quiz.questions.map((question, index) => `
                <div style="margin-bottom: 25px;">
                  <h3 style="color: #333; font-size: 16px;">${index + 1}. ${question.content} (${question.points}分)</h3>
                  ${question.type === 'choice' && question.options ? `
                    <div style="margin-left: 20px;">
                      ${question.options.map((option, i) => `
                        <div style="margin: 5px 0; color: #666;">${String.fromCharCode(65 + i)}. ${option}</div>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          `;

          document.body.appendChild(element);

          try {
            const canvas = await html2canvas(element, {
              scale: 2,
              useCORS: true,
              logging: false,
            });

            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${fileName}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }
            });
          } finally {
            document.body.removeChild(element);
          }
          break;
        }

        default: {
          const content = exportQuiz(quiz, downloadFormat as 'json' | 'text' | 'markdown');
          const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${fileName}.${downloadFormat === 'text' ? 'txt' : downloadFormat === 'markdown' ? 'md' : 'json'}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('下载失败：' + (error instanceof Error ? error.message : '未知错误'));
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-surface page-surface-soft flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand)]"></div>
          <p className="mt-4 text-[var(--text-secondary)]">加载中...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return null;
  }

  return (
    <div className="page-surface page-surface-soft">
      {/* 页面头部 */}
      <div className="max-w-4xl mx-auto px-6 py-12 sm:px-8">
        <Link
          href="/quiz-generator/create"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回修改
        </Link>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">试卷预览</h1>
          <div className="flex items-center gap-3">
            <select
              value={downloadFormat}
              onChange={(e) => setDownloadFormat(e.target.value as 'docx' | 'image' | 'json' | 'text' | 'markdown')}
              className="px-4 py-2 bg-[var(--background-secondary)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <option value="docx">📝 Word 文档</option>
              <option value="image">🖼️ 图片 (PNG)</option>
              <option value="markdown">📋 Markdown</option>
              <option value="text">📄 纯文本</option>
              <option value="json">🔧 JSON 数据</option>
            </select>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-6 py-2 bg-[var(--gradient-primary)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>生成中...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  下载试卷
                </>
              )}
            </button>
          </div>
        </div>

        {/* 试卷信息 */}
        <div className="mb-8 p-6 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{quiz.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-[var(--text-muted)]">学科：</span>
              <span className="text-[var(--text-primary)] font-medium">{quiz.subject}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">年级：</span>
              <span className="text-[var(--text-primary)] font-medium">{quiz.grade}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">难度：</span>
              <span className="text-[var(--text-primary)] font-medium">
                {quiz.difficulty === 'easy' ? '简单' : quiz.difficulty === 'medium' ? '中等' : '困难'}
              </span>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">总分：</span>
              <span className="text-[var(--color-brand)] font-bold">{quiz.totalPoints} 分</span>
            </div>
          </div>
        </div>

        {/* 题目列表 */}
        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div
              key={question.id}
              className="p-6 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--border-strong)] transition-all"
            >
              {/* 题目头部 */}
              <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--gradient-primary)] text-white flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      question.type === 'choice'
                        ? 'bg-blue-500/20 text-blue-400'
                        : question.type === 'fill-blank'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {question.type === 'choice' ? '选择题' : question.type === 'fill-blank' ? '填空题' : '简答题'}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {question.points} 分
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      question.difficulty === 'easy'
                        ? 'bg-gray-500/20 text-gray-400'
                        : question.difficulty === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {question.difficulty === 'easy' ? '简单' : question.difficulty === 'medium' ? '中等' : '困难'}
                    </span>
                  </div>

                  {/* 题目内容 */}
                  <p className="text-[var(--text-primary)] font-medium mb-4">{question.content}</p>

                  {/* 选择题选项 */}
                  {question.type === 'choice' && question.options && (
                    <div className="space-y-2 ml-4">
                      {question.options.map((option, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 p-3 rounded-lg ${
                            question.correctAnswer === String.fromCharCode(65 + i)
                              ? 'bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/30'
                              : 'bg-[var(--background-tertiary)]'
                          }`}
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--background-secondary)] border border-[var(--border-default)] flex items-center justify-center text-xs font-medium text-[var(--text-secondary)]">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-[var(--text-secondary)]">{option}</span>
                          {question.correctAnswer === String.fromCharCode(65 + i) && (
                            <span className="ml-auto text-xs text-[var(--color-brand)]">✓ 正确答案</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 填空题答案 */}
                  {question.type === 'fill-blank' && (
                    <div className="mt-3 p-3 bg-[var(--background-tertiary)] rounded-lg">
                      <span className="text-xs text-[var(--text-muted)] mb-1">答案：</span>
                      <span className="text-[var(--color-brand)] font-medium">
                        {Array.isArray(question.correctAnswer) ? question.correctAnswer.join('、') : question.correctAnswer}
                      </span>
                    </div>
                  )}

                  {/* 简答题答案要点 */}
                  {question.type === 'short-answer' && (
                    <div className="mt-3 p-3 bg-[var(--background-tertiary)] rounded-lg">
                      <span className="text-xs text-[var(--text-muted)] mb-1">参考答案：</span>
                      <p className="text-[var(--text-secondary)] text-sm">
                        {Array.isArray(question.correctAnswer) ? question.correctAnswer.join('；') : question.correctAnswer}
                      </p>
                    </div>
                  )}

                  {/* 解析 */}
                  {question.explanation && (
                    <div className="mt-4 p-4 bg-[var(--background-tertiary)] border-l-4 border-[var(--color-brand)] rounded-r-lg">
                      <span className="text-xs text-[var(--text-muted)] mb-1">答案解析：</span>
                      <p className="text-[var(--text-secondary)] text-sm">{question.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部操作 */}
        <div className="mt-12 flex justify-center gap-4">
          <Link
            href="/quiz-generator/create"
            className="px-8 py-3 bg-[var(--background-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] font-semibold rounded-xl hover:border-[var(--border-strong)] transition-all"
          >
            重新生成
          </Link>
          <button
            onClick={handleDownload}
            className="px-8 py-3 bg-[var(--gradient-primary)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            下载试卷
          </button>
        </div>
      </div>
    </div>
  );
}
