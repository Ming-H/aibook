import { aiModels } from "@/config/ai-models";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

type Props = {
  params: {
    modelId: string;
  };
};

export default function ModelPage({ params }: Props) {
  const model = aiModels.find((m) => m.id === params.modelId);

  if (!model) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto" data-oid="_edl82e">
      <div className="mb-8" data-oid="s46omfk">
        <div className="flex items-center justify-between" data-oid="gv71n35">
          <div data-oid="kdusnak">
            <h1
              className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100"
              data-oid="0rcz7t8"
            >
              {model.name}
            </h1>
            <p
              className="text-lg text-gray-600 dark:text-gray-400"
              data-oid="_8x4ps7"
            >
              由 {model.company} 开发
            </p>
          </div>
          <a
            href={model.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            data-oid="9e1y2-x"
          >
            访问官网
            <ExternalLink className="w-4 h-4 ml-2" data-oid="2964qnp" />
          </a>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none" data-oid="8sv._du">
        <div
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8"
          data-oid="0.:qjoq"
        >
          <h2 className="text-xl font-semibold mb-4" data-oid="_nz9x2i">
            模型简介
          </h2>
          <p data-oid="oagmg:k">{model.description}</p>
          <div className="mt-4" data-oid="xf9gpdd">
            <span
              className="text-sm text-gray-500 dark:text-gray-400"
              data-oid="av0mhd4"
            >
              发布日期：{model.releaseDate}
            </span>
          </div>
        </div>

        <div
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8"
          data-oid=":5wsdo-"
        >
          <h2 className="text-xl font-semibold mb-4" data-oid="kgu1e--">
            主要特点
          </h2>
          <ul className="space-y-2" data-oid="ukadldi">
            {model.features.map((feature, index) => (
              <li key={index} className="flex items-start" data-oid="cm0bbl-">
                <span
                  className="text-purple-600 dark:text-purple-400 mr-2"
                  data-oid="i.7uz4x"
                >
                  •
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8"
          data-oid="m9p1ou3"
        >
          <h2 className="text-xl font-semibold mb-4" data-oid="hnxidcg">
            API接口
          </h2>
          <div
            className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md"
            data-oid="x--xjj5"
          >
            <code className="text-sm break-all" data-oid="jkvm8d8">
              {model.apiEndpoint}
            </code>
          </div>
          <p
            className="mt-4 text-gray-600 dark:text-gray-400"
            data-oid="bntht-0"
          >
            请注意：使用API需要申请相应的API密钥，详细使用方法请参考官方文档。
          </p>
        </div>

        <div
          className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
          data-oid="vq4:w5f"
        >
          <h3
            className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2"
            data-oid="2mo016g"
          >
            使用建议
          </h3>
          <p data-oid="g:rvvkh">在使用{model.name}时，建议：</p>
          <ul className="mt-2" data-oid="wyjqsu6">
            <li data-oid="_yepjxp">仔细阅读API文档和使用条款</li>
            <li data-oid="d82.h.x">注意API调用频率限制</li>
            <li data-oid="wuz5t8f">合理设置超时和重试机制</li>
            <li data-oid="g45c7hi">做好错误处理和日志记录</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
