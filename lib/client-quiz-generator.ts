/**
 * 客户端智能出题生成器
 * 直接调用 ModelScope API，绕过 Vercel 超时限制
 */

export interface Question {
  id: string;
  type: 'choice' | 'fill-blank' | 'short-answer';
  content: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  grade: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  totalPoints: number;
  createdAt: string;
}

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
  model?: string;
  requirements?: string;
  customContent?: string;
}

/**
 * 生成出题 Prompt
 */
function generateQuizPrompt(config: QuizConfig): string {
  const { subject, grade, topics, difficulty, questionCounts, points, requirements, customContent } = config;

  const topicsText = topics.join('、');
  const difficultyText = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
  }[difficulty];

  const totalPoints = questionCounts.choice * points.choice + questionCounts.fillBlank * points.fillBlank + questionCounts.shortAnswer * points.shortAnswer;

  let typeInstructions = '';
  if (questionCounts.choice > 0) {
    typeInstructions += `生成 ${questionCounts.choice} 道选择题（每题 ${points.choice} 分）`;
  }
  if (questionCounts.fillBlank > 0) {
    if (typeInstructions) typeInstructions += '；';
    typeInstructions += `生成 ${questionCounts.fillBlank} 道填空题（每题 ${points.fillBlank} 分）`;
  }
  if (questionCounts.shortAnswer > 0) {
    if (typeInstructions) typeInstructions += '；';
    typeInstructions += `生成 ${questionCounts.shortAnswer} 道简答题（每题 ${points.shortAnswer} 分）`;
  }

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

  return `你是一位专业的教师。请为${subject}科目${grade}年级生成一份${difficultyText}难度的试卷，知识点包括：${topicsText}。

要求：${typeInstructions}，总分${totalPoints}分。

请直接返回JSON对象，格式如下：
{"title":"试卷标题","questions":[{"type":"choice","content":"题目","options":["选项1","选项2","选项3","选项4"],"correctAnswer":"A","points":${points.choice},"difficulty":"${difficulty}"},{"type":"fill-blank","content":"题目","correctAnswer":"答案","points":${points.fillBlank},"difficulty":"${difficulty}"},{"type":"short-answer","content":"题目","correctAnswer":"参考答案","points":${points.shortAnswer},"difficulty":"${difficulty}"}]}

${requirements ? `额外要求：${requirements}` : ''}

只返回JSON，不要任何其他文字。`;
}

/**
 * 解析 AI 返回的 JSON
 */
function parseQuizResponse(content: string): Omit<Quiz, 'id' | 'subject' | 'grade' | 'difficulty' | 'createdAt'> {
  const firstBrace = content.indexOf('{');
  const lastBrace = content.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error('AI 返回的内容不是有效的 JSON 格式，请重试');
  }

  let jsonStr = content.substring(firstBrace, lastBrace + 1);

  let cleaned = jsonStr
    .replace(/```json\s*/g, '')
    .replace(/```\s*/g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/,\s*([}\]])/g, '$1')
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    try {
      parsed = new Function('return ' + cleaned)();
    } catch (e2) {
      throw new Error(`JSON 解析失败: ${(e as Error).message}`);
    }
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('返回的不是有效对象');
  }

  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    throw new Error('缺少 questions 数组');
  }

  if (parsed.questions.length === 0) {
    throw new Error('题目数组为空');
  }

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

  const totalPoints = questions.reduce((sum: number, q: any) => sum + (Number(q.points) || 0), 0);

  return {
    title: parsed.title || '智能生成试卷',
    questions,
    totalPoints,
  };
}

/**
 * 客户端生成试卷
 * 直接调用 ModelScope API，无需经过后端
 */
export async function generateQuizOnClient(
  config: QuizConfig,
  apiKey: string,
  onProgress?: (message: string) => void
): Promise<Quiz> {
  const prompt = generateQuizPrompt(config);

  const messages = [
    {
      role: 'system',
      content: '你是一个专业的试卷生成助手。只返回标准的JSON格式，不要添加任何解释或说明文字。JSON必须符合规范，不要使用注释，不要有多余的逗号。',
    },
    {
      role: 'user',
      content: prompt,
    },
  ];

  onProgress?.('正在连接 AI 模型...');

  const response = await fetch('https://api-inference.modelscope.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'ZhipuAI/GLM-4.7',
      messages,
      temperature: 0.3,
      top_p: 0.9,
    }),
  });

  onProgress?.('正在生成试卷...');

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`API 调用失败: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();

  if (!data.choices?.[0]?.message?.content) {
    throw new Error('无效的 API 响应');
  }

  onProgress?.('正在解析结果...');

  const quizData = parseQuizResponse(data.choices[0].message.content);

  return {
    id: `quiz-${Date.now()}`,
    subject: config.subject,
    grade: config.grade,
    difficulty: config.difficulty,
    ...quizData,
    createdAt: new Date().toISOString(),
  };
}
