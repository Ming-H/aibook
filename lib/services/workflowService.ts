import { supabase, extractDataOrError } from '../supabase/client';
import type { Workflow } from '../types/supabase';

// 获取用户工作流
export async function getUserWorkflows(userId: string): Promise<Workflow[]> {
    const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

    return extractDataOrError<Workflow[]>({ data, error });
}

// 获取工作流详情
export async function getWorkflow(id: string): Promise<Workflow> {
    const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('id', id)
        .single();

    return extractDataOrError<Workflow>({ data, error });
}

// 创建工作流
export async function createWorkflow(workflowData: Partial<Workflow>): Promise<Workflow> {
    const { data, error } = await supabase
        .from('workflows')
        .insert(workflowData)
        .select()
        .single();

    return extractDataOrError<Workflow>({ data, error });
}

// 更新工作流
export async function updateWorkflow(id: string, workflowData: Partial<Workflow>): Promise<Workflow> {
    const { data, error } = await supabase
        .from('workflows')
        .update({
            ...workflowData,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

    return extractDataOrError<Workflow>({ data, error });
}

// 删除工作流
export async function deleteWorkflow(id: string): Promise<void> {
    const { error } = await supabase
        .from('workflows')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// 获取工作流模板
export async function getWorkflowTemplates(category?: string): Promise<Workflow[]> {
    let query = supabase
        .from('workflows')
        .select('*')
        .eq('is_template', true);

    if (category) {
        query = query.eq('category', category);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    return extractDataOrError<Workflow[]>({ data, error });
}

// 复制工作流（创建副本）
export async function duplicateWorkflow(id: string, userId: string): Promise<Workflow> {
    // 获取原始工作流
    const originalWorkflow = await getWorkflow(id);

    // 创建副本
    const duplicateData: Partial<Workflow> = {
        name: `${originalWorkflow.name} - 副本`,
        description: originalWorkflow.description,
        steps: originalWorkflow.steps,
        category: originalWorkflow.category,
        user_id: userId,
        is_template: false,
        collaborators: [],
    };

    return await createWorkflow(duplicateData);
}

// 添加协作者到工作流
export async function addCollaboratorToWorkflow(workflowId: string, collaboratorId: string): Promise<Workflow> {
    // 获取当前工作流
    const workflow = await getWorkflow(workflowId);

    // 确保不重复添加
    const currentCollaborators = workflow.collaborators || [];
    if (currentCollaborators.includes(collaboratorId)) {
        return workflow;
    }

    // 添加新协作者
    const updatedCollaborators = [...currentCollaborators, collaboratorId];

    // 更新工作流
    return await updateWorkflow(workflowId, {
        collaborators: updatedCollaborators,
    });
}

// 从工作流移除协作者
export async function removeCollaboratorFromWorkflow(workflowId: string, collaboratorId: string): Promise<Workflow> {
    // 获取当前工作流
    const workflow = await getWorkflow(workflowId);

    // 移除协作者
    const currentCollaborators = workflow.collaborators || [];
    const updatedCollaborators = currentCollaborators.filter(id => id !== collaboratorId);

    // 更新工作流
    return await updateWorkflow(workflowId, {
        collaborators: updatedCollaborators,
    });
} 