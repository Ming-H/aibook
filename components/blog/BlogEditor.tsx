'use client';

import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { createClient } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { LuImage, LuBold, LuItalic, LuList, LuListOrdered, LuCode, LuLink, LuHeading1, LuHeading2, LuHeading3, LuQuote } from 'react-icons/lu';

type BlogEditorProps = {
    content: string;
    onChange: (content: string) => void;
};

export default function BlogEditor({ content, onChange }: BlogEditorProps) {
    const [activeTab, setActiveTab] = useState<string>('write');
    const [isUploading, setIsUploading] = useState(false);
    const editorRef = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleContentChange = (value: string | undefined) => {
        if (value !== undefined) {
            onChange(value);
        }
    };

    // 插入标记语法
    const insertMarkdown = (mdTemplate: string, placeholderPosition?: number) => {
        if (!editorRef.current) return;

        const editor = editorRef.current;
        const selection = editor.getSelection();
        const selectedText = editor.getModel().getValueInRange(selection);

        let textToInsert = mdTemplate;
        if (selectedText) {
            textToInsert = mdTemplate.replace('placeholder', selectedText);
        }

        editor.executeEdits('insert-markdown', [
            {
                range: selection,
                text: textToInsert,
                forceMoveMarkers: true
            }
        ]);

        // 如果有光标位置提示，设置新的选择范围
        if (placeholderPosition && !selectedText) {
            const startLineNumber = selection.startLineNumber;
            const startColumn = selection.startColumn;
            const placeholderStart = startColumn + placeholderPosition - 1;
            const placeholderEnd = placeholderStart + 11; // "placeholder" 长度

            editor.setSelection({
                startLineNumber,
                startColumn: placeholderStart,
                endLineNumber: startLineNumber,
                endColumn: placeholderEnd
            });
        }

        editor.focus();
    };

    // 上传图片
    const uploadImage = async (file: File) => {
        setIsUploading(true);

        try {
            const supabase = createClient();

            // 生成唯一文件名
            const fileExt = file.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExt}`;
            const filePath = `blog/${fileName}`;

            // 上传到Supabase存储
            const { data, error } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (error) {
                throw error;
            }

            // 获取公共URL
            const { data: publicUrlData } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            // 插入Markdown图片语法
            insertMarkdown(`![Image](${publicUrlData.publicUrl})`);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('上传图片失败，请重试');
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadImage(file);
        }
    };

    const toolbar = [
        {
            icon: <LuBold />,
            title: '粗体',
            action: () => insertMarkdown('**placeholder**', 3)
        },
        {
            icon: <LuItalic />,
            title: '斜体',
            action: () => insertMarkdown('*placeholder*', 2)
        },
        {
            icon: <LuHeading1 />,
            title: '一级标题',
            action: () => insertMarkdown('# placeholder', 3)
        },
        {
            icon: <LuHeading2 />,
            title: '二级标题',
            action: () => insertMarkdown('## placeholder', 4)
        },
        {
            icon: <LuHeading3 />,
            title: '三级标题',
            action: () => insertMarkdown('### placeholder', 5)
        },
        {
            icon: <LuLink />,
            title: '链接',
            action: () => insertMarkdown('[placeholder](url)', 2)
        },
        {
            icon: <LuImage />,
            title: '图片',
            action: () => fileInputRef.current?.click()
        },
        {
            icon: <LuList />,
            title: '无序列表',
            action: () => insertMarkdown('- placeholder', 3)
        },
        {
            icon: <LuListOrdered />,
            title: '有序列表',
            action: () => insertMarkdown('1. placeholder', 4)
        },
        {
            icon: <LuCode />,
            title: '代码块',
            action: () => insertMarkdown('```\nplaceholder\n```', 5)
        },
        {
            icon: <LuQuote />,
            title: '引用',
            action: () => insertMarkdown('> placeholder', 3)
        }
    ];

    return (
        <div className="border rounded-md overflow-hidden">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileInputChange}
            />

            <div className="flex items-center justify-between px-4 py-2 bg-muted">
                <div className="flex items-center space-x-1">
                    <TooltipProvider>
                        {toolbar.map((item, index) => (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={item.action}
                                        disabled={activeTab === 'preview' || isUploading}
                                    >
                                        {item.icon}
                                        <span className="sr-only">{item.title}</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{item.title}</TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                    <TabsList>
                        <TabsTrigger value="write">编辑</TabsTrigger>
                        <TabsTrigger value="preview">预览</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="border-t">
                <TabsContent value="write" className="m-0">
                    <div className="h-[500px] w-full">
                        <Editor
                            height="500px"
                            language="markdown"
                            value={content}
                            onChange={handleContentChange}
                            onMount={handleEditorDidMount}
                            options={{
                                wordWrap: 'on',
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                lineNumbers: 'on',
                                scrollbar: {
                                    vertical: 'visible',
                                    horizontal: 'visible'
                                }
                            }}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="preview" className="m-0 h-[500px] overflow-auto p-4">
                    <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            language={match[1]}
                                            style={vscDarkPlus}
                                            PreTag="div"
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </TabsContent>
            </div>
        </div>
    );
} 