/**
 * ModelScope 多模型 API 客户端
 * 用于智能出题功能，支持多个 AI 模型
 */

// 清理环境变量中的换行符和空格
const cleanEnv = (value: string | undefined): string | undefined => {
  return value?.trim().replace(/\n/g, '');
};

// 环境变量验证 - 使用 ModelScope API
const modelScopeApiKey = cleanEnv(process.env.MODELSCOPE_API_KEY);
const modelScopeBaseUrl = cleanEnv(process.env.MODELSCOPE_BASE_URL) || 'https://api-inference.modelscope.cn/v1';

if (!modelScopeApiKey) {
  console.warn('MODELSCOPE_API_KEY is not defined in environment variables. ModelScope API features will be disabled.');
}

/**
 * 可用的模型列表
 * 使用 ModelScope 上实际存在的支持 OpenAI 格式的模型
 */
export const AVAILABLE_QUIZ_MODELS = [
  {
    id: 'ZhipuAI/GLM-4.7',
    name: 'GLM-4.7',
    description: '智谱AI最新模型，综合能力出色，擅长编程',
    category: 'official',
    recommended: true,
  },
  {
    id: 'deepseek-ai/DeepSeek-V3.2',
    name: 'DeepSeek-V3.2',
    description: '深度求索最新模型，推理能力强',
    category: 'official',
    recommended: false,
  },
  {
    id: 'Qwen/Qwen3-Coder-480B-A35B-Instruct',
    name: 'Qwen3 Coder 480B',
    description: '通义千问编程模型，代码相关题目优秀',
    category: 'official',
    recommended: false,
  },
  {
    id: 'Qwen/Qwen3-235B-A22B-Instruct-2507',
    name: 'Qwen3 235B',
    description: '通义千问大型模型，综合能力强',
    category: 'official',
    recommended: false,
  },
] as const;

/**
 * 模型类型
 */
export type QuizModelId = typeof AVAILABLE_QUIZ_MODELS[number]['id'];

/**
 * ModelScope API 基础配置
 */
const MODELSCOPE_CONFIG = {
  baseURL: modelScopeBaseUrl,
  apiKey: modelScopeApiKey,
  defaultModel: 'ZhipuAI/GLM-4.7' as QuizModelId, // 默认使用 GLM-4.7
  timeout: 120000, // 120 秒超时（大型模型可能需要更长时间）
};

/**
 * 题目类型定义
 */
export type QuestionType = 'choice' | 'fill-blank' | 'short-answer';

/**
 * 题目结构
 */
export interface Question {
  id: string;
  type: QuestionType;
  content: string;
  options?: string[]; // 选择题选项
  correctAnswer: string | string[];
  points: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

/**
 * 试卷结构
 */
export interface Quiz {
  id: string;
  title: string;
  subject: string;
  grade: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  totalPoints: number;
  duration?: number; // 建议用时（分钟）
  createdAt: string;
}

/**
 * 出题配置
 */
export interface QuizConfig {
  subject: string;
  grade: string;
  topics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  questionCounts: {
    choice: number;
    fillBlank: number;
    shortAnswer: number;
  };
  points: {
    choice: number;
    fillBlank: number;
    shortAnswer: number;
  };
  totalCount?: number; // 总题数
  requirements?: string; // 额外要求
  customContent?: string; // 自定义内容（基于文本出题）
  model?: QuizModelId; // 可选的模型选择，默认使用 ZhipuAI/GLM-4.7
}

/**
 * GLM API 请求体
 */
interface GLMChatRequest {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  top_p?: number;
  stream?: boolean;
}

/**
 * GLM API 响应
 */
interface GLMChatResponse {
  id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * 生成出题的 Prompt 模板
 * 简化版以提高 JSON 格式的可靠性
 */
function generateQuizPrompt(config: QuizConfig): string {
  const { subject, grade, topics, difficulty, questionCounts, points, requirements, customContent } = config;

  const topicsText = topics.join('、');
  const difficultyText = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
  }[difficulty];

