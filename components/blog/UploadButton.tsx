'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { FiUpload, FiTrash2 } from 'react-icons/fi';

interface UploadButtonProps {
    onUpload: (file: File) => Promise<string | null>;
    onRemove: () => void;
    currentImage?: string;
}

export default function UploadButton({
    onUpload,
    onRemove,
    currentImage
}: UploadButtonProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files || files.length === 0) return;

        const file = files[0];

        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            setError('请上传图片文件');
            return;
        }

        // 验证文件大小 (限制为5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('图片大小不能超过5MB');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            await onUpload(file);
        } catch (err) {
            console.error('上传失败:', err);
            setError('图片上传失败');
        } finally {
            setIsUploading(false);

            // 重置文件输入
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="space-y-2">
            {currentImage ? (
                <div className="relative">
                    <div className="aspect-video relative rounded-md overflow-hidden border border-gray-700">
                        <Image
                            src={currentImage}
                            alt="已上传图片"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute top-2 right-2 p-2 bg-red-600 bg-opacity-90 hover:bg-opacity-100 rounded-full text-white"
                        title="删除图片"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            ) : (
                <div
                    onClick={handleClick}
                    className={`border-2 border-dashed border-gray-700 rounded-md p-6 text-center cursor-pointer hover:border-gray-500 transition ${isUploading ? 'opacity-50 pointer-events-none' : ''
                        }`}
                >
                    <FiUpload className="mx-auto text-2xl mb-2 text-gray-400" />
                    <p className="text-gray-400 mb-1">
                        {isUploading ? '上传中...' : '点击上传特色图片'}
                    </p>
                    <p className="text-gray-600 text-xs">
                        支持 JPEG、PNG、GIF 等格式，最大5MB
                    </p>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
                disabled={isUploading}
            />

            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
        </div>
    );
} 