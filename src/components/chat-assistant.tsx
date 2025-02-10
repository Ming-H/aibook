"use client"

import { useState, useEffect } from "react"
import { Send, MessageCircle, X } from "lucide-react"

interface Message {
    role: "user" | "assistant"
    content: string
}

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // 这里可以安全地使用 location
        console.log(location.href);
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        setError(null)
        const newMessage: Message = { role: "user", content: input }
        setMessages(prev => [...prev, newMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, newMessage] }),
            })

            if (!response.ok) {
                throw new Error("Failed to send message")
            }

            const data = await response.json()
            if (data.error) {
                throw new Error(data.error)
            }

            const assistantMessage: Message = { role: "assistant", content: data.message }
            setMessages(prev => [...prev, assistantMessage])
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
                <MessageCircle className="w-6 h-6" />
                <span>需要帮助？</span>
            </button>
        )
    }

    return (
        <div className="fixed bottom-6 right-6 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-purple-100 dark:border-purple-900">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-purple-50 dark:bg-purple-900/50 rounded-t-2xl">
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">AI 助手</h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-purple-100 dark:hover:bg-purple-800 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                </button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/50 dark:to-gray-800">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        有什么问题都可以问我哦！
                    </div>
                )}
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${message.role === "user"
                                ? "bg-purple-600 text-white"
                                : "bg-white dark:bg-gray-700 border border-purple-100 dark:border-purple-800"
                                }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-700 rounded-2xl p-3 border border-purple-100 dark:border-purple-800 shadow-sm">
                            <div className="animate-pulse">正在输入...</div>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="flex justify-center">
                        <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-300 rounded-2xl p-3 border border-red-100 dark:border-red-800">
                            {error}
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700 bg-purple-50 dark:bg-purple-900/50 rounded-b-2xl">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="输入您的问题..."
                        className="flex-1 rounded-xl border border-purple-200 dark:border-purple-700 p-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-colors shadow-sm hover:shadow-md"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    )
} 