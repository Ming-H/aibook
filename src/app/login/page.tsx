"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, AtSign, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginError("请填写所有必填字段");
      return;
    }

    setLoginError("");
    setIsLoggingIn(true);

    // 模拟登录请求
    try {
      // 这里应该是实际的API调用
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 模拟成功登录后的跳转
      window.location.href = "/";
    } catch {
      setLoginError("登录失败，请检查您的邮箱和密码");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
      data-oid="j_knz_d"
    >
      <div className="max-w-md w-full space-y-8" data-oid="9o:5d6j">
        <div className="text-center" data-oid="jth62q4">
          <h1
            className="text-3xl font-extrabold text-gray-900 dark:text-white"
            data-oid="55h41g1"
          >
            欢迎回来
          </h1>
          <p
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
            data-oid="c9_38fk"
          >
            登录您的账户以使用我们的AI工具和服务
          </p>
        </div>

        <div
          className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow-md sm:rounded-lg sm:px-10"
          data-oid="w_sso-e"
        >
          {loginError && (
            <div
              className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-md p-3 text-sm"
              data-oid="d8g4umf"
            >
              {loginError}
            </div>
          )}

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            data-oid="eprah1m"
          >
            <div data-oid="x1pdj-_">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                data-oid="fwd8jqn"
              >
                邮箱
              </label>
              <div className="relative" data-oid="qrt6acl">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="s2cjfcu"
                >
                  <AtSign
                    className="h-5 w-5 text-gray-400"
                    data-oid="o9b-cee"
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="your.email@example.com"
                  data-oid="9a4e5g4"
                />
              </div>
            </div>

            <div data-oid="2sdqb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                data-oid="0dfhu-p"
              >
                密码
              </label>
              <div className="relative" data-oid="qknv9i3">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="iy40rge"
                >
                  <Lock className="h-5 w-5 text-gray-400" data-oid="npruc.0" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="输入您的密码"
                  data-oid="siiln2n"
                />

                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  data-oid="wigvacy"
                >
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    data-oid="hrojli0"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" data-oid="29h9kw9" />
                    ) : (
                      <Eye className="h-5 w-5" data-oid="mcy2:js" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-between"
              data-oid="ghy7g7r"
            >
              <div className="flex items-center" data-oid="azsxn31">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  data-oid="pkyoi7y"
                />

                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  data-oid="s4c..09"
                >
                  记住我
                </label>
              </div>

              <div className="text-sm" data-oid=":v6kcsk">
                <Link
                  href="/forgot-password"
                  className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                  data-oid="zb:jscl"
                >
                  忘记密码?
                </Link>
              </div>
            </div>

            <div data-oid="yr9y1-w">
              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoggingIn ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors`}
                data-oid="a.dkmk2"
              >
                {isLoggingIn ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      data-oid="0z1h79c"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        data-oid="qpi2b-a"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        data-oid="g62r:wr"
                      ></path>
                    </svg>
                    登录中...
                  </>
                ) : (
                  "登录"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6" data-oid="i:9k2:q">
            <div className="relative" data-oid=":q9d1yb">
              <div
                className="absolute inset-0 flex items-center"
                data-oid="vbux0v_"
              >
                <div
                  className="w-full border-t border-gray-300 dark:border-gray-600"
                  data-oid="nqnx9w_"
                ></div>
              </div>
              <div
                className="relative flex justify-center text-sm"
                data-oid="lp3oo:1"
              >
                <span
                  className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  data-oid="-a661u-"
                >
                  或者
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3" data-oid="ak1_drd">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                data-oid="mb:izjp"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  data-oid="ndw69x4"
                >
                  <path
                    d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z"
                    data-oid="74l5g:."
                  />
                </svg>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                data-oid="k3.e1wn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  data-oid="7my5_id"
                >
                  <path
                    d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.994 17.305c-3.248 0-5.885-2.698-5.885-6.021 0-3.325 2.637-6.022 5.885-6.022 1.572 0 2.906.58 3.936 1.546l-1.615 1.61c-.448-.433-1.233-.947-2.321-.947-1.984 0-3.597 1.674-3.597 3.813 0 2.137 1.613 3.813 3.597 3.813 2.285 0 3.184-1.687 3.323-2.561h-3.323v-2.14h5.616c.087.345.125.875.125 1.39 0 3.475-2.324 5.519-5.741 5.519zm10.161-6.305h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"
                    data-oid="ql3rrbz"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center" data-oid="qn.2.ot">
            <p
              className="text-sm text-gray-600 dark:text-gray-400"
              data-oid="szlwc7m"
            >
              还没有账号?{" "}
              <Link
                href="/signup"
                className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 inline-flex items-center"
                data-oid="2x2qzcq"
              >
                立即注册
                <ArrowRight className="ml-1 h-4 w-4" data-oid="rw4g5:o" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
