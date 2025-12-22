"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { authFetch } from "@/lib/auth";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export default function ShareExperimentPage() {
  const params = useParams();
  const router = useRouter();
  const experimentId = parseInt(params?.id as string);

  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<"read" | "write">("read");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleShare = async () => {
    if (!email.trim()) {
      setMessage({ type: "error", text: "请输入用户邮箱" });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await authFetch(`${BACKEND_BASE}/api/v1/experiments/${experimentId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experiment_id: experimentId,
          shared_with_user_email: email.trim(),
          permission,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "分享失败");
      }

      setMessage({ type: "success", text: "实验分享成功！" });
      setEmail("");
      setTimeout(() => {
        router.push(`/experiments/${experimentId}`);
      }, 1500);
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "分享失败" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-6 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex items-center gap-4">
            <Link href={`/experiments/${experimentId}`}>
              <Button variant="ghost" size="sm">
                ← 返回实验详情
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-100">分享实验</h1>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">用户邮箱</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">权限</label>
                <div className="flex gap-3">
                  <Button
                    variant={permission === "read" ? "primary" : "outline"}
                    onClick={() => setPermission("read")}
                    className="flex-1"
                  >
                    只读
                  </Button>
                  <Button
                    variant={permission === "write" ? "primary" : "outline"}
                    onClick={() => setPermission("write")}
                    className="flex-1"
                  >
                    可编辑
                  </Button>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  {permission === "read" ? "用户只能查看实验" : "用户可以查看和编辑实验"}
                </p>
              </div>

              {message && (
                <div
                  className={`rounded-lg p-3 ${
                    message.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={handleShare} disabled={loading} className="flex-1">
                  {loading ? "分享中..." : "确认分享"}
                </Button>
                <Link href={`/experiments/${experimentId}`}>
                  <Button variant="outline">取消</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
