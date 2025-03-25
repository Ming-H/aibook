import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
      data-oid="u.zicwk"
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8" data-oid="ch5brbm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-oid="ly.ripy">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1" data-oid=".-qegan">
            <Link href="/" className="inline-block" data-oid="9c888we">
              <span
                className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
                data-oid="7dujego"
              >
                AI Tools Hub
              </span>
            </Link>
            <p
              className="mt-3 text-gray-600 dark:text-gray-400 text-sm"
              data-oid="accsjrj"
            >
              一站式AI工具平台，提供文本、图像、视频、音频处理的AI工具集合，提高工作效率，释放创造力。
            </p>
            <div className="mt-4 flex space-x-4" data-oid="rv69u4x">
              <a
                href="#"
                className="text-gray-500 hover:text-purple-600 dark:hover:text-purple-400"
                aria-label="Twitter"
                data-oid="c4y3kjl"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  data-oid="pff0p4u"
                >
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                    data-oid="61-cly0"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-purple-600 dark:hover:text-purple-400"
                aria-label="GitHub"
                data-oid="gnz:g1d"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  data-oid="pxta-uo"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                    data-oid="g9ma9i4"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div data-oid=":javfmg">
            <h3
              className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider"
              data-oid="zokur6b"
            >
              导航
            </h3>
            <ul className="mt-4 space-y-3" data-oid="b3p_dzk">
              <li data-oid="_h7bdrp">
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="fr47k3a"
                >
                  首页
                </Link>
              </li>
              <li data-oid="6m.fq4z">
                <Link
                  href="/tools"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="1yfio1g"
                >
                  工具导航
                </Link>
              </li>
              <li data-oid="om.0ln2">
                <Link
                  href="/auth/login"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="w78:b:1"
                >
                  登录
                </Link>
              </li>
              <li data-oid="y8q9mgx">
                <Link
                  href="/auth/register"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="ekegpf1"
                >
                  注册
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div data-oid="pf6w9oq">
            <h3
              className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider"
              data-oid="wmym16c"
            >
              联系我们
            </h3>
            <ul className="mt-4 space-y-3" data-oid="zb3.7i9">
              <li data-oid="3hzy960">
                <Link
                  href="mailto:support@aitoolshub.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="gn5f0wj"
                >
                  邮箱：support@aitoolshub.com
                </Link>
              </li>
              <li data-oid="19w3sv6">
                <Link
                  href="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="7rwbioc"
                >
                  常见问题
                </Link>
              </li>
              <li data-oid="eq8rx8_">
                <Link
                  href="/support"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="m7g8qgz"
                >
                  联系客服
                </Link>
              </li>
              <li data-oid="k-zvu4_">
                <Link
                  href="/guides"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="6ukd_b3"
                >
                  使用教程
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div data-oid="bstxzrb">
            <h3
              className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider"
              data-oid="pcbybmc"
            >
              客服时间
            </h3>
            <ul className="mt-4 space-y-3" data-oid="_8akly7">
              <li data-oid="mfx0zb.">
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="5s-b4w5"
                >
                  周一至周五 9:00-18:00
                </Link>
              </li>
              <li data-oid="rnahofc">
                <Link
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="_qxx31g"
                >
                  隐私政策
                </Link>
              </li>
              <li data-oid="4llfjxn">
                <Link
                  href="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="twh.rr2"
                >
                  服务条款
                </Link>
              </li>
              <li data-oid="u6h78gl">
                <Link
                  href="/career"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                  data-oid="q025-_s"
                >
                  加入我们
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
          data-oid="zeksdi_"
        >
          <p
            className="text-sm text-gray-500 dark:text-gray-400 text-center"
            data-oid="_.bcn83"
          >
            &copy; {new Date().getFullYear()} AI Tools Hub. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
}
