export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Profile {
    id: string;
    updated_at: string | null;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    website: string | null;
    bio: string | null;
    creative_style: Json | null;
    created_at: string;
}

export interface Project {
    id: string;
    created_at: string;
    updated_at: string | null;
    title: string;
    description: string | null;
    content: Json | null;
    status: string;
    user_id: string;
    is_template: boolean;
    category: string | null;
    tags: string[] | null;
}

export interface CreativeDNA {
    id: string;
    created_at: string;
    updated_at: string | null;
    user_id: string;
    style_preferences: Json | null;
    creative_habits: Json | null;
    insights: Json | null;
    confidence_score: number;
}

export interface Workflow {
    id: string;
    created_at: string;
    updated_at: string | null;
    name: string;
    description: string | null;
    steps: Json | null;
    category: string | null;
    user_id: string;
    is_template: boolean;
    collaborators: string[] | null;
} 