-- 创建博客文章表
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  view_count INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT
);

-- 创建博客分类表
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建博客标签表
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建博客文章和标签的关联表
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- 创建博客评论表
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- 为博客表创建全文搜索索引
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 为博客文章标题和内容创建GIN索引用于搜索
CREATE INDEX blog_posts_title_search ON blog_posts USING GIN (to_tsvector('chinese', title));
CREATE INDEX blog_posts_content_search ON blog_posts USING GIN (to_tsvector('chinese', content));

-- 为常用查询创建索引
CREATE INDEX blog_posts_author_id_idx ON blog_posts(author_id);
CREATE INDEX blog_posts_category_id_idx ON blog_posts(category_id);
CREATE INDEX blog_posts_published_idx ON blog_posts(published);
CREATE INDEX blog_posts_created_at_idx ON blog_posts(created_at);
CREATE INDEX blog_comments_post_id_idx ON blog_comments(post_id);

-- 设置RLS策略

-- 博客文章表的RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 所有人可以读取已发布的文章
CREATE POLICY "已发布文章对所有人可见" ON blog_posts FOR SELECT USING (published = TRUE);

-- 用户可以管理自己的文章
CREATE POLICY "作者可以查看自己的所有文章" ON blog_posts FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "作者可以插入自己的文章" ON blog_posts FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "作者可以更新自己的文章" ON blog_posts FOR UPDATE USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);

CREATE POLICY "作者可以删除自己的文章" ON blog_posts FOR DELETE USING (auth.uid() = author_id);

-- 博客评论表的RLS
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- 所有人可以读取已批准的评论
CREATE POLICY "已批准的评论对所有人可见" ON blog_comments FOR SELECT USING (status = 'approved');

-- 作者可以管理自己的评论
CREATE POLICY "用户可以查看自己的评论" ON blog_comments FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户可以发表评论" ON blog_comments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户可以编辑自己的评论" ON blog_comments FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户可以删除自己的评论" ON blog_comments FOR DELETE USING (auth.uid() = user_id);

-- 分类和标签的RLS (只有管理员可以管理，所有人可以读取)
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- 所有人可以读取分类和标签
CREATE POLICY "分类对所有人可见" ON blog_categories FOR SELECT USING (TRUE);

CREATE POLICY "登录用户可以创建分类" ON blog_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "标签对所有人可见" ON blog_tags FOR SELECT USING (TRUE);

CREATE POLICY "登录用户可以创建标签" ON blog_tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "文章标签关联对所有人可见" ON blog_post_tags FOR SELECT USING (TRUE);

CREATE POLICY "作者可以管理自己文章的标签" ON blog_post_tags FOR ALL USING (
  EXISTS (
    SELECT 1 FROM blog_posts 
    WHERE blog_posts.id = blog_post_tags.post_id 
    AND blog_posts.author_id = auth.uid()
  )
);

-- 创建触发器
CREATE OR REPLACE FUNCTION update_blog_post_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 如果触发器不存在才创建
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_blog_post_timestamp'
  ) THEN
    CREATE TRIGGER update_blog_post_timestamp
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE PROCEDURE update_blog_post_updated_at();
  END IF;
END $$;

-- 初始化分类数据
INSERT INTO blog_categories (name, slug, description) VALUES
('技术', 'technology', '技术相关文章'),
('教程', 'tutorials', '各类教程和指南'),
('资讯', 'news', '最新资讯和动态'),
('观点', 'opinions', '观点和评论')
ON CONFLICT (slug) DO NOTHING;

-- 初始化标签数据
INSERT INTO blog_tags (name, slug) VALUES
('JavaScript', 'javascript'),
('React', 'react'),
('Next.js', 'nextjs'),
('TypeScript', 'typescript'),
('前端', 'frontend'),
('后端', 'backend'),
('AI', 'ai'),
('机器学习', 'machine-learning'),
('教程', 'tutorial'),
('心得', 'experience')
ON CONFLICT (slug) DO NOTHING;