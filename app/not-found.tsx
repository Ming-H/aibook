import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
      <h1 className="text-6xl font-bold text-[var(--text-primary)] mb-4">404</h1>
      <p className="text-lg text-[var(--text-secondary)] mb-8">
        页面未找到
      </p>
      <Link
        href="/"
        className="btn-primary"
      >
        返回首页
      </Link>
    </div>
  );
}
