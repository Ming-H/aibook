"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const socials = [
  {
    name: "Twitter/X",
    url: "https://twitter.com/MingFire520",
    icon: "𝕏",
  },
  {
    name: "GitHub",
    url: "https://github.com/Ming-H",
    icon: "GH",
  },
  {
    name: "公众号",
    icon: "公",
    label: "极客狐DevFox",
    qrImage: "/wechat-qr.jpg",
  },
  {
    name: "小红书",
    icon: "书",
    label: "极客狐DevFox",
    qrImage: "/xiaohongshu-qr.jpg",
  },
];

export function SocialLinks() {
  const [qrModal, setQrModal] = useState<string | null>(null);

  return (
    <>
      <div className="flex items-center gap-4">
        {socials.map((s) => {
          if ("qrImage" in s) {
            return (
              <button
                key={s.name}
                onClick={() => setQrModal(s.name)}
                className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors"
                title={`扫码关注${s.name}`}
              >
                <span className="w-7 h-7 rounded-full border border-[var(--border-color)] flex items-center justify-center text-xs font-medium">
                  {s.icon}
                </span>
                <span>{s.name}</span>
              </button>
            );
          }
          return (
            <Link
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors"
            >
              <span className="w-7 h-7 rounded-full border border-[var(--border-color)] flex items-center justify-center text-xs font-medium">
                {s.icon}
              </span>
              <span>{s.name}</span>
            </Link>
          );
        })}
      </div>

      {/* QR Code Modal */}
      {qrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setQrModal(null)}
        >
          <div
            className="bg-[var(--background-primary)] rounded-xl p-6 max-w-xs w-full text-center shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              扫码关注{qrModal}
            </h3>
            <div className="flex justify-center">
              <Image
                src={
                  socials.find((s) => s.name === qrModal && "qrImage" in s)
                    ?.qrImage || ""
                }
                alt={`${qrModal}二维码`}
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-3">
              极客狐DevFox
            </p>
            <button
              onClick={() => setQrModal(null)}
              className="mt-4 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  );
}
