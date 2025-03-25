'use client';

import {
    Twitter,
    Facebook,
    Linkedin,
    Copy,
    Check,
    MessageCircle
} from 'lucide-react';
import { useState } from 'react';

type ShareButtonsProps = {
    title: string;
    url: string;
};

export default function ShareButtons({ title, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    // 生成分享链接
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    const wechatShareText = `扫描二维码，在微信中分享这篇文章`;

    return (
        <div>
            <h3 className="font-semibold mb-3">分享这篇文章</h3>
            <div className="flex flex-wrap gap-3">
                <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#1DA1F2] text-white px-3 py-2 rounded hover:bg-opacity-90"
                    aria-label="在Twitter上分享"
                >
                    <Twitter size={18} className="mr-2" />
                    <span className="hidden sm:inline">Twitter</span>
                </a>

                <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#1877F2] text-white px-3 py-2 rounded hover:bg-opacity-90"
                    aria-label="在Facebook上分享"
                >
                    <Facebook size={18} className="mr-2" />
                    <span className="hidden sm:inline">Facebook</span>
                </a>

                <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#0A66C2] text-white px-3 py-2 rounded hover:bg-opacity-90"
                    aria-label="在LinkedIn上分享"
                >
                    <Linkedin size={18} className="mr-2" />
                    <span className="hidden sm:inline">LinkedIn</span>
                </a>

                <div className="relative">
                    <button
                        onClick={() => alert('请打开微信扫描，或在微信中长按链接选择分享')}
                        className="flex items-center bg-[#07C160] text-white px-3 py-2 rounded hover:bg-opacity-90"
                        aria-label="在微信上分享"
                    >
                        <MessageCircle size={18} className="mr-2" />
                        <span className="hidden sm:inline">微信</span>
                    </button>
                </div>

                <button
                    onClick={handleCopyLink}
                    className={`flex items-center ${copied ? 'bg-green-500' : 'bg-gray-700'
                        } text-white px-3 py-2 rounded hover:bg-opacity-90`}
                    aria-label="复制链接"
                >
                    {copied ? (
                        <>
                            <Check size={18} className="mr-2" />
                            <span className="hidden sm:inline">已复制</span>
                        </>
                    ) : (
                        <>
                            <Copy size={18} className="mr-2" />
                            <span className="hidden sm:inline">复制链接</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
} 