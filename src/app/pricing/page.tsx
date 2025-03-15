import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

// 价格方案数据
const plans = [
  {
    name: "Basic",
    description: "免费使用基础功能",
    price: 0,
    priceUnit: "月",
    features: [
      "基础AI工具访问",
      "每日使用限额",
      "社区基础功能",
      "标准客服支持",
      "广告展示",
    ],

    cta: "免费注册",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "个人创作者的理想选择",
    price: 99,
    priceUnit: "月",
    features: [
      "所有基础功能",
      "完整AI工具集访问权限",
      "较高的使用配额",
      "无广告体验",
      "优先客服支持",
      "批量处理能力",
    ],

    cta: "立即订阅",
    href: "/signup?plan=pro",
    badge: "最受欢迎",
    highlighted: true,
    yearlyDiscount: {
      price: 999,
      saved: "节省 ¥189",
    },
  },
  {
    name: "Team",
    description: "小型团队协作首选",
    price: 299,
    priceUnit: "月/用户",
    features: [
      "所有Pro功能",
      "团队协作功能",
      "统一账单",
      "团队管理面板",
      "专属客服经理",
      "团队使用数据分析",
    ],

    cta: "联系销售",
    href: "/contact",
    highlighted: false,
    minUsers: 3,
  },
];

// 企业版描述
const enterprisePlan = {
  features: [
    "API完整访问权限",
    "定制开发支持",
    "专属技术顾问",
    "SLA保障",
    "企业级安全",
    "自定义集成方案",
  ],
};

