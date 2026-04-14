"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const socials = [
  { name: "Twitter/X", url: "https://twitter.com/MingFire520", icon: "X" },
  { name: "GitHub", url: "https://github.com/Ming-H", icon: "GH" },
  { name: "公众号", icon: "公", qrImage: "/wechat-qr.jpg" },
  { name: "小红书", icon: "书", qrImage: "/xiaohongshu-qr.jpg" },
];

export function SocialLinks() {
  const [qrModal, setQrModal] = useState<string | null>(null);
  const qrItem = socials.find((s) => s.name === qrModal && "qrImage" in s);

  return (
    <>
      <div className="flex items-center gap-3">
        {socials.map((s) => {
          if ("qrImage" in s) {
            return (
              <button
                key={s.name}
                onClick={() => setQrModal(s.name)}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {s.name}
              </button>
            );
          }
          return (
            <Link
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              {s.name}
            </Link>
          );
        })}
      </div>

      {qrModal && qrItem && "qrImage" in qrItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setQrModal(null)}
        >
          <div
            className="bg-[var(--background-secondary)] border border-[var(--border-default)] p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs text-[var(--text-muted)] mb-4">扫码关注{qrModal}</p>
            <Image src={qrItem.qrImage!} alt={`${qrModal}二维码`} width={160} height={160} />
            <p className="text-[10px] text-[var(--text-muted)] mt-2">极客狐DevFox</p>
            <button
              onClick={() => setQrModal(null)}
              className="mt-4 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  );
}
