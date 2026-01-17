'use client';

/**
 * 管理后台页面
 * 用于管理用户和订阅
 */

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string | null;
  isAdmin: boolean;
  createdAt: string;
  subscription?: {
    id: string;
    status: string;
    startDate: string;
    endDate: string;
  };
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // 检查是否是管理员
    if (!session.user.isAdmin) {
      alert('您没有管理员权限');
      router.push('/quiz-generator');
      return;
    }

    fetchUsers();
  }, [session, status]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '获取用户列表失败');
      }

      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (userId: string, userEmail: string) => {
    setActionLoading(userId);

    try {
      const res = await fetch('/api/admin/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '开通订阅失败');
      }

      alert(`已成功为用户 ${userEmail} 开通1年订阅`);
      fetchUsers(); // 刷新用户列表
    } catch (err) {
      alert(err instanceof Error ? err.message : '开通订阅失败');
    } finally {
      setActionLoading(null);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">管理后台</h1>
          <p className="mt-2 text-gray-600">管理用户和订阅</p>
        </div>

        {/* 返回按钮 */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/quiz-generator')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← 返回智能出题
          </button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500">总用户数</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{users.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500">管理员</div>
            <div className="text-2xl font-bold text-purple-600 mt-1">{users.filter(u => u.isAdmin).length}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500">已订阅用户</div>
            <div className="text-2xl font-bold text-green-600 mt-1">{users.filter(u => u.subscription?.status === 'ACTIVE').length}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500">未订阅用户</div>
            <div className="text-2xl font-bold text-orange-600 mt-1">{users.filter(u => !u.subscription || u.subscription.status !== 'ACTIVE').length}</div>
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* 用户列表 */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">用户列表</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    邮箱
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    角色
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    订阅状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    订阅有效期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    注册时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name || '未设置'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isAdmin ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          管理员
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          普通用户
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.subscription?.status === 'ACTIVE' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          已订阅
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                          未订阅
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.subscription?.endDate
                        ? new Date(user.subscription.endDate).toLocaleDateString('zh-CN')
                        : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {!user.isAdmin && user.subscription?.status !== 'ACTIVE' && (
                        <button
                          onClick={() => createSubscription(user.id, user.email)}
                          disabled={actionLoading === user.id}
                          className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionLoading === user.id ? '开通中...' : '开通订阅'}
                        </button>
                      )}
                      {user.subscription?.status === 'ACTIVE' && (
                        <span className="text-green-600">已开通</span>
                      )}
                      {user.isAdmin && (
                        <span className="text-gray-400">管理员</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
