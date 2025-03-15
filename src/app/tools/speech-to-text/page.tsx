"use client";

import { useState, useRef } from "react";
import {
  Upload,
  Mic,
  FileAudio,
  Trash2,
  Play,
  Pause,
  Download,
  Copy,
  AlertCircle,
  Languages,
} from "lucide-react";
import Link from "next/link";

export default function SpeechToTextPage() {
  // 状态管理
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("zh");
  const [isCopied, setIsCopied] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // 检查文件类型
    if (!selectedFile.type.startsWith("audio/")) {
      setError("请上传音频文件");
      return;
    }

    setFile(selectedFile);
    setError("");
    setTranscription("");

    // 创建音频URL
    const url = URL.createObjectURL(selectedFile);
    setAudioUrl(url);
  };

  // 开始录音
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // 创建File对象
        const fileName = `recording_${new Date().toISOString()}.wav`;
        const audioFile = new File([blob], fileName, { type: "audio/wav" });
        setFile(audioFile);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // 开始计时
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Failed to start recording", err);
      setError("无法访问麦克风。请确保您已授予麦克风权限。");
    }
  };

  // 停止录音
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      // 停止所有音轨
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);

      // 清除计时器
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // 播放/暂停音频
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 移除音频
  const removeAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setFile(null);
    setAudioUrl("");
    setTranscription("");
    setProgress(0);
    setError("");

    // 重置文件输入
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 复制转录文本
  const copyTranscription = () => {
    if (transcription) {
      navigator.clipboard.writeText(transcription);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // 下载转录文本
  const downloadTranscription = () => {
    if (!transcription) return;

    const fileName = file ? file.name.split(".")[0] : "transcription";
    const blob = new Blob([transcription], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}_transcription.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 转录音频
  const transcribeAudio = async () => {
    if (!file && !audioUrl) {
      setError("请先上传或录制音频");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError("");
    setTranscription("");

    try {
      // 模拟进度
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

      // 模拟转录结果
      let mockTranscription = "";

      if (selectedLanguage === "zh") {
        mockTranscription =
          "欢迎使用我们的语音转文字工具。这个工具可以帮助您快速将音频转换为文本。您可以上传音频文件或直接使用麦克风录制。我们支持多种语言，包括中文、英语、日语等。录音质量越好，转录结果越准确。如果您需要处理大量音频或需要更高精度的转录，可以考虑升级到我们的专业版。";
      } else if (selectedLanguage === "en") {
        mockTranscription =
          "Welcome to our Speech-to-Text tool. This tool can help you quickly convert audio to text. You can upload audio files or record directly using your microphone. We support multiple languages including Chinese, English, Japanese, and more. The better the recording quality, the more accurate the transcription. If you need to process a large amount of audio or require higher precision transcription, you may consider upgrading to our Professional version.";
      } else {
        mockTranscription =
          "这是一个示例转录结果，实际结果将根据您的音频内容和所选语言而定。我们的AI引擎能够识别自然语言中的语义和上下文，提供更准确的转录结果。";
      }

      setTranscription(mockTranscription);
      clearInterval(interval);
      setProgress(100);
    } catch (err) {
      setError("转录失败，请稍后再试");
      console.error("Transcription error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-oid="14wnq4:"
    >
      <div className="mb-8" data-oid="l2v.pxc">
        <h1 className="text-3xl font-bold mb-2" data-oid="ujacg4b">
          语音转文字
        </h1>
        <p className="text-gray-600 dark:text-gray-300" data-oid="bxk-.:l">
          快速准确地将语音转换为文字，支持多种语言和格式
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-oid=".-um_z.">
        {/* 左侧：上传和录音区域 */}
        <div className="space-y-6" data-oid="4294vby">
          {/* 音频源选择 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            data-oid="svebci4"
          >
            <div
              className="flex items-center justify-between mb-4"
              data-oid="8gu4-n3"
            >
              <h2 className="text-lg font-medium" data-oid="ci1crao">
                音频源
              </h2>
              {audioUrl && (
                <button
                  onClick={removeAudio}
                  className="text-red-500 hover:text-red-700 flex items-center text-sm"
                  data-oid="2p00y0r"
                >
                  <Trash2 className="h-4 w-4 mr-1" data-oid="sfohsvt" />
                  移除
                </button>
              )}
            </div>

            {!audioUrl ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                data-oid="tgxh01:"
              >
                {/* 上传音频 */}
                <div
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  data-oid="um8h6ig"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="audio/*"
                    data-oid="a6-t-my"
                  />

                  <Upload
                    className="h-10 w-10 text-gray-400 mb-3"
                    data-oid="9wa6_lx"
                  />

                  <p className="text-center mb-1" data-oid="ptklxjd">
                    上传音频文件
                  </p>
                  <p
                    className="text-xs text-gray-500 dark:text-gray-400 text-center"
                    data-oid="9gq1un-"
                  >
                    MP3, WAV, M4A等
                  </p>
                </div>

                {/* 录制音频 */}
                <div
                  className={`border-2 ${isRecording ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600"} rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors`}
                  onClick={isRecording ? stopRecording : startRecording}
                  data-oid="kjic0m."
                >
                  <Mic
                    className={`h-10 w-10 ${isRecording ? "text-red-500 animate-pulse" : "text-gray-400"} mb-3`}
                    data-oid="v_d:vis"
                  />

                  <p className="text-center mb-1" data-oid="8b4a6mr">
                    {isRecording ? "停止录音" : "开始录音"}
                  </p>
                  {isRecording && (
                    <p
                      className="text-xs text-red-500 dark:text-red-400 font-medium"
                      data-oid="krda9di"
                    >
                      {formatTime(recordingTime)}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div data-oid="msgr7bx">
                <div className="flex items-center mb-4" data-oid="5e0ux.e">
                  <FileAudio
                    className="h-5 w-5 text-purple-600 mr-2"
                    data-oid="0uusr7q"
                  />

                  <span className="truncate" data-oid="ta5-sr-">
                    {file?.name || "录制的音频"}
                  </span>
                  {file && (
                    <span
                      className="ml-2 text-sm text-gray-500 dark:text-gray-400"
                      data-oid="xgdsfur"
                    >
                      ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  )}
                </div>

                <div
                  className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-3"
                  data-oid="ac81idu"
                >
                  <button
                    onClick={togglePlayPause}
                    className="mr-3 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    data-oid="m0p0mg1"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" data-oid="t5b:v-r" />
                    ) : (
                      <Play className="h-4 w-4" data-oid="bs4x3_2" />
                    )}
                  </button>

                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    className="hidden"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    data-oid="rp826m8"
                  />

                  <div className="flex-1" data-oid="-q57loa">
                    <div
                      className="bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden"
                      data-oid="8v6g2cq"
                    >
                      {/* 这里可以添加音频波形或进度条 */}
                      <div
                        className="bg-purple-600 h-full w-0"
                        data-oid="dlycid_"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div
                className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-md p-3 text-sm text-red-600 dark:text-red-400"
                data-oid="loa4tgz"
              >
                <div className="flex" data-oid="obwjeq6">
                  <div className="flex-shrink-0" data-oid="mg74oae">
                    <AlertCircle
                      className="h-5 w-5 text-red-400"
                      data-oid="832hmzp"
                    />
                  </div>
                  <div className="ml-3" data-oid="as_dia1">
                    <p data-oid="7dyz2ks">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 语言和转录按钮 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            data-oid="snajvdq"
          >
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              data-oid="xg0gtts"
            >
              <div className="flex-grow max-w-xs" data-oid="7ynepv9">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium mb-1"
                  data-oid="4sf2ib5"
                >
                  音频语言
                </label>
                <select
                  id="language"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  data-oid="r5_b1c."
                >
                  {languages.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      data-oid="2fz4:gj"
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex sm:items-end" data-oid="_kteqqf">
                <button
                  onClick={transcribeAudio}
                  disabled={(!file && !audioUrl) || isProcessing}
                  className={`w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${(!file && !audioUrl) || isProcessing ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                  data-oid="jdegexj"
                >
                  {isProcessing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        data-oid="wepcj6b"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          data-oid="8_zyq_3"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          data-oid="32_o553"
                        ></path>
                      </svg>
                      处理中...
                    </>
                  ) : (
                    <>
                      <Languages className="h-4 w-4 mr-2" data-oid="a-hjqxx" />
                      开始转录
                    </>
                  )}
                </button>
              </div>
            </div>

            {isProcessing && (
              <div className="mt-4" data-oid="tesbew7">
                <div
                  className="flex justify-between text-xs mb-1"
                  data-oid="hcn8_.m"
                >
                  <span data-oid="9r5x.p5">处理中</span>
                  <span data-oid="2jcrvvp">{progress}%</span>
                </div>
                <div
                  className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                  data-oid="zjr585h"
                >
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                    data-oid="_m:u9a_"
                  ></div>
                </div>
                <p
                  className="mt-2 text-xs text-gray-500 dark:text-gray-400"
                  data-oid="rqitzut"
                >
                  处理较长音频可能需要一些时间，请耐心等待
                </p>
              </div>
            )}
          </div>

          {/* 功能介绍 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            data-oid="xz-e-q6"
          >
            <h3 className="text-md font-medium mb-4" data-oid="_youy9s">
              功能介绍
            </h3>

            <ul className="space-y-3" data-oid="81b5y_h">
              <li className="flex" data-oid="ov6al6l">
                <FileAudio
                  className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
                  data-oid="q.45g7s"
                />

                <span className="text-sm" data-oid="jrcgtnk">
                  支持上传MP3、WAV、M4A等多种格式的音频文件
                </span>
              </li>
              <li className="flex" data-oid="eu-57me">
                <Mic
                  className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
                  data-oid="2:g.067"
                />

                <span className="text-sm" data-oid="f2hojf2">
                  可直接使用麦克风录制音频，无需额外软件
                </span>
              </li>
              <li className="flex" data-oid="aho2-yo">
                <Languages
                  className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
                  data-oid="vcl8h25"
                />

                <span className="text-sm" data-oid="k:gt_qr">
                  支持多种语言的语音识别，包括中文、英语等
                </span>
              </li>
              <li className="flex" data-oid="t64t1s9">
                <Download
                  className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0"
                  data-oid="oyzsbtg"
                />

                <span className="text-sm" data-oid="_v--:qd">
                  可导出识别结果为TXT文本文件
                </span>
              </li>
            </ul>

            <div
              className="mt-4 pt-4 border-t dark:border-gray-700"
              data-oid="7d2hbs2"
            >
              <Link
                href="/pricing"
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center"
                data-oid=":4sgn.p"
              >
                升级到Pro版获取更高精度的识别和更多高级功能
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="ps.ks5o"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                    data-oid="o:k2b63"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* 右侧：转录结果 */}
        <div className="space-y-6" data-oid="5ed.onu">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full"
            data-oid="c.womxu"
          >
            <div
              className="flex items-center justify-between mb-4"
              data-oid="_o__w-k"
            >
              <h2 className="text-lg font-medium" data-oid="nmibb:6">
                转录结果
              </h2>

              {transcription && (
                <div className="flex space-x-2" data-oid="wfie9w8">
                  <button
                    onClick={copyTranscription}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    data-oid="ax0_132"
                  >
                    <Copy className="h-4 w-4 mr-1" data-oid="se5a:5r" />
                    {isCopied ? "已复制" : "复制"}
                  </button>

                  <button
                    onClick={downloadTranscription}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    data-oid="9hp3h:4"
                  >
                    <Download className="h-4 w-4 mr-1" data-oid="z5lvue1" />
                    下载
                  </button>
                </div>
              )}
            </div>

            {transcription ? (
              <div
                className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto"
                data-oid=".2o73s2"
              >
                <p
                  className="whitespace-pre-wrap text-gray-800 dark:text-gray-200"
                  data-oid="9sqcijw"
                >
                  {transcription}
                </p>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center text-center h-[400px]"
                data-oid="c5f8-_j"
              >
                <Languages
                  className="h-12 w-12 text-gray-400 mb-3"
                  data-oid="5.ovnrw"
                />

                <p
                  className="text-gray-500 dark:text-gray-400"
                  data-oid="um5_nwa"
                >
                  上传或录制音频并点击"开始转录"按钮
                  <br data-oid="7ycyeqe" />
                  转录结果将显示在这里
                </p>
              </div>
            )}
          </div>

          {/* 使用提示 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            data-oid="6gy-8-8"
          >
            <h3 className="text-md font-medium mb-4" data-oid="30.ion3">
              使用提示
            </h3>

            <div
              className="space-y-4 text-sm text-gray-600 dark:text-gray-300"
              data-oid=".c4rour"
            >
              <p data-oid="cu2.mqt">
                <span className="font-medium" data-oid=".x1369h">
                  🎙️ 录音质量：
                </span>{" "}
                使用高质量麦克风，确保录音环境安静，减少背景噪音，可大幅提高识别准确率。
              </p>
              <p data-oid="ip-1kee">
                <span className="font-medium" data-oid="03-q38x">
                  🗣️ 清晰发音：
                </span>{" "}
                说话速度适中，发音清晰，避免方言或口音过重，有助于提高识别准确性。
              </p>
              <p data-oid="pgcey2x">
                <span className="font-medium" data-oid="9lci7h.">
                  ⚙️ 专业版特性：
                </span>{" "}
                升级到专业版可获得更高准确率、更长的音频支持、专业词汇识别等高级功能。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