  // 计算需要的题目总数和示例
  const totalQuestions = questionCounts.choice + questionCounts.fillBlank + questionCounts.shortAnswer;
  const totalPoints = questionCounts.choice * points.choice + questionCounts.fillBlank * points.fillBlank + questionCounts.shortAnswer * points.shortAnswer;

  // 构建题目类型说明
  let typeInstructions = '';
  if (questionCounts.choice > 0) {
    typeInstructions += `生成 ${questionCounts.choice} 道选择题（每题 ${points.choice} 分，type为choice，包含options数组四个选项，correctAnswer为单个字母A/B/C/D）`;
  }
  if (questionCounts.fillBlank > 0) {
    if (typeInstructions) typeInstructions += '；';
    typeInstructions += `生成 ${questionCounts.fillBlank} 道填空题（每题 ${points.fillBlank} 分，type为fill-blank，correctAnswer为字符串答案）`;
  }
  if (questionCounts.shortAnswer > 0) {
    if (typeInstructions) typeInstructions += '；';
    typeInstructions += `生成 ${questionCounts.shortAnswer} 道简答题（每题 ${points.shortAnswer} 分，type为short-answer，correctAnswer为参考答案字符串）`;
  }

  // 如果提供了自定义内容，基于内容出题
  if (customContent && customContent.trim()) {
    return `你是一位专业的教师。请基于以下文本为${subject}科目${grade}年级生成一份${difficultyText}难度的试卷。

参考文本：
${customContent}

要求：${typeInstructions}，总分${totalPoints}分。

请直接返回JSON对象，格式如下：
{"title":"试卷标题","questions":[{"type":"choice","content":"题目","options":["选项1","选项2","选项3","选项4"],"correctAnswer":"A","points":${points.choice},"difficulty":"${difficulty}"},{"type":"fill-blank","content":"题目","correctAnswer":"答案","points":${points.fillBlank},"difficulty":"${difficulty}"},{"type":"short-answer","content":"题目","correctAnswer":"参考答案","points":${points.shortAnswer},"difficulty":"${difficulty}"}]}

${requirements ? `额外要求：${requirements}` : ''}

只返回JSON，不要任何其他文字。`;
  }

  // 基于知识点出题
  return `你是一位专业的教师。请为${subject}科目${grade}年级生成一份${difficultyText}难度的试卷，知识点包括：${topicsText}。

要求：${typeInstructions}，总分${totalPoints}分。

请直接返回JSON对象，格式如下：
{"title":"试卷标题","questions":[{"type":"choice","content":"题目","options":["选项1","选项2","选项3","选项4"],"correctAnswer":"A","points":${points.choice},"difficulty":"${difficulty}"},{"type":"fill-blank","content":"题目","correctAnswer":"答案","points":${points.fillBlank},"difficulty":"${difficulty}"},{"type":"short-answer","content":"题目","correctAnswer":"参考答案","points":${points.shortAnswer},"difficulty":"${difficulty}"}]}

${requirements ? `额外要求：${requirements}` : ''}

只返回JSON，不要任何其他文字。`;
}

/**
 * 调用 ModelScope API (兼容 OpenAI 格式)
 */
async function callModelScopeAPI(
  messages: GLMChatRequest['messages'],
  model?: QuizModelId
): Promise<string> {
  if (!MODELSCOPE_CONFIG.apiKey) {
    throw new Error('ModelScope API key is not configured');
  }

  const modelId = model || MODELSCOPE_CONFIG.defaultModel;

  const requestBody: GLMChatRequest = {
    model: modelId,
    messages,
    temperature: 0.3,  // 降低温度以获得更确定的输出
    top_p: 0.9,
  };

  try {
    const url = `${MODELSCOPE_CONFIG.baseURL}/chat/completions`;
    console.log('[ModelScope API] Request URL:', url);
    console.log('[ModelScope API] Model:', modelId);
    console.log('[ModelScope API] Has API Key:', !!MODELSCOPE_CONFIG.apiKey);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MODELSCOPE_CONFIG.apiKey}`,
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(MODELSCOPE_CONFIG.timeout),
    });

    console.log('[ModelScope API] Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[ModelScope API] Error Response:', errorData);
      throw new Error(`ModelScope API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data: GLMChatResponse = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid ModelScope API response: missing content');
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('ModelScope API request timeout');
      }
      throw error;
    }
    throw new Error('Unknown error calling ModelScope API');
  }
}

