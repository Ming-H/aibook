import Link from 'next/link';
import { Search, Sparkles, MessageSquare, Image, FileText, Music, Video } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero区域 */}
      <section className="relative py-20 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-200 dark:bg-blue-900 blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-200 dark:bg-purple-900 blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        {/* SVG装饰 */}
        <div className="absolute top-1/4 left-10 text-blue-500/20 dark:text-blue-500/10">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-10 text-purple-500/20 dark:text-purple-500/10">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
            <rect x="20" y="20" width="60" height="60" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            全方位AI工具集
          </h1>
          <p className="text-xl md:text-2xl text-center text-gray-700 dark:text-gray-300 max-w-3xl mb-10">
            一站式平台，提供文本、图像、视频、音频处理的AI工具，提高工作效率，释放创造力
          </p>

          {/* 搜索框 */}
          <div className="w-full max-w-2xl mb-14">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full p-4 pl-10 text-base border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="搜索AI工具..."
              />
              <button
                className="absolute right-2.5 bottom-2.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg text-sm transition-all duration-200"
              >
                搜索
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">热门搜索：</p>
              <span className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">文章生成</span>
              <span className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">图像创作</span>
              <span className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">视频制作</span>
              <span className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">AI聊天</span>
            </div>
          </div>

          <Link
            href="/tools"
            className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <Sparkles className="h-5 w-5" />
            <span>探索AI工具</span>
          </Link>
        </div>
      </section>

      {/* 功能区域 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">强大的AI工具集</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              提供丰富的AI工具，满足您在文本、图像、视频和音频处理方面的各种需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 文本处理 */}
            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-750 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">文本处理</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                智能撰写文章、生成内容摘要、翻译多语言文本和改进文案质量
              </p>
              <Link href="/tools#text" className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center">
                查看文本工具
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>

            {/* 图像创作 */}
            <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-750 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">图像创作</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                根据文本提示生成图像、编辑现有图片、创建艺术风格图像和设计海报
              </p>
              <Link href="/tools#image" className="text-green-600 dark:text-green-400 font-medium hover:underline inline-flex items-center">
                查看图像工具
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>

            {/* 视频制作 */}
            <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-750 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Video className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">视频制作</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                将文本转换为视频、自动生成视频字幕、增强视频质量和创建视频动画
              </p>
              <Link href="/tools#video" className="text-purple-600 dark:text-purple-400 font-medium hover:underline inline-flex items-center">
                查看视频工具
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>

            {/* 音频处理 */}
            <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-750 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Music className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">音频处理</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                文本转语音、语音转文本、生成音乐和音频增强处理
              </p>
              <Link href="/tools#audio" className="text-orange-600 dark:text-orange-400 font-medium hover:underline inline-flex items-center">
                查看音频工具
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">开始使用AI工具，提升您的工作效率</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            注册账户，即可获得丰富AI工具的访问权限，让AI助力您的创意和生产力
          </p>
          <Link
            href="/auth/register"
            className="px-8 py-4 text-lg font-medium bg-white text-blue-600 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
          >
            免费注册，立即体验
          </Link>
        </div>
      </section>
    </div>
  );
}
