import { supabase } from '../supabase/client';
import { Project, Collaborator } from '../supabase/client';

/**
 * 获取用户的所有项目
 * @param userId 用户ID
 * @returns 用户的项目列表
 */
export async function getUserProjects(userId: string): Promise<Project[]> {
    try {
        // 获取用户创建的项目
        const { data: ownedProjects, error: ownedError } = await supabase
            .from('projects')
            .select(`
        *,
        project_collaborators (
          id,
          role,
          user_id,
          profiles:users (
            id,
            email,
            full_name,
            avatar_url
          )
        )
      `)
            .eq('user_id', userId)
            .order('updated_at', { ascending: false });

        if (ownedError) throw ownedError;

        // 获取用户参与协作的项目
        const { data: collaboratedProjects, error: collabError } = await supabase
            .from('project_collaborators')
            .select(`
        id,
        role,
        projects (
          *,
          project_collaborators (
            id,
            role,
            user_id,
            profiles:users (
              id,
              email,
              full_name,
              avatar_url
            )
          )
        )
      `)
            .eq('user_id', userId)
            .order('projects.updated_at', { ascending: false });

        if (collabError) throw collabError;

        // 处理项目和协作者数据格式
        const owned = (ownedProjects || []).map((project) => {
            const collaborators = (project.project_collaborators || []).map((collab: any) => ({
                id: collab.id,
                role: collab.role,
                user: {
                    id: collab.profiles.id,
                    name: collab.profiles.full_name,
                    email: collab.profiles.email,
                    avatar_url: collab.profiles.avatar_url,
                }
            }));

            return {
                ...project,
                collaborators
            };
        });

        const collaborated = (collaboratedProjects || []).map((collab) => {
            if (!collab.projects) return null;

            const project = collab.projects;
            const collaborators = (project.project_collaborators || []).map((c: any) => ({
                id: c.id,
                role: c.role,
                user: {
                    id: c.profiles.id,
                    name: c.profiles.full_name,
                    email: c.profiles.email,
                    avatar_url: c.profiles.avatar_url,
                }
            }));

            return {
                ...project,
                collaborators
            };
        }).filter(Boolean);

        // 合并两种类型的项目并过滤掉重复的
        const allProjects = [...owned, ...collaborated];
        const uniqueProjects = allProjects.filter((project, index, self) =>
            index === self.findIndex((p) => p.id === project.id)
        );

        return uniqueProjects as Project[];
    } catch (error) {
        console.error('获取项目失败:', error);
        throw error;
    }
}

/**
 * 获取单个项目详情
 * @param id 项目ID
 * @returns 项目详情
 */
export async function getProject(id: string): Promise<Project | null> {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select(`
        *,
        project_collaborators (
          id,
          role,
          user_id,
          profiles:users (
            id,
            email,
            full_name,
            avatar_url
          )
        )
      `)
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null; // 记录未找到
            throw error;
        }

        // 处理协作者数据格式
        const collaborators = (data.project_collaborators || []).map((collab: any) => ({
            id: collab.id,
            role: collab.role,
            user: {
                id: collab.profiles.id,
                name: collab.profiles.full_name,
                email: collab.profiles.email,
                avatar_url: collab.profiles.avatar_url,
            }
        }));

        return {
            ...data,
            collaborators
        } as Project;
    } catch (error) {
        console.error('获取项目详情失败:', error);
        throw error;
    }
}

/**
 * 创建新项目
 * @param projectData 项目数据
 * @returns 创建的项目
 */
