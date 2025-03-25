Need to install the following packages:
supabase @2.19.7
Ok to proceed ? (y) 

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
                    created_at: string
                    description: string | null
                    id: string
                    name: string
                    slug: string
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    name: string
                    slug: string
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            blog_comments: {
                Row: {
                    author_id: string
                    content: string
                    created_at: string
                    id: string
                    parent_id: string | null
                    post_id: string
                    status: string
                    updated_at: string | null
                }
                Insert: {
                    author_id: string
                    content: string
                    created_at?: string
                    id?: string
                    parent_id?: string | null
                    post_id: string
                    status?: string
                    updated_at?: string | null
                }
                Update: {
                    author_id?: string
                    content?: string
                    created_at?: string
                    id?: string
                    parent_id?: string | null
                    post_id?: string
                    status?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "blog_comments_author_id_fkey"
                        columns: ["author_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "blog_comments_parent_id_fkey"
                        columns: ["parent_id"]
                        referencedRelation: "blog_comments"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "blog_comments_post_id_fkey"
                        columns: ["post_id"]
                        referencedRelation: "blog_posts"
                        referencedColumns: ["id"]
                    }
                ]
            }
            blog_post_tags: {
                Row: {
                    id: string
                    post_id: string
                    tag_id: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    tag_id: string
                }
                Update: {
                    id?: string
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
                    author_id: string
                    category_id: string | null
                    content: string
                    created_at: string
                    excerpt: string | null
                    featured_image: string | null
                    id: string
                    meta_description: string | null
                    meta_title: string | null
                    published: boolean
                    slug: string
                    status: string
                    title: string
                    updated_at: string | null
                    view_count: number
                }
                Insert: {
                    author_id: string
                    category_id?: string | null
                    content: string
                    created_at?: string
                    excerpt?: string | null
                    featured_image?: string | null
                    id?: string
                    meta_description?: string | null
                    meta_title?: string | null
                    published?: boolean
                    slug: string
                    status?: string
                    title: string
                    updated_at?: string | null
                    view_count?: number
                }
                Update: {
                    author_id?: string
                    category_id?: string | null
                    content?: string
                    created_at?: string
                    excerpt?: string | null
                    featured_image?: string | null
                    id?: string
                    meta_description?: string | null
                    meta_title?: string | null
                    published?: boolean
                    slug?: string
                    status?: string
                    title?: string
                    updated_at?: string | null
                    view_count?: number
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
                    created_at: string
                    id: string
                    name: string
                    slug: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    name: string
                    slug: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    bio: string | null
                    created_at: string
                    display_name: string | null
                    email: string
                    id: string
                    role: string | null
                    updated_at: string | null
                    username: string | null
                    website: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    bio?: string | null
                    created_at?: string
                    display_name?: string | null
                    email: string
                    id: string
                    role?: string | null
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    bio?: string | null
                    created_at?: string
                    display_name?: string | null
                    email?: string
                    id?: string
                    role?: string | null
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
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
