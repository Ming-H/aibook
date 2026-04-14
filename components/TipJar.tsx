import Image from "next/image";

export function TipJar() {
  return (
    <div className="border-t border-[var(--border-default)] mt-12 pt-8 text-center">
      <p className="text-sm text-[var(--text-secondary)] mb-5">
        如果这篇文章对你有帮助，欢迎赞赏支持
      </p>
      <div className="flex justify-center gap-8">
        <div>
          <Image
            src="/wechat-qr.jpg"
            alt="微信赞赏"
            width={140}
            height={140}
            className="rounded"
          />
          <p className="text-xs text-[var(--text-muted)] mt-2">微信赞赏</p>
        </div>
        <div>
          <Image
            src="/wechat-qr.jpg"
            alt="关注公众号"
            width={140}
            height={140}
            className="rounded"
          />
          <p className="text-xs text-[var(--text-muted)] mt-2">关注公众号</p>
        </div>
      </div>
    </div>
  );
}
