'use client';

import { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { LuPlus } from 'react-icons/lu';
import { getAllCategories, createCategory } from '@/lib/services/categoryService';

type CategorySelectorProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function CategorySelector({ value, onChange }: CategorySelectorProps) {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setIsLoading(true);
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('加载分类失败', error);
            toast.error('加载分类失败');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateCategory = async () => {
        if (!newCategory.name || !newCategory.slug) {
            toast.error('分类名称和别名不能为空');
            return;
        }

        try {
            const { data, error } = await createCategory({
                name: newCategory.name,
                slug: newCategory.slug,
                description: newCategory.description
            });

            if (error) {
                throw error;
            }

            if (data) {
                toast.success('创建分类成功');
                setCategories([...categories, data]);
                onChange(data.id);
                setNewCategory({ name: '', slug: '', description: '' });
                setIsOpen(false);
            }
        } catch (error) {
            console.error('创建分类失败', error);
            toast.error('创建分类失败');
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
        setNewCategory({
            ...newCategory,
            name,
            slug: generateSlug(name)
        });
    };

    return (
        <div className="flex items-center space-x-2">
            <Select
                value={value}
                onValueChange={onChange}
                disabled={isLoading}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                        <LuPlus className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>创建新分类</DialogTitle>
                        <DialogDescription>
                            添加一个新的博客分类。创建后可在文章中使用。
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                名称
                            </Label>
                            <Input
                                id="name"
                                value={newCategory.name}
                                onChange={handleNameChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="slug" className="text-right">
                                别名
                            </Label>
                            <Input
                                id="slug"
                                value={newCategory.slug}
                                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                描述
                            </Label>
                            <Textarea
                                id="description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleCreateCategory}>
                            创建分类
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 