// 创意DNA系统 - 核心模块
// 该模块负责创意DNA的生成、分析和应用

import { supabase } from '../supabase/client';

// 创意DNA数据结构
export interface CreativeDNA {
    id: string;
    userId: string;
    visualStyle: StylePreference[];
    writingStyle: StylePreference[];
    contentPreferences: ContentPreference[];
    workflowPatterns: WorkflowPattern[];
    aiInteractionLevel: number; // 1-10，表示用户倾向于AI介入程度
    adaptabilityScore: number; // 1-10，表示DNA适应不同创意场景的能力
    lastUpdated: Date;
    version: number;
    confidence: number; // 0-1，表示DNA精确度的置信度
}

// 风格偏好
export interface StylePreference {
    name: string;
    strength: number; // 0-1，表示该风格特征的强度
    examples: string[]; // 样例引用
    keywords: string[]; // 相关关键词
}

// 内容偏好
export interface ContentPreference {
    category: string;
    interest: number; // 0-1，表示兴趣程度
    avoidance: boolean; // 是否应避免
    frequency: number; // 0-1，使用频率
}

// 工作流模式
export interface WorkflowPattern {
    stage: string;
    timeSpent: number; // 百分比，在各阶段花费的时间比例
    iterationFrequency: number; // 迭代频率
    preferredTools: string[]; // 偏好的工具
}

// 创意DNA分析结果
export interface DNAAnalysisResult {
    dna: CreativeDNA;
    insights: DNAInsight[];
    recommendations: DNARecommendation[];
}

// DNA洞察
export interface DNAInsight {
    category: string;
    description: string;
    confidence: number;
    relatedData: any;
}

// DNA推荐
export interface DNARecommendation {
    type: string;
    description: string;
    priority: number; // 1-10
    implementationDifficulty: number; // 1-10
}

// 创建默认的创意DNA
export function createInitialDNA(userId: string): CreativeDNA {
    return {
        id: `dna_${Date.now()}`,
        userId,
        visualStyle: [],
        writingStyle: [],
        contentPreferences: [],
        workflowPatterns: [],
        aiInteractionLevel: 5,
        adaptabilityScore: 5,
        lastUpdated: new Date(),
        version: 1,
        confidence: 0.3 // 初始置信度较低
    };
}

// 分析用户的项目和操作历史，更新创意DNA
export async function analyzeDNA(userId: string): Promise<DNAAnalysisResult | null> {
    try {
        // 1. 获取用户现有的DNA
        let dna = await getUserDNA(userId);

        if (!dna) {
            dna = createInitialDNA(userId);
        }

        // 2. 获取用户最近的项目和活动
        const { data: projects } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        const { data: userActions } = await supabase
            .from('user_actions')
            .select('*')
            .eq('user_id', userId)
            .order('timestamp', { ascending: false })
            .limit(500);

        // 3. 如果没有足够的数据，返回初始DNA
        if (!projects || projects.length === 0) {
            return {
                dna,
                insights: [{
                    category: '数据收集',
                    description: '创建更多项目来提高创意DNA的精确度',
                    confidence: 0.5,
                    relatedData: null
                }],
                recommendations: [{
                    type: '参与度',
                    description: '完成一个完整项目以获得更准确的创意DNA分析',
                    priority: 9,
                    implementationDifficulty: 3
                }]
            };
        }

        // 4. 分析项目内容和用户操作
        dna = analyzeProjects(dna, projects);
        if (userActions && userActions.length > 0) {
            dna = analyzeUserActions(dna, userActions);
        }

        // 5. 生成洞察和推荐
        const insights = generateInsights(dna, projects, userActions);
        const recommendations = generateRecommendations(dna, insights);

        // 6. 更新置信度和版本
        dna.confidence = calculateConfidence(dna, projects, userActions);
        dna.version += 0.1;
        dna.lastUpdated = new Date();

        // 7. 保存更新后的DNA
        await saveDNA(dna);

        return {
            dna,
            insights,
            recommendations
        };
    } catch (error) {
        console.error('DNA分析错误:', error);
        return null;
    }
}

