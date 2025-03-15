"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  AtSign,
  ArrowRight,
  Check,
} from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState("");

  // 评估密码强度
  const evaluatePasswordStrength = (password: string) => {
    // 简单的密码强度检测
    let strength = 0;
    const feedback = [];

    // 检查长度
    if (password.length >= 8) {
      strength += 1;
    } else {
      feedback.push("密码至少需要8个字符");
    }

    // 检查大写字母
    if (/[A-Z]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("包含至少一个大写字母");
    }

    // 检查数字
    if (/[0-9]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("包含至少一个数字");
    }

    // 检查特殊字符
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("包含至少一个特殊字符");
    }

    setPasswordStrength(strength);
    setPasswordFeedback(feedback.join("，"));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    evaluatePasswordStrength(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 表单验证
    if (!name || !email || !password || !confirmPassword) {
      setSignupError("请填写所有必填字段");
      return;
    }

    if (password !== confirmPassword) {
      setSignupError("两次输入的密码不匹配");
      return;
    }

    if (passwordStrength < 2) {
      setSignupError("请设置一个更强的密码");
      return;
    }

    if (!agreeTerms) {
      setSignupError("请同意我们的服务条款和隐私政策");
      return;
    }

    setSignupError("");
    setIsSigningUp(true);

    // 模拟注册请求
    try {
      // 这里应该是实际的API调用
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 模拟成功注册后的跳转
      window.location.href = "/login";
    } catch {
      setSignupError("注册失败，请稍后再试或联系客服");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
      data-oid="xr3yfuw"
    >
      <div className="max-w-md w-full space-y-8" data-oid="40l.s61">
        <div className="text-center" data-oid="-_x2bl2">
          <h1
            className="text-3xl font-extrabold text-gray-900 dark:text-white"
            data-oid=":rnkj9z"
          >
            创建您的账户
          </h1>
          <p
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
            data-oid="l5nxjaa"
          >
            注册即可使用我们的全部AI工具和服务
          </p>
        </div>

        <div
          className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow-md sm:rounded-lg sm:px-10"
          data-oid="v.8sc88"
        >
          {signupError && (
            <div
              className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-md p-3 text-sm"
              data-oid="ff5gttd"
            >
              {signupError}
            </div>
          )}

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            data-oid="paorm:7"
          >
            <div data-oid=":605ya-">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                data-oid="z3evn.u"
              >
                姓名
              </label>
              <div className="relative" data-oid="0mbk9d4">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="0klnwta"
                >
                  <User className="h-5 w-5 text-gray-400" data-oid="4re85_4" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="您的姓名"
                  data-oid=".k944bf"
                />
              </div>
            </div>

            <div data-oid="49oxga5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                data-oid="iv27mnd"
              >
                邮箱
              </label>
              <div className="relative" data-oid="s.hol1q">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="28zezyl"
                >
                  <AtSign
                    className="h-5 w-5 text-gray-400"
                    data-oid="s2j7zgh"
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
                  data-oid="sg2okfb"
                />
              </div>
            </div>

            <div data-oid="jh_ck_k">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                data-oid="02rp4h5"
              >
                密码
              </label>
              <div className="relative" data-oid="9f56lep">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="glpuakq"
                >
                  <Lock className="h-5 w-5 text-gray-400" data-oid="mya4why" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="设置密码"
                  data-oid="jdn-:me"
                />

                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  data-oid="heph:ek"
                >
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    data-oid="jj-.6.2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" data-oid="b71syj4" />
                    ) : (
                      <Eye className="h-5 w-5" data-oid="7e38ekh" />
                    )}
                  </button>
                </div>
              </div>
              {/* 密码强度显示 */}
              <div className="mt-2" data-oid="5y159gp">
                <div className="flex space-x-1 mb-1" data-oid="h02yj3a">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full ${
                        index < passwordStrength
                          ? passwordStrength === 1
                            ? "bg-red-400"
                            : passwordStrength === 2
                              ? "bg-yellow-400"
                              : passwordStrength === 3
                                ? "bg-green-400"
                                : "bg-green-600"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                      data-oid="jz-g4w3"
                    ></div>
                  ))}
                </div>
                {password && (
                  <p
                    className={`text-xs ${
                      passwordStrength === 1
                        ? "text-red-500"
                        : passwordStrength === 2
                          ? "text-yellow-500"
                          : passwordStrength >= 3
                            ? "text-green-500"
                            : "text-gray-500"
                    }`}
                    data-oid="16r84ou"
                  >
                    {passwordStrength === 0
                      ? "密码强度: 太弱"
                      : passwordStrength === 1
                        ? "密码强度: 弱"
                        : passwordStrength === 2
                          ? "密码强度: 中等"
                          : passwordStrength === 3
                            ? "密码强度: 强"
                            : "密码强度: 很强"}
                    {passwordFeedback && passwordStrength < 4 && (
                      <span
                        className="block mt-1 text-gray-500 dark:text-gray-400"
                        data-oid="l5388ys"
                      >
                        建议: {passwordFeedback}
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>

            <div data-oid=":d1j8i:">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                data-oid="sg6t8dh"
              >
                确认密码
              </label>
              <div className="relative" data-oid="795ruvk">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="nxrllw."
                >
                  <Lock className="h-5 w-5 text-gray-400" data-oid="d7:x7-f" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="再次输入密码"
                  data-oid="fvawos."
                />

                {password && confirmPassword && (
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    data-oid="5ux9weq"
                  >
                    {password === confirmPassword ? (
                      <Check
                        className="h-5 w-5 text-green-500"
                        data-oid="hs7ewe1"
                      />
                    ) : (
                      <span className="text-red-500 text-xs" data-oid="vqr0v6d">
                        不匹配
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center" data-oid="graguv7">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                data-oid="n5bv5it"
              />

              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                data-oid="c:-ainh"
              >
                我已阅读并同意
                <Link
                  href="/terms"
                  className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                  data-oid="7wk8to9"
                >
                  服务条款
                </Link>{" "}
                和{" "}
                <Link
                  href="/privacy"
                  className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                  data-oid="dp076y3"
                >
                  隐私政策
                </Link>
              </label>
            </div>

            <div data-oid="pd7:df.">
              <button
                type="submit"
                disabled={isSigningUp}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSigningUp ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors`}
                data-oid="7-.g2pl"
              >
                {isSigningUp ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      data-oid="f14j8p8"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        data-oid="1xpgdl-"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        data-oid="bjio7qi"
                      ></path>
                    </svg>
                    注册中...
                  </>
                ) : (
                  "创建账户"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center" data-oid="4u9-jvr">
            <p
              className="text-sm text-gray-600 dark:text-gray-400"
              data-oid="bk5lbj2"
            >
              已有账号?{" "}
              <Link
                href="/login"
                className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 inline-flex items-center"
                data-oid="zmz:cdy"
              >
                立即登录
                <ArrowRight className="ml-1 h-4 w-4" data-oid="rcbk:u5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
