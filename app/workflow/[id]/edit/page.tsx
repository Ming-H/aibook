'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import {
    FiSave,
    FiPlus,
    FiTrash2,
    FiArrowLeft,
    FiCheck,
    FiX,
    FiMove,
    FiSettings,
    FiEdit2,
    FiPlay,
    FiEye,
    FiCopy,
    FiInfo,
    FiAlertTriangle,
    FiHelpCircle
} from 'react-icons/fi';

// 工作流步骤类型定义
type WorkflowStep = {
    id: string;
    name: string;
    description: string;
    type: 'input' | 'process' | 'output' | 'decision' | 'ai';
    order: number;
    settings?: Record<string, any>;
    nextSteps?: string[]; // 指向下一步的ID数组，用于非线性工作流
    aiPrompt?: string; // AI步骤的提示词
};

// 工作流类型定义
type Workflow = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    steps: WorkflowStep[];
    category: string;
    isTemplate: boolean;
    thumbnailUrl?: string;
    collaborators?: string[];
};

export default function WorkflowEditor() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const workflowId = params?.id as string;

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [workflow, setWorkflow] = useState<Workflow | null>(null);
    const [steps, setSteps] = useState<WorkflowStep[]>([]);
    const [editingStep, setEditingStep] = useState<WorkflowStep | null>(null);
    const [showEditPanel, setShowEditPanel] = useState(false);
    const [editMode, setEditMode] = useState<'properties' | 'steps'>('properties');
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    // 用于绘制流程线的引用
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 检查用户认证状态
    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/signin');
            return;
        }

        // 如果有工作流ID，则加载工作流
        if (workflowId && workflowId !== 'new') {
            fetchWorkflow(workflowId);
        } else {
            // 新工作流
            const newWorkflow: Workflow = {
                id: 'new',
                name: '新工作流',
                description: '添加工作流描述',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                steps: [],
                category: 'content',
                isTemplate: false,
            };
            setWorkflow(newWorkflow);
            setSteps([]);
            setIsLoading(false);
        }
    }, [authLoading, user, router, workflowId]);

    // 模拟获取工作流数据
    const fetchWorkflow = (id: string) => {
        // 实际应用中会从API获取
        setTimeout(() => {
            // 模拟数据
            const mockWorkflow: Workflow = {
                id,
                name: '内容创作工作流',
                description: '从创意到发布的内容创作完整流程',
                createdAt: '2023-11-20T10:30:00Z',
                updatedAt: '2023-12-10T14:45:00Z',
                category: 'content',
                isTemplate: false,
                steps: [
                    {
                        id: 's1',
                        name: '创意头脑风暴',
                        description: '使用AI辅助生成内容创意',
                        type: 'ai',
                        order: 1,
                        aiPrompt: '请根据我的内容主题生成10个潜在的内容创意点子'
                    },
                    {
                        id: 's2',
                        name: '内容大纲',
                        description: '创建内容结构大纲',
                        type: 'process',
                        order: 2,
                    },
                    {
                        id: 's3',
                        name: '内容创作',
                        description: '撰写主要内容',
                        type: 'process',
                        order: 3,
                    },
                    {
                        id: 's4',
                        name: '审核和修改',
                        description: '内容质量审核和必要修改',
                        type: 'process',
                        order: 4,
                    },
                    {
                        id: 's5',
                        name: 'AI辅助润色',
                        description: '使用AI助手改进文本质量',
                        type: 'ai',
                        order: 5,
                        aiPrompt: '请帮我润色以下内容，让它更加引人入胜和专业'
                    },
                    {
                        id: 's6',
                        name: '发布准备',
                        description: '准备发布内容',
                        type: 'output',
                        order: 6,
                    },
                ]
            };

            setWorkflow(mockWorkflow);
            setSteps(mockWorkflow.steps);
            setIsLoading(false);
        }, 1000);
    };

    // 保存工作流
    const saveWorkflow = async () => {
        if (!workflow) return;

        setIsSaving(true);

        // 更新工作流对象
        const updatedWorkflow = {
            ...workflow,
            steps,
            updatedAt: new Date().toISOString()
        };

        // 模拟API保存延迟
        setTimeout(() => {
            console.log('保存工作流:', updatedWorkflow);
            setWorkflow(updatedWorkflow);
            setIsSaving(false);
            setUnsavedChanges(false);

            // 如果是新工作流，保存后重定向到编辑页面
            if (workflowId === 'new') {
                // 实际中会使用API返回的新ID
                const newId = 'w' + Date.now();
                router.push(`/workflow/${newId}/edit`);
            }
        }, 1500);
    };

    // 添加新步骤
    const addStep = () => {
        const newStep: WorkflowStep = {
            id: `s${Date.now()}`,
            name: '新步骤',
            description: '步骤描述',
            type: 'process',
            order: steps.length + 1,
        };

        setSteps([...steps, newStep]);
        setEditingStep(newStep);
        setShowEditPanel(true);
        setUnsavedChanges(true);
    };

    // 编辑步骤
    const editStep = (step: WorkflowStep) => {
        setEditingStep({ ...step });
        setShowEditPanel(true);
    };

    // 删除步骤
    const deleteStep = (stepId: string) => {
        if (confirm('确定要删除这个步骤吗？')) {
            const updatedSteps = steps.filter(s => s.id !== stepId);

            // 重新排序
            const reorderedSteps = updatedSteps.map((step, index) => ({
                ...step,
                order: index + 1
            }));

            setSteps(reorderedSteps);
            setUnsavedChanges(true);

            // 如果正在编辑的是被删除的步骤，关闭编辑面板
            if (editingStep?.id === stepId) {
                setEditingStep(null);
                setShowEditPanel(false);
            }
        }
    };

    // 保存步骤
    const saveStep = () => {
        if (!editingStep) return;

        const stepIndex = steps.findIndex(s => s.id === editingStep.id);

        if (stepIndex !== -1) {
            // 更新现有步骤
            const updatedSteps = [...steps];
            updatedSteps[stepIndex] = editingStep;
            setSteps(updatedSteps);
        } else {
            // 添加新步骤
            setSteps([...steps, editingStep]);
        }

        setShowEditPanel(false);
        setEditingStep(null);
        setUnsavedChanges(true);
    };

    // 取消编辑步骤
    const cancelEditStep = () => {
        setShowEditPanel(false);
        setEditingStep(null);
    };

    // 移动步骤位置
    const moveStep = (stepId: string, direction: 'up' | 'down') => {
        const stepIndex = steps.findIndex(s => s.id === stepId);
        if (stepIndex === -1) return;

        // 无法上移第一个或下移最后一个
        if (
            (direction === 'up' && stepIndex === 0) ||
            (direction === 'down' && stepIndex === steps.length - 1)
        ) {
            return;
        }

        const newSteps = [...steps];
        const targetIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;

        // 交换步骤
        [newSteps[stepIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[stepIndex]];

        // 更新顺序
        const reorderedSteps = newSteps.map((step, index) => ({
            ...step,
            order: index + 1
        }));

        setSteps(reorderedSteps);
        setUnsavedChanges(true);
    };

    // 复制步骤
    const duplicateStep = (step: WorkflowStep) => {
        const newStep: WorkflowStep = {
            ...step,
            id: `s${Date.now()}`,
            name: `${step.name} (副本)`,
            order: steps.length + 1,
        };

        setSteps([...steps, newStep]);
        setUnsavedChanges(true);
    };

    // 更新工作流基本信息
    const updateWorkflowInfo = (field: keyof Workflow, value: any) => {
        if (!workflow) return;

        setWorkflow({
            ...workflow,
            [field]: value
        });

        setUnsavedChanges(true);
    };

    // 更新步骤字段
    const updateStepField = (field: keyof WorkflowStep, value: any) => {
        if (!editingStep) return;

        setEditingStep({
            ...editingStep,
            [field]: value
        });
    };

    // 渲染步骤卡片
    const renderStepCard = (step: WorkflowStep) => {
        // 根据步骤类型设置颜色
        const typeColors = {
            input: 'border-green-500 bg-green-500 bg-opacity-10',
            process: 'border-blue-500 bg-blue-500 bg-opacity-10',
            output: 'border-purple-500 bg-purple-500 bg-opacity-10',
            decision: 'border-yellow-500 bg-yellow-500 bg-opacity-10',
            ai: 'border-teal-500 bg-teal-500 bg-opacity-10',
        };

        const stepColor = typeColors[step.type];

        return (
            <div
                key={step.id}
                className={`border-l-4 ${stepColor} bg-gray-800 rounded-md shadow-md mb-4 relative`}
            >
                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-white font-medium">{step.name}</h3>
                            <p className="text-gray-400 text-sm mt-1">{step.description}</p>
                        </div>
                        <div className="flex space-x-1">
                            <button
                                onClick={() => moveStep(step.id, 'up')}
                                disabled={step.order === 1}
                                className="p-1.5 rounded-md text-gray-400 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="上移"
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                    <path d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => moveStep(step.id, 'down')}
                                disabled={step.order === steps.length}
                                className="p-1.5 rounded-md text-gray-400 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="下移"
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center mt-2">
                        <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 mr-2">
                            步骤 {step.order}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300">
                            {step.type === 'input' && '输入'}
                            {step.type === 'process' && '处理'}
                            {step.type === 'output' && '输出'}
                            {step.type === 'decision' && '决策'}
                            {step.type === 'ai' && 'AI辅助'}
                        </span>

                        {step.type === 'ai' && step.aiPrompt && (
                            <div className="ml-2 relative group">
                                <FiInfo className="text-gray-400 cursor-help" />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 rounded shadow-lg text-gray-300 text-xs invisible group-hover:visible z-10">
                                    <div className="font-medium mb-1">AI提示词:</div>
                                    <div className="text-gray-400">{step.aiPrompt}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end mt-3 space-x-2">
                        <button
                            onClick={() => duplicateStep(step)}
                            className="p-1.5 rounded-md bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors"
                            title="复制步骤"
                        >
                            <FiCopy className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => editStep(step)}
                            className="p-1.5 rounded-md bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors"
                            title="编辑步骤"
                        >
                            <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => deleteStep(step.id)}
                            className="p-1.5 rounded-md bg-gray-700 text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                            title="删除步骤"
                        >
                            <FiTrash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // 加载状态
    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <p className="mt-4 text-gray-300">加载工作流编辑器...</p>
            </div>
        );
    }

    if (!workflow) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-red-500 mb-4">
                    <FiAlertTriangle className="h-12 w-12" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">未找到工作流</h2>
                <p className="text-gray-400 mb-6">无法加载请求的工作流，它可能已被删除或您没有访问权限。</p>
                <Link
                    href="/workflow"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition-colors"
                >
                    <FiArrowLeft className="mr-2" />
                    返回工作流列表
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* 顶部工具栏 */}
            <div className="bg-gray-800 border-b border-gray-700 py-4 px-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center">
                        <Link
                            href="/workflow"
                            className="mr-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <FiArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-white">
                                {workflow.name}
                            </h1>
                            <p className="text-gray-400 text-sm">
                                {workflowId === 'new' ? '创建新工作流' : '编辑工作流'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                        <Link
                            href={`/workflow/${workflow.id}/preview`}
                            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center text-sm transition-colors"
                        >
                            <FiEye className="mr-1.5" />
                            预览
                        </Link>
                        <button
                            disabled={isSaving || !unsavedChanges}
                            onClick={saveWorkflow}
                            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                    保存中...
                                </>
                            ) : (
                                <>
                                    <FiSave className="mr-1.5" />
                                    保存工作流
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 主要内容区域 */}
            <div className="flex-grow flex flex-col md:flex-row">
                {/* 左侧属性面板 */}
                <div className="w-full md:w-64 lg:w-80 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-white">
                                工作流编辑器
                            </h2>
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => setEditMode('properties')}
                                    className={`p-2 rounded-md text-sm ${editMode === 'properties'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                        }`}
                                    title="编辑属性"
                                >
                                    <FiSettings className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setEditMode('steps')}
                                    className={`p-2 rounded-md text-sm ${editMode === 'steps'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                        }`}
                                    title="编辑步骤"
                                >
                                    <FiEdit2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* 模式切换内容 */}
                        {editMode === 'properties' ? (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="workflow-name" className="block text-sm font-medium text-gray-300 mb-1">
                                        工作流名称
                                    </label>
                                    <input
                                        id="workflow-name"
                                        type="text"
                                        value={workflow.name}
                                        onChange={(e) => updateWorkflowInfo('name', e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="workflow-description" className="block text-sm font-medium text-gray-300 mb-1">
                                        描述
                                    </label>
                                    <textarea
                                        id="workflow-description"
                                        value={workflow.description}
                                        onChange={(e) => updateWorkflowInfo('description', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="workflow-category" className="block text-sm font-medium text-gray-300 mb-1">
                                        类别
                                    </label>
                                    <select
                                        id="workflow-category"
                                        value={workflow.category}
                                        onChange={(e) => updateWorkflowInfo('category', e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="content">内容创作</option>
                                        <option value="design">设计</option>
                                        <option value="development">开发</option>
                                        <option value="marketing">营销</option>
                                        <option value="research">研究</option>
                                    </select>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="workflow-template"
                                        type="checkbox"
                                        checked={workflow.isTemplate}
                                        onChange={(e) => updateWorkflowInfo('isTemplate', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                                    />
                                    <label htmlFor="workflow-template" className="ml-2 block text-sm text-gray-300">
                                        保存为模板
                                    </label>
                                </div>

                                <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-md p-3 text-sm">
                                    <div className="flex items-start">
                                        <FiInfo className="text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                                        <div>
                                            <p className="text-gray-300">
                                                模板可以被其他项目重复使用。共享模板可以帮助团队标准化工作流程。
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <button
                                    onClick={addStep}
                                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors"
                                >
                                    <FiPlus className="mr-2" />
                                    添加步骤
                                </button>

                                <div className="bg-gray-750 rounded-md p-3">
                                    <h3 className="text-sm font-medium text-white mb-2">步骤类型说明</h3>
                                    <ul className="space-y-2 text-xs text-gray-400">
                                        <li className="flex items-start">
                                            <span className="text-green-400 mr-1">•</span>
                                            <span><strong>输入</strong>：收集工作流所需的初始数据或资料</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-400 mr-1">•</span>
                                            <span><strong>处理</strong>：对数据进行处理、创作或修改</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-purple-400 mr-1">•</span>
                                            <span><strong>输出</strong>：生成最终成果或结果</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-yellow-400 mr-1">•</span>
                                            <span><strong>决策</strong>：根据条件选择不同的下一步</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-teal-400 mr-1">•</span>
                                            <span><strong>AI辅助</strong>：使用AI助手完成任务</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-750 p-3 rounded-md">
                                    <p className="text-sm text-gray-400">
                                        当前工作流有 <span className="text-white font-medium">{steps.length}</span> 个步骤
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 工作流预览 */}
                    {workflow.steps && workflow.steps.length > 0 && (
                        <div className="flex-grow">
                            <h3 className="text-sm font-medium text-white mb-2">工作流概览</h3>
                            <div className="bg-gray-750 rounded-md p-2 max-h-60 overflow-y-auto">
                                {steps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className="flex items-center py-1 px-2 rounded hover:bg-gray-700 cursor-pointer text-sm"
                                        onClick={() => editStep(step)}
                                    >
                                        <div className="flex-shrink-0 w-5 text-center text-gray-500 mr-2">
                                            {index + 1}.
                                        </div>
                                        <div className="truncate text-gray-300">
                                            {step.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 主内容区域 */}
                <div className="flex-grow p-6 overflow-auto" ref={containerRef}>
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-white">步骤配置</h2>
                            <p className="text-gray-400 mt-1">
                                添加和编辑工作流程的步骤
                            </p>
                        </div>

                        {steps.length === 0 ? (
                            <div className="bg-gray-800 rounded-lg p-8 text-center">
                                <div className="flex justify-center mb-4">
                                    <FiHelpCircle className="h-12 w-12 text-gray-500" />
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">开始构建工作流</h3>
                                <p className="text-gray-400 mb-6">
                                    您的工作流尚未包含任何步骤。点击"添加步骤"按钮开始构建工作流。
                                </p>
                                <button
                                    onClick={addStep}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md inline-flex items-center transition-colors"
                                >
                                    <FiPlus className="mr-2" />
                                    添加第一个步骤
                                </button>
                            </div>
                        ) : (
                            <div>
                                {/* 流程步骤列表 */}
                                <div className="space-y-4">
                                    {steps.map(renderStepCard)}
                                </div>

                                {/* 添加步骤按钮 */}
                                <div className="mt-8">
                                    <button
                                        onClick={addStep}
                                        className="px-4 py-2 bg-gray-800 border border-dashed border-gray-600 hover:bg-gray-750 text-gray-400 hover:text-white rounded-md flex items-center justify-center transition-colors w-full"
                                    >
                                        <FiPlus className="mr-2" />
                                        添加步骤
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 右侧步骤编辑面板 */}
                {showEditPanel && editingStep && (
                    <div className="w-full md:w-72 lg:w-96 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-medium text-white">
                                编辑步骤
                            </h2>
                            <button
                                onClick={cancelEditStep}
                                className="text-gray-400 hover:text-white"
                            >
                                <FiX className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="step-name" className="block text-sm font-medium text-gray-300 mb-1">
                                    步骤名称
                                </label>
                                <input
                                    id="step-name"
                                    type="text"
                                    value={editingStep.name}
                                    onChange={(e) => updateStepField('name', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="step-description" className="block text-sm font-medium text-gray-300 mb-1">
                                    描述
                                </label>
                                <textarea
                                    id="step-description"
                                    value={editingStep.description}
                                    onChange={(e) => updateStepField('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="step-type" className="block text-sm font-medium text-gray-300 mb-1">
                                    步骤类型
                                </label>
                                <select
                                    id="step-type"
                                    value={editingStep.type}
                                    onChange={(e) => updateStepField('type', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="input">输入</option>
                                    <option value="process">处理</option>
                                    <option value="output">输出</option>
                                    <option value="decision">决策</option>
                                    <option value="ai">AI辅助</option>
                                </select>
                            </div>

                            {/* AI辅助类型的特殊字段 */}
                            {editingStep.type === 'ai' && (
                                <div>
                                    <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-300 mb-1">
                                        AI提示词
                                    </label>
                                    <textarea
                                        id="ai-prompt"
                                        value={editingStep.aiPrompt || ''}
                                        onChange={(e) => updateStepField('aiPrompt', e.target.value)}
                                        rows={4}
                                        placeholder="输入指导AI的提示词..."
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">
                                        提示词将用于指导AI助手完成任务。尽量使用具体、清晰的指令。
                                    </p>
                                </div>
                            )}

                            {/* 决策类型的特殊字段 */}
                            {editingStep.type === 'decision' && (
                                <div className="bg-gray-750 p-3 rounded-md">
                                    <p className="text-sm text-gray-400">
                                        决策类型步骤允许根据条件选择不同的下一步。在完整版中，您可以设置条件和分支路径。
                                    </p>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-700">
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={cancelEditStep}
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                                    >
                                        取消
                                    </button>
                                    <button
                                        onClick={saveStep}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition-colors"
                                    >
                                        <FiCheck className="mr-2" />
                                        保存步骤
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 底部提示 */}
            {unsavedChanges && (
                <div className="bg-yellow-900 bg-opacity-30 border-t border-yellow-800 p-3 text-center">
                    <p className="text-yellow-300 text-sm">
                        您有未保存的更改。在离开页面前请确保保存您的工作。
                    </p>
                </div>
            )}

            {/* 用于连接步骤的canvas */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 pointer-events-none" />
        </div>
    );
} 