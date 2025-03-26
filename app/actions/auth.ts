"use server";

import { signIn } from 'next-auth/react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            return { error: result.error };
        }

        // 登录成功，重定向到主页或仪表板
        redirect('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        return { error: '登录过程中发生错误，请稍后再试' };
    }
} 