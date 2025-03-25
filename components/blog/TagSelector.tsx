'use client';

import { useState, useEffect } from 'react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LuCheck, LuChevronsUpDown, LuPlus, LuX } from 'react-icons/lu';
import { getAllTags, createTag, getTagsForPost } from '@/lib/services/tagService';
import { cn } from '@/lib/utils';

type TagSelectorProps = {
    postId?: string;
    selectedTags: string[];
    onChange: (value: string[]) => void;
};

export default function TagSelector({ postId, selectedTags, onChange }: TagSelectorProps) {
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newTag, setNewTag] = useState({ name: '', slug: '' });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        loadTags();
        if (postId) {
            loadPostTags(postId);
        }
    }, [postId]);

    const loadTags = async () => {
        setIsLoading(true);
        try {
            const data = await getAllTags();
            setTags(data);
        } catch (error) {
            console.error('加载标签失败', error);
            toast.error('加载标签失败');
        } finally {
            setIsLoading(false);
        }
    };

    const loadPostTags = async (postId: string) => {
        try {
            const data = await getTagsForPost(postId);
            if (data && data.length > 0) {
                onChange(data.map((tag: any) => tag.id));
            }
        } catch (error) {
            console.error('加载文章标签失败', error);
        }
    };

    const handleCreateTag = async () => {
        if (!newTag.name || !newTag.slug) {
            toast.error('标签名称和别名不能为空');
            return;
        }

        try {
            const { data, error } = await createTag({
                name: newTag.name,
                slug: newTag.slug
            });

            if (error) {
                throw error;
            }

            if (data) {
                toast.success('创建标签成功');
                setTags([...tags, data]);
                onChange([...selectedTags, data.id]);
                setNewTag({ name: '', slug: '' });
                setIsDialogOpen(false);
            }
        } catch (error) {
            console.error('创建标签失败', error);
            toast.error('创建标签失败');
        }
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setNewTag({
            ...newTag,
            name,
            slug: generateSlug(name)
        });
    };

    const toggleTag = (tagId: string) => {
        if (selectedTags.includes(tagId)) {
            onChange(selectedTags.filter(id => id !== tagId));
        } else {
            onChange([...selectedTags, tagId]);
        }
    };

    const removeTag = (tagId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(selectedTags.filter(id => id !== tagId));
    };

    const getSelectedTagNames = () => {
        return tags
            .filter(tag => selectedTags.includes(tag.id))
            .map(tag => tag.name);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium">标签</label>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            <LuPlus className="h-3.5 w-3.5 mr-1" />
                            新建标签
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>创建新标签</DialogTitle>
                            <DialogDescription>
                                添加一个新的博客标签。创建后可在文章中使用。
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tag-name" className="text-right">
                                    名称
                                </Label>
                                <Input
                                    id="tag-name"
                                    value={newTag.name}
                                    onChange={handleNameChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tag-slug" className="text-right">
                                    别名
                                </Label>
                                <Input
                                    id="tag-slug"
                                    value={newTag.slug}
                                    onChange={(e) => setNewTag({ ...newTag, slug: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleCreateTag}>
                                创建标签
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
                {getSelectedTagNames().map((name, index) => (
                    <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                    >
                        {name}
                        <button
                            onClick={(e) => removeTag(
                                tags.find(tag => tag.name === name)?.id || '',
                                e
                            )}
                            className="text-muted-foreground hover:text-foreground rounded-full"
                        >
                            <LuX className="h-3 w-3" />
                            <span className="sr-only">删除标签 {name}</span>
                        </button>
                    </Badge>
                ))}
            </div>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        disabled={isLoading}
                    >
                        选择标签
                        <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="搜索标签..." />
                        <CommandList>
                            <CommandEmpty>找不到相关标签</CommandEmpty>
                            <CommandGroup>
                                {tags.map((tag) => (
                                    <CommandItem
                                        key={tag.id}
                                        value={tag.name}
                                        onSelect={() => toggleTag(tag.id)}
                                    >
                                        <LuCheck
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedTags.includes(tag.id) ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {tag.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
} 