// 获取用户的创意DNA
export async function getUserDNA(userId: string): Promise<CreativeDNA | null> {
    try {
        const { data, error } = await supabase
            .from('creative_dna')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error || !data) {
            return null;
        }

        return {
            id: data.id,
            userId: data.user_id,
            visualStyle: data.visual_style,
            writingStyle: data.writing_style,
            contentPreferences: data.content_preferences,
            workflowPatterns: data.workflow_patterns,
            aiInteractionLevel: data.ai_interaction_level,
            adaptabilityScore: data.adaptability_score,
            lastUpdated: new Date(data.last_updated),
            version: data.version,
            confidence: data.confidence
        };
    } catch (error) {
        console.error('获取DNA错误:', error);
        return null;
    }
}

// 保存用户的创意DNA
export async function saveDNA(dna: CreativeDNA): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('creative_dna')
            .upsert({
                id: dna.id,
                user_id: dna.userId,
                visual_style: dna.visualStyle,
                writing_style: dna.writingStyle,
                content_preferences: dna.contentPreferences,
                workflow_patterns: dna.workflowPatterns,
                ai_interaction_level: dna.aiInteractionLevel,
                adaptability_score: dna.adaptabilityScore,
                last_updated: dna.lastUpdated.toISOString(),
                version: dna.version,
                confidence: dna.confidence
            });

        return !error;
    } catch (error) {
        console.error('保存DNA错误:', error);
        return false;
    }
}

// 分析项目数据更新DNA
function analyzeProjects(dna: CreativeDNA, projects: any[]): CreativeDNA {
    // 提取项目中的风格模式
    const newDna = { ...dna };

    // 分析视觉风格偏好
    const visualStylePatterns: Record<string, number> = {};
    projects.forEach(project => {
        if (project.style_tags && Array.isArray(project.style_tags)) {
            project.style_tags.forEach((tag: string) => {
                visualStylePatterns[tag] = (visualStylePatterns[tag] || 0) + 1;
            });
        }
    });

    // 更新视觉风格
    newDna.visualStyle = Object.entries(visualStylePatterns)
        .map(([name, count]) => {
            const strength = Math.min(count / projects.length, 1);
            // 查找现有的风格，如果存在
            const existing = dna.visualStyle.find(style => style.name === name);

            return {
                name,
                strength,
                examples: existing?.examples || [],
                keywords: existing?.keywords || []
            };
        })
        .sort((a, b) => b.strength - a.strength)
        .slice(0, 10); // 保留前10个最强的风格

    // 类似地分析内容偏好、写作风格等
    // ...

    return newDna;
}

// 分析用户操作更新DNA
function analyzeUserActions(dna: CreativeDNA, actions: any[]): CreativeDNA {
    const newDna = { ...dna };

    // 提取工作流模式
    const stageTimeMap: Record<string, number> = {};
    const stageIterationMap: Record<string, number> = {};
    const toolUsageMap: Record<string, number> = {};

    actions.forEach(action => {
        if (action.stage) {
            stageTimeMap[action.stage] = (stageTimeMap[action.stage] || 0) + action.duration || 1;
        }

        if (action.tool) {
            toolUsageMap[action.tool] = (toolUsageMap[action.tool] || 0) + 1;
        }

        if (action.type === 'iteration' && action.stage) {
            stageIterationMap[action.stage] = (stageIterationMap[action.stage] || 0) + 1;
        }
    });

    // 计算总时间
    const totalTime = Object.values(stageTimeMap).reduce((sum, time) => sum + time, 0);

    // 更新工作流模式
    newDna.workflowPatterns = Object.entries(stageTimeMap).map(([stage, time]) => {
        const timeSpent = totalTime > 0 ? time / totalTime : 0;
        const iterationFrequency = stageIterationMap[stage] || 0;

        // 找出该阶段最常用的工具
        const stageTools = Object.entries(toolUsageMap)
            .filter(([tool, _]) => actions.some(a => a.stage === stage && a.tool === tool))
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([tool, _]) => tool);

        return {
            stage,
            timeSpent,
            iterationFrequency,
            preferredTools: stageTools
        };
    });

    // 分析AI交互水平
    const aiInteractions = actions.filter(a => a.type === 'ai_interaction');
    if (aiInteractions.length > 0) {
        const aiUsageRatio = aiInteractions.length / actions.length;
        // 将比率转换为1-10的范围
        newDna.aiInteractionLevel = Math.round(aiUsageRatio * 10);
    }

    return newDna;
}

