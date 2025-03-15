import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  Eye,
  Heart,
  Star,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="py-12 mt-16" data-oid="oe3f9vc">
      <div className="container mx-auto px-4" data-oid="b-0nwvm">
        {/* 社区头部 */}
        <div className="max-w-6xl mx-auto" data-oid=":da0me9">
          <div className="text-center mb-12" data-oid="yhc0p0e">
            <h1
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
              data-oid="o3.:664"
            >
              AI工具社区
            </h1>
            <p
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              data-oid="benlpq9"
            >
              分享您的AI体验、作品和技巧，向社区学习并获取灵感
            </p>
          </div>

          {/* 搜索和分类 */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-8"
            data-oid="pnpiwf2"
          >
            <div className="flex-1 relative" data-oid="u_76l70">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
                data-oid="on1igk9"
              />

              <input
                type="text"
                placeholder="搜索话题、作品或用户..."
                className="w-full py-2.5 pl-10 pr-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                data-oid="harxdvc"
              />
            </div>
            <div className="flex gap-2" data-oid="h3-rqhf">
              <button
                className="flex items-center gap-1 py-2.5 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                data-oid="_nd1jl7"
              >
                <Filter size={18} data-oid="mg50wrp" />
                <span data-oid="ltj5km3">筛选</span>
                <ChevronDown size={16} data-oid="c5484j4" />
              </button>
              <button
                className="py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                data-oid="r0d7urh"
              >
                发布内容
              </button>
            </div>
          </div>

          {/* 社区分类标签 */}
          <div className="flex flex-wrap gap-2 mb-8" data-oid="yjf4lz9">
            <button
              className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-1.5 rounded-full text-sm font-medium"
              data-oid="m6os:-m"
            >
              全部
            </button>
            <button
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              data-oid="h:xf_fe"
            >
              AI作品展示
            </button>
            <button
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              data-oid="qe8d4cz"
            >
              使用技巧
            </button>
            <button
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              data-oid=":ls8qsl"
            >
              问题解答
            </button>
            <button
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              data-oid="x4xbkhw"
            >
              资源分享
            </button>
            <button
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              data-oid="rc7_c0_"
            >
              AI讨论
            </button>
          </div>

          {/* 置顶内容 */}
          <div
            className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30 rounded-xl p-6 mb-8"
            data-oid="xlr._ny"
          >
            <div
              className="flex items-start justify-between mb-4"
              data-oid="3dyg290"
            >
              <div className="flex items-center" data-oid="q1bgl-v">
                <span
                  className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-sm mr-2"
                  data-oid="3103nqn"
                >
                  置顶
                </span>
                <h3
                  className="text-lg font-semibold text-gray-900 dark:text-white"
                  data-oid="q1_gsj5"
                >
                  社区公告：社区规则与使用指南
                </h3>
              </div>
              <span
                className="text-sm text-gray-500 dark:text-gray-400"
                data-oid="z091hxz"
              >
                2天前
              </span>
            </div>
            <p
              className="text-gray-600 dark:text-gray-300 mb-4"
              data-oid="b7wt94c"
            >
              欢迎加入AI工具社区！为了保持良好的交流环境，请遵守社区规则。我们鼓励分享AI使用体验、创作作品和讨论AI技术，禁止任何形式的广告、垃圾内容和侵权行为。
            </p>
            <div
              className="flex justify-between items-center"
              data-oid="54brvbi"
            >
              <div
                className="flex items-center text-gray-500 dark:text-gray-400 text-sm"
                data-oid="dykp5lx"
              >
                <div className="flex items-center mr-4" data-oid="bjfuo2a">
                  <Eye className="h-4 w-4 mr-1" data-oid="u.d4li0" />
                  <span data-oid=":r5qk66">3,542</span>
                </div>
                <div className="flex items-center mr-4" data-oid="um5kj.6">
                  <MessageSquare className="h-4 w-4 mr-1" data-oid="w8p9vpg" />
                  <span data-oid="lmae15f">87</span>
                </div>
                <div className="flex items-center" data-oid="ktk2wp7">
                  <ThumbsUp className="h-4 w-4 mr-1" data-oid="av2k_-i" />
                  <span data-oid="6991_ih">325</span>
                </div>
              </div>
              <Link
                href="/community/post/1"
                className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline"
                data-oid="scvdj7:"
              >
                查看详情
              </Link>
            </div>
          </div>

          {/* 热门文章列表 */}
          <div className="mb-12" data-oid="o-bcg:2">
            <div
              className="flex items-center justify-between mb-6"
              data-oid="_eqo8cn"
            >
              <h2
                className="text-2xl font-bold text-gray-900 dark:text-white"
                data-oid="ad6l_1n"
              >
                热门讨论
              </h2>
              <button
                className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline flex items-center"
                data-oid="t8zcz1j"
              >
                查看更多{" "}
                <ArrowRight className="ml-1 h-4 w-4" data-oid="am14yj6" />
              </button>
            </div>

            <div className="space-y-6" data-oid="6eew2k5">
              {[
                {
                  id: 1,
                  title: "AI图像生成的提示词工程技巧分享",
                  desc: "分享一些我在使用AI图像生成时发现的有效提示词格式和技巧，帮助大家生成更精确、更有艺术性的图像作品。",
                  category: "使用技巧",
                  author: "创意设计师",
                  time: "3天前",
                  views: 1856,
                  comments: 52,
                  likes: 213,
                },
                {
                  id: 2,
                  title: "使用AI文章生成器提高写作效率的实践",
                  desc: "我在内容创作中如何使用AI辅助工具，在保持内容原创性的同时提高写作效率，包括一些实用的技巧和注意事项。",
                  category: "使用技巧",
                  author: "内容创作者",
                  time: "5天前",
                  views: 2104,
                  comments: 45,
                  likes: 176,
                },
                {
                  id: 3,
                  title: "【作品展示】AI生成的科幻场景概念设计",
                  desc: "分享我最近使用AI图像生成工具创作的一系列科幻场景概念设计，包括未来城市、太空站和外星景观。",
                  category: "作品展示",
                  author: "概念艺术家",
                  time: "1周前",
                  views: 3421,
                  comments: 98,
                  likes: 367,
                },
                {
                  id: 4,
                  title: "AI语音转文字工具准确率对比测评",
                  desc: "对比测试了几款主流AI语音转文字工具在不同场景下的准确率、处理速度和成本效益，为大家选择合适的工具提供参考。",
                  category: "资源分享",
                  author: "技术评测员",
                  time: "2周前",
                  views: 2845,
                  comments: 63,
                  likes: 210,
                },
              ].map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                  data-oid="er6iof9"
                >
                  <div className="flex justify-between mb-2" data-oid="yf7ekoc">
                    <span
                      className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                      data-oid="y00jc3l"
                    >
                      {post.category}
                    </span>
                    <span
                      className="text-sm text-gray-500 dark:text-gray-400"
                      data-oid="kcxxhg4"
                    >
                      {post.time}
                    </span>
                  </div>
                  <Link
                    href={`/community/post/${post.id}`}
                    className="block group"
                    data-oid="pnwqlp6"
                  >
                    <h3
                      className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
                      data-oid="73i9c:w"
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2"
                      data-oid="v4147uu"
                    >
                      {post.desc}
                    </p>
                  </Link>
                  <div
                    className="flex justify-between items-center"
                    data-oid="if:5yku"
                  >
                    <div className="flex items-center" data-oid="yuzh4mw">
                      <div
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 mr-2 flex items-center justify-center text-white font-medium"
                        data-oid="mc:l8yj"
                      >
                        {post.author.charAt(0)}
                      </div>
                      <span
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        data-oid="y0g4j2f"
                      >
                        {post.author}
                      </span>
                    </div>
                    <div
                      className="flex items-center text-gray-500 dark:text-gray-400 text-sm"
                      data-oid=".n6.56d"
                    >
                      <div
                        className="flex items-center mr-4"
                        data-oid="phw8.34"
                      >
                        <Eye className="h-4 w-4 mr-1" data-oid="0-905oq" />
                        <span data-oid="jxqwloa">{post.views}</span>
                      </div>
                      <div
                        className="flex items-center mr-4"
                        data-oid="wy1564y"
                      >
                        <MessageSquare
                          className="h-4 w-4 mr-1"
                          data-oid="dr4d1d-"
                        />

                        <span data-oid="eksezk1">{post.comments}</span>
                      </div>
                      <div className="flex items-center" data-oid="gyil6:s">
                        <ThumbsUp className="h-4 w-4 mr-1" data-oid="tmns6o." />
                        <span data-oid=":lmh9l0">{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 精选作品 */}
          <div className="mb-12" data-oid="-ngjxrb">
            <div
              className="flex items-center justify-between mb-6"
              data-oid=".j3h6jv"
            >
              <h2
                className="text-2xl font-bold text-gray-900 dark:text-white"
                data-oid="ondb:9o"
              >
                精选AI作品
              </h2>
              <button
                className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline flex items-center"
                data-oid="ihh4p:f"
              >
                查看更多{" "}
                <ArrowRight className="ml-1 h-4 w-4" data-oid="7ldkps2" />
              </button>
            </div>

            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-oid="joptjpc"
            >
              {[
                {
                  id: 1,
                  title: "未来城市全景",
                  author: "未来主义者",
                  category: "AI图像",
                  likes: 245,
                  image:
                    "https://source.unsplash.com/random/600x400?futuristic+city",
                },
                {
                  id: 2,
                  title: "深海奇幻生物",
                  author: "海洋探索者",
                  category: "AI图像",
                  likes: 183,
                  image: "https://source.unsplash.com/random/600x400?deep+sea",
                },
                {
                  id: 3,
                  title: "森林精灵肖像",
                  author: "幻想插画师",
                  category: "AI图像",
                  likes: 209,
                  image:
                    "https://source.unsplash.com/random/600x400?forest+fantasy",
                },
              ].map((work) => (
                <div
                  key={work.id}
                  className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
                  data-oid="k6oztbx"
                >
                  <div
                    className="aspect-[4/3] relative overflow-hidden"
                    data-oid="j8833s3"
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-oid="2h3ab_9"
                    />

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity group-hover:opacity-100 opacity-70"
                      data-oid="l:htbh:"
                    />
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    data-oid=".wo.cxm"
                  >
                    <div
                      className="flex justify-between items-center mb-2"
                      data-oid="4m16342"
                    >
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-600/80 text-white"
                        data-oid="lw53cvj"
                      >
                        {work.category}
                      </span>
                      <div
                        className="flex items-center text-white"
                        data-oid="tlx:8v1"
                      >
                        <Heart
                          className="h-4 w-4 mr-1 text-red-400"
                          data-oid="rkg.b6g"
                        />

                        <span className="text-sm" data-oid=":408wq8">
                          {work.likes}
                        </span>
                      </div>
                    </div>
                    <h3
                      className="text-lg font-semibold text-white mb-1"
                      data-oid="c1li8_-"
                    >
                      {work.title}
                    </h3>
                    <div className="flex items-center" data-oid="dw53ql0">
                      <div
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 mr-2 flex items-center justify-center text-white text-xs font-medium"
                        data-oid="opwvop-"
                      >
                        {work.author.charAt(0)}
                      </div>
                      <span
                        className="text-sm text-white/90"
                        data-oid="6uce5_y"
                      >
                        {work.author}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 活跃用户 */}
          <div className="mb-12" data-oid="_n3am_s">
            <div
              className="flex items-center justify-between mb-6"
              data-oid="a3ekzhe"
            >
              <h2
                className="text-2xl font-bold text-gray-900 dark:text-white"
                data-oid="7g:5y2g"
              >
                活跃创作者
              </h2>
            </div>

            <div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              data-oid="eu7.0h3"
            >
              {[
                {
                  id: 1,
                  name: "创意设计师",
                  posts: 45,
                  likes: 1256,
                  badge: "顶级创作者",
                },
                {
                  id: 2,
                  name: "AI研究员",
                  posts: 32,
                  likes: 897,
                  badge: "技术专家",
                },
                {
                  id: 3,
                  name: "内容创作者",
                  posts: 38,
                  likes: 1023,
                  badge: "活跃贡献者",
                },
                {
                  id: 4,
                  name: "数字艺术家",
                  posts: 29,
                  likes: 785,
                  badge: "社区之星",
                },
              ].map((user) => (
                <div
                  key={user.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center"
                  data-oid="e1n.km4"
                >
                  <div
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mb-3 flex items-center justify-center text-white text-xl font-medium"
                    data-oid="4o0sn.0"
                  >
                    {user.name.charAt(0)}
                  </div>
                  <h3
                    className="text-lg font-semibold text-gray-900 dark:text-white mb-1"
                    data-oid="t6p9ymz"
                  >
                    {user.name}
                  </h3>
                  <div
                    className="text-sm text-purple-600 dark:text-purple-400 mb-3"
                    data-oid="-8lqj.b"
                  >
                    <span
                      className="inline-flex items-center"
                      data-oid="6fkjb0t"
                    >
                      <Star
                        className="h-3 w-3 mr-1"
                        fill="currentColor"
                        data-oid="-ibdw84"
                      />

                      {user.badge}
                    </span>
                  </div>
                  <div
                    className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400"
                    data-oid="r0e719."
                  >
                    <div data-oid="xfq1puc">
                      <span
                        className="font-medium text-gray-900 dark:text-white"
                        data-oid="l7j3q_e"
                      >
                        {user.posts}
                      </span>{" "}
                      篇内容
                    </div>
                    <div data-oid="sct-k31">
                      <span
                        className="font-medium text-gray-900 dark:text-white"
                        data-oid="nv:qffw"
                      >
                        {user.likes}
                      </span>{" "}
                      获赞
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 加入社区 */}
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl text-white p-8 md:p-12 text-center"
            data-oid="8k:7_v7"
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              data-oid="iii_5k:"
            >
              加入我们的AI创作者社区
            </h2>
            <p
              className="text-lg mb-8 text-purple-100 max-w-3xl mx-auto"
              data-oid="s5vj3p-"
            >
              分享您的AI创作作品、经验和想法，结识志同道合的创作者，共同探索AI的无限可能
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-oid=".3cemkm"
            >
              <Link
                href="/signup"
                className="bg-white text-purple-600 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg inline-flex items-center justify-center"
                data-oid="stwqvmc"
              >
                立即注册
              </Link>
              <Link
                href="/login"
                className="bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center justify-center"
                data-oid="ueg.7_c"
              >
                登录参与讨论
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