/**
 * 解析 GLM 返回的 JSON
 * 使用更简洁可靠的解析策略
 */
function parseQuizResponse(content: string): Omit<Quiz, 'id' | 'subject' | 'grade' | 'difficulty' | 'createdAt'> {
  console.log('GLM 原始返回:', content);

  // 简化提取：直接找到第一个 { 和最后一个 }
  const firstBrace = content.indexOf('{');
  const lastBrace = content.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    console.error('无法找到有效的 JSON 对象');
    throw new Error('AI 返回的内容不是有效的 JSON 格式，请重试');
  }

  let jsonStr = content.substring(firstBrace, lastBrace + 1);
  console.log('提取的 JSON:', jsonStr.substring(0, 500));

  try {
    // 简化的清理逻辑
    let cleaned = jsonStr
      // 移除可能存在的 markdown 代码块标记
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      // 移除注释
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // 移除末尾逗号
      .replace(/,\s*([}\]])/g, '$1')
      .trim();

    console.log('清理后的 JSON:', cleaned.substring(0, 500));

    // 尝试解析
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      // 如果标准解析失败，尝试宽松解析
      console.log('标准解析失败，尝试 Function 构造器...');
      try {
        parsed = new Function('return ' + cleaned)();
      } catch (e2) {
        console.error('宽松解析也失败');
        console.error('错误位置内容:', cleaned.substring(Math.max(0, cleaned.length - 500)));
        throw new Error(`JSON 解析失败: ${(e as Error).message}`);
      }
    }

    // 验证结构
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('返回的不是有效对象');
    }

    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      console.error('解析结果:', parsed);
      throw new Error('缺少 questions 数组');
    }

    if (parsed.questions.length === 0) {
      throw new Error('题目数组为空');
    }

    // 为每个题目添加 ID 和默认值
    const questions = parsed.questions.map((q: any, index: number) => ({
      id: `q-${Date.now()}-${index}`,
      type: q.type || 'choice',
      content: q.content || '未命名题目',
      options: q.options || [],
      correctAnswer: q.correctAnswer || '',
      points: q.points || 1,
      difficulty: q.difficulty || 'medium',
      tags: q.tags || [],
      explanation: q.explanation || '',
    }));

    // 计算总分
    const totalPoints = questions.reduce((sum: number, q: any) => sum + (Number(q.points) || 0), 0);

    return {
      title: parsed.title || '智能生成试卷',
      questions,
      totalPoints,
    };
  } catch (error) {
    console.error('解析错误:', error);
    console.error('原始内容前1000字符:', content.substring(0, 1000));
    throw new Error(`AI 返回的 JSON 格式有误，请重试。错误: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 生成试卷
 */
export async function generateQuiz(config: QuizConfig): Promise<Quiz> {
  const prompt = generateQuizPrompt(config);

  const messages: GLMChatRequest['messages'] = [
    {
      role: 'system',
      content: '你是一个专业的试卷生成助手。只返回标准的JSON格式，不要添加任何解释或说明文字。JSON必须符合规范，不要使用注释，不要有多余的逗号。',
    },
    {
      role: 'user',
      content: prompt,
    },
  ];

  const response = await callModelScopeAPI(messages, config.model);
  const quizData = parseQuizResponse(response);

  return {
    id: `quiz-${Date.now()}`,
    subject: config.subject,
    grade: config.grade,
    difficulty: config.difficulty,
    ...quizData,
    createdAt: new Date().toISOString(),
  };
}

/**
 * 重新生成单个题目
 */
export async function regenerateQuestion(
  originalQuestion: Question,
  quizContext: {
    subject: string;
    grade: string;
    topics: string[];
  },
  model?: QuizModelId
): Promise<Question> {
  const questionType = originalQuestion.type === 'choice' ? '选择题' : originalQuestion.type === 'fill-blank' ? '填空题' : '简答题';

  const messages: GLMChatRequest['messages'] = [
    {
      role: 'system',
      content: '你是一个专业的试卷生成助手。只返回标准的JSON格式，不要添加任何解释或说明文字。',
    },
    {
      role: 'user',
      content: `请为${quizContext.subject}科目${quizContext.grade}年级，围绕知识点${quizContext.topics.join('、')}生成一道不同的${questionType}。

原题目：${originalQuestion.content}

请直接返回JSON对象，格式如下：
{"type":"${originalQuestion.type}","content":"新题目","options":["选项1","选项2","选项3","选项4"],"correctAnswer":"答案","points":${originalQuestion.points},"difficulty":"${originalQuestion.difficulty}"}

只返回JSON，不要任何其他文字。`,
    },
  ];

  const response = await callModelScopeAPI(messages, model);

  // 使用相同的解析逻辑
  const firstBrace = response.indexOf('{');
  const lastBrace = response.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error('无法从响应中提取 JSON');
  }

  let jsonStr = response.substring(firstBrace, lastBrace + 1);
  let cleaned = jsonStr
    .replace(/```json\s*/g, '')
    .replace(/```\s*/g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/,\s*([}\]])/g, '$1')
    .trim();

  const parsed = JSON.parse(cleaned);

  return {
    ...parsed,
    id: `q-${Date.now()}`,
  };
}

/**
 * 验证 ModelScope API 配置
 */
export function validateGLMConfig(): { valid: boolean; error?: string } {
  if (!MODELSCOPE_CONFIG.apiKey) {
    return {
      valid: false,
      error: 'MODELSCOPE_API_KEY environment variable is not set',
    };
  }

  return { valid: true };
}

/**
 * 导出试卷为不同格式
 */
export function exportQuiz(quiz: Quiz, format: 'json' | 'text' | 'markdown' | 'pdf' | 'docx' | 'image'): string | Blob {
  switch (format) {
    case 'json':
      return JSON.stringify(quiz, null, 2);

    case 'text': {
      let text = `${quiz.title}\n`;
      text += `学科：${quiz.subject} | 年级：${quiz.grade} | 难度：${quiz.difficulty}\n`;
      text += `总分：${quiz.totalPoints}分\n`;
      text += `${'='.repeat(50)}\n\n`;

      quiz.questions.forEach((q, index) => {
        text += `${index + 1}. [${q.type === 'choice' ? '选择题' : q.type === 'fill-blank' ? '填空题' : '简答题'}] ${q.content} (${q.points}分)\n`;

        if (q.type === 'choice' && q.options) {
          q.options.forEach((opt, i) => {
            text += `   ${String.fromCharCode(65 + i)}. ${opt}\n`;
          });
        }

        text += '\n';
      });

      return text;
    }

    case 'markdown': {
      let md = `# ${quiz.title}\n\n`;
      md += `**学科：** ${quiz.subject} | **年级：** ${quiz.grade} | **难度：** ${quiz.difficulty}\n\n`;
      md += `**总分：** ${quiz.totalPoints}分\n\n`;
      md += `---\n\n`;

      quiz.questions.forEach((q, index) => {
        md += `## ${index + 1}. ${q.content}\n\n`;
        md += `*类型：* ${q.type === 'choice' ? '选择题' : q.type === 'fill-blank' ? '填空题' : '简答题'} | `;
        md += `*分值：* ${q.points}分 | `;
        md += `*难度：* ${q.difficulty}\n\n`;

        if (q.type === 'choice' && q.options) {
          q.options.forEach((opt, i) => {
            md += `${String.fromCharCode(65 + i)}. ${opt}\n\n`;
          });
        }

        if (q.explanation) {
          md += `**答案解析：** ${q.explanation}\n\n`;
        }

        md += `---\n\n`;
      });

      return md;
    }

    case 'pdf':
    case 'docx':
    case 'image':
      // 这些格式需要特殊处理，返回空字符串，实际处理在客户端
      return '';

    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}