// 生成DNA洞察
function generateInsights(dna: CreativeDNA, projects: any[], actions: any[] | null): DNAInsight[] {
    const insights: DNAInsight[] = [];

    // 风格一致性洞察
    if (dna.visualStyle.length > 0) {
        const topStyle = dna.visualStyle[0];
        if (topStyle.strength > 0.7) {
            insights.push({
                category: '视觉风格',
                description: `您在 ${topStyle.name} 风格上展现出强烈的偏好和一致性`,
                confidence: Math.min(topStyle.strength + 0.2, 1),
                relatedData: topStyle
            });
        }
    }

    // 工作流效率洞察
    const workflowInsight = analyzeWorkflowEfficiency(dna.workflowPatterns, actions);
    if (workflowInsight) {
        insights.push(workflowInsight);
    }

    // AI协作模式洞察
    insights.push({
        category: 'AI协作',
        description: dna.aiInteractionLevel > 7
            ? '您倾向于高度依赖AI辅助，建议平衡人工创意与AI生成内容'
            : dna.aiInteractionLevel < 3
                ? '您较少使用AI功能，可以探索更多AI辅助功能提高效率'
                : '您在人工创意和AI辅助之间保持了良好的平衡',
        confidence: 0.6 + (actions?.length || 0) / 1000, // 行动越多，置信度越高
        relatedData: { level: dna.aiInteractionLevel }
    });

    return insights;
}

// 分析工作流效率
function analyzeWorkflowEfficiency(patterns: WorkflowPattern[], actions: any[] | null): DNAInsight | null {
    if (patterns.length === 0) return null;

    // 检查是否在某个阶段花费过多时间
    const timeHeavyStages = patterns.filter(p => p.timeSpent > 0.4);
    if (timeHeavyStages.length > 0) {
        return {
            category: '工作流效率',
            description: `您在 ${timeHeavyStages[0].stage} 阶段花费了大量时间 (${Math.round(timeHeavyStages[0].timeSpent * 100)}%)，考虑优化此阶段的工作流程`,
            confidence: 0.7,
            relatedData: timeHeavyStages[0]
        };
    }

    // 检查迭代频率过高的阶段
    const highIterationStages = patterns.filter(p => p.iterationFrequency > 10);
    if (highIterationStages.length > 0) {
        return {
            category: '迭代效率',
            description: `${highIterationStages[0].stage} 阶段的迭代频率较高，可能需要改进初始设计或决策过程`,
            confidence: 0.65,
            relatedData: highIterationStages[0]
        };
    }

    return null;
}

// 生成推荐
function generateRecommendations(dna: CreativeDNA, insights: DNAInsight[]): DNARecommendation[] {
    const recommendations: DNARecommendation[] = [];

    // 基于洞察生成推荐
    insights.forEach(insight => {
        if (insight.category === '工作流效率') {
            recommendations.push({
                type: '工作流优化',
                description: `尝试使用模板或自动化工具来减少在 ${(insight.relatedData as WorkflowPattern).stage} 阶段的时间投入`,
                priority: 8,
                implementationDifficulty: 5
            });
        }

        if (insight.category === 'AI协作' && (insight.relatedData as { level: number }).level < 3) {
            recommendations.push({
                type: 'AI功能探索',
                description: '探索智能文本生成和图像生成功能，可以为您节省大量时间',
                priority: 7,
                implementationDifficulty: 3
            });
        }
    });

    // 基于DNA数据生成一般推荐
    if (dna.confidence < 0.5) {
        recommendations.push({
            type: 'DNA改进',
            description: '完成更多项目以提高创意DNA分析的精确度',
            priority: 9,
            implementationDifficulty: 2
        });
    }

    // 推荐工具和资源
    if (dna.visualStyle.length > 0) {
        const topStyle = dna.visualStyle[0];
        recommendations.push({
            type: '资源推荐',
            description: `探索更多关于 ${topStyle.name} 风格的模板和资源`,
            priority: 6,
            implementationDifficulty: 2
        });
    }

    return recommendations;
}

// 计算DNA置信度
function calculateConfidence(dna: CreativeDNA, projects: any[], actions: any[] | null): number {
    // 基础置信度
    let confidence = 0.3;

    // 项目数量提升置信度
    confidence += Math.min(projects.length * 0.05, 0.3);

    // 用户操作量提升置信度
    if (actions) {
        confidence += Math.min(actions.length * 0.001, 0.2);
    }

    // 数据一致性提升置信度
    if (dna.visualStyle.length > 0 && dna.visualStyle[0].strength > 0.7) {
        confidence += 0.1;
    }

    return Math.min(confidence, 1);
}

