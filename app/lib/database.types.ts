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
                    updated_at: string | null
                    status: 'pending' | 'approved' | 'spam' | 'trash'
                    parent_id: string | null
                }
                Insert: {
                    id?: string
                    post_id: string
                    user_id: string
                    content: string
                    created_at?: string
                    updated_at?: string | null
                    status?: 'pending' | 'approved' | 'spam' | 'trash'
                    parent_id?: string | null
                }
                Update: {
                    id?: string
                    post_id?: string
                    user_id?: string
                    content?: string
                    created_at?: string
                    updated_at?: string | null
                    status?: 'pending' | 'approved' | 'spam' | 'trash'
                    parent_id?: string | null
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
            blog_posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    excerpt: string | null
                    content: string
                    featured_image: string | null
                    author_id: string
                    category_id: string | null
                    created_at: string
                    updated_at: string | null
                    published: boolean
                    meta_title: string | null
                    meta_description: string | null
                    views: number
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    excerpt?: string | null
                    content: string
                    featured_image?: string | null
                    author_id: string
                    category_id?: string | null
                    created_at?: string
                    updated_at?: string | null
                    published?: boolean
                    meta_title?: string | null
                    meta_description?: string | null
                    views?: number
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    excerpt?: string | null
                    content?: string
                    featured_image?: string | null
                    author_id?: string
                    category_id?: string | null
                    created_at?: string
                    updated_at?: string | null
                    published?: boolean
                    meta_title?: string | null
                    meta_description?: string | null
                    views?: number
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
            blog_post_tags: {
                Row: {
                    id: string
                    post_id: string
                    tag_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    tag_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    post_id?: string
                    tag_id?: string
                    created_at?: string
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
                    username: string
                    display_name: string
                    email: string
                    avatar_url: string | null
                    bio: string | null
                    website: string | null
                    created_at: string
                    updated_at: string | null
                    role: string | null
                    last_login: string | null
                }
                Insert: {
                    id: string
                    username: string
                    display_name: string
                    email: string
                    avatar_url?: string | null
                    bio?: string | null
                    website?: string | null
                    created_at?: string
                    updated_at?: string | null
                    role?: string | null
                    last_login?: string | null
                }
                Update: {
                    id?: string
                    username?: string
                    display_name?: string
                    email?: string
                    avatar_url?: string | null
                    bio?: string | null
                    website?: string | null
                    created_at?: string
                    updated_at?: string | null
                    role?: string | null
                    last_login?: string | null
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