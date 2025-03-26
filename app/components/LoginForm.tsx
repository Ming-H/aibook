"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                setError(result.error);
            }
            // 登录成功后的处理
        } catch (error) {
            console.error('Login error:', error);
            setError('登录过程中发生错误，请稍后再试');
        }
    };

    // ... 表单JSX
} 