"use client";

import { useState, useRef } from "react";
import {
  Upload,
  Trash2,
  Download,
  FileText,
  Video,
  Play,
  Pause,
  Clock,
  AlertCircle,
  Languages,
  Edit,
} from "lucide-react";
import Link from "next/link";

export default function SubtitleGeneratorPage() {
  // 状态管理
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [subtitles, setSubtitles] = useState<
    Array<{
      index: number;
      start: string;
      end: string;
      text: string;
    }>
  >([]);
  const [error, setError] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("zh");
  const [editingSubtitle, setEditingSubtitle] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 支持的语言
  const languages = [
    { code: "zh", name: "中文" },
    { code: "en", name: "英语" },
    { code: "ja", name: "日语" },
    { code: "ko", name: "韩语" },
    { code: "fr", name: "法语" },
    { code: "de", name: "德语" },
    { code: "es", name: "西班牙语" },
    { code: "ru", name: "俄语" },
  ];

  // 格式化时间戳
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);

    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")},${ms.toString().padStart(3, "0")}`;
  };

  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // 检查是否为视频文件
    if (!selectedFile.type.startsWith("video/")) {
      setError("请上传视频文件");
      return;
    }

    setFile(selectedFile);
    setError("");
    setSubtitles([]);

    // 创建视频URL
    const url = URL.createObjectURL(selectedFile);
    setVideoUrl(url);
  };

  // 移除已上传的视频
  const removeVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setFile(null);
    setVideoUrl("");
    setSubtitles([]);
    setProgress(0);
    setError("");

    // 重置文件输入
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 生成字幕
  const generateSubtitles = async () => {
    if (!file) {
      setError("请先上传视频文件");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError("");

    try {
      // 模拟字幕生成进度
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 300);

      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 6000));

      // 模拟生成的字幕数据
      const mockSubtitles = [
        {
          index: 1,
          start: "00:00:01,000",
          end: "00:00:04,000",
          text: "欢迎使用我们的AI视频字幕生成工具",
        },
        {
          index: 2,
          start: "00:00:04,500",
          end: "00:00:08,000",
          text: "这个工具可以自动为您的视频生成字幕",
        },
        {
          index: 3,
          start: "00:00:08,500",
          end: "00:00:12,000",
          text: "您可以选择不同的语言，还可以编辑和导出字幕",
        },
        {
          index: 4,
          start: "00:00:12,500",
          end: "00:00:16,000",
          text: "我们使用先进的语音识别技术，确保字幕准确性",
        },
        {
          index: 5,
          start: "00:00:16,500",
          end: "00:00:20,000",
          text: "同时支持多种字幕格式，包括SRT和VTT",
        },
        {
          index: 6,
          start: "00:00:21,000",
          end: "00:00:25,000",
          text: "升级到专业版可以获得更多高级功能和更好的服务",
        },
      ];

      setSubtitles(mockSubtitles);
      clearInterval(interval);
      setProgress(100);
    } catch (err) {
      setError("字幕生成失败，请稍后再试");
      console.error("Generation error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // 跳转到指定时间点播放视频
  const jumpToTime = (timeString: string) => {
    if (videoRef.current) {
      const [h, m, s] = timeString.split(":");
      const [seconds, milliseconds] = s.split(",");

      const totalSeconds =
        parseInt(h) * 3600 +
        parseInt(m) * 60 +
        parseInt(seconds) +
        parseInt(milliseconds) / 1000;

      videoRef.current.currentTime = totalSeconds;
      videoRef.current.play();
    }
  };

  // 开始编辑字幕
  const startEditing = (index: number, text: string) => {
    setEditingSubtitle(index);
    setEditText(text);
  };

  // 保存编辑的字幕
  const saveEditedSubtitle = (index: number) => {
    setSubtitles((prev) =>
      prev.map((sub) =>
        sub.index === index ? { ...sub, text: editText } : sub,
      ),
    );
    setEditingSubtitle(null);
  };

  // 取消编辑
  const cancelEditing = () => {
    setEditingSubtitle(null);
  };

  // 导出字幕为SRT格式
  const exportSRT = () => {
    if (subtitles.length === 0) return;

    let content = "";
    subtitles.forEach((sub) => {
      content += `${sub.index}\n`;
      content += `${sub.start} --> ${sub.end}\n`;
      content += `${sub.text}\n\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name || "video"}.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-oid=".j3v0e1"
    >
      <div className="mb-8" data-oid="c9q5z4h">
        <h1 className="text-3xl font-bold mb-2" data-oid="wans9xj">
          AI字幕生成器
        </h1>
        <p className="text-gray-600 dark:text-gray-300" data-oid=".:h_0xa">
          上传视频，自动提取并生成准确的字幕文件
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-oid="umkkke.">
        {/* 上传和预览区域 */}
        <div className="lg:col-span-2 space-y-6" data-oid="ej6t2ua">
          {/* 上传区域 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            data-oid="99cwcxc"
          >
            <div
              className="flex items-center justify-between mb-4"
              data-oid="srvnuas"
            >
              <h2 className="text-lg font-medium" data-oid="ozef4y2">
                上传视频
              </h2>
              {file && (
                <button
                  onClick={removeVideo}
                  className="text-red-500 hover:text-red-700 flex items-center text-sm"
                  data-oid="owgjelf"
                >
                  <Trash2 className="h-4 w-4 mr-1" data-oid="u6okl-8" />
                  移除
                </button>
              )}
            </div>

            {!file ? (
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                data-oid="e2x4b1k"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="video/*"
                  data-oid="mpdgshn"
                />

                <Upload
                  className="h-12 w-12 text-gray-400 mb-3"
                  data-oid="a5g3eow"
                />

                <p className="mb-2 text-center" data-oid="_b:z94.">
                  点击或拖拽视频文件到此处
                </p>
                <p
                  className="text-sm text-gray-500 dark:text-gray-400 text-center"
                  data-oid="yiavpat"
                >
                  支持MP4, AVI, MOV等常见视频格式
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  data-oid="204qof3"
                >
                  选择视频
                </button>
              </div>
            ) : (
              <div data-oid="uys22es">
                <div className="flex items-center mb-4" data-oid="cy0_uj9">
                  <Video
                    className="h-5 w-5 text-purple-600 mr-2"
                    data-oid="tupwyss"
                  />

                  <span className="truncate" data-oid="yzxyrs:">
                    {file.name}
                  </span>
                  <span
                    className="ml-2 text-sm text-gray-500 dark:text-gray-400"
                    data-oid="tqa.8re"
                  >
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>

                <div className="relative" data-oid="qms9dn.">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full rounded-lg"
                    controls
                    data-oid="ceg.vnj"
                  />
                </div>
              </div>
            )}

            {error && (
              <div
                className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-md p-3 text-sm text-red-600 dark:text-red-400"
                data-oid="aq-kn66"
              >
                <div className="flex" data-oid="wgkswi1">
                  <div className="flex-shrink-0" data-oid="huj5.pu">
                    <AlertCircle
                      className="h-5 w-5 text-red-400"
                      data-oid="hdq:yas"
                    />
                  </div>
                  <div className="ml-3" data-oid="-r379dg">
                    <p data-oid="9c64uft">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 生成按钮和语言选择 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            data-oid="x8yl_j8"
          >
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              data-oid="ccon:h7"
            >
              <div className="flex-grow max-w-xs" data-oid="g8.r757">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium mb-1"
                  data-oid="ii-qjjn"
                >
                  字幕语言
                </label>
                <select
                  id="language"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  data-oid="24rub6c"
                >
                  {languages.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      data-oid="91.56q8"
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex sm:items-end" data-oid="_ei3obm">
                <button
                  onClick={generateSubtitles}
                  disabled={!file || isProcessing}
                  className={`w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${!file || isProcessing ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                  data-oid="m98yopo"
                >
                  {isProcessing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        data-oid="ft0cbzb"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          data-oid="msn:5g2"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          data-oid="gk12esx"
                        ></path>
                      </svg>
                      生成中...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" data-oid="5fpxmxc" />
                      生成字幕
                    </>
                  )}
                </button>
              </div>
            </div>

            {isProcessing && (
              <div className="mt-4" data-oid="0ytv6ph">
                <div
                  className="flex justify-between text-xs mb-1"
                  data-oid="t:3lv5w"
                >
                  <span data-oid="oi5jzxq">处理中</span>
                  <span data-oid="mlb--4o">{progress}%</span>
                </div>
                <div
                  className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                  data-oid="nmnin6j"
                >
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                    data-oid="o27sgqj"
                  ></div>
                </div>
                <p
                  className="mt-2 text-xs text-gray-500 dark:text-gray-400"
                  data-oid="tajew8f"
                >
                  处理较长视频可能需要几分钟，请耐心等待
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 字幕预览和编辑区域 */}
        <div className="space-y-6" data-oid=".2d5ler">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full"
            data-oid="rsy9nu:"
          >
            <div
              className="flex items-center justify-between mb-4"
              data-oid="0rwqq74"
            >
              <h2 className="text-lg font-medium" data-oid="5q5xj-4">
                字幕预览
              </h2>

              {subtitles.length > 0 && (
                <button
                  onClick={exportSRT}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  data-oid="o-th_6z"
                >
                  <Download className="h-4 w-4 mr-1" data-oid=".cjxqm0" />
                  导出SRT
                </button>
              )}
            </div>

            {subtitles.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center text-center h-64"
                data-oid="4r_yavn"
              >
                <FileText
                  className="h-12 w-12 text-gray-400 mb-3"
                  data-oid="x3m9ow_"
                />

                <p
                  className="text-gray-500 dark:text-gray-400"
                  data-oid="75j_bnz"
                >
                  上传视频并点击"生成字幕"按钮
                  <br data-oid="7m-cg9x" />
                  生成的字幕将显示在这里
                </p>
              </div>
            ) : (
              <div
                className="space-y-2 max-h-[500px] overflow-y-auto pr-2"
                data-oid="dw4-s2k"
              >
                {subtitles.map((subtitle) => (
                  <div
                    key={subtitle.index}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                    data-oid="n0qgo61"
                  >
                    <div
                      className="flex justify-between items-start mb-1"
                      data-oid=".05o3vp"
                    >
                      <div className="flex items-center" data-oid="o9ei:p.">
                        <span
                          className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-2"
                          data-oid="ztvf_m:"
                        >
                          #{subtitle.index}
                        </span>
                        <button
                          onClick={() => jumpToTime(subtitle.start)}
                          className="text-xs inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline"
                          data-oid="jsl3t7j"
                        >
                          <Play className="h-3 w-3 mr-1" data-oid="478fl3w" />
                          <span data-oid="nx-gh3n">
                            {subtitle.start} - {subtitle.end}
                          </span>
                        </button>
                      </div>

                      {editingSubtitle !== subtitle.index ? (
                        <button
                          onClick={() =>
                            startEditing(subtitle.index, subtitle.text)
                          }
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          data-oid="pjnx3z5"
                        >
                          <Edit className="h-4 w-4" data-oid="3z1f546" />
                        </button>
                      ) : (
                        <div className="flex space-x-2" data-oid="f4j0nbq">
                          <button
                            onClick={() => saveEditedSubtitle(subtitle.index)}
                            className="text-xs bg-green-500 text-white px-2 py-0.5 rounded hover:bg-green-600"
                            data-oid="ool7f.5"
                          >
                            保存
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="text-xs bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                            data-oid="162-:8z"
                          >
                            取消
                          </button>
                        </div>
                      )}
                    </div>

                    {editingSubtitle === subtitle.index ? (
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                        rows={2}
                        autoFocus
                        data-oid="n77vhh8"
                      />
                    ) : (
                      <p className="text-sm" data-oid="11-am2e">
                        {subtitle.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 功能介绍 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            data-oid="4bol2:3"
          >
            <h3 className="text-md font-medium mb-4" data-oid="g28ycof">
              支持的功能
            </h3>

            <ul className="space-y-3" data-oid="71ilvcf">
              <li className="flex" data-oid="wgyy.ai">
                <Languages
                  className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
                  data-oid="e:d_mod"
                />

                <span className="text-sm" data-oid="28igo7s">
                  支持多种语言识别和翻译
                </span>
              </li>
              <li className="flex" data-oid="m1.qq5_">
                <Clock
                  className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
                  data-oid="9rx-g8w"
                />

                <span className="text-sm" data-oid=":f6s2.5">
                  精确的时间戳标记
                </span>
              </li>
              <li className="flex" data-oid="8:6zmr8">
                <Edit
                  className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
                  data-oid="r9jch__"
                />

                <span className="text-sm" data-oid="-ejr_-4">
                  编辑和微调识别结果
                </span>
              </li>
              <li className="flex" data-oid="m7lknri">
                <Download
                  className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
                  data-oid="17y-86q"
                />

                <span className="text-sm" data-oid="3lxmdj7">
                  导出为SRT和VTT字幕格式
                </span>
              </li>
            </ul>

            <div
              className="mt-4 pt-4 border-t dark:border-gray-700"
              data-oid="v52uudv"
            >
              <Link
                href="/pricing"
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center"
                data-oid="anp5vk1"
              >
                升级到Pro版获取更多高级功能
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="x-33yqr"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                    data-oid="bqct.55"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
