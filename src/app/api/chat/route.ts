import { OpenAI } from "openai"
import { NextResponse } from "next/server"
import { ChatMessage, ChatResponse } from "@/types/chat"

if (!process.env.DEEPSEEK_API_KEY) {
    throw new Error("Missing DEEPSEEK_API_KEY environment variable")
}

const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_BASE_URL
})

export async function POST(request: Request) {
    try {
        const { messages }: { messages: ChatMessage[] } = await request.json()

        const response = await client.chat.completions.create({
            model: "deepseek-chat",
            messages: messages.map((msg: ChatMessage) => ({
                role: msg.role,
                content: msg.content
            })),
            temperature: 0.7,
        })

        if (!response.choices[0].message?.content) {
            throw new Error("No response from API")
        }

        const chatResponse: ChatResponse = {
            message: response.choices[0].message.content
        }

        return NextResponse.json(chatResponse)
    } catch (error) {
        console.error("Error:", error)
        const errorResponse: ChatResponse = {
            message: "",
            error: "Failed to process chat request"
        }
        return NextResponse.json(errorResponse, { status: 500 })
    }
} 