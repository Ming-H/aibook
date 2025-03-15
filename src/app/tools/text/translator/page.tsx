"use client";

import { useState } from 'react';
import { Languages, ArrowRight, Copy, RotateCcw, ArrowRightLeft, Upload, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function TranslatorPage() {
    // 支持的语言列表
    const languages = [
        { code: "zh", name: "中文" },
        { code: "en", name: "英语" },
        { code: "ja", name: "日语" },
        { code: "ko", name: "韩语" },
        { code: "fr", name: "法语" },
        { code: "de", name: "德语" },
        { code: "es", name: "西班牙语" },
        { code: "it", name: "意大利语" },
        { code: "ru", name: "俄语" },
        { code: "pt", name: "葡萄牙语" },
        { code: "ar", name: "阿拉伯语" },
        { code: "hi", name: "印地语" },
        { code: "th", name: "泰语" },
        { code: "vi", name: "越南语" }
    ];

    // 状态管理
    const [sourceText, setSourceText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('zh');
    const [targetLanguage, setTargetLanguage] = useState('en');
    const [isTranslating, setIsTranslating] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [autoTranslate, setAutoTranslate] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);

    // 字数计数
    const countCharacters = (text: string) => {
        return text ? text.length : 0;
    };

    // 处理输入变化
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setSourceText(text);
        setCharacterCount(countCharacters(text));

        if (autoTranslate && text.length > 0) {
            // 当用户停止输入500ms后自动翻译
            const debounceTranslate = setTimeout(() => {
                translateText();
            }, 500);

            return () => clearTimeout(debounceTranslate);
        }
    };

    // 交换语言
    const swapLanguages = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);
        setSourceText(translatedText);
        setTranslatedText(sourceText);
        setCharacterCount(countCharacters(translatedText));
    };

    // 清除内容
    const clearContent = () => {
        setSourceText('');
        setTranslatedText('');
        setCharacterCount(0);
        setErrorMessage('');
    };

    // 复制翻译结果
    const copyToClipboard = () => {
        if (translatedText) {
            navigator.clipboard.writeText(translatedText);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    // 翻译文本
    const translateText = async () => {
        if (!sourceText.trim()) {
            setErrorMessage('请输入需要翻译的文本');
            return;
        }

        if (sourceLanguage === targetLanguage) {
            setErrorMessage('源语言和目标语言不能相同');
            return;
        }

        setIsTranslating(true);
        setErrorMessage('');

        try {
            // 这里应该是实际的API调用，现在用模拟数据
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 模拟翻译结果
            const translationExamples: { [key: string]: { [key: string]: string } } = {
                "zh": {
                    "en": "This is a sample translation from Chinese to English. Actual implementation would call an AI translation API.",
                    "ja": "これは中国語から日本語への翻訳サンプルです。実際の実装ではAI翻訳APIを呼び出します。",
                    "fr": "Ceci est un exemple de traduction du chinois vers le français. L'implémentation réelle appellerait une API de traduction IA."
                },
                "en": {
                    "zh": "这是一个从英语到中文的示例翻译。实际实现会调用AI翻译API。",
                    "ja": "これは英語から日本語への翻訳例です。実際の実装では、AI翻訳APIを呼び出します。",
                    "fr": "Ceci est un exemple de traduction de l'anglais vers le français. L'implémentation réelle appellerait une API de traduction IA."
                },
                "ja": {
                    "zh": "这是一个从日语到中文的示例翻译。实际实现会调用AI翻译API。",
                    "en": "This is a sample translation from Japanese to English. Actual implementation would call an AI translation API.",
                    "fr": "Ceci est un exemple de traduction du japonais vers le français. L'implémentation réelle appellerait une API de traduction IA."
                }
            };

            // 获取对应语言的翻译结果，如果没有具体的例子，生成一个通用消息
            if (translationExamples[sourceLanguage] && translationExamples[sourceLanguage][targetLanguage]) {
                setTranslatedText(translationExamples[sourceLanguage][targetLanguage]);
            } else {
                setTranslatedText(`这是从${languages.find(l => l.code === sourceLanguage)?.name || sourceLanguage}到${languages.find(l => l.code === targetLanguage)?.name || targetLanguage}的翻译示例。实际实现将调用AI翻译API。`);
            }
        } catch (error) {
            setErrorMessage('翻译失败，请稍后再试');
            console.error('Translation error:', error);
        } finally {
            setIsTranslating(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">AI智能翻译</h1>
                <p className="text-gray-600 dark:text-gray-300">跨越语言障碍，精准翻译您的文本内容</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 源语言面板 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="flex items-center justify-between border-b dark:border-gray-700 p-4">
                        <select
                            value={sourceLanguage}
                            onChange={(e) => setSourceLanguage(e.target.value)}
                            className="block w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                        >
                            {languages.map((lang) => (
                                <option key={`source-${lang.code}`} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>

                        <div className="flex items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                                {characterCount} 字符
                            </span>
                            <button
                                onClick={clearContent}
                                className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                                title="清除"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <textarea
                        value={sourceText}
                        onChange={handleInputChange}
                        placeholder="输入要翻译的文本..."
                        className="w-full h-64 p-4 border-0 focus:ring-0 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* 中间控制按钮 */}
                <div className="lg:hidden flex justify-center items-center my-2">
                    <div className="flex space-x-2">
                        <button
                            onClick={swapLanguages}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none"
                            title="交换语言"
                        >
                            <ArrowRightLeft className="h-5 w-5" />
                        </button>

                        <button
                            onClick={translateText}
                            disabled={isTranslating || !sourceText.trim()}
                            className={`flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isTranslating || !sourceText.trim() ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                        >
                            {isTranslating ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    翻译中...
                                </>
                            ) : (
                                <>
                                    <Languages className="h-4 w-4 mr-2" />
                                    翻译
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* 目标语言面板 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="flex items-center justify-between border-b dark:border-gray-700 p-4">
                        <select
                            value={targetLanguage}
                            onChange={(e) => setTargetLanguage(e.target.value)}
                            className="block w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                        >
                            {languages.map((lang) => (
                                <option key={`target-${lang.code}`} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>

                        <div className="flex items-center">
                            <button
                                onClick={copyToClipboard}
                                disabled={!translatedText}
                                className={`p-1.5 ${!translatedText ? 'text-gray-400 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    } focus:outline-none`}
                                title="复制翻译结果"
                            >
                                <Copy className="h-4 w-4" />
                            </button>
                            {isCopied && (
                                <span className="text-xs text-green-500 ml-1">已复制</span>
                            )}
                        </div>
                    </div>

                    <div className="relative h-64">
                        <textarea
                            value={translatedText}
                            readOnly
                            placeholder="翻译结果将显示在这里..."
                            className="w-full h-full p-4 border-0 focus:ring-0 dark:bg-gray-800 dark:text-white"
                        />

                        {isTranslating && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50">
                                <div className="text-center">
                                    <svg className="animate-spin mx-auto h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">正在翻译...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 桌面版中间控制按钮 */}
                <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center">
                    <div className="flex flex-col space-y-4 items-center">
                        <button
                            onClick={swapLanguages}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 focus:outline-none"
                            title="交换语言"
                        >
                            <ArrowRightLeft className="h-5 w-5" />
                        </button>

                        <button
                            onClick={translateText}
                            disabled={isTranslating || !sourceText.trim()}
                            className={`flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isTranslating || !sourceText.trim() ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                        >
                            {isTranslating ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    翻译中...
                                </>
                            ) : (
                                <>
                                    <ArrowRight className="h-4 w-4 mr-2" />
                                    翻译
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 错误提示 */}
            {errorMessage && (
                <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-md p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 功能控制 */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={autoTranslate}
                                // 语言选项
                                const languages= [
                            {code: 'auto', name: '自动检测' },
                            {code: 'zh', name: '中文' },
                            {code: 'en', name: '英语' },
                            {code: 'ja', name: '日语' },
                            {code: 'ko', name: '韩语' },
                            {code: 'fr', name: '法语' },
                            {code: 'de', name: '德语' },
                            {code: 'es', name: '西班牙语' },
                            {code: 'it', name: '意大利语' },
                            {code: 'ru', name: '俄语' },
                            {code: 'pt', name: '葡萄牙语' },
                            {code: 'ar', name: '阿拉伯语' },
                            {code: 'hi', name: '印地语' },
                            {code: 'th', name: '泰语' },
                            {code: 'vi', name: '越南语' }
                            ];

    // 模拟翻译的函数
    const translateText = async () => {
        if (!sourceText) return;

                            setIsTranslating(true);
                            setTranslatedText('');

        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 1500));

                            // 模拟翻译结果
                            let result = '';

                            // 根据目标语言提供简单的示例翻译
                            if (targetLanguage === 'en' && sourceLanguage !== 'en') {
                                result = "This is an AI-powered translation example. The translator converts text between different languages while preserving the original style and context. You can use this tool for learning foreign languages, communicating with people from different countries, or understanding content in foreign languages.";
        } else if (targetLanguage === 'zh' && sourceLanguage !== 'zh') {
                                result = "这是一个AI驱动的翻译示例。翻译器可以在不同语言之间转换文本，同时保留原始风格和上下文。您可以使用此工具学习外语，与来自不同国家的人交流，或理解外语内容。";
        } else if (targetLanguage === 'ja') {
                                result = "これはAIを活用した翻訳の例です。翻訳者は、元のスタイルとコンテキストを保持しながら、異なる言語間でテキストを変換します。このツールを使用して、外国語を学んだり、異なる国の人々とコミュニケーションを取ったり、外国語のコンテンツを理解したりすることができます。";
        } else if (targetLanguage === 'ko') {
                                result = "이것은 AI 기반 번역 예시입니다. 번역기는 원본 스타일과 컨텍스트를 유지하면서 다른 언어 간에 텍스트를 변환합니다. 이 도구를 사용하여 외국어를 배우거나, 다른 국가의 사람들과 소통하거나, 외국어 콘텐츠를 이해할 수 있습니다.";
        } else if (targetLanguage === 'fr') {
                                result = "Voici un exemple de traduction assistée par IA. Le traducteur convertit le texte entre différentes langues tout en préservant le style et le contexte d'origine. Vous pouvez utiliser cet outil pour apprendre des langues étrangères, communiquer avec des personnes de différents pays ou comprendre du contenu en langues étrangères.";
        } else if (targetLanguage === 'de') {
                                result = "Dies ist ein KI-gestütztes Übersetzungsbeispiel. Der Übersetzer konvertiert Text zwischen verschiedenen Sprachen und behält dabei den ursprünglichen Stil und Kontext bei. Sie können dieses Tool zum Erlernen von Fremdsprachen, zur Kommunikation mit Menschen aus verschiedenen Ländern oder zum Verstehen von Inhalten in Fremdsprachen verwenden.";
        } else if (targetLanguage === 'es') {
                                result = "Este es un ejemplo de traducción impulsada por IA. El traductor convierte texto entre diferentes idiomas mientras preserva el estilo y contexto originales. Puede usar esta herramienta para aprender idiomas extranjeros, comunicarse con personas de diferentes países o comprender contenido en idiomas extranjeros.";
        } else {
                                result = sourceText; // 如果没有预设的翻译，返回原文
        }

                            setTranslatedText(result);
                            setIsTranslating(false);
    };

    // 交换语言
    const swapLanguages = () => {
        if (sourceLanguage !== 'auto') {
            const temp = sourceLanguage;
                            setSourceLanguage(targetLanguage);
                            setTargetLanguage(temp);

                            setSourceText(translatedText);
                            setTranslatedText(sourceText);
        }
    };

    const handleCopy = () => {
                                navigator.clipboard.writeText(translatedText);
                            setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearText = () => {
                                setSourceText('');
                            setTranslatedText('');
    };

                            return (
                            <div className="py-12 mt-16">
                                <div className="container mx-auto px-4">
                                    <div className="max-w-5xl mx-auto">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                                <Languages className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">智能翻译</h1>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 mb-8 ml-14">
                                            支持多种语言之间的高质量翻译，保留原文风格和语境，让您的翻译更加自然准确。
                                        </p>

                                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                                            {/* 语言选择栏 */}
                                            <div className="flex flex-wrap justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                                                    <select
                                                        value={sourceLanguage}
                                                        onChange={(e) => setSourceLanguage(e.target.value)}
                                                        className="bg-gray-100 dark:bg-gray-700 border-none rounded-md px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300"
                                                    >
                                                        {languages.map((lang) => (
                                                            <option key={`source-${lang.code}`} value={lang.code}>
                                                                {lang.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <button
                                                        onClick={swapLanguages}
                                                        disabled={sourceLanguage === 'auto'}
                                                        className={`p-1.5 rounded-full ${sourceLanguage === 'auto' ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30'}`}
                                                        title={sourceLanguage === 'auto' ? "自动检测模式下无法交换语言" : "交换语言"}
                                                    >
                                                        <ArrowDown className="w-4 h-4 transform rotate-90" />
                                                    </button>

                                                    <select
                                                        value={targetLanguage}
                                                        onChange={(e) => setTargetLanguage(e.target.value)}
                                                        className="bg-gray-100 dark:bg-gray-700 border-none rounded-md px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300"
                                                    >
                                                        {languages.filter(lang => lang.code !== 'auto').map((lang) => (
                                                            <option key={`target-${lang.code}`} value={lang.code}>
                                                                {lang.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="flex items-center gap-2 mt-2 md:mt-0">
                                                    <button
                                                        onClick={clearText}
                                                        className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        title="清空文本"
                                                    >
                                                        <RotateCcw className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                                                {/* 源文本区域 */}
                                                <div className="p-4">
                                                    <textarea
                                                        value={sourceText}
                                                        onChange={(e) => setSourceText(e.target.value)}
                                                        placeholder="输入要翻译的文本..."
                                                        className="w-full h-64 resize-none border-0 bg-transparent p-0 focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                                    />
                                                </div>

                                                {/* 翻译结果区域 */}
                                                <div className="p-4 relative">
                                                    {isTranslating ? (
                                                        <div className="flex flex-col items-center justify-center h-64">
                                                            <Loader2 className="animate-spin h-8 w-8 text-purple-600 dark:text-purple-400 mb-3" />
                                                            <p className="text-gray-600 dark:text-gray-400">正在翻译...</p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="h-64 overflow-y-auto text-gray-900 dark:text-white whitespace-pre-wrap">
                                                                {translatedText || (
                                                                    <span className="text-gray-400 dark:text-gray-500">
                                                                        翻译结果将显示在这里
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {translatedText && (
                                                                <button
                                                                    onClick={handleCopy}
                                                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                                                                    title="复制到剪贴板"
                                                                >
                                                                    {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 底部控制栏 */}
                                            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {sourceText ? `字符数: ${sourceText.length}` : ''}
                                                </div>
                                                <button
                                                    onClick={translateText}
                                                    disabled={!sourceText || isTranslating}
                                                    className={`px-4 py-2 rounded-lg font-medium ${!sourceText || isTranslating
                                                        ? 'bg-purple-400 text-white cursor-not-allowed'
                                                        : 'bg-purple-600 text-white hover:bg-purple-700'
                                                        }`}
                                                >
                                                    {isTranslating ? (
                                                        <>
                                                            <Loader2 className="animate-spin inline mr-2 h-4 w-4" />
                                                            翻译中...
                                                        </>
                                                    ) : '翻译'}
                                                </button>
                                            </div>
                                        </div>

                                        {/* 使用提示 */}
                                        <div className="mt-12 grid md:grid-cols-2 gap-6">
                                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                                                <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">使用提示</h3>
                                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                                    <li>• 文本长度不应超过5000字符（基础版）</li>
                                                    <li>• 提供上下文可以获得更准确的翻译</li>
                                                    <li>• 专业术语可能需要人工校对</li>
                                                    <li>• 支持15种常用语言之间的互译</li>
                                                    <li>• Pro版支持更多语言和更长文本</li>
                                                </ul>
                                            </div>

                                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">热门翻译对</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {[
                                                        { from: '中文', to: '英语' },
                                                        { from: '英语', to: '中文' },
                                                        { from: '日语', to: '中文' },
                                                        { from: '中文', to: '日语' },
                                                        { from: '英语', to: '法语' },
                                                        { from: '西班牙语', to: '英语' }
                                                    ].map((pair, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="bg-white dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                                                        >
                                                            {pair.from} → {pair.to}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            );
} 