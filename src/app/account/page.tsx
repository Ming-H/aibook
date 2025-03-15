"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  CreditCard,
  History,
  Bell,
  Shield,
  LogOut,
  Edit,
  Save,
  X,
  ChevronRight,
  Zap,
  BarChart3,
  Clock,
} from "lucide-react";

export default function AccountPage() {
  // 用户信息状态
  const [user, setUser] = useState({
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "/images/avatar-placeholder.jpg",
    plan: "pro",
    joinDate: "2023-09-15",
    usage: {
      textGeneration: 85, // 百分比
      imageGeneration: 40,
      audioProcessing: 20,
      videoCreation: 10,
    },
    recentActivity: [
      {
        id: 1,
        action: "生成了一篇文章",
        tool: "文章生成器",
        time: "今天 14:30",
      },
      { id: 2, action: "创建了一张图片", tool: "AI绘画", time: "昨天 18:45" },
      { id: 3, action: "翻译了一篇文档", tool: "智能翻译", time: "3天前" },
    ],
  });

  // 编辑个人信息状态
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
  });

  // 处理表单变化
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 保存个人信息
  const handleSaveProfile = () => {
    setUser((prev) => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
    }));
    setIsEditing(false);
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditForm({
      name: user.name,
      email: user.email,
    });
    setIsEditing(false);
  };

  // 激活的选项卡
  const [activeTab, setActiveTab] = useState("overview");

  // 渲染账户概览内容
  const renderOverview = () => (
    <div className="space-y-6" data-oid="21amu17">
      {/* 欢迎信息 */}
      <div
        className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white shadow-lg"
        data-oid="b7-mm7c"
      >
        <h2 className="text-xl font-bold mb-2" data-oid="yl:44l:">
          欢迎回来，{user.name}！
        </h2>
        <p className="opacity-90" data-oid="hjv6g84">
          您的{user.plan === "pro" ? "Pro" : "基础"}账户可以使用所有
          {user.plan === "pro" ? "高级" : "基础"}功能。
        </p>
        {user.plan !== "pro" && (
          <Link
            href="/pricing"
            className="mt-4 inline-flex items-center text-sm font-medium bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
            data-oid="op96kq3"
          >
            升级到Pro <Zap className="ml-1 h-4 w-4" data-oid="pgw_h6i" />
          </Link>
        )}
      </div>

      {/* 使用统计 */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        data-oid="aryhsha"
      >
        <div
          className="flex justify-between items-center mb-4"
          data-oid="81cn5xv"
        >
          <h3 className="text-lg font-medium" data-oid="gh6t2n1">
            本月使用量
          </h3>
          <Link
            href="/account/usage"
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center"
            data-oid=".tkqb0p"
          >
            查看详情{" "}
            <ChevronRight className="ml-1 h-4 w-4" data-oid="3tbjp32" />
          </Link>
        </div>

        <div className="space-y-4" data-oid="-_t74:j">
          <div data-oid="4e.2n3p">
            <div
              className="flex justify-between text-sm mb-1"
              data-oid="u9j-7qc"
            >
              <span data-oid="mjjb86q">文本生成</span>
              <span data-oid="7-x.ewa">{user.usage.textGeneration}%</span>
            </div>
            <div
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
              data-oid="o60vvbj"
            >
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${user.usage.textGeneration}%` }}
                data-oid="5cotye:"
              ></div>
            </div>
          </div>

          <div data-oid="gp9413y">
            <div
              className="flex justify-between text-sm mb-1"
              data-oid="7lkeiva"
            >
              <span data-oid="z8v_48w">图像生成</span>
              <span data-oid=".72mv6s">{user.usage.imageGeneration}%</span>
            </div>
            <div
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
              data-oid="k0snq7r"
            >
              <div
                className="bg-indigo-500 h-2 rounded-full"
                style={{ width: `${user.usage.imageGeneration}%` }}
                data-oid="h.s5yfu"
              ></div>
            </div>
          </div>

          <div data-oid=".gj6j59">
            <div
              className="flex justify-between text-sm mb-1"
              data-oid="mprv6dx"
            >
              <span data-oid=".s3k.ol">音频处理</span>
              <span data-oid="3woo4ka">{user.usage.audioProcessing}%</span>
            </div>
            <div
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
              data-oid=":wibytt"
            >
              <div
                className="bg-pink-500 h-2 rounded-full"
                style={{ width: `${user.usage.audioProcessing}%` }}
                data-oid="ua-8hla"
              ></div>
            </div>
          </div>

          <div data-oid="3ujudai">
            <div
              className="flex justify-between text-sm mb-1"
              data-oid="k78sq76"
            >
              <span data-oid="jh33m_8">视频创作</span>
              <span data-oid="5pcyd0l">{user.usage.videoCreation}%</span>
            </div>
            <div
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
              data-oid="st1fwbz"
            >
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${user.usage.videoCreation}%` }}
                data-oid="vi.8c:r"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 最近活动 */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        data-oid="t1gq4rw"
      >
        <div
          className="flex justify-between items-center mb-4"
          data-oid="z3mx:mh"
        >
          <h3 className="text-lg font-medium" data-oid="wgdp.x_">
            最近活动
          </h3>
          <Link
            href="/account/history"
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center"
            data-oid="xvmnyv7"
          >
            查看全部{" "}
            <ChevronRight className="ml-1 h-4 w-4" data-oid="ug7m30m" />
          </Link>
        </div>

        <div className="divide-y dark:divide-gray-700" data-oid="hh0dozk">
          {user.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="py-4 flex items-start"
              data-oid="m:uel2."
            >
              <div
                className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-4"
                data-oid="fq6g36a"
              >
                <Clock
                  className="h-5 w-5 text-purple-600 dark:text-purple-400"
                  data-oid="rbtqu:z"
                />
              </div>
              <div data-oid="g--1hu7">
                <p className="text-sm font-medium" data-oid="p:o3x:b">
                  {activity.action}
                </p>
                <div className="flex items-center mt-1" data-oid="7ujxyen">
                  <span
                    className="text-xs text-gray-500 dark:text-gray-400"
                    data-oid="l6bkueo"
                  >
                    {activity.tool}
                  </span>
                  <span
                    className="mx-2 text-gray-300 dark:text-gray-600"
                    data-oid="9exz55q"
                  >
                    •
                  </span>
                  <span
                    className="text-xs text-gray-500 dark:text-gray-400"
                    data-oid="23g8fyj"
                  >
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 渲染个人信息选项卡内容
  const renderProfile = () => (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      data-oid="2ja77-r"
    >
      <div
        className="flex justify-between items-center mb-6"
        data-oid="rcvufn-"
      >
        <h3 className="text-lg font-medium" data-oid="l8buo7e">
          个人信息
        </h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            data-oid="y3st25:"
          >
            <Edit className="h-4 w-4 mr-1" data-oid="iu128au" />
            编辑
          </button>
        ) : (
          <div className="flex space-x-2" data-oid="cl.m9pc">
            <button
              onClick={handleCancelEdit}
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              data-oid="k65uk4l"
            >
              <X className="h-4 w-4 mr-1" data-oid="bz8jahj" />
              取消
            </button>
            <button
              onClick={handleSaveProfile}
              className="inline-flex items-center text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              data-oid="7fql1ut"
            >
              <Save className="h-4 w-4 mr-1" data-oid="8hpi5gw" />
              保存
            </button>
          </div>
        )}
      </div>

      <div
        className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6"
        data-oid="q5_sgjd"
      >
        <div className="relative" data-oid="uyh6ju.">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-purple-200 dark:border-purple-900"
            data-oid="urixl59"
          />

          {isEditing && (
            <button
              className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full border-2 border-white dark:border-gray-800"
              data-oid="1z8d:.-"
            >
              <Edit className="h-3 w-3" data-oid="2w3gt8f" />
            </button>
          )}
        </div>

        <div className="flex-1 w-full" data-oid="_ihprxy">
          {isEditing ? (
            <div className="space-y-4" data-oid="rgqp8:l">
              <div data-oid="-a-_uso">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  data-oid="ptttc13"
                >
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editForm.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                  data-oid="i:seae1"
                />
              </div>

              <div data-oid="_29bauy">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  data-oid=":4u2_0i"
                >
                  邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                  data-oid=".dna7gm"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4" data-oid="lfoxgoc">
              <div data-oid="b1:c17b">
                <h4
                  className="text-sm font-medium text-gray-500 dark:text-gray-400"
                  data-oid="85my01n"
                >
                  姓名
                </h4>
                <p data-oid="_i3--06">{user.name}</p>
              </div>

              <div data-oid="tlmqlhc">
                <h4
                  className="text-sm font-medium text-gray-500 dark:text-gray-400"
                  data-oid="56i4002"
                >
                  邮箱
                </h4>
                <p data-oid="g.7-ef9">{user.email}</p>
              </div>

              <div data-oid=".:bnos7">
                <h4
                  className="text-sm font-medium text-gray-500 dark:text-gray-400"
                  data-oid="brco4dw"
                >
                  会员级别
                </h4>
                <p className="inline-flex items-center" data-oid="-hm4xef">
                  {user.plan === "pro" ? (
                    <>
                      <span
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-2 py-0.5 rounded-full mr-2"
                        data-oid="ktmjjbi"
                      >
                        PRO
                      </span>
                      高级会员
                    </>
                  ) : (
                    "基础会员"
                  )}
                </p>
              </div>

              <div data-oid="yqxkqql">
                <h4
                  className="text-sm font-medium text-gray-500 dark:text-gray-400"
                  data-oid=":hrguxh"
                >
                  加入日期
                </h4>
                <p data-oid="lq-iiso">{user.joinDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t dark:border-gray-700 pt-6" data-oid="ff_7pwa">
        <h3 className="text-lg font-medium mb-4" data-oid="n3445kx">
          账户安全
        </h3>

        <div className="space-y-4" data-oid="5wuief2">
          <div
            className="flex justify-between items-center py-2"
            data-oid="27bvk4n"
          >
            <div data-oid="7_0::s-">
              <h4 className="font-medium" data-oid="wsksy4h">
                更改密码
              </h4>
              <p
                className="text-sm text-gray-500 dark:text-gray-400"
                data-oid="xlr0oms"
              >
                上次更新于3个月前
              </p>
            </div>
            <Link
              href="/account/security/password"
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
              data-oid="0424dn5"
            >
              更改
            </Link>
          </div>

          <div
            className="flex justify-between items-center py-2"
            data-oid="7dx:ysr"
          >
            <div data-oid="a5g8ani">
              <h4 className="font-medium" data-oid="5tyxf6b">
                两步验证
              </h4>
              <p
                className="text-sm text-gray-500 dark:text-gray-400"
                data-oid="54fra.3"
              >
                增强账户安全性
              </p>
            </div>
            <Link
              href="/account/security/2fa"
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
              data-oid="n4aaq0o"
            >
              设置
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // 渲染订阅管理选项卡内容
  const renderSubscription = () => (
    <div className="space-y-6" data-oid="q18hm0r">
      {/* 当前订阅 */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        data-oid=".-w.ua:"
      >
        <h3 className="text-lg font-medium mb-4" data-oid="kj27._y">
          当前订阅
        </h3>

        <div
          className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg mb-6"
          data-oid="tb40ipw"
        >
          <div className="mb-4 md:mb-0" data-oid="qs6p3rh">
            <div className="flex items-center mb-2" data-oid="5xf3mag">
              <span
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-2 py-0.5 rounded-full mr-2"
                data-oid="7v2czlu"
              >
                PRO
              </span>
              <h4 className="font-medium" data-oid="._s1oj_">
                AI创作Pro计划
              </h4>
            </div>
            <p
              className="text-sm text-gray-600 dark:text-gray-400"
              data-oid="pjhexi:"
            >
              ¥99/月，下次续费日期: 2024年5月15日
            </p>
          </div>

          <div className="flex space-x-3" data-oid="wfsp4lc">
            <Link
              href="/account/subscription/change"
              className="inline-block px-4 py-2 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-500 rounded-md text-sm font-medium hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
              data-oid="3ruejf-"
            >
              更改计划
            </Link>
            <Link
              href="/account/subscription/cancel"
              className="inline-block px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              data-oid="79brk17"
            >
              取消订阅
            </Link>
          </div>
        </div>

        <h4 className="font-medium mb-3" data-oid="b5zkezq">
          包含功能
        </h4>
        <ul className="space-y-2 mb-6" data-oid="5ev:.7u">
          <li className="flex items-start" data-oid="yg6edoe">
            <Zap
              className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
              data-oid="nz1znrr"
            />

            <span data-oid="gqd.eci">无限制访问所有AI创作工具</span>
          </li>
          <li className="flex items-start" data-oid="o2h7m8x">
            <Zap
              className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
              data-oid="6vuduki"
            />

            <span data-oid="q1q130-">每月10,000次高级AI生成</span>
          </li>
          <li className="flex items-start" data-oid="ujucdpa">
            <Zap
              className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
              data-oid="t48lu4s"
            />

            <span data-oid="qlgi-.d">优先处理队列</span>
          </li>
          <li className="flex items-start" data-oid="dd47z4t">
            <Zap
              className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
              data-oid="vy78:1n"
            />

            <span data-oid="._3e1b9">高级图像和视频生成功能</span>
          </li>
        </ul>

        <h4 className="font-medium mb-3" data-oid="xgp-i49">
          支付方式
        </h4>
        <div
          className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-md"
          data-oid="el2-315"
        >
          <div className="flex items-center" data-oid=":7f-1n2">
            <div
              className="bg-gray-100 dark:bg-gray-700 p-2 rounded mr-3"
              data-oid="269wuih"
            >
              <CreditCard
                className="h-6 w-6 text-gray-600 dark:text-gray-400"
                data-oid="78he0_j"
              />
            </div>
            <div data-oid="11-c-q3">
              <p className="font-medium" data-oid="yj37qze">
                Visa **** 4242
              </p>
              <p
                className="text-sm text-gray-500 dark:text-gray-400"
                data-oid="9e9im_i"
              >
                到期日: 09/25
              </p>
            </div>
          </div>
          <Link
            href="/account/payment-methods"
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            data-oid="_.95oqx"
          >
            更改
          </Link>
        </div>
      </div>

      {/* 账单历史 */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        data-oid="t4flkh0"
      >
        <div
          className="flex justify-between items-center mb-4"
          data-oid="ora642l"
        >
          <h3 className="text-lg font-medium" data-oid="-.6m:6a">
            账单历史
          </h3>
          <Link
            href="/account/billing"
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            data-oid="yiqux73"
          >
            查看全部
          </Link>
        </div>

        <div className="overflow-x-auto" data-oid="g9usznl">
          <table
            className="min-w-full divide-y dark:divide-gray-700"
            data-oid="d4qo8l_"
          >
            <thead data-oid="fhnj-lk">
              <tr data-oid="-cvkmsf">
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  data-oid=".f:d0s3"
                >
                  日期
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  data-oid="3ut-zsx"
                >
                  金额
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  data-oid="xup.j3i"
                >
                  状态
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  data-oid="muqyq6g"
                >
                  发票
                </th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700" data-oid="otay4dz">
              <tr data-oid="a5e68rr">
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid="u2eri9f"
                >
                  2024-04-15
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid="lvavgft"
                >
                  ¥99.00
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid="7:mene_"
                >
                  <span
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                    data-oid="e0fmcph"
                  >
                    已支付
                  </span>
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid="7_gnxyp"
                >
                  <Link
                    href="#"
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                    data-oid="39ugfmc"
                  >
                    下载
                  </Link>
                </td>
              </tr>
              <tr data-oid="74sl:jd">
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid="e9v.jvj"
                >
                  2024-03-15
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid="ukc2ld0"
                >
                  ¥99.00
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid=".uxsgm0"
                >
                  <span
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                    data-oid="4l_:qbu"
                  >
                    已支付
                  </span>
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid="96u4ws5"
                >
                  <Link
                    href="#"
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                    data-oid="aa0_1fo"
                  >
                    下载
                  </Link>
                </td>
              </tr>
              <tr data-oid="e.e1974">
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid="8r_:-vt"
                >
                  2024-02-15
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid="z:1rwi_"
                >
                  ¥99.00
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid="p60o6j_"
                >
                  <span
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                    data-oid="kmqmjic"
                  >
                    已支付
                  </span>
                </td>
                <td
                  className="px-3 py-4 whitespace-nowrap text-sm"
                  data-oid="3zjuwzi"
                >
                  <Link
                    href="#"
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                    data-oid="u9.h-4e"
                  >
                    下载
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-oid="imx5b09"
    >
      <h1 className="text-2xl font-bold mb-6" data-oid="6k631xb">
        我的账户
      </h1>

      <div className="flex flex-col md:flex-row gap-6" data-oid="x47jep0">
        {/* 侧边导航 */}
        <div className="w-full md:w-64 flex-shrink-0" data-oid="8y.0i:o">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow"
            data-oid="o5ya4h4"
          >
            <div
              className="p-4 border-b dark:border-gray-700"
              data-oid="65bg1-8"
            >
              <div className="flex items-center space-x-3" data-oid="u:nnam.">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                  data-oid="wwmimpk"
                />

                <div data-oid="r83m16r">
                  <h3 className="font-medium" data-oid="0rvbtla">
                    {user.name}
                  </h3>
                  <p
                    className="text-xs text-gray-500 dark:text-gray-400"
                    data-oid="68254j2"
                  >
                    {user.plan === "pro" ? "Pro会员" : "基础会员"}
                  </p>
                </div>
              </div>
            </div>

            <nav className="p-2" data-oid="30.ozrs">
              <ul className="space-y-1" data-oid="-eanmtu">
                <li data-oid="zkf-myh">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      activeTab === "overview"
                        ? "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    data-oid="cuaa1:a"
                  >
                    <BarChart3 className="h-5 w-5" data-oid="bjb84q5" />
                    <span data-oid="v716r8l">账户概览</span>
                  </button>
                </li>
                <li data-oid="_i2b35x">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      activeTab === "profile"
                        ? "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    data-oid=".el68fk"
                  >
                    <User className="h-5 w-5" data-oid="5-elro." />
                    <span data-oid="y7.g:qj">个人信息</span>
                  </button>
                </li>
                <li data-oid="l7jsev8">
                  <button
                    onClick={() => setActiveTab("subscription")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      activeTab === "subscription"
                        ? "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    data-oid="urkubpz"
                  >
                    <CreditCard className="h-5 w-5" data-oid="h2ukqe7" />
                    <span data-oid="8q9.7_q">订阅管理</span>
                  </button>
                </li>
                <li data-oid="lbw-5-j">
                  <Link
                    href="/account/history"
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    data-oid="y122h-:"
                  >
                    <History className="h-5 w-5" data-oid="uid0lki" />
                    <span data-oid="9_aay:0">使用历史</span>
                  </Link>
                </li>
                <li data-oid="3au_.n.">
                  <Link
                    href="/account/notifications"
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    data-oid="sd0mikg"
                  >
                    <Bell className="h-5 w-5" data-oid="87g091u" />
                    <span data-oid="2p6h.p-">通知设置</span>
                  </Link>
                </li>
                <li data-oid=".hln8v.">
                  <Link
                    href="/account/security"
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    data-oid="6n4tf8k"
                  >
                    <Shield className="h-5 w-5" data-oid="o7xg56v" />
                    <span data-oid="ctvuo_f">安全设置</span>
                  </Link>
                </li>
              </ul>

              <div
                className="pt-4 mt-4 border-t dark:border-gray-700"
                data-oid="m9vfa0z"
              >
                <Link
                  href="/logout"
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  data-oid="3qousv7"
                >
                  <LogOut className="h-5 w-5" data-oid=".zsy:40" />
                  <span data-oid="6y:1y93">退出登录</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="flex-1" data-oid="xerxix0">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "profile" && renderProfile()}
          {activeTab === "subscription" && renderSubscription()}
        </div>
      </div>
    </div>
  );
}
