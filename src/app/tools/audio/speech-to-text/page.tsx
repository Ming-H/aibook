"use client";

import { useState } from "react";
import {
  Mic,
  Upload,
  Loader2,
  Copy,
  FileAudio,
  CheckCircle,
  RotateCcw,
  RefreshCw,
} from "lucide-react";

export default function SpeechToTextPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [recognizedText, setRecognizedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("zh");
  const [copied, setCopied] = useState(false);

  // 支持的语言选项
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

  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith("audio/")) {
      alert("请上传音频文件");
      return;
    }

    // 检查文件大小（限制为30MB）
    if (file.size > 30 * 1024 * 1024) {
      alert("文件大小不能超过30MB");
      return;
    }

    setAudioFile(file);

    // 创建音频预览URL
    const audioUrl = URL.createObjectURL(file);
    setAudioUrl(audioUrl);

    // 重置转换结果
    setRecognizedText("");
  };

  // 模拟上传音频
  const uploadAudio = async () => {
    if (!audioFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // 模拟上传进度
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    // 模拟上传完成
    setTimeout(() => {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(100);
    }, 2000);
  };

  // 模拟转换音频为文字
  const convertToText = async () => {
    if (!audioFile && !isRecording) return;

    // 如果有音频文件且未上传完成，先上传
    if (audioFile && uploadProgress < 100) {
      await uploadAudio();
    }

    setIsConverting(true);
    setRecognizedText("");

    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 模拟转换结果
    const demoText =
      selectedLanguage === "zh"
        ? "欢迎使用AI语音转文字工具。这是一个示例文本，实际转换结果将基于您的音频内容。我们的AI系统可以识别自然语言，包括专业术语、口语表达和不同口音。语音转文字功能可用于会议记录、采访整理、内容创作等多种场景。您可以上传音频文件或直接使用麦克风录制，支持多种语言。转换完成后，您可以复制文本或进行进一步编辑。高级用户可以使用我们的API进行批量处理。"
        : "Welcome to the AI Speech to Text tool. This is a sample text, the actual conversion result will be based on your audio content. Our AI system can recognize natural language, including professional terminology, spoken expressions, and different accents. The speech-to-text function can be used for meeting records, interview organization, content creation, and many other scenarios. You can upload audio files or use the microphone directly to record, supporting multiple languages. After the conversion is complete, you can copy the text or make further edits. Advanced users can use our API for batch processing.";

    setRecognizedText(demoText);
    setIsConverting(false);
  };

  // 模拟开始/停止录音
  const toggleRecording = () => {
    if (isRecording) {
      // 停止录音
      setIsRecording(false);
      setRecordingSeconds(0);

      // 模拟生成录音文件
      setTimeout(() => {
        setRecognizedText(
          "这是从您刚才的录音中识别出的文本。我们的AI可以实时处理语音内容并转换为文字。录音功能适合快速记录想法、口头笔记或简短的会议内容。",
        );
      }, 1500);
    } else {
      // 开始录音
      setAudioFile(null);
      setAudioUrl("");
      setRecognizedText("");
      setIsRecording(true);

      // 模拟录音计时
      const interval = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (!isRecording && prev >= 60) {
            clearInterval(interval);
            setIsRecording(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(recognizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setAudioFile(null);
    setAudioUrl("");
    setRecognizedText("");
    setUploadProgress(0);
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="py-12 mt-16" data-oid="gkes844">
      <div className="container mx-auto px-4" data-oid="065jjxv">
        <div className="max-w-5xl mx-auto" data-oid="4xhivso">
          <div className="flex items-center gap-3 mb-6" data-oid="ekb9vr8">
            <div
              className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center"
              data-oid="nzlgg1z"
            >
              <FileAudio
                className="w-6 h-6 text-amber-600 dark:text-amber-400"
                data-oid="1h8x815"
              />
            </div>
            <h1
              className="text-3xl font-bold text-gray-900 dark:text-white"
              data-oid="i4500bq"
            >
              语音转文字
            </h1>
          </div>

          <p
            className="text-gray-600 dark:text-gray-400 mb-8 ml-14"
            data-oid="40er5kk"
          >
            将音频文件或实时语音转换为文本，支持多种语言，准确识别口语内容和专业术语。
          </p>

          <div className="grid lg:grid-cols-2 gap-8" data-oid="fks64gz">
            {/* 输入区域 */}
            <div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
              data-oid="98k6hdg"
            >
              <h2
                className="text-xl font-semibold mb-4 text-gray-900 dark:text-white"
                data-oid="tmwatx5"
              >
                音频输入
              </h2>

              <div className="mb-6" data-oid=":tfen0f">
                <div
                  className="flex items-center gap-2 mb-4"
                  data-oid="1tijcpj"
                >
                  <button
                    className={`flex-1 py-3 rounded-lg ${!isRecording ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}`}
                    onClick={() => setIsRecording(false)}
                    disabled={isConverting || isUploading}
                    data-oid="cg4r9mz"
                  >
                    <Upload
                      className="h-5 w-5 inline-block mr-2"
                      data-oid="rpfae3n"
                    />
                    上传文件
                  </button>
                  <button
                    className={`flex-1 py-3 rounded-lg ${isRecording ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}`}
                    onClick={toggleRecording}
                    disabled={isConverting || isUploading}
                    data-oid="lc:0s50"
                  >
                    <Mic
                      className="h-5 w-5 inline-block mr-2"
                      data-oid=":hu.8wh"
                    />

                    {isRecording ? "停止录音" : "开始录音"}
                  </button>
                </div>

                {!isRecording ? (
                  // 文件上传模式
                  <>
                    {!audioFile ? (
                      <div
                        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-amber-500 dark:hover:border-amber-500 transition-colors"
                        onClick={() =>
                          document.getElementById("audio-upload")?.click()
                        }
                        data-oid="-a076z4"
                      >
                        <input
                          id="audio-upload"
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={handleFileChange}
                          data-oid="rf1t88z"
                        />

                        <Upload
                          className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-3"
                          data-oid="_8acbeu"
                        />

                        <p
                          className="text-gray-600 dark:text-gray-400 mb-1"
                          data-oid="1gy5mbh"
                        >
                          点击或拖拽上传音频文件
                        </p>
                        <p
                          className="text-gray-500 dark:text-gray-500 text-sm"
                          data-oid="_fsriob"
                        >
                          支持 MP3, WAV, M4A, AAC 格式，最大30MB
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4" data-oid="q7vmvxm">
                        <audio
                          controls
                          src={audioUrl}
                          className="w-full"
                          data-oid="-8-ikvj"
                        ></audio>
                        <div
                          className="flex justify-between items-center"
                          data-oid="-pen3u0"
                        >
                          <p
                            className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs"
                            data-oid="j9y58qw"
                          >
                            {audioFile.name}
                          </p>
                          <button
                            onClick={() => {
                              setAudioFile(null);
                              setAudioUrl("");
                              setRecognizedText("");
                              setUploadProgress(0);
                            }}
                            className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                            data-oid="sh:hwbn"
                          >
                            移除
                          </button>
                        </div>

                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div
                            className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"
                            data-oid="fj6n9ha"
                          >
                            <div
                              className="bg-amber-600 h-2.5 rounded-full"
                              style={{ width: `${uploadProgress}%` }}
                              data-oid="te319j9"
                            ></div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  // 录音模式
                  <div className="text-center space-y-4" data-oid="rez:tud">
                    <div
                      className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto relative"
                      data-oid="6klbshv"
                    >
                      <Mic
                        className={`h-10 w-10 text-red-600 dark:text-red-400 ${isRecording ? "animate-pulse" : ""}`}
                        data-oid="rvz9.0-"
                      />

                      <span
                        className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-20"
                        data-oid="t9jyuom"
                      ></span>
                    </div>
                    <p
                      className="text-lg font-medium text-gray-900 dark:text-white"
                      data-oid="5spwoeg"
                    >
                      正在录音... {formatTime(recordingSeconds)}
                    </p>
                    <p
                      className="text-sm text-gray-600 dark:text-gray-400"
                      data-oid="e9o50i1"
                    >
                      请对着麦克风清晰地说话
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4" data-oid="cg003lu">
                <div data-oid="s9q4v:p">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    data-oid="ei-cbdz"
                  >
                    语言
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    disabled={isConverting}
                    data-oid="lg-lpqn"
                  >
                    {languages.map((lang) => (
                      <option
                        key={lang.code}
                        value={lang.code}
                        data-oid="ae70yi6"
                      >
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mt-6" data-oid="-b5qlz_">
                <button
                  onClick={clearAll}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
                  data-oid="3445lp5"
                >
                  <RotateCcw className="h-4 w-4 mr-2" data-oid="u.:xnsi" />
                  清空
                </button>
                <button
                  onClick={convertToText}
                  disabled={
                    (!audioFile && !isRecording) || isConverting || isUploading
                  }
                  className={`flex-1 px-4 py-2 rounded-lg font-medium text-white ${
                    (!audioFile && !isRecording) || isConverting || isUploading
                      ? "bg-amber-400 cursor-not-allowed"
                      : "bg-amber-600 hover:bg-amber-700"
                  } transition-colors flex items-center justify-center`}
                  data-oid="7j3iepj"
                >
                  {isUploading ? (
                    <>
                      <Loader2
                        className="animate-spin mr-2 h-5 w-5"
                        data-oid="ktiicia"
                      />
                      上传中...
                    </>
                  ) : isConverting ? (
                    <>
                      <Loader2
                        className="animate-spin mr-2 h-5 w-5"
                        data-oid="5pe2bqx"
                      />
                      识别中...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2" data-oid="zon94m-" />
                      开始转换
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 识别结果区域 */}
            <div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
              data-oid="dhdkfjr"
            >
              <div
                className="flex items-center justify-between mb-4"
                data-oid="lsiib0m"
              >
                <h2
                  className="text-xl font-semibold text-gray-900 dark:text-white"
                  data-oid="dl2_05v"
                >
                  识别结果
                </h2>

                {recognizedText && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-1 text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400"
                    title="复制到剪贴板"
                    data-oid="4hkwkfv"
                  >
                    {copied ? (
                      <CheckCircle className="h-5 w-5" data-oid="1v45tu4" />
                    ) : (
                      <Copy className="h-5 w-5" data-oid="f_subpk" />
                    )}
                    <span className="text-sm" data-oid="04.hhx2">
                      {copied ? "已复制" : "复制"}
                    </span>
                  </button>
                )}
              </div>

              {isConverting ? (
                <div
                  className="flex flex-col items-center justify-center h-64"
                  data-oid="tpapru."
                >
                  <Loader2
                    className="animate-spin h-10 w-10 text-amber-600 dark:text-amber-400 mb-4"
                    data-oid="mkc7i0u"
                  />

                  <p
                    className="text-gray-600 dark:text-gray-400"
                    data-oid="k88f64t"
                  >
                    正在识别语音内容，请稍候...
                  </p>
                  <p
                    className="text-gray-500 dark:text-gray-500 text-sm mt-2"
                    data-oid="8qwl6zw"
                  >
                    处理时间取决于音频长度
                  </p>
                </div>
              ) : (
                <div
                  className="h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
                  data-oid="b1jgl5:"
                >
                  {recognizedText ? (
                    <p
                      className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap"
                      data-oid=".0wrw44"
                    >
                      {recognizedText}
                    </p>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400"
                      data-oid="-ai9:d0"
                    >
                      <FileAudio
                        className="h-16 w-16 mb-4 opacity-20"
                        data-oid="la885uv"
                      />

                      <p data-oid="sfi8m6y">识别结果将显示在这里</p>
                      <p className="text-sm mt-2" data-oid="yrfp5rn">
                        上传音频或录音并点击转换按钮
                      </p>
                    </div>
                  )}
                </div>
              )}

              {recognizedText && (
                <div
                  className="mt-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300"
                  data-oid="sd7y1g4"
                >
                  <div className="flex items-start" data-oid="ysy2ej5">
                    <CheckCircle
                      className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5"
                      data-oid="zxzcm-7"
                    />

                    <div data-oid="40e4y79">
                      <p className="font-medium" data-oid="zqftppq">
                        识别完成！
                      </p>
                      <p className="mt-1" data-oid="fujp8h2">
                        您可以复制文本或进行进一步编辑。若识别结果不准确，请尝试使用更高质量的音频录音，或选择更匹配的语言。
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 使用提示 */}
          <div
            className="mt-12 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6"
            data-oid="-8hpdam"
          >
            <h3
              className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-4"
              data-oid="m3bep8_"
            >
              使用提示
            </h3>
            <ul
              className="space-y-2 text-gray-700 dark:text-gray-300"
              data-oid="-d1pkxj"
            >
              <li data-oid="1zs8-u6">• 使用高质量的音频录音，减少背景噪音</li>
              <li data-oid="wm5txpl">
                • 清晰的发音和适当的语速可以提高识别准确率
              </li>
              <li data-oid="a83hnjg">
                • 对于专业术语或特定领域的内容，可以选择相应的专业模型（Pro版）
              </li>
              <li data-oid="x18fl4w">
                • 基础版支持最长15分钟的音频，Pro版支持90分钟
              </li>
              <li data-oid="n2aqerq">
                • 实时录音功能适合快速记录想法和短文本，支持最长5分钟录音
              </li>
            </ul>
          </div>

          {/* 应用场景 */}
          <div className="mt-8 grid md:grid-cols-3 gap-6" data-oid="9f5:tyj">
            <div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              data-oid="b8oop70"
            >
              <h3
                className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
                data-oid="7jt72lw"
              >
                会议记录
              </h3>
              <p
                className="text-gray-600 dark:text-gray-400"
                data-oid="4jrr423"
              >
                自动将会议录音转换为文字记录，高效保存重要讨论内容和决策。
              </p>
            </div>
            <div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              data-oid="ea7rxqs"
            >
              <h3
                className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
                data-oid="iywydub"
              >
                采访整理
              </h3>
              <p
                className="text-gray-600 dark:text-gray-400"
                data-oid="70.hzeb"
              >
                快速转录采访录音，节省手动整理时间，专注于内容分析和后续工作。
              </p>
            </div>
            <div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              data-oid="tf3dw8y"
            >
              <h3
                className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
                data-oid="s01k:9n"
              >
                内容创作
              </h3>
              <p
                className="text-gray-600 dark:text-gray-400"
                data-oid="zc.f8-b"
              >
                将语音想法转换为文字，适用于作家、博主和创作者快速记录灵感。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