// 应用创意DNA到内容生成请求
export function applyDNAToGeneration(dna: CreativeDNA, generationType: string, prompt: string): string {
    let enhancedPrompt = prompt;

    // 根据生成类型添加DNA增强
    switch (generationType) {
        case 'text':
            if (dna.writingStyle.length > 0) {
                const topStyles = dna.writingStyle.slice(0, 3);
                enhancedPrompt += ` 使用${topStyles.map(s => s.name).join('、')}的写作风格。`;

                // 添加关键词
                const keywords = topStyles.flatMap(s => s.keywords).slice(0, 10);
                if (keywords.length > 0) {
                    enhancedPrompt += ` 考虑使用以下关键词：${keywords.join('、')}。`;
                }
            }
            break;

        case 'image':
            if (dna.visualStyle.length > 0) {
                const topStyles = dna.visualStyle.slice(0, 3);
                enhancedPrompt += ` 风格：${topStyles.map(s => s.name).join('、')}。`;
            }
            break;

        case 'workflow':
            if (dna.workflowPatterns.length > 0) {
                // 分析用户最常使用的工具
                const tools = dna.workflowPatterns
                    .flatMap(p => p.preferredTools)
                    .slice(0, 5);

                if (tools.length > 0) {
                    enhancedPrompt += ` 优先考虑以下工具：${tools.join('、')}。`;
                }
            }
            break;
    }

    // 根据AI交互级别调整自主性
    if (dna.aiInteractionLevel <= 3) {
        enhancedPrompt += ' 提供更多选项和决策点，保持用户控制。';
    } else if (dna.aiInteractionLevel >= 8) {
        enhancedPrompt += ' 提供更完整和精炼的输出，减少用户干预需求。';
    }

    return enhancedPrompt;
}

// 生成创意DNA摘要，用于用户界面展示
export function generateDNASummary(dna: CreativeDNA): {
    primaryStyles: string[];
    keyStrengths: string[];
    workflowInsights: string[];
    adaptabilityLevel: string;
    confidenceDescription: string;
} {
    // 提取主要风格
    const primaryStyles = [...dna.visualStyle, ...dna.writingStyle]
        .sort((a, b) => b.strength - a.strength)
        .slice(0, 5)
        .map(s => s.name);

    // 识别关键优势
    const keyStrengths = [];
    if (dna.workflowPatterns.some(p => p.iterationFrequency < 3 && p.timeSpent > 0.2)) {
        keyStrengths.push('高效决策');
    }
    if (dna.visualStyle.some(s => s.strength > 0.8)) {
        keyStrengths.push('风格一致性');
    }
    if (dna.aiInteractionLevel > 7) {
        keyStrengths.push('AI工具利用');
    } else if (dna.aiInteractionLevel < 4) {
        keyStrengths.push('原创性表达');
    }

    // 提取工作流洞察
    const workflowInsights = dna.workflowPatterns
        .sort((a, b) => b.timeSpent - a.timeSpent)
        .slice(0, 3)
        .map(p => `在${p.stage}阶段投入${Math.round(p.timeSpent * 100)}%的时间`);

    // 适应性水平描述
    let adaptabilityLevel;
    if (dna.adaptabilityScore < 4) {
        adaptabilityLevel = '专注型 (偏好一致的风格和工作流)';
    } else if (dna.adaptabilityScore > 7) {
        adaptabilityLevel = '多样型 (适应不同项目类型和风格)';
    } else {
        adaptabilityLevel = '平衡型 (保持核心风格的同时有一定灵活性)';
    }

    // 置信度描述
    let confidenceDescription;
    if (dna.confidence < 0.4) {
        confidenceDescription = '初步分析 (继续创建更多项目以提高准确度)';
    } else if (dna.confidence < 0.7) {
        confidenceDescription = '发展中 (已有基本了解，但仍在完善)';
    } else {
        confidenceDescription = '高度准确 (分析基于丰富的项目历史)';
    }

    return {
        primaryStyles,
        keyStrengths,
        workflowInsights,
        adaptabilityLevel,
        confidenceDescription
    };
} 