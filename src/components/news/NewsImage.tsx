'use client';

import Image from 'next/image';
import { useState } from 'react';

interface NewsImageProps {
    src: string;
    alt: string;
    priority?: boolean;
}

export function NewsImage({ src, alt, priority = false }: NewsImageProps) {
    const [error, setError] = useState(false);

    return (
        <div className="relative aspect-[2/1] w-full bg-gray-200 dark:bg-gray-700">
            <Image
                src={error ? '/images/news/placeholder.jpg' : src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={priority}
                onError={() => setError(true)}
            />
        </div>
    );
} 