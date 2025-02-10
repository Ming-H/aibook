import { OpenAI } from "openai"
import { NextResponse } from "next/server"

if (!process.env.DEEPSEEK_API_KEY) {
    throw new Error("Missing DEEPSEEK_API_KEY environment variable")
}

const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_BASE_URL
})

export async function POST(request: Request) {
    try {
        const { messages } = await request.json()

        const response = await client.chat.completions.create({
            model: "deepseek-chat",
            messages: messages.map((msg: any) => ({
                role: msg.role,
                content: msg.content
            })),
            temperature: 0.7,
        })

        if (!response.choices[0].message?.content) {
            throw new Error("No response from API")
        }

        return NextResponse.json({
            message: response.choices[0].message.content
        })
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json(
            { error: "Failed to process chat request" },
            { status: 500 }
        )
    }
} 