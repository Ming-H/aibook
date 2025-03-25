export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            blog_categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    created_at?: string
                }
                Relationships: []
            }
            blog_comments: {
                Row: {
                    id: string
                    post_id: string
                    user_id: string
                    content: string
                    created_at: string
                    updated_at: string
                    parent_id: string | null
                    status: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    user_id: string
                    content: string
                    created_at?: string
                    updated_at?: string
                    parent_id?: string | null
                    status?: string
                }
                Update: {
                    id?: string
                    post_id?: string
                    user_id?: string
                    content?: string
                    created_at?: string
                    updated_at?: string
                    parent_id?: string | null
                    status?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "blog_comments_post_id_fkey"
                        columns: ["post_id"]
                        referencedRelation: "blog_posts"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "blog_comments_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "blog_comments_parent_id_fkey"
                        columns: ["parent_id"]
                        referencedRelation: "blog_comments"
                        referencedColumns: ["id"]
                    }
                ]
            }
            blog_post_tags: {
                Row: {
                    post_id: string
                    tag_id: string
                }
                Insert: {
                    post_id: string
                    tag_id: string
                }
                Update: {
                    post_id?: string
                    tag_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "blog_post_tags_post_id_fkey"
                        columns: ["post_id"]
                        referencedRelation: "blog_posts"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "blog_post_tags_tag_id_fkey"
                        columns: ["tag_id"]
                        referencedRelation: "blog_tags"
                        referencedColumns: ["id"]
                    }
                ]
            }
            blog_posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    content: string
                    excerpt: string | null
                    featured_image: string | null
                    published: boolean
                    author_id: string
                    category_id: string | null
                    created_at: string
                    updated_at: string
                    view_count: number
                    meta_title: string | null
                    meta_description: string | null
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    content: string
                    excerpt?: string | null
                    featured_image?: string | null
                    published?: boolean
                    author_id: string
                    category_id?: string | null
                    created_at?: string
                    updated_at?: string
                    view_count?: number
                    meta_title?: string | null
                    meta_description?: string | null
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    content?: string
                    excerpt?: string | null
                    featured_image?: string | null
                    published?: boolean
                    author_id?: string
                    category_id?: string | null
                    created_at?: string
                    updated_at?: string
                    view_count?: number
                    meta_title?: string | null
                    meta_description?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "blog_posts_author_id_fkey"
                        columns: ["author_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "blog_posts_category_id_fkey"
                        columns: ["category_id"]
                        referencedRelation: "blog_categories"
                        referencedColumns: ["id"]
                    }
                ]
            }
            blog_tags: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    created_at?: string
                }
                Relationships: []
            }
            profiles: {
                Row: {
                    id: string
                    updated_at: string | null
                    username: string | null
                    full_name: string | null
                    avatar_url: string | null
                    website: string | null
                    bio: string | null
                    email: string | null
                    subscription_status: string | null
                    subscription_tier: string | null
                    created_at: string | null
                }
                Insert: {
                    id: string
                    updated_at?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                    bio?: string | null
                    email?: string | null
                    subscription_status?: string | null
                    subscription_tier?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                    bio?: string | null
                    email?: string | null
                    subscription_status?: string | null
                    subscription_tier?: string | null
                    created_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            projects: {
                Row: {
                    id: string
                    created_at: string | null
                    updated_at: string | null
                    name: string
                    description: string | null
                    owner_id: string
                    is_public: boolean
                    cover_image: string | null
                    status: string
                }
                Insert: {
                    id?: string
                    created_at?: string | null
                    updated_at?: string | null
                    name: string
                    description?: string | null
                    owner_id: string
                    is_public?: boolean
                    cover_image?: string | null
                    status?: string
                }
                Update: {
                    id?: string
                    created_at?: string | null
                    updated_at?: string | null
                    name?: string
                    description?: string | null
                    owner_id?: string
                    is_public?: boolean
                    cover_image?: string | null
                    status?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "projects_owner_id_fkey"
                        columns: ["owner_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            project_collaborators: {
                Row: {
                    id: string
                    project_id: string
                    user_id: string
                    created_at: string | null
                    role: string
                }
                Insert: {
                    id?: string
                    project_id: string
                    user_id: string
                    created_at?: string | null
                    role?: string
                }
                Update: {
                    id?: string
                    project_id?: string
                    user_id?: string
                    created_at?: string | null
                    role?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "project_collaborators_project_id_fkey"
                        columns: ["project_id"]
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "project_collaborators_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            creative_dna: {
                Row: {
                    id: string
                    project_id: string
                    created_at: string | null
                    updated_at: string | null
                    content: Json
                }
                Insert: {
                    id?: string
                    project_id: string
                    created_at?: string | null
                    updated_at?: string | null
                    content?: Json
                }
                Update: {
                    id?: string
                    project_id?: string
                    created_at?: string | null
                    updated_at?: string | null
                    content?: Json
                }
                Relationships: [
                    {
                        foreignKeyName: "creative_dna_project_id_fkey"
                        columns: ["project_id"]
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    }
                ]
            }
            workflows: {
                Row: {
                    id: string
                    project_id: string
                    name: string
                    description: string | null
                    created_at: string | null
                    updated_at: string | null
                    status: string
                }
                Insert: {
                    id?: string
                    project_id: string
                    name: string
                    description?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                    status?: string
                }
                Update: {
                    id?: string
                    project_id?: string
                    name?: string
                    description?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                    status?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "workflows_project_id_fkey"
                        columns: ["project_id"]
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    }
                ]
            }
            workflow_steps: {
                Row: {
                    id: string
                    workflow_id: string
                    name: string
                    description: string | null
                    type: string
                    order: number
                    settings: Json | null
                    next_steps: Json | null
                    ai_prompt: string | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    workflow_id: string
                    name: string
                    description?: string | null
                    type: string
                    order: number
                    settings?: Json | null
                    next_steps?: Json | null
                    ai_prompt?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    workflow_id?: string
                    name?: string
                    description?: string | null
                    type?: string
                    order?: number
                    settings?: Json | null
                    next_steps?: Json | null
                    ai_prompt?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "workflow_steps_workflow_id_fkey"
                        columns: ["workflow_id"]
                        referencedRelation: "workflows"
                        referencedColumns: ["id"]
                    }
                ]
            }
            workflow_collaborators: {
                Row: {
                    id: string
                    workflow_id: string
                    user_id: string
                    created_at: string | null
                    role: string
                }
                Insert: {
                    id?: string
                    workflow_id: string
                    user_id: string
                    created_at?: string | null
                    role?: string
                }
                Update: {
                    id?: string
                    workflow_id?: string
                    user_id?: string
                    created_at?: string | null
                    role?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "workflow_collaborators_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "workflow_collaborators_workflow_id_fkey"
                        columns: ["workflow_id"]
                        referencedRelation: "workflows"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'] 