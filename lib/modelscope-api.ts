/**
 * ModelScope API 客户端
 * 用于创意工坊图片生成功能
 */

// 清理环境变量中的换行符和空格
const cleanEnv = (value: string | undefined): string | undefined => {
  return value?.trim().replace(/\n/g, '');
};

// 环境变量验证
const modelScopeApiKey = cleanEnv(process.env.MODELSCOPE_API_KEY);
const modelScopeBaseUrl = cleanEnv(process.env.MODELSCOPE_BASE_URL) || 'https://api-inference.modelscope.cn';

if (!modelScopeApiKey) {
  console.warn('MODELSCOPE_API_KEY is not defined in environment variables. ModelScope API features will be disabled.');
}

/**
 * 可用的模型列表
 * 仅保留确认可用的官方模型
 */
export const AVAILABLE_MODELS = [
  {
    id: 'Tongyi-MAI/Z-Image-Turbo',
    name: '通义万相 Turbo',
    description: '快速生成，20-40秒完成',
    category: 'official',
    recommended: true,
  },
  {
    id: 'Qwen/Qwen-Image',
    name: 'Qwen 图像',
    description: '通用模型，擅长复杂文本渲染',
    category: 'official',
    recommended: false,
  },
  {
    id: 'Qwen/Qwen-Image-2512',
    name: 'Qwen 图像 2512',
    description: '高质量，需要3-8分钟',
    category: 'official',
    recommended: false,
  },
] as const;

/**
 * ModelScope API 基础配置
 */
const MODELSCOPE_CONFIG = {
  baseURL: modelScopeBaseUrl,
  apiKey: modelScopeApiKey,
  model: 'Tongyi-MAI/Z-Image-Turbo' as const,
  timeout: 600000, // 10 分钟超时（高质量模型可能需要更长时间）
  pollInterval: 5000, // 轮询间隔 5 秒
  maxPollAttempts: 120, // 最多轮询 120 次（10 分钟）
};

/**
 * 模型类型
 */
export type ModelId = typeof AVAILABLE_MODELS[number]['id'];

/**
 * 图片生成配置
 */
export interface ImageGenerationConfig {
  prompt: string; // 提示词
  model?: string; // 可选的自定义模型
  loras?: string | Record<string, number>; // LoRA 配置
}

/**
 * 图片生成任务状态
 */
export type TaskStatus = 'PENDING' | 'RUNNING' | 'SUCCEED' | 'FAILED';

/**
 * ModelScope 异步任务响应
 */
interface ModelScopeAsyncTaskResponse {
  task_id: string;
}

/**
 * ModelScope 任务状态响应
 */
interface ModelScopeTaskStatusResponse {
  task_id: string;
  task_status: TaskStatus;
  output_images?: string[];
  error?: string;
}

/**
 * 生成的图片结果
 */
export interface GeneratedImage {
  url: string;
  taskId: string;
}

/**
 * 调用 ModelScope 图片生成 API（异步模式）
 */