export default function PricingPage() {
  return (
    <div className="py-12 mt-16" data-oid="6ymrsqv">
      <div className="container mx-auto px-4" data-oid="hoy-q62">
        {/* 页面标题 */}
        <div className="max-w-3xl mx-auto text-center mb-16" data-oid="ls6_pq5">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            data-oid="omydqoc"
          >
            选择适合您的方案
          </h1>
          <p
            className="text-xl text-gray-600 dark:text-gray-400"
            data-oid="1_3a_y5"
          >
            灵活的价格方案满足不同需求，从个人创作者到企业团队
          </p>
        </div>

        {/* 计费周期选择（静态展示，实际应用需添加状态管理） */}
        <div className="flex justify-center mb-12" data-oid="cnu.83c">
          <div
            className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex"
            data-oid="8r31ku7"
          >
            <button
              className="px-4 py-2 text-sm font-medium rounded-md bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white"
              data-oid="gywazmx"
            >
              月付
            </button>
            <button
              className="px-4 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-400"
              data-oid="t:k5hg1"
            >
              年付（省10%）
            </button>
          </div>
        </div>

        {/* 价格卡片 */}
        <div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          data-oid="6-n_1n4"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl overflow-hidden ${
                plan.highlighted
                  ? "border-2 border-purple-500 dark:border-purple-400 shadow-xl"
                  : "border border-gray-200 dark:border-gray-700 shadow-sm"
              } bg-white dark:bg-gray-800`}
              data-oid="j75.f30"
            >
              {plan.badge && (
                <div
                  className="absolute top-0 w-full bg-purple-500 text-white text-center py-1 text-sm font-medium"
                  data-oid="_5ntczk"
                >
                  {plan.badge}
                </div>
              )}

              <div
                className={`p-6 ${plan.badge ? "pt-10" : ""}`}
                data-oid="u0ka5dx"
              >
                <h2
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-1"
                  data-oid="6c6xxr6"
                >
                  {plan.name}
                </h2>
                <p
                  className="text-gray-500 dark:text-gray-400 mb-5"
                  data-oid="10zno_4"
                >
                  {plan.description}
                </p>

                <div className="mb-6" data-oid="_m:your">
                  <span
                    className="text-4xl font-bold text-gray-900 dark:text-white"
                    data-oid="epmfda3"
                  >
                    ¥{plan.price}
                  </span>
                  <span
                    className="text-gray-500 dark:text-gray-400"
                    data-oid="6o0sxwv"
                  >
                    /{plan.priceUnit}
                  </span>

                  {plan.minUsers && (
                    <p
                      className="text-sm text-gray-500 dark:text-gray-400 mt-1"
                      data-oid="5b_yu5e"
                    >
                      最少{plan.minUsers}个用户
                    </p>
                  )}

                  {plan.yearlyDiscount && (
                    <p
                      className="text-sm text-purple-600 dark:text-purple-400 mt-2"
                      data-oid="2ewqoex"
                    >
                      年付: ¥{plan.yearlyDiscount.price}/年 (
                      {plan.yearlyDiscount.saved})
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8" data-oid="ifjjdxy">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start"
                      data-oid="y390.y."
                    >
                      <Check
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        data-oid=".qsudrh"
                      />

                      <span
                        className="text-gray-600 dark:text-gray-300"
                        data-oid="cknh61m"
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block w-full py-3 px-4 rounded-lg text-center font-medium ${
                    plan.highlighted
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  }`}
                  data-oid="49tci_9"
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 企业版 */}
        <div
          className="mt-16 max-w-6xl mx-auto bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white overflow-hidden"
          data-oid="k8uxxvh"
        >
          <div className="p-8 md:p-12" data-oid="39djopo">
            <div
              className="md:flex justify-between items-center"
              data-oid="ouz-dcd"
            >
              <div className="mb-6 md:mb-0" data-oid="yusb-bp">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-2"
                  data-oid=".h3ibxk"
                >
                  Enterprise
                </h2>
                <p className="text-purple-100 mb-4" data-oid=":irhyzw">
                  为大型企业和组织定制的解决方案
                </p>

                <div
                  className="grid md:grid-cols-2 gap-x-12 gap-y-3"
                  data-oid="9c6mzv3"
                >
                  {enterprisePlan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center"
                      data-oid="3-c07np"
                    >
                      <Check
                        className="h-5 w-5 mr-2 flex-shrink-0"
                        data-oid="oe77j6g"
                      />

                      <span data-oid="9hzncbv">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:ml-8 flex-shrink-0" data-oid="eqdvm7q">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-white text-purple-600 hover:bg-purple-50 font-medium px-6 py-3 rounded-lg"
                  data-oid="gexx28i"
                >
                  联系我们获取报价
                  <ArrowRight className="ml-2 h-5 w-5" data-oid="6fk4fue" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ 部分 */}
        <div className="mt-24 max-w-4xl mx-auto" data-oid="8o_5vr7">
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
            data-oid="-w4h876"
          >
            常见问题
          </h2>

          <div className="space-y-6" data-oid="ili-x82">
            {[
              {
                question: "如何选择合适的方案？",
                answer:
                  "如果您是个人用户，希望体验AI工具的基础功能，可以选择免费的Basic方案。对于需要高质量内容和更多功能的个人创作者，Pro方案是理想选择。团队协作和企业级需求则可以选择Team或Enterprise方案。",
              },
              {
                question: "订阅可以随时取消吗？",
                answer:
                  "是的，您可以随时取消订阅。取消后，您的方案将在当前计费周期结束时停止，不会有额外费用。",
              },
              {
                question: "使用额度如何计算？",
                answer:
                  "Basic方案每日有固定的使用次数限制，Pro方案提供更高的使用额度，而Team和Enterprise方案几乎无限制。具体额度取决于工具类型，您可以在账户设置中查看详细信息。",
              },
              {
                question: "是否提供发票？",
                answer:
                  "所有付费方案都可以获取发票。个人用户可在账户设置中申请，企业客户会自动收到每月/每年的发票。",
              },
              {
                question: "如何进行团队管理？",
                answer:
                  "Team和Enterprise方案提供团队管理功能，管理员可以添加/删除成员、设置权限、查看使用数据和管理账单等。",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                data-oid="a4.w0m9"
              >
                <h3
                  className="text-lg font-semibold mb-2 text-gray-900 dark:text-white"
                  data-oid="2pws.yl"
                >
                  {faq.question}
                </h3>
                <p
                  className="text-gray-600 dark:text-gray-400"
                  data-oid="k:u_:ej"
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12" data-oid="hwtgve4">
            <p
              className="text-gray-600 dark:text-gray-400 mb-4"
              data-oid="d1zn4t1"
            >
              还有其他问题？
            </p>
            <Link
              href="/contact"
              className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300"
              data-oid="a9_7gqn"
            >
              联系我们的客服团队
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
