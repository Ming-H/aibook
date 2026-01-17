/**
 * 智能出题配置页
 * 三步骤表单：基础配置 → 题型配置 → 确认生成
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Select, type SelectOption } from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { TagInput } from '@/components/ui/TagInput';
import { AVAILABLE_QUIZ_MODELS, type QuizConfig, type QuizModelId } from '@/lib/glm-api';

// 学科选项
const SUBJECT_OPTIONS: SelectOption[] = [
  { value: '语文', label: '语文' },
  { value: '数学', label: '数学' },
  { value: '英语', label: '英语' },
  { value: '物理', label: '物理' },
  { value: '化学', label: '化学' },
  { value: '生物', label: '生物' },
  { value: '历史', label: '历史' },
  { value: '地理', label: '地理' },
  { value: '政治', label: '政治' },
];

// 年级选项
const GRADE_OPTIONS: SelectOption[] = [
  { value: '小学一年级', label: '小学一年级' },
  { value: '小学二年级', label: '小学二年级' },
  { value: '小学三年级', label: '小学三年级' },
  { value: '小学四年级', label: '小学四年级' },
  { value: '小学五年级', label: '小学五年级' },
  { value: '小学六年级', label: '小学六年级' },
  { value: '初中一年级', label: '初中一年级' },
  { value: '初中二年级', label: '初中二年级' },
  { value: '初中三年级', label: '初中三年级' },
  { value: '高中一年级', label: '高中一年级' },
  { value: '高中二年级', label: '高中二年级' },
  { value: '高中三年级', label: '高中三年级' },
];

// 难度选项
const DIFFICULTY_OPTIONS: SelectOption[] = [
  { value: 'easy', label: '简单（基础题为主）' },
  { value: 'medium', label: '中等（综合考查）' },
  { value: 'hard', label: '困难（深度分析）' },
];

// 常见知识点建议
const TOPIC_SUGGESTIONS: Record<string, string[]> = {
  数学: ['代数', '几何', '函数', '统计与概率', '数列', '三角函数'],
  语文: ['阅读理解', '古诗文', '作文', '基础知识', '文学常识'],
  英语: ['阅读', '完形填空', '语法', '写作', '听力'],
  物理: ['力学', '电磁学', '热学', '光学', '原子物理'],
  化学: ['化学反应', '元素周期表', '化学键', '溶液', '有机化学'],
  生物: ['细胞', '遗传', '生态', '进化', '生理'],
  历史: ['中国古代史', '中国近现代史', '世界史', '历史人物', '历史事件'],
  地理: ['自然地理', '人文地理', '世界地理', '中国地理', '地图'],
  政治: ['经济生活', '政治生活', '文化生活', '哲学', '时事政治'],
};

type Step = 1 | 2 | 3;

export default function QuizCreatePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // 选中的模型
  const [selectedModel, setSelectedModel] = useState<QuizModelId>(AVAILABLE_QUIZ_MODELS[0].id);

  // 表单状态
  const [config, setConfig] = useState<QuizConfig>({
    subject: '',
    grade: '',
    topics: [],
    difficulty: 'medium',
    questionCounts: {
      choice: 5,
      fillBlank: 5,
      shortAnswer: 3,
    },
    points: {
      choice: 2,
      fillBlank: 3,
      shortAnswer: 10,
    },
  });

  // 出题模式：知识点模式 vs 自定义内容模式
  const [useCustomContent, setUseCustomContent] = useState(false);

  // 计算总分
  const totalPoints =
    config.questionCounts.choice * config.points.choice +
    config.questionCounts.fillBlank * config.points.fillBlank +
    config.questionCounts.shortAnswer * config.points.shortAnswer;

  const totalQuestions =
    config.questionCounts.choice +
    config.questionCounts.fillBlank +
    config.questionCounts.shortAnswer;

  // 更新配置
  const updateConfig = (updates: Partial<QuizConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  // 验证步骤
  const validateStep = (currentStep: Step): boolean => {
    setError('');

    if (currentStep === 1) {
      if (!config.subject) {
        setError('请选择学科');
        return false;
      }
      if (!config.grade) {
        setError('请选择年级');
        return false;
      }
      // 自定义内容模式：需要提供内容
      if (useCustomContent) {
        if (!config.customContent || config.customContent.trim().length === 0) {
          setError('请输入自定义内容');
          return false;
        }
        if (config.customContent.trim().length < 50) {
          setError('自定义内容太少，请至少输入50个字符');
          return false;
        }
      } else {
        // 知识点模式：需要提供知识点
        if (config.topics.length === 0) {
          setError('请至少添加一个知识点');
          return false;
        }
      }
    }

    if (currentStep === 2) {
      if (totalQuestions === 0) {
        setError('请至少设置一道题目');
        return false;
      }
    }

    return true;
  };

  // 下一步
  const handleNext = () => {
    if (validateStep(step) && step < 3) {
      setStep((step + 1) as Step);
    }
  };

  // 上一步
  const handlePrevious = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
      setError('');
    }
  };

  // 生成试卷（分批生成模式）
  const handleGenerate = async () => {
    if (!validateStep(2)) return;

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...config,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        let errorMessage = '生成失败，请稍后重试';
        try {
          const data = await response.json();
          errorMessage = data.details || data.error || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (data.success && data.quiz) {
        sessionStorage.setItem('generatedQuiz', JSON.stringify(data.quiz));
        router.push('/quiz-generator/preview');
      } else {
        throw new Error(data.details || data.error || '生成失败');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '生成失败，请重试';
      console.error('[Quiz] Error:', message);
      if (message.includes('API') || message.includes('configured') || message.includes('environment variable')) {
        setError('系统配置错误：AI 服务未正确配置。请联系管理员或稍后再试。');
      } else {
        setError(message);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* 页面头部 */}
      <div className="max-w-4xl mx-auto px-6 py-12 sm:px-8">
        <Link
          href="/quiz-generator"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">创建智能试卷</h1>
        <p className="text-[var(--text-secondary)]">
          {step === 1 && '第一步：配置基础信息'}
          {step === 2 && '第二步：设置题型和分值'}
          {step === 3 && '第三步：确认并生成'}
        </p>
      </div>

      {/* 进度条 */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mb-8">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                  ${s <= step
                    ? 'bg-[var(--gradient-primary)] text-white'
                    : 'bg-[var(--background-secondary)] text-[var(--text-muted)] border border-[var(--border-default)]'
                  }
                `}
              >
                {s < step ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  s
                )}
              </div>
              {s < 3 && (
                <div className="flex-1 h-1 mx-2 rounded-full" style={{
                  backgroundColor: s < step ? 'var(--color-brand)' : 'var(--background-tertiary)'
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 表单内容 */}
      <div className="max-w-4xl mx-auto px-6 pb-12 sm:px-8">
        <div className="bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <Select
                label="学科"
                options={SUBJECT_OPTIONS}
                value={config.subject}
                onChange={(value) => updateConfig({ subject: value })}
                placeholder="请选择学科"
                required
              />

              <Select
                label="年级"
                options={GRADE_OPTIONS}
                value={config.grade}
                onChange={(value) => updateConfig({ grade: value })}
                placeholder="请选择年级"
                required
              />

              {/* 模型选择 */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                  选择 AI 模型
                  <span className="ml-2 text-xs text-[var(--text-muted)]">(官方模型，稳定可靠)</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {AVAILABLE_QUIZ_MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setSelectedModel(model.id)}
                      className={`
                        px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left relative
                        ${selectedModel === model.id
                          ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/10 shadow-lg'
                          : 'border-[var(--border-default)] hover:border-[var(--border-strong)] bg-[var(--background-tertiary)]'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`font-semibold text-sm ${
                              selectedModel === model.id ? 'text-[var(--color-brand)]' : 'text-[var(--text-primary)]'
                            }`}>
                              {model.name}
                            </div>
                            {model.recommended && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--neon-green)]/20 text-[var(--neon-green)] font-medium">
                                推荐
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[var(--text-muted)]">
                            {model.description}
                          </div>
                        </div>
                        {selectedModel === model.id && (
                          <div className="w-5 h-5 rounded-full bg-[var(--color-brand)] flex items-center justify-center flex-shrink-0 ml-2">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  💡 所有模型均来自 ModelScope 官方，稳定可靠
                </p>
              </div>

              {/* 出题模式切换 */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                  出题模式
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setUseCustomContent(false);
                      setError('');
                    }}
                    className={`
                      flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${!useCustomContent
                        ? 'bg-[var(--gradient-primary)] text-white shadow-lg'
                        : 'bg-[var(--background-tertiary)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-strong)]'
                      }
                    `}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      知识点出题
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUseCustomContent(true);
                      setError('');
                    }}
                    className={`
                      flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${useCustomContent
                        ? 'bg-[var(--gradient-primary)] text-white shadow-lg'
                        : 'bg-[var(--background-tertiary)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-strong)]'
                      }
                    `}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      自定义内容出题
                    </span>
                  </button>
                </div>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  {!useCustomContent
                    ? '根据您指定的知识点生成题目'
                    : '粘贴文章、课文等内容，基于内容生成题目'}
                </p>
              </div>

              {/* 知识点输入 - 仅在知识点模式下显示 */}
              {!useCustomContent && (
                <TagInput
                  label="知识点"
                  value={config.topics}
                  onChange={(topics) => updateConfig({ topics })}
                  placeholder="输入知识点后按回车添加"
                  suggestions={TOPIC_SUGGESTIONS[config.subject] || []}
                  maxTags={10}
                  minTags={1}
                  required
                />
              )}

              {/* 自定义内容输入 - 仅在自定义内容模式下显示 */}
              {useCustomContent && (
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    自定义内容 <span className="text-[var(--color-red)]">*</span>
                  </label>
                  <textarea
                    value={config.customContent || ''}
                    onChange={(e) => updateConfig({ customContent: e.target.value })}
                    placeholder="粘贴您的文章、课文或任何想要基于其出题的内容...
                    示例：
                    - 课文内容
                    - 新闻文章
                    - 历史资料
                    - 科学说明文

                    建议内容长度：100-2000 字"
                    className="w-full h-48 px-4 py-3 bg-[var(--background-tertiary)] border border-[var(--border-default)] rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-y focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--color-brand)]/20 outline-none transition-all"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)]">
                      当前字数：{(config.customContent || '').length} 字
                    </span>
                    {(config.customContent || '').length > 0 && (config.customContent || '').length < 50 && (
                      <span className="text-[var(--color-red)]">内容太少，请至少输入50字</span>
                    )}
                  </div>
                </div>
              )}

              <Select
                label="难度"
                options={DIFFICULTY_OPTIONS}
                value={config.difficulty}
                onChange={(value) => updateConfig({ difficulty: value as 'easy' | 'medium' | 'hard' })}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              {/* 选择题配置 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">选</span>
                  选择题
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Slider
                    label="题目数量"
                    min={0}
                    max={20}
                    value={config.questionCounts.choice}
                    onChange={(value) => updateConfig({
                      questionCounts: { ...config.questionCounts, choice: value }
                    })}
                    unit="题"
                  />
                  <Slider
                    label="每题分值"
                    min={1}
                    max={10}
                    value={config.points.choice}
                    onChange={(value) => updateConfig({
                      points: { ...config.points, choice: value }
                    })}
                    unit="分"
                  />
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  小计：{config.questionCounts.choice} 题 × {config.points.choice} 分 = {config.questionCounts.choice * config.points.choice} 分
                </p>
              </div>

              {/* 填空题配置 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">填</span>
                  填空题
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Slider
                    label="题目数量"
                    min={0}
                    max={20}
                    value={config.questionCounts.fillBlank}
                    onChange={(value) => updateConfig({
                      questionCounts: { ...config.questionCounts, fillBlank: value }
                    })}
                    unit="题"
                  />
                  <Slider
                    label="每题分值"
                    min={1}
                    max={10}
                    value={config.points.fillBlank}
                    onChange={(value) => updateConfig({
                      points: { ...config.points, fillBlank: value }
                    })}
                    unit="分"
                  />
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  小计：{config.questionCounts.fillBlank} 题 × {config.points.fillBlank} 分 = {config.questionCounts.fillBlank * config.points.fillBlank} 分
                </p>
              </div>

              {/* 简答题配置 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold">简</span>
                  简答题
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Slider
                    label="题目数量"
                    min={0}
                    max={10}
                    value={config.questionCounts.shortAnswer}
                    onChange={(value) => updateConfig({
                      questionCounts: { ...config.questionCounts, shortAnswer: value }
                    })}
                    unit="题"
                  />
                  <Slider
                    label="每题分值"
                    min={5}
                    max={30}
                    step={5}
                    value={config.points.shortAnswer}
                    onChange={(value) => updateConfig({
                      points: { ...config.points, shortAnswer: value }
                    })}
                    unit="分"
                  />
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  小计：{config.questionCounts.shortAnswer} 题 × {config.points.shortAnswer} 分 = {config.questionCounts.shortAnswer * config.points.shortAnswer} 分
                </p>
              </div>

              {/* 总分统计 */}
              <div className="mt-8 p-6 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-xl">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">总题数</p>
                    <p className="text-3xl font-bold text-[var(--text-primary)]">{totalQuestions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">总分</p>
                    <p className="text-3xl font-bold text-[var(--color-brand)]">{totalPoints}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">确认试卷配置</h3>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">学科</span>
                  <span className="font-medium text-[var(--text-primary)]">{config.subject}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">年级</span>
                  <span className="font-medium text-[var(--text-primary)]">{config.grade}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">AI 模型</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[var(--text-primary)]">
                      {AVAILABLE_QUIZ_MODELS.find(m => m.id === selectedModel)?.name || selectedModel}
                    </span>
                    {AVAILABLE_QUIZ_MODELS.find(m => m.id === selectedModel)?.recommended && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--neon-green)]/20 text-[var(--neon-green)] font-medium">
                        推荐
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">出题模式</span>
                  <span className="font-medium text-[var(--color-brand)]">
                    {useCustomContent ? '自定义内容出题' : '知识点出题'}
                  </span>
                </div>
                {!useCustomContent ? (
                  <div className="flex justify-between py-3 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-secondary)]">知识点</span>
                    <div className="flex gap-2">
                      {config.topics.map((topic) => (
                        <span key={topic} className="px-3 py-1 bg-[var(--background-tertiary)] rounded-lg text-sm text-[var(--text-primary)]">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-3 border-b border-[var(--border-subtle)]">
                    <div className="flex justify-between mb-3">
                      <span className="text-[var(--text-secondary)]">自定义内容</span>
                      <span className="text-xs text-[var(--text-muted)]">{(config.customContent || '').length} 字</span>
                    </div>
                    <div className="p-4 bg-[var(--background-tertiary)] rounded-lg max-h-40 overflow-y-auto">
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {(config.customContent || '').slice(0, 300)}
                        {(config.customContent || '').length > 300 && '...'}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">难度</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {config.difficulty === 'easy' ? '简单' : config.difficulty === 'medium' ? '中等' : '困难'}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-6 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-xl">
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-4">题型配置</h4>
                <div className="space-y-3">
                  {config.questionCounts.choice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">选择题</span>
                      <span className="text-[var(--text-primary)]">
                        {config.questionCounts.choice} 题 × {config.points.choice} 分 = {config.questionCounts.choice * config.points.choice} 分
                      </span>
                    </div>
                  )}
                  {config.questionCounts.fillBlank > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">填空题</span>
                      <span className="text-[var(--text-primary)]">
                        {config.questionCounts.fillBlank} 题 × {config.points.fillBlank} 分 = {config.questionCounts.fillBlank * config.points.fillBlank} 分
                      </span>
                    </div>
                  )}
                  {config.questionCounts.shortAnswer > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">简答题</span>
                      <span className="text-[var(--text-primary)]">
                        {config.questionCounts.shortAnswer} 题 × {config.points.shortAnswer} 分 = {config.questionCounts.shortAnswer * config.points.shortAnswer} 分
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-[var(--border-subtle)]">
                    <span className="font-semibold text-[var(--text-primary)]">合计</span>
                    <span className="font-bold text-xl text-[var(--color-brand)]">
                      {totalQuestions} 题 / {totalPoints} 分
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 错误提示 */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          {/* 操作按钮 */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={step === 1 || isGenerating}
              className={`
                px-6 py-3 rounded-xl font-semibold transition-all
                ${step === 1 || isGenerating
                  ? 'opacity-50 cursor-not-allowed bg-[var(--background-tertiary)] text-[var(--text-muted)]'
                  : 'bg-[var(--background-tertiary)] text-[var(--text-primary)] hover:bg-[var(--background-elevated)]'
                }
              `}
            >
              上一步
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-[var(--gradient-primary)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                下一步
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`
                  px-8 py-3 bg-[var(--gradient-primary)] text-white font-semibold rounded-xl shadow-lg transition-all
                  ${isGenerating
                    ? 'opacity-75 cursor-wait'
                    : 'hover:shadow-xl hover:scale-105'
                  }
                `}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    生成中...
                  </span>
                ) : (
                  '生成试卷'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
