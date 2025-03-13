export const revalidate = 0

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const courses = [
    {
      title: "深度学习",
      description: "从基础概念到高级应用的完整深度学习教程",
      href: "/deep-learning",
      image: "/images/deep-learning-cover.jpg"
    },
    {
      title: "大语言模型",
      description: "探索大语言模型的原理与应用",
      href: "/large-language-model",
      image: "/images/llm-cover.jpg"
    },
    {
      title: "大模型导航",
      description: "了解当前流行的AI大模型及其特点",
      href: "/ai-models",
      image: "/images/ai-models-cover.jpg"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 lg:py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              AI 学习从未如此简单
            </h1>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div id="courses" className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            精心设计的课程体系
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {courses.map((course) => (
              <Link
                key={course.title}
                href={course.href}
                className="group"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:scale-[1.02]">
                  <div className="relative h-56 w-full">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      {course.title}
                      <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      {course.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            为什么选择 AIBook
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "系统化学习",
                description: "精心设计的课程体系，从基础到进阶的完整学习路径"
              },
              {
                title: "实践驱动",
                description: "大量实践案例和代码示例，帮助你快速掌握核心技能"
              },
              {
                title: "AI 助手",
                description: "智能助手随时解答你的疑问，提供个性化学习指导"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
