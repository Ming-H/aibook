import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        console.log('Sending request to Deepseek API:', {
            url: process.env.DEEPSEEK_BASE_URL,
            messages
        })

        const response = await fetch(`${process.env.DEEPSEEK_BASE_URL}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages,
                temperature: 0.7,
                max_tokens: 1000
            })
        })

        if (!response.ok) {
            const errorData = await response.text()
            console.error('Deepseek API error:', errorData)
            throw new Error(`API request failed: ${response.statusText}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Chat API Error:', error)
        return NextResponse.json(
            { error: 'Failed to process chat request' },
            { status: 500 }
        )
    }
} 