async function createImageGenerationTask(config: ImageGenerationConfig): Promise<string> {
  if (!MODELSCOPE_CONFIG.apiKey) {
    throw new Error('ModelScope API key is not configured');
  }

  const requestBody = {
    model: config.model || MODELSCOPE_CONFIG.model,
    prompt: config.prompt,
    input: {
      prompt: config.prompt,
    },
    parameters: {
      size: '1024*1024',
    },
  };

  console.log('[ModelScope Image API] Creating task:', {
    url: `${MODELSCOPE_CONFIG.baseURL}/images/generations`,
    model: requestBody.model,
    promptLength: requestBody.prompt.length,
  });

  try {
    const response = await fetch(`${MODELSCOPE_CONFIG.baseURL}/images/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MODELSCOPE_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
        'X-ModelScope-Async-Mode': 'true',
      },
      body: JSON.stringify({
        model: requestBody.model,
        prompt: requestBody.prompt,
      }),
      signal: AbortSignal.timeout(30000), // 30 秒创建任务超时
    });

    console.log('[ModelScope Image API] Create task response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[ModelScope Image API] Create task error:', errorText);
      throw new Error(`ModelScope API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('[ModelScope Image API] Task created:', data);

    if (!data.task_id) {
      throw new Error('Invalid ModelScope API response: missing task_id');
    }

    return data.task_id;
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
 * 轮询检查图片生成任务状态
 */
async function pollTaskStatus(taskId: string): Promise<GeneratedImage> {
  if (!MODELSCOPE_CONFIG.apiKey) {
    throw new Error('ModelScope API key is not configured');
  }

  let attempts = 0;

  console.log('[ModelScope Image API] Starting to poll task status...');

  while (attempts < MODELSCOPE_CONFIG.maxPollAttempts) {
    try {
      console.log(`[ModelScope Image API] Polling attempt ${attempts + 1}/${MODELSCOPE_CONFIG.maxPollAttempts}`);

      const response = await fetch(
        `${MODELSCOPE_CONFIG.baseURL}/tasks/${taskId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${MODELSCOPE_CONFIG.apiKey}`,
            'Content-Type': 'application/json',
            'X-ModelScope-Task-Type': 'image_generation',
          },
          signal: AbortSignal.timeout(10000), // 10 秒查询超时
        }
      );

      console.log(`[ModelScope Image API] Poll response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[ModelScope Image API] Poll error:', errorText);
        throw new Error(`ModelScope API error: ${response.status} - ${errorText}`);
      }

      const data: ModelScopeTaskStatusResponse = await response.json();
      console.log(`[ModelScope Image API] Task status: ${data.task_status}`);

      if (data.task_status === 'SUCCEED') {
        if (!data.output_images || data.output_images.length === 0) {
          throw new Error('Task succeeded but no images returned');
        }

        console.log('[ModelScope Image API] Image ready:', data.output_images[0]);
        return {
          url: data.output_images[0],
          taskId: data.task_id,
        };
      }

      if (data.task_status === 'FAILED') {
        console.error('[ModelScope Image API] Task failed:', data.error);
        throw new Error(data.error || 'Image generation failed');
      }

      // 任务仍在进行中（PENDING 或 RUNNING），等待后继续轮询
      console.log(`[ModelScope Image API] Task ${data.task_status}, waiting ${MODELSCOPE_CONFIG.pollInterval}ms...`);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, MODELSCOPE_CONFIG.pollInterval));
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('ModelScope API request timeout');
        }
        // 如果是生成失败错误，直接抛出
        if (error.message.includes('failed') || error.message.includes('Failed')) {
          throw error;
        }
        // 其他错误，记录但继续轮询
        console.error('[ModelScope Image API] Poll error (retrying):', error.message);
      }
      // 其他错误，继续轮询
      attempts++;
      await new Promise(resolve => setTimeout(resolve, MODELSCOPE_CONFIG.pollInterval));
    }
  }

  throw new Error('Image generation timeout: task did not complete in time');
}

/**
 * 生成图片（完整流程：创建任务 + 轮询结果）
 * @deprecated Use createImageGenerationTask + client-side polling instead to avoid serverless timeouts
 */
export async function generateImage(config: ImageGenerationConfig): Promise<GeneratedImage> {
  // 创建异步任务
  const taskId = await createImageGenerationTask(config);
  console.log('[ModelScope Image API] Task ID:', taskId);

  // 轮询任务状态直到完成
  const result = await pollTaskStatus(taskId);
  console.log('[ModelScope Image API] Image generated:', result.url);

  return result;
}

/**
 * 仅创建图片生成任务（不轮询结果）
 * 用于客户端轮询场景，避免服务器超时
 */
export async function createImageTaskOnly(config: ImageGenerationConfig): Promise<{ taskId: string }> {
  const taskId = await createImageGenerationTask(config);
  console.log('[ModelScope Image API] Task created:', taskId);
  return { taskId };
}

/**
 * 查询任务状态（单次查询，不轮询）
 * 用于客户端轮询场景
 */
export async function getTaskStatus(taskId: string): Promise<{ status: TaskStatus; outputImages?: string[]; error?: string }> {
  if (!MODELSCOPE_CONFIG.apiKey) {
    throw new Error('ModelScope API key is not configured');
  }

  const response = await fetch(
    `${MODELSCOPE_CONFIG.baseURL}/tasks/${taskId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MODELSCOPE_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
        'X-ModelScope-Task-Type': 'image_generation',
      },
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ModelScope API error: ${response.status} - ${errorText}`);
  }

  const data: ModelScopeTaskStatusResponse = await response.json();

  return {
    status: data.task_status,
    outputImages: data.output_images,
    error: data.error,
  };
}

/**
 * 验证 ModelScope API 配置
 */
export function validateModelScopeConfig(): { valid: boolean; error?: string } {
  if (!MODELSCOPE_CONFIG.apiKey) {
    return {
      valid: false,
      error: 'MODELSCOPE_API_KEY environment variable is not set',
    };
  }

  return { valid: true };
}

/**
 * 预设的提示词模板
 */
export const PROMPT_TEMPLATES = {
  // 自然风景
  landscape: 'A stunning landscape painting of {subject}, vibrant colors, detailed, artistic style, 4k quality',
  // 人像
  portrait: 'A beautiful portrait of {subject}, professional photography, soft lighting, high detail',
  // 卡通风格
  cartoon: 'A cute cartoon illustration of {subject}, colorful, kawaii style, vector art',
  // 赛博朋克
  cyberpunk: 'A cyberpunk style image of {subject}, neon lights, futuristic, dark atmosphere',
  // 水彩画
  watercolor: 'A watercolor painting of {subject}, soft colors, artistic, dreamy atmosphere',
  // 3D 渲染
  render3d: 'A 3D render of {subject}, octane render, highly detailed, realistic lighting',
};

/**
 * 根据模板生成提示词
 */
export function generatePromptFromTemplate(template: keyof typeof PROMPT_TEMPLATES, subject: string): string {
  return PROMPT_TEMPLATES[template].replace('{subject}', subject);
}