export async function createProject(projectData: Partial<Project>): Promise<Project> {
    try {
        // 设置必要的默认值
        const newProject = {
            ...projectData,
            status: projectData.status || 'draft',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from('projects')
            .insert(newProject)
            .select()
            .single();

        if (error) throw error;

        return data as Project;
    } catch (error) {
        console.error('创建项目失败:', error);
        throw error;
    }
}

/**
 * 更新项目
 * @param id 项目ID
 * @param projectData 要更新的项目数据
 * @returns 更新后的项目
 */
export async function updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
    try {
        const updates = {
            ...projectData,
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return data as Project;
    } catch (error) {
        console.error('更新项目失败:', error);
        throw error;
    }
}

/**
 * 删除项目
 * @param id 项目ID
 */
export async function deleteProject(id: string): Promise<void> {
    try {
        // 先删除项目的协作者记录
        const { error: collabError } = await supabase
            .from('project_collaborators')
            .delete()
            .eq('project_id', id);

        if (collabError) throw collabError;

        // 然后删除项目
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;
    } catch (error) {
        console.error('删除项目失败:', error);
        throw error;
    }
}

/**
 * 将协作者添加到项目
 * @param projectId 项目ID
 * @param email 协作者邮箱
 * @param role 协作者角色
 */
export async function addCollaboratorToProject(
    projectId: string,
    email: string,
    role: 'viewer' | 'editor' | 'admin'
): Promise<Collaborator> {
    try {
        // 先查找用户ID
        const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('id, email, full_name, avatar_url')
            .eq('email', email)
            .single();

        if (userError) {
            throw new Error('找不到该用户，请确认邮箱地址正确');
        }

        // 检查是否已经是协作者
        const { data: existingCollab, error: checkError } = await supabase
            .from('project_collaborators')
            .select('*')
            .eq('project_id', projectId)
            .eq('user_id', userData.id)
            .maybeSingle();

        if (checkError) throw checkError;

        if (existingCollab) {
            throw new Error('该用户已经是项目协作者');
        }

        // 添加协作者
        const { data, error } = await supabase
            .from('project_collaborators')
            .insert({
                project_id: projectId,
                user_id: userData.id,
                role,
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) throw error;

        return {
            id: data.id,
            role: data.role as 'viewer' | 'editor' | 'admin',
            user: {
                id: userData.id,
                name: userData.full_name,
                email: userData.email,
                avatar_url: userData.avatar_url,
            }
        };
    } catch (error) {
        console.error('添加协作者失败:', error);
        throw error;
    }
}

/**
 * 从项目中移除协作者
 * @param projectId 项目ID
 * @param collaboratorId 协作者ID
 */
export async function removeCollaboratorFromProject(projectId: string, collaboratorId: string): Promise<void> {
    try {
        const { error } = await supabase
            .from('project_collaborators')
            .delete()
            .eq('id', collaboratorId)
            .eq('project_id', projectId);

        if (error) throw error;
    } catch (error) {
        console.error('移除协作者失败:', error);
        throw error;
    }
}

/**
 * 更新协作者角色
 * @param collaboratorId 协作者ID
 * @param role 新角色
 */
export async function updateCollaboratorRole(
    collaboratorId: string,
    role: 'viewer' | 'editor' | 'admin'
): Promise<void> {
    try {
        const { error } = await supabase
            .from('project_collaborators')
            .update({ role })
            .eq('id', collaboratorId);

        if (error) throw error;
    } catch (error) {
        console.error('更新协作者角色失败:', error);
        throw error;
    }
}

// 获取项目模板
export async function getProjectTemplates(category?: string): Promise<Project[]> {
    let query = supabase
        .from('projects')
        .select('*')
        .eq('is_template', true)
        .eq('status', 'published');

    if (category) {
        query = query.eq('category', category);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    return extractDataOrError<Project[]>({ data, error });
}

// 复制模板到用户项目
export async function copyTemplateToUserProject(templateId: string, userId: string): Promise<Project> {
    // 1. 获取模板详情
    const template = await getProject(templateId);

    // 2. 创建新项目
    const newProject: Partial<Project> = {
        title: `${template.title} - 副本`,
        description: template.description,
        content: template.content,
        status: 'draft',
        user_id: userId,
        is_template: false,
        category: template.category,
        tags: template.tags,
    };

    // 3. 保存新项目并返回
    return await createProject(newProject);
} 